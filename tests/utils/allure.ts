import { allure } from 'allure-playwright';

export function setAllureMeta(meta: {
  epic: string;
  feature: string;
  story?: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  owner?: string;
  tags?: string[];
  description?: string;
}): void {
  allure.epic(meta.epic);
  allure.feature(meta.feature);
  if (meta.story) allure.story(meta.story);
  if (meta.severity) allure.severity(meta.severity);
  if (meta.owner) allure.owner(meta.owner);
  if (meta.tags) meta.tags.forEach(tag => allure.tag(tag));
  if (meta.description) allure.description(meta.description);
}
