import { create } from "zustand";

const useQuizzesStore = create(set => ({
  resultType: "",
  setResultType: newType => set({ resultType: newType }),
}));

export default useQuizzesStore;
