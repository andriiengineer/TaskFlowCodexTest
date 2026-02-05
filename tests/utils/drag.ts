import type { Locator } from '@playwright/test';

export async function dragAndDrop(source: Locator, target: Locator): Promise<void> {
  const sourceHandle = await source.elementHandle();
  const targetHandle = await target.elementHandle();

  if (!sourceHandle || !targetHandle) {
    throw new Error('Unable to drag: source or target not found.');
  }

  const page = source.page();
  await page.evaluate(
    ([src, dst]) => {
      const dataTransfer = new DataTransfer();
      src.dispatchEvent(new DragEvent('dragstart', { dataTransfer, bubbles: true }));
      dst.dispatchEvent(new DragEvent('dragover', { dataTransfer, bubbles: true }));
      dst.dispatchEvent(new DragEvent('drop', { dataTransfer, bubbles: true }));
      src.dispatchEvent(new DragEvent('dragend', { dataTransfer, bubbles: true }));
    },
    [sourceHandle, targetHandle]
  );
}
