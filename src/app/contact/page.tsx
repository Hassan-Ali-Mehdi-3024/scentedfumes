export const metadata = {
  title: "Contact Us - Scented Fumes",
  description: "Get in touch with Scented Fumes for any questions or inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
          <p className="mt-2 text-lg text-slate-400">
            We'd love to hear from you
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm text-slate-300">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm text-slate-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm text-slate-300">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm text-slate-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-slate-200"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Contact Information</h2>
              <div className="space-y-4 text-slate-300">
                <div>
                  <h3 className="font-medium text-white">WhatsApp</h3>
                  <a
                    href="https://wa.me/923321300655"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline"
                  >
                    +92 332 1300655
                  </a>
                </div>
                <div>
                  <h3 className="font-medium text-white">Social Media</h3>
                  <div className="mt-2 flex gap-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61558871727344"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition hover:text-white"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.instagram.com/scentedfumes.official"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition hover:text-white"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.tiktok.com/@scented.fumes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 transition hover:text-white"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/5 p-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Frequently Asked Questions</h2>
              <div className="space-y-4 text-sm">
                <details className="group">
                  <summary className="cursor-pointer font-medium text-white">
                    Will I receive the same product that I see in the picture?
                  </summary>
                  <p className="mt-2 text-slate-300">
                    Yes, we ensure that the product you receive matches the images shown on our website.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer font-medium text-white">
                    How can I return an item?
                  </summary>
                  <p className="mt-2 text-slate-300">
                    Please refer to our Refund Policy page for detailed information about returns.
                  </p>
                </details>
                <details className="group">
                  <summary className="cursor-pointer font-medium text-white">
                    Where can I ship my order?
                  </summary>
                  <p className="mt-2 text-slate-300">
                    We currently ship across Pakistan. Please check our Shipping Policy for more details.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
