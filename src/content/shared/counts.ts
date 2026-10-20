/**
 * How many certifications and recommendations the lists in certifications.ts and testimonials.ts hold. The figures
 * under the hero hydrate with the startup bundle, which would otherwise carry both lists, every quote included, only to
 * count them; content.test.ts fails as soon as a list and its count drift apart.
 */
export const CERTIFICATION_COUNT = 29;
export const RECOMMENDATION_COUNT = 16;
