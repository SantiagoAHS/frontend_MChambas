import OrdersDetails from "@/components/myorders/ordersdetails";

// app/my orders/page.tsx
export default function MyordersPage() {
  return (
    <section className="max-w-3xl mx-auto">
        <div className="text-gray-700 mt-4">
          <OrdersDetails />
        </div>
    </section>
  );
}