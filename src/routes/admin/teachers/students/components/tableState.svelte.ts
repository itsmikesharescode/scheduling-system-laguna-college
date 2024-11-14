class TableState {
  #tableData = $state<unknown[]>([]);
  #activeRow = $state<unknown | null>(null);

  setTableData(data: unknown[]) {
    this.#tableData = data;
  }

  getTableData() {
    return this.#tableData;
  }

  setActiveRow(row: unknown) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }

  #deleteState = $state(false);

  setDeleteState(state: boolean) {
    this.#deleteState = state;
  }

  getDeleteState() {
    return this.#deleteState;
  }
}

export const tableState = new TableState();
