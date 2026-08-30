import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { notes } from '@/lib/notes'
import { CONTENT_UPDATED, PROJECTS_UPDATED, SITE_URL } from '@/lib/site'

// Real last-modified dates, not build time: a sitemap that claims every page
// changed on every deploy tells crawlers nothing about what actually changed.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestNoteDate = notes
    .map((note) => note.date)
    .sort()
    .at(-1) ?? CONTENT_UPDATED

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(CONTENT_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(CONTENT_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/notes`,
      lastModified: new Date(latestNoteDate),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/${project.id}`,
    lastModified: new Date(PROJECTS_UPDATED),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const notePages = notes.map((note) => ({
    url: `${SITE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...notePages]
}
