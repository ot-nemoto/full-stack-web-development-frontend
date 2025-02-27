import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductInventory from '@/components/ProductInventory';

interface PageParams {
  id: string;
}

interface PageProps {
  params: PageParams | Promise<PageParams>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProductInventory id={Number(id)} />
      <Footer />
    </div>
  );
}
