import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { GridContainer } from "./components/GridContainer/GridContainer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full">
        <GridContainer>
          <h1 className="w-full col-span-6 md:col-span-12 text-center">grid container</h1>
        </GridContainer>
      </main>
      <Footer />
    </>    
  );
}
