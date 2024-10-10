import { create } from 'zustand';

export const useMusicStore = create((set) => ({
    isMusicOn: false,
    toggleMusic: () => set((state) => ({ isMusicOn: !state.isMusicOn })),
    isMusicChecked: false,
    updateMusicChecked: (checkedValue) => {
        set({ isMusicChecked: checkedValue });
    },
}));
