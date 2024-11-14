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
  #updateState = $state(false);

  setDeleteState(state: boolean) {
    this.#deleteState = state;
  }

  setUpdateState(state: boolean) {
    this.#updateState = state;
  }

  getDeleteState() {
    return this.#deleteState;
  }

  getUpdateState() {
    return this.#updateState;
  }
}

export const tableState = new TableState();
