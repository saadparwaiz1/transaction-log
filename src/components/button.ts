import type { ICellRendererParams } from "ag-grid-community";

type ButtonRendererParams = ICellRendererParams & {
  onClick: (params: ICellRendererParams) => void;
};

export class DeleteButtonComponent {
  eGui!: HTMLDivElement;
  eButton: HTMLButtonElement | undefined;
  eventListener!: () => void;

  init(params: ButtonRendererParams) {
    this.eGui = document.createElement("div");
    this.eButton = document.createElement("button");
    this.eButton.className = "action-btn";
    this.eButton.textContent = "Delete";
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
