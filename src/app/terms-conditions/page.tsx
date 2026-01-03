export const metadata = {
  title: "Terms & Conditions - Scented Fumes",
  description: "Read our terms and conditions for using our services.",
};

export default function TermsConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: January 2026</p>
        </header>

        <div className="space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 text-slate-300">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Agreement to Terms</h2>
            <p>
              By accessing or using Scented Fumes, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Products and Services</h2>
            <p>
              All products sold on Scented Fumes are perfume renditions inspired by popular fragrances. 
              We strive to display colors and images as accurately as possible, but we cannot guarantee 
              that your device's display will accurately reflect the product color.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Pricing</h2>
            <p>
              All prices are listed in Pakistani Rupees (Rs) and are subject to change without notice. 
              We reserve the right to modify or discontinue products at any time without prior notification.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Orders and Payment</h2>
            <p className="mb-2">
              We currently accept Cash on Delivery (COD) as our primary payment method. When you place 
              an order:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>You will receive a confirmation call from our team</li>
              <li>Payment is collected upon delivery</li>
              <li>You must be available to receive and inspect the package</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Shipping</h2>
            <p>
              We ship across Pakistan. Delivery times may vary based on your location. Please refer to 
              our Shipping Policy for detailed information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Returns and Refunds</h2>
            <p>
              Please review our Refund Policy for information about returns, exchanges, and refunds.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property 
              of Scented Fumes and is protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Limitation of Liability</h2>
            <p>
              Scented Fumes shall not be liable for any indirect, incidental, special, or consequential 
              damages resulting from the use or inability to use our products or services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Information</h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us at{" "}
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
