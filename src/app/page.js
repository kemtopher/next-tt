import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHeader } from "./components/PageHeader/PageHeader";

export default function Home() {
  return (
    <>
      <Header />
      <PageHeader title="Journal" />
      <main className="w-full pt-8 md:pt-12 lg:pt-18">

      </main>
      <Footer />
    </>    
  );
}
