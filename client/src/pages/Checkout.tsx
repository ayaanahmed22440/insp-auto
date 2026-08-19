import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Minus, Plus, Trash2 } from "lucide-react";
import { cartSubtotal, checkoutReady, formatPounds, loadCart, removeCartItem, saveCart, setCartItemQuantity, type CartItem } from "@/lib/cart";
import { createCheckoutAttemptKey, readSavedCheckoutDetails, writeSavedCheckoutDetails } from "@/lib/checkoutDetails";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Checkout() {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [acknowledgements, setAcknowledgements] = useState([false, false, false]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const checkoutAttemptKey = useRef<string>(createCheckoutAttemptKey());

  useEffect(() => saveCart(items), [items]);
  useEffect(() => {
    const details = readSavedCheckoutDetails();
    if (!details) return;
    setFirstName(details.firstName);
    setLastName(details.lastName);
    setPhone(details.phone);
    setEmail(details.email);
    setSaveDetails(true);
  }, []);
  useEffect(() => {
    if (saveDetails) writeSavedCheckoutDetails({ firstName, lastName, phone, email });
  }, [saveDetails, firstName, lastName, phone, email]);
  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const readyForPayment = checkoutReady({ firstName, lastName, phone, email, registration, acknowledgements });

  function updateQuantity(id: string, quantity: number) {
    setItems(current => setCartItemQuantity(current, id, quantity));
  }

  async function handoff() {
    if (!readyForPayment || !items.length || isSubmitting) return;
    setIsSubmitting(true);
    setPaymentError("");
    try {
      const response = await fetch("/api/checkout/combined", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": checkoutAttemptKey.current,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          registration,
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.ok || !payload.data?.checkoutUrl) {
        throw new Error(payload?.message || "We could not start checkout. Please try again.");
      }
      window.location.assign(payload.data.checkoutUrl);
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "We could not start checkout. Please try again.");
      // A failed idempotency attempt must receive a fresh key so the next click can retry.
      checkoutAttemptKey.current = createCheckoutAttemptKey();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="checkout-page">
      <div className="container checkout-container">
        <div className="checkout-added" role="status">
          <span className="checkout-check"><Check size={13} /></span>
          <button className="checkout-view-cart" onClick={() => document.getElementById("checkout-order")?.scrollIntoView({ behavior: "smooth" })}>View cart</button>
          <span>{items.length ? `Your selection includes ${items.length} report${items.length === 1 ? "" : "s"}.` : "Your cart is ready for a report."}</span>
        </div>

        <section className="checkout-section">
          <span className="eyebrow">INSP AUTO / CHECKOUT REVIEW</span>
          <h1>Billing details</h1>
          <p className="checkout-intro">Review your selected reports, provide the delivery details, and continue to the secure payment provider.</p>
          <div className="checkout-form-grid">
            <label>First name <b>*</b><input required value={firstName} onChange={event => setFirstName(event.target.value)} autoComplete="given-name" /></label>
            <label>Last name <b>*</b><input required value={lastName} onChange={event => setLastName(event.target.value)} autoComplete="family-name" /></label>
            <label className="checkout-full">Phone <b>*</b><input required value={phone} onChange={event => setPhone(event.target.value)} autoComplete="tel" /></label>
            <label className="checkout-full">Email address <b>*</b><input required type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" /></label>
            <label className="checkout-full">Reg/VIN number <b>*</b><input required value={registration} onChange={event => setRegistration(event.target.value)} autoComplete="off" /></label>
          </div>
          <div className="checkout-consents">
            <label className="checkout-consent checkout-save-details"><input type="checkbox" checked={saveDetails} onChange={event => setSaveDetails(event.target.checked)} /><span>Remember my contact details on this device for faster checkout next time. Card and billing-address details are entered and stored only by Whop. <b>(optional)</b></span></label>
            {[
              "We do not exert any pressure on visitors to purchase the product; all purchasing decisions are made voluntarily.",
              "I acknowledge that all payments are handled by our third-party payment provider, Whop, and agree to request refunds via email instead of initiating a chargeback under any circumstances.",
              "Payments on this website are processed by our authorized third-party payment provider, Whop. All payment transactions are subject to the provider's terms and policies.",
            ].map((text, index) => <label key={text} className="checkout-consent"><input type="checkbox" checked={acknowledgements[index]} onChange={event => setAcknowledgements(current => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} /><span>{text} <b>*</b></span></label>)}
          </div>
        </section>

        <section id="checkout-order" className="checkout-order-section">
          <div className="checkout-section-heading"><span className="eyebrow">INSP AUTO / YOUR ORDER</span><h2>Your order</h2></div>
          {items.length === 0 ? <div className="checkout-empty"><p>Your cart is empty. Choose a report to add it here before payment.</p><button className="button" onClick={() => navigate("/pricing")}>Choose a report <span>↗</span></button></div> : <>
            <div className="checkout-order-table" role="table" aria-label="Selected reports">
              <div className="checkout-order-row checkout-order-head" role="row"><span>Product</span><span>Subtotal</span></div>
              {items.map(item => <div className="checkout-order-row" role="row" key={item.id}><div className="checkout-product"><strong>{item.name}</strong><div className="checkout-quantity"><button aria-label={`Decrease ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name}`} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13} /></button><button className="checkout-remove" aria-label={`Remove ${item.name}`} onClick={() => setItems(current => removeCartItem(current, item.id))}><Trash2 size={14} /></button></div></div><strong>{formatPounds(item.price * item.quantity)}</strong></div>)}
              <div className="checkout-order-row"><span>Subtotal</span><strong>{formatPounds(subtotal)}</strong></div>
              <div className="checkout-order-row checkout-total"><span>Total</span><strong>{formatPounds(subtotal)}</strong></div>
            </div>
            <div className="checkout-payment-box"><span>Secure payment</span><p>Payment details are entered only on the selected third-party checkout page. INSP AUTO does not collect card numbers on this website.</p>{paymentError && <p role="alert" className="checkout-payment-error">{paymentError}</p>}<div className="checkout-payment-actions"><button className="button checkout-pay-button" disabled={!readyForPayment || isSubmitting} onClick={handoff}>{isSubmitting ? "Preparing checkout…" : `Pay ${formatPounds(subtotal)} once`} <span>↗</span></button></div></div>
          </>}
        </section>
      </div>
    </main>
  );
}
