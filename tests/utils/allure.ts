import { allure } from 'allure-playwright';
import type { Page, TestInfo } from '@playwright/test';

export function setAllureMeta(meta: {
  epic: string;
  feature: string;
  story?: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  owner?: string;
  tags?: string[];
  description?: string;
  parameters?: Record<string, string | number | boolean>;
}): void {
  allure.epic(meta.epic);
  allure.feature(meta.feature);
  if (meta.story) allure.story(meta.story);
  if (meta.severity) allure.severity(meta.severity);
  if (meta.owner) allure.owner(meta.owner);
  if (meta.tags) meta.tags.forEach(tag => allure.tag(tag));
  if (meta.description) allure.description(meta.description);
  if (meta.parameters) {
    for (const [name, value] of Object.entries(meta.parameters)) {
      allure.parameter(name, String(value));
    }
  }
}

export function setAllureGroup(suite: string, subSuite?: string): void {
  allure.suite(suite);
  if (subSuite) allure.subSuite(subSuite);
}

export async function step<T>(title: string, body: () => Promise<T>): Promise<T> {
  return allure.step(title, body);
}

const consoleLogKey = '__consoleLogs__';

export function startConsoleCapture(page: Page): void {
  const logs: string[] = [];
  (page as unknown as Record<string, unknown>)[consoleLogKey] = logs;

  page.on('console', msg => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    logs.push(`[pageerror] ${err.message}`);
  });
}

export function attachConsoleLogs(page: Page): void {
  const logs = (page as unknown as Record<string, unknown>)[consoleLogKey] as string[] | undefined;
  if (logs && logs.length) {
    allure.attachment('Browser console', logs.join('\n'), 'text/plain');
  }
}

export async function attachArtifactsOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
  if (testInfo.status === testInfo.expectedStatus) return;

  const screenshot = await page.screenshot({ fullPage: true });
  allure.attachment('Screenshot (on failure)', screenshot, 'image/png');

  for (const attachment of testInfo.attachments) {
    if (attachment.path && attachment.contentType?.includes('video')) {
      allure.attachment('Video (on failure)', { path: attachment.path }, 'video/webm');
    }
  }
}
