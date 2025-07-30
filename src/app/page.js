import { createClient } from '../prismicio';
import HomeContent from '../components/HomeContent/HomeContent';

export default async function Home() {
  const client = createClient();
  const homePage = await client.getSingle('home_page');

  return <HomeContent homePage={homePage} />;
}
