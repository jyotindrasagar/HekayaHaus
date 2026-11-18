// HekayaHaus Journal. Opinion pieces only — no statistics or client claims unless sourced.
import type { MediaName } from './media.generated';

export const JOURNAL_CATEGORIES = ['Strategy', 'Marketing', 'Production', 'Branding', 'Technology & AI', 'AI Search'] as const;

export interface Article {
  slug: string;
  category: (typeof JOURNAL_CATEGORIES)[number];
  title: string;
  description: string;
  date: string; // ISO
  readTime: string;
  image: MediaName;
  featured?: boolean;
  /** Paragraphs; a string starting with "## " renders as a sub-heading. */
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'marketing-that-makes-sense',
    category: 'Strategy',
    featured: true,
    title: 'Your business doesn’t need more marketing. It needs marketing that makes sense.',
    description:
      'More content. More platforms. More advertising. More noise. A perspective on building marketing around business objectives, not just activity.',
    date: '2026-11-18',
    readTime: '5 min read',
    image: 'design-grid',
    body: [
      'More content. More platforms. More advertising. More noise.',
      'When growth slows, the instinct is almost always to add something. Another platform. Another campaign. Another agency. Another calendar full of posts. Activity feels like progress — and it is easy to measure.',
      'But before adding another activity to your marketing calendar, it is worth taking a step back and asking a better question: is any of it moving your business forward?',
      '## Activity is not the same as direction',
      'A busy marketing calendar can hide a simple problem: nobody agreed on what the marketing is supposed to achieve. Without that, every post, shoot and ad is judged on whether it looks good, not on whether it did anything for the business.',
      'Start with the business objective. More qualified enquiries? Higher average order value? A stronger position against a specific competitor? A new market? Each of these asks for different work, different channels and a different way of measuring success.',
      '## Fewer things, done properly',
      'Most brands do not need to be everywhere. They need to be clear, consistent and present in the places where their customers actually make decisions. Doing three things properly will almost always beat doing ten things halfway.',
      'That means choosing channels on purpose, giving each one a role, and connecting them — so the content that earns attention, the campaign that turns it into interest and the website that converts it all tell the same story.',
      '## Make the brand do some of the work',
      'Marketing gets more expensive when people do not know why they should care. A clear brand — what you stand for, how you sound, what you are known for — makes every message easier to understand and every campaign easier to remember.',
      '## Measure what matters, then improve',
      'Decide in advance what success looks like and review it honestly. Keep what works, cut what does not, and use what you learn to shape what comes next. That is not a one-off exercise; it is how marketing stays useful as your business changes.',
      'Your business does not need more noise. It needs marketing that makes sense — marketing built around where you want the business to go.',
    ],
  },
];
