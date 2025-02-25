import { create } from "zustand";

interface FilterStoreState {
  selections: { [key: string]: string };
  inputValue: string;
  setSelection: (group: string, value: string) => void;
  clearSelection: (group: string) => void;
  setInputValue: (value: string) => void;
  clearInputValue: () => void;
}

const useRadioStore = create<FilterStoreState>((set) => ({
  selections: {},
  inputValue: "",
  setSelection: (group, value) =>
    set((state) => ({
      selections: { ...state.selections, [group]: value },
    })),
  clearSelection: (group) =>
    set((state) => ({
      selections: { ...state.selections, [group]: "" },
    })),
  setInputValue: (value) => set({ inputValue: value }),
  clearInputValue: () => set({ inputValue: "" }),
}));

export default useRadioStore;
