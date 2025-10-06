import type { ICellRendererParams } from "ag-grid-community";

type StatementActionRendererParams = ICellRendererParams & {
  onDelete: (params: ICellRendererParams) => void;
  onUpload: (params: ICellRendererParams) => void;
};

export class StatementActionRenderer {
  eGui!: HTMLDivElement;
  eventListener!: () => void;

  init(params: StatementActionRendererParams) {
    this.eGui = document.createElement("div");
    const uploadButton = document.createElement("button");
    uploadButton.className = "action-btn";
    uploadButton.textContent = "Upload";
    uploadButton.onclick = () => params.onUpload(params);
    this.eGui.appendChild(uploadButton);
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
