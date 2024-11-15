import type { UserSchema } from './Table/schema';

class TableState {
  #activeRow = $state<UserSchema | null>(null);

  setActiveRow(row: UserSchema | null) {
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
