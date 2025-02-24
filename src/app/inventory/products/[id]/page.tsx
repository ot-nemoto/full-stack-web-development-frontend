import Footer from '@/components/Footer';
import Header from '@/components/Header';
import InventoryHistory from '@/components/InventoryHistory';

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
      <InventoryHistory id={Number(id)} />
      <Footer />
    </div>
  );
}
