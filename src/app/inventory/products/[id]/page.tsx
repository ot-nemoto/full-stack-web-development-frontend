import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InventoryHistory from '@/components/InventoryHistory';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <InventoryHistory />
      <Footer />
    </div>
  );
}
