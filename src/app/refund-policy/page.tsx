export const metadata = {
  title: "Refund Policy - Scented Fumes",
  description: "Read our refund and return policy.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">Refund Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: January 2026</p>
        </header>

        <div className="space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 text-slate-300">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Return Eligibility</h2>
            <p className="mb-2">
              To be eligible for a return, your item must meet the following conditions:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Item must be unused and in its original packaging</li>
              <li>Return request must be made within 7 days of delivery</li>
              <li>Product seal must be intact and unbroken</li>
              <li>Original invoice or proof of purchase must be provided</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Non-Returnable Items</h2>
            <p className="mb-2">The following items cannot be returned:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Opened or used perfume bottles</li>
              <li>Products without original packaging</li>
              <li>Sale or clearance items marked as final sale</li>
              <li>Tester products (unless defective)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Return Process</h2>
            <p className="mb-2">To initiate a return:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>Contact us via WhatsApp at +92 332 1300655 within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Wait for our team to approve your return request</li>
              <li>Ship the item back to our designated address</li>
              <li>Include the original invoice in the return package</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Refunds</h2>
            <p className="mb-2">
              Once we receive and inspect your returned item, we will process your refund within 5-7 
              business days. Refunds will be issued via:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Bank transfer to your provided account</li>
              <li>Store credit (if preferred)</li>
            </ul>
            <p className="mt-2">
              Please note that return shipping costs are the responsibility of the customer unless the 
              return is due to our error or a defective product.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Exchanges</h2>
            <p>
              We currently do not offer direct exchanges. If you wish to exchange a product, please 
              return the original item for a refund and place a new order for the desired product.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Damaged or Defective Products</h2>
            <p>
              If you receive a damaged or defective product, please contact us immediately with photos 
              of the damage. We will arrange for a replacement or full refund at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Us</h2>
            <p>
              For any questions regarding returns or refunds, please contact us at{" "}
              <a
                href="https://wa.me/923321300655"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:underline"
              >
                +92 332 1300655
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
