import { getContext, setContext } from 'svelte';
import type { StudentsPageSchema } from './data/schemas';

class TableState {
  #activeRow = $state<StudentsPageSchema | null>(null);

  setActiveRow(row: StudentsPageSchema | null) {
    this.#activeRow = row;
  }

  getActiveRow() {
    return this.#activeRow;
  }
}

const TableKey = Symbol('TableState');

export const initTableState = () => {
  return setContext(TableKey, new TableState());
};

export const useTableState = () => {
  return getContext<ReturnType<typeof initTableState>>(TableKey);
};
