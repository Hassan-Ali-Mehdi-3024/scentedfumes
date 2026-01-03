"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { processCheckout } from "@/lib/graphql/checkout";
import { CheckoutInput } from "@/types/checkout";
import { cn } from "@/lib/utils";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
    country: "PK", // Defaulting to Pakistan as per currency hint (Rs)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const input: CheckoutInput = {
        clientMutationId: crypto.randomUUID(),
        billing: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address1,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
        },
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address1,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
        },
        shipToDifferentAddress: false,
        paymentMethod: "cod", // Hardcoded for now
        isPaid: false,
        lineItems: items.map((item) => ({
          productId: item.databaseId,
          quantity: item.quantity,
        })),
      };

      const result = await processCheckout(input);

      if (result?.result === "success") {
        clearCart();
        // Redirect to order received page
        router.push("/order-received");
      } else {
        setError("Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-slate-400">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-slate-300">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-slate-300">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-slate-300">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address1" className="text-sm font-medium text-slate-300">
          Address
        </label>
        <input
          type="text"
          id="address1"
          name="address1"
          required
          value={formData.address1}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="city" className="text-sm font-medium text-slate-300">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="postcode" className="text-sm font-medium text-slate-300">
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            required
            value={formData.postcode}
            onChange={handleChange}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="text-sm font-medium text-slate-300">
          Country
        </label>
        <select
          id="country"
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-amber-400 focus:outline-none"
        >
          <option value="PK">Pakistan</option>
          {/* Add more countries if needed */}
        </select>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <h3 className="mb-4 font-medium text-white">Payment Method</h3>
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked
            readOnly
            className="h-4 w-4 border-slate-300 text-amber-400 focus:ring-amber-400"
          />
          <label htmlFor="cod" className="text-sm text-slate-300">
            Cash on Delivery
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-white py-4 text-sm font-medium uppercase tracking-widest text-black transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </button>
    </form>
  );
}
