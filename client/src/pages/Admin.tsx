import { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  Activity,
  BarChart3,
  ClipboardList,
  Inbox,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

const logo = "/assets/insp-auto-logo-clean.png";

type AdminUser = { email: string };
type Contact = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  vin?: string | null;
  orderNumber?: string | null;
  subject: string;
  message: string;
  status: string;
  internalNotes?: string | null;
  createdAt: string;
};
type Order = {
  id: number;
  customerName: string;
  deliveryEmail: string;
  vin?: string | null;
  selectedPlan: string;
  amountPence: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  paymentReference?: string | null;
  createdAt: string;
};

async function api<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data as T;
}

export function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"password" | "otp">("password");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submitPassword(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api<{ requiresOtp: boolean }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setBusy(false);
    }
  }

  async function submitOtp(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, code }),
      });
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to verify code");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <img src={logo} alt="INSP AUTO logo" className="admin-auth-logo" />
        <span className="eyebrow">PRIVATE ADMINISTRATION</span>
        <h1 id="admin-login-title">Secure sign in</h1>
        <p>
          {step === "password"
            ? "Use your administrator credentials to request a one-time verification code."
            : "Enter the six-digit code sent to your administrator mailbox."}
        </p>
        {error && (
          <div className="admin-alert" role="alert">
            {error}
          </div>
        )}
        {step === "password" ? (
          <form onSubmit={submitPassword} className="admin-form">
            <label>
              Email address
              <input
                autoComplete="username"
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                type="password"
                minLength={8}
                required
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </label>
            <button className="admin-primary-button" disabled={busy}>
              {busy ? "Sending code…" : "Continue securely"}
            </button>
          </form>
        ) : (
          <form onSubmit={submitOtp} className="admin-form">
            <label>
              Verification code
              <input
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={code}
                onChange={event =>
                  setCode(event.target.value.replace(/\D/g, ""))
                }
              />
            </label>
            <button className="admin-primary-button" disabled={busy}>
              {busy ? "Verifying…" : "Verify and enter"}
            </button>
            <button
              className="admin-text-button"
              type="button"
              onClick={() => {
                setStep("password");
                setCode("");
              }}
            >
              Use different credentials
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default function AdminApp() {
  const [location, navigate] = useLocation();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    api<{ email: string }>("/api/admin/me")
      .then(data => setUser({ email: data.email }))
      .catch(() => navigate("/admin/login"))
      .finally(() => setChecking(false));
  }, [navigate]);
  if (checking)
    return (
      <div className="admin-loading" role="status">
        Checking secure session…
      </div>
    );
  if (!user) return null;
  return <AdminShell user={user} location={location} navigate={navigate} />;
}

function AdminShell({
  user,
  location,
  navigate,
}: {
  user: AdminUser;
  location: string;
  navigate: (path: string) => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  async function logout() {
    await api("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    navigate("/admin/login");
  }
  const items = [
    { href: "/admin", label: "Overview", icon: BarChart3 },
    { href: "/admin/contacts", label: "Contacts", icon: Inbox },
    { href: "/admin/orders", label: "Orders", icon: ClipboardList },
    { href: "/admin/audit-logs", label: "Audit log", icon: Activity },
  ];
  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${drawerOpen ? "open" : ""}`}>
        <div className="admin-sidebar-top">
          <img src={logo} alt="INSP AUTO logo" />
          <button
            className="admin-close-drawer"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="admin-sidebar-kicker">
          <ShieldCheck size={15} /> Private admin
        </div>
        <nav aria-label="Admin navigation">
          {items.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              className={location === item.href ? "active" : ""}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="admin-user-email">{user.email}</span>
          <button className="admin-logout" onClick={logout}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      {drawerOpen && (
        <button
          className="admin-drawer-backdrop"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <div className="admin-main">
        <header className="admin-mobile-header">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open admin navigation"
          >
            <Menu size={22} />
          </button>
          <img src={logo} alt="INSP AUTO logo" />
        </header>
        <main className="admin-content">
          <Switch>
            <Route path="/admin/contacts">
              <ContactsPage />
            </Route>
            <Route path="/admin/orders">
              <OrdersPage />
            </Route>
            <Route path="/admin/audit-logs">
              <AuditLogsPage />
            </Route>
            <Route path="/admin">
              <OverviewPage />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

function OverviewPage() {
  const [data, setData] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api<{ data: Record<string, number> }>("/api/admin/overview")
      .then(result => setData(result.data))
      .catch(err => setError(err.message));
  }, []);
  const cards = data
    ? [
        { label: "Total contacts", value: data.contacts },
        { label: "New contacts", value: data.newContacts },
        { label: "In progress", value: data.inProgressContacts },
        { label: "Resolved", value: data.resolvedContacts },
        { label: "Awaiting fulfillment", value: data.awaitingOrders },
        { label: "Processing orders", value: data.processingOrders },
        { label: "Ready orders", value: data.readyOrders },
        { label: "Failed orders", value: data.failedOrders },
      ]
    : [];
  return (
    <PageFrame
      eyebrow="OVERVIEW"
      title="Administration overview"
      intro="Live operational counts from the INSP AUTO database. No demo records are shown."
    >
      {error ? (
        <div className="admin-alert" role="alert">
          {error}
        </div>
      ) : !data ? (
        <div className="admin-skeleton" aria-label="Loading overview" />
      ) : (
        <div className="admin-metric-grid">
          {cards.map(card => (
            <article className="admin-metric-card" key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          ))}
        </div>
      )}
    </PageFrame>
  );
}

function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const load = () =>
    api<{ data: Contact[] }>("/api/admin/contacts")
      .then(result => setContacts(result.data))
      .catch(err => setError(err.message));
  useEffect(() => {
    void load();
  }, []);
  const filtered = (contacts || []).filter(contact =>
    `${contact.name} ${contact.email} ${contact.subject} ${contact.vin || ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  async function update(id: number, status: string) {
    await api(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    load();
  }
  async function remove(id: number) {
    if (
      !window.confirm(
        "Delete this contact submission? This action will be audited."
      )
    )
      return;
    await api(`/api/admin/contacts/${id}`, { method: "DELETE" });
    load();
  }
  return (
    <PageFrame
      eyebrow="INBOX"
      title="Contact submissions"
      intro="Search and manage real visitor submissions. User content is rendered as text, not HTML."
    >
      <div className="admin-toolbar">
        <input
          aria-label="Search contacts"
          placeholder="Search name, email, subject or VIN"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </div>
      {error && (
        <div className="admin-alert" role="alert">
          {error}
        </div>
      )}
      {contacts === null ? (
        <div className="admin-skeleton" />
      ) : filtered.length === 0 ? (
        <div className="admin-empty">No contact submissions found.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(contact => (
                <tr key={contact.id}>
                  <td>
                    <strong>{contact.name}</strong>
                    <small>{contact.vin || "No VIN"}</small>
                  </td>
                  <td>
                    {contact.subject}
                    <small>{contact.message.slice(0, 100)}</small>
                  </td>
                  <td>{contact.email}</td>
                  <td>
                    <select
                      value={contact.status}
                      onChange={event => update(contact.id, event.target.value)}
                      aria-label={`Status for ${contact.name}`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="in_progress">In progress</option>
                      <option value="replied">Replied</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="admin-delete-button"
                      onClick={() => remove(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageFrame>
  );
}

function AuditLogsPage() {
  const [logs, setLogs] = useState<Array<{
    id: number;
    action: string;
    actorEmail?: string | null;
    entityType?: string | null;
    entityId?: string | null;
    metadata?: string | null;
    createdAt: string;
  }> | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api<{ data: typeof logs }>("/api/admin/audit-logs")
      .then(result => setLogs(result.data || []))
      .catch(err => setError(err.message));
  }, []);
  return (
    <PageFrame
      eyebrow="AUDIT LOG"
      title="Administrative activity"
      intro="Recorded security and operational actions. Sensitive credentials and visitor passwords are never shown."
    >
      {error ? (
        <div className="admin-alert" role="alert">
          {error}
        </div>
      ) : logs === null ? (
        <div className="admin-skeleton" aria-label="Loading audit log" />
      ) : logs.length === 0 ? (
        <div className="admin-empty">
          No administrative activity has been recorded.
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Actor</th>
                <th>Entity</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>
                    <strong>{log.action}</strong>
                    <small>{log.metadata || "No additional metadata"}</small>
                  </td>
                  <td>{log.actorEmail || "System"}</td>
                  <td>
                    {log.entityType || "—"}
                    {log.entityId ? ` / ${log.entityId}` : ""}
                  </td>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageFrame>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState("");
  const load = () =>
    api<{ data: Order[] }>("/api/admin/orders")
      .then(result => setOrders(result.data))
      .catch(err => setError(err.message));
  useEffect(() => {
    void load();
  }, []);
  async function update(id: number, fulfillmentStatus: string) {
    await api(`/api/admin/orders/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ fulfillmentStatus }),
    });
    load();
  }
  return (
    <PageFrame
      eyebrow="FULFILLMENT"
      title="Paid-order queue"
      intro="Payment and fulfillment are tracked separately. Reports are fulfilled by an external agent."
    >
      {error && (
        <div className="admin-alert" role="alert">
          {error}
        </div>
      )}
      {orders === null ? (
        <div className="admin-skeleton" />
      ) : orders.length === 0 ? (
        <div className="admin-empty">No payment orders have been received.</div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Fulfillment</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.customerName}</strong>
                    <small>{order.deliveryEmail}</small>
                  </td>
                  <td>{order.selectedPlan}</td>
                  <td>£{(order.amountPence / 100).toFixed(2)}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    <select
                      value={order.fulfillmentStatus}
                      onChange={event => update(order.id, event.target.value)}
                      aria-label={`Fulfillment for ${order.customerName}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageFrame>
  );
}

function PageFrame({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-page">
      <div className="admin-breadcrumb">Admin / {eyebrow.toLowerCase()}</div>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p className="admin-page-intro">{intro}</p>
      {children}
    </section>
  );
}
