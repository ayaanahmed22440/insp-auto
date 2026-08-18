// INSP AUTO — reference-led automotive editorial minimalism; Inspection Amber, Carbon/Midnight Navy, evidence-first copy, quiet motion.
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import VehicleServicePage from "./pages/VehicleServicePage";

const services = [
  ["Car History Report", "/services/car-history-report"],
  ["Motorbike History Report", "/services/motorbike-history-report"],
  ["ATV History Report", "/services/atv-history-report"],
  ["Truck History Report", "/services/truck-history-report"],
  ["Boat History Report", "/services/boat-history-report"],
  ["RV History Report", "/services/rv-history-report"],
];

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Logo() {
  return (
    <button className="brand" onClick={() => navigate("/")} aria-label="Home">
      <img className="brand-logo" src="/assets/insp-auto-logo-clean.png" alt="" />
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/about")}>About Us</button>
          <div className="nav-dropdown">
            <button onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>Services <span className="chevron">⌄</span></button>
            {servicesOpen && <div className="dropdown-panel">{services.map(([label, href]) => <button key={href} onClick={() => { navigate(href); setServicesOpen(false); }}>{label}</button>)}</div>}
          </div>
          <button onClick={() => navigate("/contact")}>Contact Us</button><button onClick={() => navigate("/pricing")}>Pricing</button><div className="nav-dropdown">
            <button onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>Company Policies <span className="chevron">⌄</span></button>
            {servicesOpen && <div className="dropdown-panel policy-dropdown"><button onClick={() => navigate("/terms")}>Terms & Conditions</button><button onClick={() => navigate("/refund-policy")}>Refund Policy</button><button onClick={() => navigate("/privacy-policy")}>Privacy Policy</button></div>}
          </div>
        </nav>
        <div className="header-actions"><a className="email-link" href="mailto:support@inspauto.com">support@inspauto.com</a><button className="button button-small" onClick={() => navigate("/pricing")}>Get a Report <span>↗</span></button></div>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <button onClick={() => { navigate("/"); setOpen(false); }}>Home</button><button onClick={() => { navigate("/about"); setOpen(false); }}>About Us</button>
        <button className="mobile-service-toggle" onClick={() => setServicesOpen(!servicesOpen)}>Services <span>{servicesOpen ? "−" : "+"}</span></button>
        {servicesOpen && <div className="mobile-service-list">{services.map(([label, href]) => <button key={href} onClick={() => { navigate(href); setOpen(false); }}>{label}</button>)}</div>}
        <button onClick={() => { navigate("/contact"); setOpen(false); }}>Contact Us</button><button onClick={() => { navigate("/pricing"); setOpen(false); }}>Pricing</button><button onClick={() => { navigate("/terms"); setOpen(false); }}>Company Policies</button>
        <a className="button" href="mailto:support@inspauto.com">Email support</a>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><div className="footer-main"><div className="footer-brand"><Logo /><p>Vehicle history reports designed to help UK buyers make informed decisions.</p><a href="mailto:support@inspauto.com">support@inspauto.com</a></div><div><h3>Company</h3><button onClick={() => navigate("/about")}>About Us</button><button onClick={() => navigate("/services")}>Services</button><button onClick={() => navigate("/contact")}>Contact Us</button></div><div><h3>Services</h3>{services.slice(0, 3).map(([label, href]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}</div><div><h3>Policies</h3><button onClick={() => navigate("/terms")}>Terms & Conditions</button><button onClick={() => navigate("/refund-policy")}>Refund Policy</button><button onClick={() => navigate("/privacy-policy")}>Privacy Policy</button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} All rights reserved.</span><span>Built for clearer vehicle decisions.</span></div></footer>;
}

function PolicyPage({ kind }: { kind: "terms" | "refund-policy" | "privacy-policy" }) {
  const content = {
    terms: { title: "Terms & Conditions", intro: "These general website terms describe how INSP AUTO presents and fulfils vehicle history reports. They should be reviewed by a qualified UK legal professional before being relied upon as final legal terms.", sections: [["Service description", "INSP AUTO provides vehicle history report products for buyers and other customers who want supporting information before a vehicle purchase."], ["Report information", "A selected report may include vehicle specifications, title information, recalls, accident information, ownership indicators, finance or lien information, and other available records. Coverage depends on the selected product and the data available to the report provider."], ["Accuracy and third-party data", "Reports may use information supplied by third-party sources. We do not promise that every record is complete, current, or error-free, and a report is not a substitute for an independent inspection or professional advice."], ["Customer responsibilities", "Customers are responsible for entering a correct VIN or registration and for checking that the returned vehicle details correspond to the vehicle they are considering."], ["Payment and delivery", "Payment is completed through the checkout provider shown on the website. Report processing and delivery follow the fulfilment process applicable to the selected product; no instant delivery promise is made unless stated for that product."], ["Liability and governing law", "To the extent permitted by law, INSP AUTO is not responsible for decisions made solely from a report. These terms are intended for a UK service and are subject to applicable law in England and Wales."]]},
    "refund-policy": { title: "Refund Policy", intro: "This policy explains the circumstances in which a customer may contact INSP AUTO about a payment or report order. It is general website information and should be reviewed professionally before final publication.", sections: [["Payment and processing", "Payments are handled by the selected checkout provider. An order enters processing after payment confirmation is received by the fulfilment process."], ["Incorrect vehicle details", "Please check the VIN or registration before checkout. A report may not be refundable where the customer supplied incorrect or incomplete vehicle details, subject to applicable consumer rights."], ["Failed fulfilment", "If INSP AUTO cannot fulfil a paid report, contact support@inspauto.com with the order details so the issue can be reviewed and an appropriate remedy considered."], ["Duplicate purchases", "If the same product was purchased more than once by mistake, contact support promptly. Duplicate order requests are assessed using the available payment and fulfilment records."], ["Contacting support", "Refund questions should include the order number, email used at checkout, and a brief description of the issue. Any approved refund is returned through the original payment route where possible."]]},
    "privacy-policy": { title: "Privacy Policy", intro: "This GDPR-conscious outline explains the information INSP AUTO may process when you use the website. A qualified UK privacy professional should review it before it is adopted as the final policy.", sections: [["Information collected", "We may receive your name, email address, VIN or registration, order details, support correspondence, and information needed to investigate a report request."], ["Payments and third parties", "Payment information is handled by the checkout provider. INSP AUTO does not ask customers to send full card details by email. Third-party providers may process information under their own privacy notices."], ["Cookies and analytics", "The website may use essential cookies or similar technologies for basic operation. Any analytics should be configured transparently and limited to the purposes described at the point of collection."], ["Retention and security", "Information is retained only for as long as reasonably needed for fulfilment, support, legal, accounting, or fraud-prevention purposes, with appropriate organisational and technical safeguards."], ["Your rights", "Subject to applicable law, you may ask about access, correction, deletion, restriction, portability, or objection. Contact support@inspauto.com for an initial request."]]},
  }[kind];
  return <main className="policy-page"><div className="container narrow"><span className="eyebrow">INSP AUTO / POLICY</span><h1>{content.title}</h1><p className="policy-intro">{content.intro}</p><div className="policy-sections">{content.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</div><button className="button" onClick={() => navigate("/contact")}>Questions about this page <span>↗</span></button></div></main>;
}

function ServicePage({ label }: { label: string }) { return <main className="detail-page"><div className="container narrow"><span className="eyebrow">INSP AUTO / SERVICE</span><h1>{label}</h1><p className="lead">Useful vehicle information for the decision in front of you.</p><p>Choose the report that matches the vehicle you are considering. Information available in your selected report may include vehicle specifications, title information, safety recalls, accident information, ownership indicators, finance or lien information, and other available records.</p><div className="detail-callout"><span className="stamp">INSP</span><div><strong>Keep the evidence close.</strong><p>Reports are designed to be clear, practical, and easy to discuss with a seller or support team.</p></div></div><button className="button" onClick={() => navigate("/pricing")}>View report options <span>↗</span></button></div></main>; }

function PricingPage() { return <main className="detail-page pricing-detail"><div className="container narrow"><span className="eyebrow">INSP AUTO / REPORT OPTIONS</span><h1>Compare the detail before you <em>commit.</em></h1><p className="lead">Three clear report levels for UK buyers who want more context around the vehicle in front of them.</p><div className="detail-callout"><span className="stamp">£</span><div><strong>Choose the depth that matches the decision.</strong><p>Checkout is handled by the selected payment provider. We do not imitate payment or report delivery on this page.</p></div></div><button className="button" onClick={() => { window.history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); setTimeout(() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }), 10); }}>View pricing cards <span>↗</span></button></div></main>; }

function SimplePage({ path }: { path: string }) { if (path === "/about") return <main className="detail-page"><div className="container narrow"><span className="eyebrow">INSP AUTO / ABOUT</span><h1>Read the evidence before you <em>commit.</em></h1><p className="lead">We help UK vehicle buyers look beyond the sales pitch.</p><p>INSP AUTO presents vehicle history information in a format that is easier to understand before you buy. Our service is built around clear reporting, careful language, and practical customer support—not inflated promises.</p><div className="detail-grid"><div><strong>01</strong><span>Buyer-first reporting</span></div><div><strong>02</strong><span>Plain-language evidence</span></div><div><strong>03</strong><span>Support when you need it</span></div></div><button className="button" onClick={() => navigate("/services")}>Explore services <span>↗</span></button></div></main>; if (path === "/contact") return <main className="detail-page"><div className="container narrow"><span className="eyebrow">INSP AUTO / SUPPORT DESK</span><h1>Keep the next step <em>clear.</em></h1><p className="lead">Email support@inspauto.com with your question, VIN or registration, and order number if relevant.</p><form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks — this frontend form is ready for backend connection, but it does not send email yet."); }}><label>Name<input required name="name" /></label><label>Email<input required type="email" name="email" /></label><label>VIN / Registration<input name="vehicle" /></label><label>Order Number<input name="order" /></label><label>Subject<input required name="subject" /></label><label>Message<textarea required name="message" rows={6} /></label><button className="button" type="submit">Send Message <span>↗</span></button></form></div></main>; return <NotFound />; }

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const update = () => setPath(window.location.pathname); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  let page: ReactNode;
  if (path === "/") page = <Home initialSection="home" />;
  else if (path === "/pricing") page = <Pricing />;
  else if (path === "/services") page = <Home initialSection="services" />;
  else if (["/terms", "/refund-policy", "/privacy-policy"].includes(path)) page = <PolicyPage kind={path.slice(1) as "terms" | "refund-policy" | "privacy-policy"} />;
  else if (path.startsWith("/services/")) page = <VehicleServicePage label={services.find(([, href]) => href === path)?.[0] || "Vehicle History Report"} />;
  else page = <SimplePage path={path} />;
  return <TooltipProvider><Toaster /><Header />{page}<Footer /></TooltipProvider>;
}
