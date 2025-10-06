const HIDDEN_CLASS = "hidden";
const CLOSE_BUTTON_SELECTOR = ".close-btn";
const FORM_SELECTOR = "form";

export function hide(element: HTMLElement) {
  element.classList.add(HIDDEN_CLASS);
}

export function show(element: HTMLElement) {
  element.classList.remove(HIDDEN_CLASS);
}

export function setupModal(
  element: HTMLDivElement,
  onSubmit: (data: unknown) => void,
) {
  const closeButton = element.querySelector(
    CLOSE_BUTTON_SELECTOR,
  )! as HTMLButtonElement;
  const form = element.querySelector(FORM_SELECTOR) as HTMLFormElement;
  closeButton.onclick = () => hide(element);
  form.onsubmit = (ev) => {
    ev.preventDefault();
    onSubmit(Object.fromEntries(new FormData(form).entries()));
    closeButton.click();
    form.reset();
    return false;
  };
}

export function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (element == null) {
    throw new Error(`Element with id ${id} not found`);
  }
  return element as T;
}
