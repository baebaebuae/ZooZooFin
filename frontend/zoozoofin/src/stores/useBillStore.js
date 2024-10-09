import { create } from 'zustand';

export const useBillStore = create((set) => ({
    billData: null,
    setBillData: (data) => set({ billData: data }),

    billState: {
        isShown: false,
        isDetected: false,
    },

    updateBillState: (key, value) => {
        set((state) => ({
            billState: { ...state.billState, [key]: value },
        }));
    },
}));

export const useBankruptStore = create((set) => ({
    bankruptState: {
        isShown: false,
        isDetected: false,
    },

    updateBankruptState: (key, value) => {
        set((state) => ({
            bankruptState: { ...state.bankruptState, [key]: value },
        }));
    },
}));
