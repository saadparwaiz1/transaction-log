import type { ICellRendererParams } from "ag-grid-community";

type ButtonRendererParams = ICellRendererParams & {
  onClick: (params: ICellRendererParams) => void;
  label: string;
};

export class ButtonComponent {
  eGui!: HTMLDivElement;
  eButton: HTMLButtonElement | undefined;
  eventListener!: () => void;

  init(params: ButtonRendererParams) {
    this.eGui = document.createElement("div");
    this.eButton = document.createElement("button");
    this.eButton.className = "action-btn";
    this.eButton.textContent = params.label;
    this.eButton.addEventListener("click", () => params.onClick(params));
    this.eGui.appendChild(this.eButton);
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return true;
  }

  destroy() {
    if (this.eButton) {
      this.eButton.removeEventListener("click", this.eventListener);
    }
  }
}
