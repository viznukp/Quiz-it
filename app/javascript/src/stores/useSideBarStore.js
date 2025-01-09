import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSideBarStore = create(
  persist(
    set => ({
      isExpanded: false,
      setIsExpanded: state => set({ isExpanded: state }),
    }),
    {
      name: "sidebar-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useSideBarStore;
