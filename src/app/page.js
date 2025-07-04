import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { SubHeader } from "./components/SubHeader/SubHeader";
import { HeroMain } from "./components/HeroMain/HeroMain";

export default function Home() {
  return (
    <>
      <Header />
      <SubHeader content="Pianist, Teacher, Raconteur, Poncey Lad"/>
      <main className="w-full pt-8 md:pt-12 lg:pt-18">
        <HeroMain />
      </main>
      <Footer />
    </>    
  );
}
