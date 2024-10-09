import { create } from 'zustand';

export const useBillStore = create((set) => ({
    isBillShown: false,

    billTurn: 1,

    showBill: () => set((state) => ({ billTurn: state.billTurn + 1, isBillShown: true })),

    resetBill: () => set({ isBillShown: false }),
}));
