import type { InvokeArgs } from '@tauri-apps/api/tauri';

export async function getMarkdown(): Promise<string> {
  return await invoke('get_markdown');
}

export async function saveMarkdown(markdown: string): Promise<null> {
  await invoke('save_markdown', { markdown });
  return null;
}

async function invoke(cmd: string, args?: InvokeArgs): Promise<any> {
  const { invoke: tauri_invoke } = await import('@tauri-apps/api/tauri');
  return tauri_invoke(cmd, args);
}
