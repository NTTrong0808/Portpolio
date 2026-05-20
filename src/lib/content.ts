import { work, about } from '../../.velite'

export { work, about }

export function getWorkBySlug(slug: string) {
  return work.find((w) => w.slug === slug)
}

export function getPublishedWork() {
  return work
    .filter((w) => w.status !== 'draft')
    .sort((a, b) => a.order - b.order || b.year - a.year)
}
