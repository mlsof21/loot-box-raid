const localStorage = window.localStorage;

export function get(key: string): string | null {
  return localStorage.getItem(key);
}

export function set(key: string, value: object | string) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getOrDefault<T>(key: string, defaultValue: T): T {
  const result = get(key);
  return result ? JSON.parse(result) : defaultValue;
}
