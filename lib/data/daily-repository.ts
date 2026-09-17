// Daily devotional repository.
// Development fixture: seven authored daily entries (Scripture is public-domain
// KJV/WEB text; quote, prayer and reflection are original editorial content).
// Dates are resolved at call time in Africa/Lagos so "today" always exists.
// Production swaps this for Supabase `daily_content`.

import type { DailyContent, ScriptureRef } from '@/lib/data/types';
import type { TranslationSlug } from '@/lib/fixtures/books';

export interface DailyRepository {
  today(): Promise<DailyContent>;
  byDate(date: string): Promise<DailyContent | undefined>;
  recent(days: number): Promise<DailyContent[]>;
}

interface DayTemplate {
  theme: string;
  reference: string;
  scripture: Omit<ScriptureRef, 'translation'>;
  quote: string;
  quoteAuthor?: string;
  prayer: string;
  reflection: string;
}

const TEMPLATES: DayTemplate[] = [
  {
    theme: 'God so loved',
    reference: 'John 3:16',
    scripture: { bookId: 'jhn', chapter: 3, verse: 16 },
    quote: 'Faith does not make things easy; it makes things possible.',
    quoteAuthor: 'Luke 1:37, paraphrased',
    prayer: 'Father, thank You for loving the world so completely that You gave Your Son. Help me believe in a way that changes how I live — and let this love reach someone new through me today. In Jesus’ name, Amen.',
    reflection: 'The love described here is not a feeling but an action, completed before we earned it. Believing is not a mental exercise; it is receiving a gift and living from it. When the world rushes to earn, God invites us to receive. Today, rest in that: you are already loved.',
  },
  {
    theme: 'Light in the word',
    reference: 'Psalm 119:105',
    scripture: { bookId: 'psa', chapter: 119, verse: 105 },
    quote: 'The path is not always clear, but the lamp never goes out.',
    quoteAuthor: 'Psalm 119, reflected',
    prayer: 'Lord, Your word is a lamp for my feet. When the way ahead is unclear, be my light. Order my steps this day, and keep my heart attentive to Your voice. Amen.',
    reflection: 'A lamp is not a floodlight. It shows enough of the path for the next step. We often ask God to reveal the whole journey; He faithfully shows us the step that matters. Trust the next step, not only the destination.',
  },
  {
    theme: 'The Good Shepherd',
    reference: 'John 10:11',
    scripture: { bookId: 'jhn', chapter: 10, verse: 11 },
    quote: 'The shepherd walks ahead because the flock matters more than the shepherd’s comfort.',
    quoteAuthor: 'John 10, reflected',
    prayer: 'Good Shepherd, thank You for laying down Your life rather than leaving the sheep. I trust You to lead me through green pastures and hard valleys alike. Keep me from wandering. In Jesus’ name, Amen.',
    reflection: 'A hired hand flees when danger comes because the sheep are not his own. Jesus calls us His own, and His care does not end at the edge of comfort. Whatever valley we walk through today, we do not walk it alone.',
  },
  {
    theme: 'Strength for today',
    reference: 'Philippians 4:13',
    scripture: { bookId: 'php', chapter: 4, verse: 13 },
    quote: 'Capability is not the opposite of dependence; trust is what makes strength true.',
    prayer: 'Christ, in You I can face today — not in my own strength, but in the strength You supply. Meet me in the ordinary tasks and the weary moments. Fill what is empty in me. Amen.',
    reflection: 'The ability to do all things is not a promise of limitless personal power but of a sufficient companion. Paul wrote this from a prison, learning contentment first. The secret is not that we are strong, but that we are never alone in the doing.',
  },
  {
    theme: 'Come to me',
    reference: 'Matthew 11:28',
    scripture: { bookId: 'mat', chapter: 11, verse: 28 },
    quote: 'Rest is not the absence of work; it is the presence of Christ in the midst of it.',
    prayer: 'Jesus, I bring my burdens — the ones I carry well and the ones I hide. Give me Your rest, and teach me to carry them Your way today. Amen.',
    reflection: 'The invitation is extended not to the strong but to the heavy-laden. Rest, here, begins with coming — with honest nearness rather than honest performance. Before we are useful in the Kingdom, we are welcome in it.',
  },
  {
    theme: 'A living hope',
    reference: '1 Peter 1:3',
    scripture: { bookId: '1pe', chapter: 1, verse: 3 },
    quote: 'Hope is not optimism about circumstances; it is confidence in a living God.',
    prayer: 'Father, thank You for a hope that is alive because You are alive. When my circumstances whisper otherwise, anchor me in the resurrection that has already begun. Amen.',
    reflection: 'Peter writes to people whose world was unstable, yet he begins with praise, not commotion. Their hope was not a strategy but a person. A living hope outlives changing news, because its source does not change.',
  },
  {
    theme: 'Consider the lilies',
    reference: 'Matthew 6:28',
    scripture: { bookId: 'mat', chapter: 6, verse: 28 },
    quote: 'Worry is a poor substitute for wonder.',
    quoteAuthor: 'Matthew 6, reflected',
    prayer: 'Lord, You clothe the lilies of the field and number the sparrows. Forgive my anxious heart, and teach me to seek first Your kingdom, trusting that the rest is in Your hands. Amen.',
    reflection: 'Jesus does not scold the anxious into calm; He redirects their attention. Look at the flowers — your worries are not bigger than God’s care. The antidote to worry is not a bigger bank account but a different treasure.',
  },
];

function lagosDateString(offsetDays: number): string {
  // Africa/Lagos is fixed at UTC+1.
  const now = new Date(Date.now() + offsetDays * 86400000);
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const lagos = new Date(utc + 3600000);
  const y = lagos.getFullYear();
  const m = String(lagos.getMonth() + 1).padStart(2, '0');
  const d = String(lagos.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toContent(t: DayTemplate, date: string, translation: TranslationSlug): DailyContent {
  return {
    id: `daily-${date}`,
    date,
    theme: t.theme,
    reference: t.reference,
    scripture: { ...t.scripture, translation },
    quote: t.quote,
    quoteAuthor: t.quoteAuthor,
    prayer: t.prayer,
    reflection: t.reflection,
    translation,
    status: 'published',
  };
}

export class FixtureDailyRepository implements DailyRepository {
  private translation: TranslationSlug = 'kjv';

  constructor(translation: TranslationSlug = 'kjv') {
    this.translation = translation;
  }

  async today() {
    return this.byDate(lagosDateString(0))!;
  }

  async byDate(date: string) {
    const today = lagosDateString(0);
    const target = new Date(`${date}T12:00:00Z`).getTime();
    const base = new Date(`${today}T12:00:00Z`).getTime();
    const diff = Math.round((target - base) / 86400000);
    const t = TEMPLATES[((diff % TEMPLATES.length) + TEMPLATES.length) % TEMPLATES.length];
    return toContent(t, date, this.translation);
  }

  async recent(days: number) {
    const today = lagosDateString(0);
    const base = new Date(`${today}T12:00:00Z`).getTime();
    const out: DailyContent[] = [];
    for (let i = 0; i < days; i++) {
      const date = lagosDateString(-i);
      out.push((await this.byDate(date))!);
    }
    void base;
    return out;
  }
}

export const dailyRepository: DailyRepository = new FixtureDailyRepository();