export const metadata = {
  title: "Privacy Policy - Scented Fumes",
  description: "Read our privacy policy to understand how we collect and use your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full flex-1 bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto w-full space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">Privacy Policy</h1>
          <p className="mt-2 text-sm text-slate-400">Last updated: January 2026</p>
        </header>

        <div className="space-y-6 rounded-2xl border border-white/5 bg-white/5 p-8 text-slate-300">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, place an order, 
              or contact our customer service. This may include your name, email address, phone number, 
              shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Process and fulfill your orders</li>
              <li>Send you order confirmations and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our products and services</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our service, provide 
              the service on our behalf, or perform service-related tasks. These third parties have 
              access to your personal information only to perform these tasks on our behalf.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. 
              To exercise these rights, please contact us via WhatsApp or email.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
