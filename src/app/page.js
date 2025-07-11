import { SubHeader } from '../components/SubHeader/SubHeader';
import { HeroMain } from '../components/HeroMain/HeroMain';
import { PageCta } from '../components/PageCta/PageCta';

export default function Home() {
  return (
    <>
      <main className="w-full">
        <HeroMain />
        <SubHeader content="Pianist, Teacher, Raconteur, Poncey Lad" />
        <PageCta />
      </main>
    </>
  );
}
