import type { Metadata } from 'next';
import { getBookTitle } from '@/lib/fixtures/books';
import ChapterClient from './client';

type Props = { params: { book: string; chapter: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = getBookTitle(params.book);
  const chapter = params.chapter;
  const fullTitle = `${title} ${chapter}`;
  const description = `Read ${title} chapter ${chapter} in the King James Version (KJV) on DOLBIC Bible. Reflect, bookmark, and pray offline.`;
  const url = `/bible/${params.book}/${chapter}`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'article',
      images: [{ url: '/icons/icon-512.png', width: 512, height: 512, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/icons/icon-512.png'],
    },
  };
}

export default function Page({ params }: Props) {
  return <ChapterClient book={params.book} chapter={params.chapter} />;
}
