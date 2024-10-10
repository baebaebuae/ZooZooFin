import { create } from 'zustand';

export const useMusicStore = create((set) => ({
    isMusicOn: false,
    turnOffMusic: () => set((state) => ({ isMusicOn: false })),
    turnOnMusic: () => set((state) => ({ isMusicOn: true })),
    isMusicChecked: false,
    updateMusicChecked: (checkedValue) => {
        set({ isMusicChecked: checkedValue });
    },
}));
