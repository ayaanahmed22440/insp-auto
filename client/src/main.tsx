import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { startLogin } from "./const";
import "./index.css";

// Recover once from a stale Vite chunk after a deployment. This handles the
// brief window where an already-open page still references an asset that the
// new deployment has replaced, without changing application or payment logic.
const CHUNK_RETRY_KEY = "insp-auto-chunk-retry-at";
const isDynamicImportError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /failed to fetch dynamically imported module|importing a module script failed|dynamically imported module/i.test(message);
};

const recoverFromStaleChunk = (error: unknown) => {
  if (typeof window === "undefined" || !isDynamicImportError(error)) return;

  try {
    const now = Date.now();
    const previousAttempt = Number(sessionStorage.getItem(CHUNK_RETRY_KEY) || "0");
    // Allow one cache-busting reload per 30 seconds, preventing an infinite loop
    // if the asset is genuinely unavailable.
    if (previousAttempt && now - previousAttempt < 30_000) return;
    sessionStorage.setItem(CHUNK_RETRY_KEY, String(now));

    const url = new URL(window.location.href);
    url.searchParams.set("chunk-retry", String(now));
    window.location.replace(url.toString());
  } catch {
    // If sessionStorage or URL handling is unavailable, leave the normal error
    // boundary in control rather than interfering with the application.
  }
};

window.addEventListener("unhandledrejection", event => {
  recoverFromStaleChunk(event.reason);
});

window.addEventListener("error", event => {
  recoverFromStaleChunk(event.error || event.message);
});

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  startLogin();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        // Preview auto-login fallback: when the browser blocks iframe cookies
        // (Safari ITP / private browsing / WebView), the runtime mirrors the
        // session into sessionStorage so we can forward it as a Bearer token.
        // The regular OAuth cookie flow keeps working and takes priority server-side.
        try {
          const raw = sessionStorage.getItem("manus-cookie");
          if (raw) {
            const prefix = `${COOKIE_NAME}=`;
            const pair = raw.split(";").find(s => s.trim().startsWith(prefix));
            const token = pair?.trim().slice(prefix.length);
            if (token) {
              return { Authorization: `Bearer ${token}` };
            }
          }
        } catch {
          // sessionStorage unavailable
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </trpc.Provider>
);
