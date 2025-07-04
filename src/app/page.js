import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { SubHeader } from "./components/SubHeader/SubHeader";

export default function Home() {
  return (
    <>
      <Header />
      <SubHeader content="Pianist, Teacher, Raconteur, Poncey Lad"/>
      <main className="w-full pt-8 md:pt-12 lg:pt-18">

      </main>
      <Footer />
    </>    
  );
}
