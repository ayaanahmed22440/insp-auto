function goTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Terms() {
  return (
    <main className="policy-page">
      <div className="container narrow">
        <span className="eyebrow">INSP AUTO / POLICY</span>
        <h1>Terms & Conditions</h1>
        <p className="policy-intro">
          These terms explain how INSP AUTO provides vehicle history reports and how customers may use our website and services.
        </p>
        <div className="policy-sections">
          <section><h2>Service description</h2><p>INSP AUTO provides vehicle history report products for customers who want supporting information before making a vehicle purchase.</p></section>
          <section><h2>Report information</h2><p>Reports may contain vehicle specifications, title information, recalls, accident information, ownership indicators, finance or lien information, and other records available from the relevant data providers.</p></section>
          <section><h2>Accuracy and third-party data</h2><p>Information may come from third-party sources. We cannot guarantee that every available record is complete, current, or error-free. A report is not a substitute for an independent vehicle inspection or professional advice.</p></section>
          <section><h2>Customer responsibilities</h2><p>Customers are responsible for entering the correct VIN or vehicle details and checking that the returned report relates to the vehicle they are considering.</p></section>
          <section><h2>Payment and delivery</h2><p>Payment is completed through the checkout provider displayed on the website. Report processing and delivery follow the fulfilment process applicable to the selected product.</p></section>
          <section><h2>Liability and governing law</h2><p>To the extent permitted by law, INSP AUTO is not responsible for decisions made solely on the basis of a vehicle history report. These terms are intended for a UK service and are subject to applicable law in England and Wales.</p></section>
        </div>
        <button className="button" onClick={() => goTo("/contact")}>Questions about this page <span>↗</span></button>
      </div>
    </main>
  );
}
