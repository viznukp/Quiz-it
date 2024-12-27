import { create } from "zustand";

const useQuizzesStore = create(set => ({
  resultType: "",
  setResultType: newType => set({ resultType: newType }),
  quizCounts: {},
  setQuizCounts: counts => set({ quizCounts: counts }),
}));

export default useQuizzesStore;
