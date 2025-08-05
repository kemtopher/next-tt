import { createClient } from "../../../prismicio";
import { asText } from "@prismicio/client";
import { notFound } from "next/navigation";
import { PrismicRichText } from "@prismicio/react";
import { Header } from "../../../components/Header/Header";
import { PageHeader } from "../../../components/PageHeader/PageHeader";
import { GridContainer } from "../../../components/GridContainer/GridContainer";


export default async function JournalEntry({params}) {
    const client = createClient();
    const entry = await client.getByUID('journal_entry', params.uid).catch((err) => notFound());

    return (
        <>
            <Header />
            <main className="w-full pt-40 pb-8 md:pb-12 lg:pb-18">
            <PageHeader title="JOURNAL" />
            <GridContainer classes="py-16 flex flex-col gap-8">
                <div className="entry-container col-span-12 md:col-span-10 lg:col-span-8 col-start-1 md:col-start-2 lg:col-start-3">
                    <h1 className="text-4xl font-bold mb-4 pb-4 border-b">{ asText(entry.data.title) }</h1>
                    <PrismicRichText field={entry.data.post_content} />
                </div>
            </GridContainer>
            </main>
        </>
    )
}

export async function generateStaticParams() {
  const client = createClient();
  const entries = await client.getAllByType("journal_entry");

  return entries.map((entry) => ({
    uid: entry.uid,
  }));
}