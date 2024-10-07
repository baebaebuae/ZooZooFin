import { create } from 'zustand';

export const useBillStore = create((set) => ({
    isBillShown: false,

    showBill: () => set({ isBillShown: true }),

    resetBill: () => set({ isBillShown: false }),
}));
