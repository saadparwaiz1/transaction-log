import type { ICellRendererParams } from "ag-grid-community";

type DefaultActionRendererParams = ICellRendererParams & {
  onDelete: (params: ICellRendererParams) => void;
};

export class DefaultActionRendererComponent {
  eGui!: HTMLDivElement;
  eventListener!: () => void;

  init(params: DefaultActionRendererParams) {
    this.eGui = document.createElement("div");
    const eButton = document.createElement("button");
    eButton.className = "action-btn";
    eButton.textContent = "Delete";
    eButton.onclick = () => params.onDelete(params);
    this.eGui.appendChild(eButton);
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return true;
  }

  destroy() {}
}
