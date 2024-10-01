import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    scripts: [],
    fetchTutorialScript: async (category) => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/scripts/category`,
                params: { category: category },
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                    'Access-Control-Allow-Origin': `http://localhost:5173`,
                    'Access-Control-Allow-Credentials': 'true',
                },
            });
            set({
                scripts: res.data.body.scripts,
            });
            if (res.status === 200) {
                return res.data.body.scripts;
            }
        } catch (error) {
            console.error('error: ', error);
            return error;
        }
    },
    setScripts: (newScripts) => set({ scripts: newScripts }),
}));

export const useMusicStore = create((set) => ({
    isMusicOn: false,
    toggleMusic: () => set((state) => ({ isMusicOn: !state.isMusicOn })),
}));
