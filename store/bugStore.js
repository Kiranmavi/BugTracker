import { create } from 'zustand';

const useBugStore = create((set) => ({
  bugNo: 0,
  setBugNo: (no) => set({ bugNo: no }),
}));

export default useBugStore;


