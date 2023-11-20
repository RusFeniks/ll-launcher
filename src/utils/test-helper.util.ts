export function queryBy<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string
): T | null {
  return container.querySelector<T>(selector);
}

export function queryByName<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  name: string
): T | null {
  return queryBy(container, `[name="${name}"]`);
}

export function queryByClass<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  className: string
): T | null {
  return queryBy(container, `.${className}`);
}

export function queryById<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  id: string
): T | null {
  return queryBy(container, `#${id}`);
}

export function queryAllBy<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string
): NodeListOf<T> {
  return container.querySelectorAll<T>(selector);
}

export function queryAllByName<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  name: string
): NodeListOf<T> {
  return queryAllBy(container, `[name="${name}"]`);
}

export function queryAllByClass<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  className: string
): NodeListOf<T> {
  return queryAllBy(container, `.${className}`);
}

export function queryAllById<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  id: string
): NodeListOf<T> {
  return queryAllBy(container, `#${id}`);
}