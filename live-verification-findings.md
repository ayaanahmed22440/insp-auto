# Live checkout verification findings

- Whop Developer dashboard, viewed Aug 20 2026, lists the INSP AUTO API key with `IP allow-listed: No`, confirming the placeholder IP restriction is no longer active.
- The live pricing page displayed the unified £49 / £59 / £79 report tiers.
- The live Basic report action added one item to `/checkout`; the checkout total was £49.00.
- A controlled non-customer test used placeholder details (`Checkout Flow`, `07000000000`, `checkout-test@example.com`, `TEST123`) and stopped before payment entry.
- After all required acknowledgements were selected, the live Pay action changed to `Preparing checkout…` and redirected to `https://whop.com/checkout/ch_5BIvCIURjcGTHwB/`.
- This confirms the live unified checkout handoff now succeeds after the Whop API-key IP allow-list correction. No card or payment details were entered and no payment was submitted.
- A sandbox curl probe was inconclusive because the sandbox TLS connection to `inspauto.com:443` failed with `SSL_ERROR_SYSCALL`; the connected browser verification is the authoritative live result.

Next checks: inspect the Whop checkout page/network state, verify the live Pixel/CSP evidence, and review retry-state behavior without making a payment.

## Quantity-matched checkout deployment verification

Hostinger shows commit `b4a29b15` deployed successfully to `inspauto.com` under Node 20 / Express with auto-deployment enabled. The live Pricing page serves the existing £49, £59, and £79 report cards and their actions; a controlled browser test is being used to confirm quantity-two checkout fields without submitting payment.
