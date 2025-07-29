import { createClient } from '../prismicio';
import { SubHeader } from '../components/SubHeader/SubHeader';
import { HeroMain } from '../components/HeroMain/HeroMain';
import { PageCta } from '../components/PageCta/PageCta';

export default async function Home() {
  const client = createClient();
  const homePage = await client.getSingle('home_page');

  return (
    <>
      <main className="w-full">
        <HeroMain header={ homePage.data.hero_header } subheader={homePage.data.hero_sub_header } />
        <SubHeader content={ homePage.data.divider_header } />
        <PageCta title={ homePage.data.page_links_header } content={ homePage.data.page_links_content } />
      </main>
    </>
  );
}
