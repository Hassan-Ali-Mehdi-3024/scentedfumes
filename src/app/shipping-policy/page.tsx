export const metadata = {
  title: "Shipping Policy - Scented Fumes",
  description: "Learn about our shipping rates and delivery times.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="w-full flex-1 bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto w-full space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">Shipping Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: January 2026</p>
        </header>

        <div className="space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 text-slate-300">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Shipping Coverage</h2>
            <p>
              We currently ship to all major cities and towns across Pakistan. If you are unsure whether 
              we deliver to your area, please contact us via WhatsApp before placing your order.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Processing Time</h2>
            <p>
              Orders are processed within 1-2 business days (Monday to Friday, excluding public holidays). 
              You will receive a confirmation call from our team to verify your order and delivery details.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Delivery Time</h2>
            <p className="mb-2">Estimated delivery times vary by location:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Major cities (Karachi, Lahore, Islamabad): 2-4 business days</li>
              <li>Other cities: 3-6 business days</li>
              <li>Remote areas: 5-8 business days</li>
            </ul>
            <p className="mt-2">
              Please note that these are estimates and actual delivery times may vary due to factors 
              beyond our control.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Shipping Charges</h2>
            <p className="mb-2">
              Shipping charges are calculated based on your location and order value:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Orders above Rs 3,000: Free shipping</li>
              <li>Orders below Rs 3,000: Rs 200 shipping fee</li>
            </ul>
            <p className="mt-2">
              Shipping charges will be displayed during checkout before you confirm your order.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Order Tracking</h2>
            <p>
              Once your order is shipped, you will receive tracking information via WhatsApp or SMS. 
              You can use this to track your package's journey to your doorstep.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Cash on Delivery (COD)</h2>
            <p>
              We accept Cash on Delivery for all orders. Payment must be made in cash to the delivery 
              person at the time of delivery. Please ensure you have the exact amount ready to avoid delays.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Missed Deliveries</h2>
            <p>
              If you miss a delivery attempt, the courier will try to contact you to arrange redelivery. 
              If the package cannot be delivered after 2 attempts, it will be returned to us, and you 
              may be charged a return shipping fee.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Damaged Packages</h2>
            <p>
              Please inspect your package upon delivery. If you notice any damage, please refuse the 
              delivery and contact us immediately. We will arrange for a replacement at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Us</h2>
            <p>
              For any questions regarding shipping, please contact us at{" "}
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
