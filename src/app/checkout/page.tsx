import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout - Scented Fumes",
  description: "Complete your purchase.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">Checkout</h1>
          <p className="mt-2 text-slate-400">Complete your order details below.</p>
        </header>

        <div className="rounded-2xl border border-white/5 bg-white/5 p-6 sm:p-10">
          <CheckoutForm />
        </div>
      </div>
    </main>
  );
}
