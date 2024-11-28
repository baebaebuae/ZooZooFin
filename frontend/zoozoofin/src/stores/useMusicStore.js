import { create } from 'zustand';

export const useMusicStore = create((set) => ({
    isMusicOn: false,
    toggleMusic: () => set((state) => ({ isMusicOn: !state.isMusicOn })),
    turnOffMusic: () => set(() => ({ isMusicOn: false })),
    turnOnMusic: () => set(() => ({ isMusicOn: true })),
    isMusicChecked: false,
    updateMusicChecked: (checkedValue) => {
        set({ isMusicChecked: checkedValue });
    },
}));
