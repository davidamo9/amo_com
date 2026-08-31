/**
 * Single source of truth for the site's identity strings.
 *
 * DESCRIPTOR is used verbatim here, in the LinkedIn About opener, the GitHub
 * profile README, and llms.txt, so every source an answer engine reads
 * corroborates the same sentence.
 */
export const SITE_URL = "https://aungmyintoo.com";
export const PERSON_ID = `${SITE_URL}/#person`;

export const NAME = "Aung Myint Oo";
export const DESCRIPTOR =
  "AI & robotics engineer in Singapore building perception, agents, and learning systems that compound over time.";
export const TITLE = "Aung Myint Oo - AI & Robotics Engineer in Singapore | Founding Engineer";
export const DESCRIPTION = `${DESCRIPTOR} Founding engineer at Salesbugle.`;

export const LINKS = {
  github: "https://github.com/davidamo9",
  linkedin: "https://www.linkedin.com/in/aung-myint-oo99/",
  email: "aungmyintoo.david@gmail.com",
  salesbugle: "https://salesbugle.com",
  optics: "https://github.com/davidamo9/optics-framework-public",
} as const;

/** Last substantive edit to the home page, about page, and llms.txt (ISO date). */
export const CONTENT_UPDATED = "2026-08-30";
/** Last substantive edit to lib/projects.ts (ISO date). */
export const PROJECTS_UPDATED = "2026-08-23";
