import { createClient } from '../prismicio';
// import HomeContent from '../components/HomeContent/HomeContent';
import Countdown from '../components/Countdown/Countdown';
import {TwinklingStars} from '../components/TwinklingStars/TwinklingStars';

export default async function Home() {
  const client = createClient();
  const homePage = await client.getSingle('home_page');

  // return <HomeContent homePage={homePage} />;
  return (
    <>
      <TwinklingStars className="z-99" />
      <Countdown />
    </>
  )
}
