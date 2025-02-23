import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProductList />
      <Footer />
    </div>
  );
}
