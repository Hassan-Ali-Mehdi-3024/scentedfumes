export const metadata = {
  title: "About Us - Scented Fumes",
  description: "Learn about Scented Fumes and our mission to deliver premium perfume renditions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-semibold text-white">About Us</h1>
          <p className="mt-2 text-lg text-slate-400">
            Well-coordinated teamwork speaks about us
          </p>
        </header>

        <div className="space-y-8 rounded-2xl border border-white/5 bg-white/5 p-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">We Love What We Do</h2>
            <p className="text-slate-300">
              Discover the Art of Fragrance with our collection of premium perfumes renditions. 
              Immerse yourself in the aroma of luxury and elevate your style with Scented Fumes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">About Our Online Store</h2>
            <p className="text-slate-300 mb-4">
              One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed 
              in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his 
              head a little he could see his brown belly, slightly domed and divided by arches into stiff.
            </p>
            <p className="text-slate-300">
              Dictumst per ante cras suscipit nascetur ullamcorper in nullam fermentum condimentum 
              torquent iaculis reden posuere potenti viverra condimentum dictumst id tellus suspendisse 
              convallis condimentum.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Our Working Process</h2>
            <p className="text-slate-300">
              She packed her seven versalia, put her initial into the belt and made herself on the way. 
              We work through every aspect at the planning stage to ensure the highest quality products 
              for our customers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-white">Seemingly Elegant Design</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-amber-400">2012</div>
                <div className="text-sm uppercase tracking-wider text-slate-400">Founding Year</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-amber-400">2000+</div>
                <div className="text-sm uppercase tracking-wider text-slate-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-amber-400">750+</div>
                <div className="text-sm uppercase tracking-wider text-slate-400">Projects Completed</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
