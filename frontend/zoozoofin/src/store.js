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

export const useAnimalStore = create((set) => ({
    animals: {},
    nowAnimal: {},
    // 호출 후 nowAnimal => 현재 캐릭터 데이터 조회 가능
    getAnimalData: async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/member/animal`,
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                    'Access-Control-Allow-Origin': `http://localhost:5173`,
                    'Access-Control-Allow-Credentials': 'true',
                },
            });
            if (res.status === 200) {
                const animals = res.data.body.animals;
                set({
                    animals: animals,
                    nowAnimal: animals[animals.length - 1],
                });
                return animals;
            }
        } catch (error) {
            console.error('error: ', error);
            return error;
        }
    },
    setAnimals: (newAnimals) =>
        set((state) => {
            if (JSON.stringify(state.animals) === JSON.stringify(newAnimals)) {
                return; // animals가 변함이 없으면 업데이트 하지 않음
            }
            return {
                animals: newAnimals,
                nowAnimal: newAnimals[newAnimals.length - 1],
            };
        }),
}));
