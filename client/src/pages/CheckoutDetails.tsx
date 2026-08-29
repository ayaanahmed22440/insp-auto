import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { PAYMENT_LINKS } from "@/lib/paymentLinks";
import { SERVICE_TIER_PRICES } from "@/lib/servicePricing";

type PlanKey = "basic" | "standard" | "premium";

const PLANS: Record<PlanKey, { name: string; price: string; href: string }> = {
  basic: { name: "Basic Vehicle Report", price: SERVICE_TIER_PRICES.basic, href: PAYMENT_LINKS.basic },
  standard: { name: "Standard Vehicle Report", price: SERVICE_TIER_PRICES.standard, href: PAYMENT_LINKS.standard },
  premium: { name: "Premium Vehicle Report", price: SERVICE_TIER_PRICES.premium, href: PAYMENT_LINKS.premium },
};

function getPlan(): PlanKey {
  const value = new URLSearchParams(window.location.search).get("plan");
  return value === "standard" || value === "premium" ? value : "basic";
}

function go(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function CheckoutDetails() {
  const planKey = getPlan();
  const plan = useMemo(() => PLANS[planKey], [planKey]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [vin, setVin] = useState("");
  const [consentOne, setConsentOne] = useState(false);
  const [consentTwo, setConsentTwo] = useState(false);
  const [consentThree, setConsentThree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const ready = Boolean(firstName.trim() && lastName.trim() && phone.trim() && email.trim() && vin.trim() && consentOne && consentTwo && consentThree);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!ready) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
          vehicle: vin.trim(),
          order: `${plan.name} (£${plan.price})`,
          subject: `Checkout details — ${plan.name}`,
          message: [
            `First name: ${firstName.trim()}`,
            `Last name: ${lastName.trim()}`,
            `Phone: ${phone.trim()}`,
            `Email: ${email.trim()}`,
            `VIN / Registration / HIN: ${vin.trim()}`,
            `Selected report: ${plan.name}`,
            `Price: £${plan.price}`,
            "",
            "Customer confirmed all three checkout declarations before proceeding to the payment provider.",
          ].join("\n"),
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || "We could not save your checkout details. Please try again.");
      }

      window.location.assign(plan.href);
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not continue to payment. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="checkout-details-page">
      <style>{`
        .checkout-details-page{background:#fff;min-height:calc(100vh - 120px);padding:28px 0 70px;color:#13213b}
        .checkout-details-wrap{width:min(760px,calc(100% - 32px));margin:0 auto}
        .checkout-notice{border-top:2px solid #12348f;background:#f4f4f7;min-height:48px;display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:10px;font-size:13px;color:#26324a}
        .checkout-notice svg{color:#7ea800;flex:none}
        .checkout-notice strong{margin-left:auto;background:#052d8f;color:#fff;padding:8px 13px;font-size:12px;white-space:nowrap;cursor:pointer}
        .checkout-heading{font-size:25px;line-height:1.15;margin:0 0 16px;font-weight:700;color:#17213a}
        .checkout-form{background:#fff}
        .checkout-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px 26px}
        .checkout-field{display:flex;flex-direction:column;gap:6px;margin-bottom:11px}
        .checkout-field.full{grid-column:1/-1}
        .checkout-field label,.checkout-checkbox label{font-size:12px;line-height:1.4;color:#27334d}
        .checkout-field label::after{content:" *";color:#e3262e}
        .checkout-field input{height:28px;border:1px solid #173d9b;border-radius:2px;padding:4px 8px;font:inherit;font-size:13px;outline:none;color:#15213b;background:#fff}
        .checkout-field input:focus{box-shadow:0 0 0 2px rgba(23,61,155,.12)}
        .checkout-checkbox{display:flex;gap:8px;align-items:flex-start;margin:7px 0;color:#27334d}
        .checkout-checkbox input{width:14px;height:14px;margin:1px 0 0;accent-color:#143b97;flex:none}
        .checkout-checkbox label{cursor:pointer;line-height:1.75}
        .checkout-required{color:#e3262e}
        .checkout-order-title{font-size:21px;margin:20px 0 12px;color:#17213a}
        .checkout-order-table{width:100%;border-collapse:collapse;border:2px solid #173d9b;font-size:12px}
        .checkout-order-table th,.checkout-order-table td{border:1px solid #173d9b;padding:8px 9px;text-align:left}
        .checkout-order-table th:last-child,.checkout-order-table td:last-child{text-align:left;width:27%}
        .checkout-order-table thead th{font-weight:700;background:#fff}
        .checkout-order-table .total-row td{font-weight:700}
        .checkout-payment{margin-top:16px;background:#f0eff5;border-radius:3px;overflow:hidden}
        .checkout-payment-head{padding:13px 10px;border-bottom:1px solid #173d9b;font-size:12px;color:#26324a}
        .checkout-payment-body{padding:10px;display:flex;align-items:center;gap:8px;font-size:12px;color:#46516a}
        .checkout-payment-body svg{color:#143b97}
        .checkout-actions{display:flex;justify-content:space-between;align-items:center;gap:15px;padding:0 10px 12px}
        .checkout-back{border:0;background:none;color:#163b94;font-size:12px;cursor:pointer;padding:8px 0}
        .checkout-submit{border:0;background:#062e8f;color:#fff;border-radius:2px;padding:11px 17px;font-weight:700;font-size:12px;cursor:pointer}
        .checkout-submit:disabled{opacity:.45;cursor:not-allowed}
        .checkout-error{margin:10px 0 0;padding:10px 12px;border:1px solid #e3262e;background:#fff5f5;color:#a3151b;font-size:12px;line-height:1.5}
        .checkout-security-note{display:flex;gap:7px;align-items:center;margin-top:12px;font-size:11px;color:#64708a}
        .checkout-security-note svg{color:#163b94}
        @media(max-width:640px){.checkout-details-page{padding-top:16px}.checkout-grid{grid-template-columns:1fr;gap:0}.checkout-field.full{grid-column:auto}.checkout-notice{flex-wrap:wrap}.checkout-notice strong{margin-left:0}.checkout-order-table{font-size:11px}.checkout-order-table th:last-child,.checkout-order-table td:last-child{width:31%}.checkout-actions{align-items:stretch;flex-direction:column}.checkout-submit{width:100%}}
      `}</style>

      <div className="checkout-details-wrap">
        <div className="checkout-notice">
          <CheckCircle2 size={16} aria-hidden="true" />
          <span><strong style={{ display: "inline", background: "transparent", color: "inherit", padding: 0, fontWeight: 500, cursor: "default" }}>Your report has been selected</strong></span>
        </div>

        <h1 className="checkout-heading">Billing details</h1>

        <form className="checkout-form" onSubmit={submit} noValidate>
          <div className="checkout-grid">
            <div className="checkout-field">
              <label htmlFor="first-name">First name</label>
              <input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required />
            </div>
            <div className="checkout-field">
              <label htmlFor="last-name">Last name</label>
              <input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" required />
            </div>
            <div className="checkout-field full">
              <label htmlFor="phone">Phone</label>
              <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" required />
            </div>
            <div className="checkout-field full">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </div>
            <div className="checkout-field full">
              <label htmlFor="vin">VIN / Registration / HIN number</label>
              <input id="vin" value={vin} onChange={(e) => setVin(e.target.value.toUpperCase())} autoComplete="off" required />
            </div>
          </div>

          <div className="checkout-checkbox">
            <input id="consent-one" type="checkbox" checked={consentOne} onChange={(e) => setConsentOne(e.target.checked)} required />
            <label htmlFor="consent-one">I confirm that I am making this purchase voluntarily and that INSP AUTO has not pressured or coerced me into purchasing this report. <span className="checkout-required">*</span></label>
          </div>

          <div className="checkout-checkbox">
            <input id="consent-two" type="checkbox" checked={consentTwo} onChange={(e) => setConsentTwo(e.target.checked)} required />
            <label htmlFor="consent-two">I acknowledge that payment for this order is processed by our authorized third-party payment provider, Whop, and that payment processing is subject to the provider's applicable terms. <span className="checkout-required">*</span></label>
          </div>

          <div className="checkout-checkbox">
            <input id="consent-three" type="checkbox" checked={consentThree} onChange={(e) => setConsentThree(e.target.checked)} required />
            <label htmlFor="consent-three">I understand that if I need a refund or have an issue with my order, I should contact INSP AUTO at <a href="mailto:support@inspauto.com">support@inspauto.com</a> and submit my request in accordance with the Refund Policy. <span className="checkout-required">*</span></label>
          </div>

          <h2 className="checkout-order-title">Your order</h2>
          <table className="checkout-order-table">
            <thead><tr><th>Product</th><th>Subtotal</th></tr></thead>
            <tbody>
              <tr><td>{plan.name} × 1</td><td>£{plan.price}</td></tr>
              <tr><td><strong>Subtotal</strong></td><td><strong>£{plan.price}</strong></td></tr>
              <tr className="total-row"><td>Total</td><td>£{plan.price}</td></tr>
            </tbody>
          </table>

          <div className="checkout-payment">
            <div className="checkout-payment-head">Secure payment</div>
            <div className="checkout-payment-body"><LockKeyhole size={15} /> <span>You'll be securely redirected to Whop to complete this one-report purchase.</span></div>
            <div className="checkout-actions">
              <button type="button" className="checkout-back" onClick={() => go("/pricing")}><ArrowLeft size={13} style={{ verticalAlign: "-2px" }} /> Back to report options</button>
              <button className="checkout-submit" type="submit" disabled={!ready || submitting}>{submitting ? "Saving details…" : "Proceed to payment"}</button>
            </div>
          </div>

          {error && <p className="checkout-error" role="alert">{error}</p>}
          <div className="checkout-security-note"><ShieldCheck size={14} /> Your details are collected for order/support purposes before payment is opened.</div>
        </form>
      </div>
    </main>
  );
}
