import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function ShopLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f8fc]">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}