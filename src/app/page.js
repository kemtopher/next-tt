import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { GridContainer } from "./components/GridContainer/GridContainer";
import { PageHeader } from "./components/PageHeader/PageHeader";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full">
        <PageHeader title="Journal" />
      </main>
      <Footer />
    </>    
  );
}
