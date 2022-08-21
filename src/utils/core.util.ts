import { ExistingTemplate } from 'src/app/model/core.model';

export const localStorageKey = `templates`;

export const storage = (): ExistingTemplate[] => {
  const existing = localStorage.getItem(localStorageKey);
  return (existing && JSON.parse(existing)) || [];
};
