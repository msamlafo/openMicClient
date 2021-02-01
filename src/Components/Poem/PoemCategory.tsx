export const categories = [
  { name: 'Blank verse' },
  { name: 'Rhymed poetry' },
  { name: 'Free verse' },
  { name: 'Epics' },
  { name: 'Narrative poetry' },
  { name: 'Haiku' },
  { name: 'Pastoral poetry' },
  { name: 'Sonnet' },
  { name: 'Elegies' },
  { name: 'Ode' },
  { name: 'Limerick' },
  { name: 'Lyric poetry' },
  { name: 'Ballad' },
  { name: 'Soliloquy' },
  { name: 'Villanelle' },
];

export function getCategories() {
  return categories.filter((c) => c);
}
