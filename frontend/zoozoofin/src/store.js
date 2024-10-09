import { create } from 'zustand';
import axios from 'axios';
import { getApiClient } from '@stores/apiClient';

export const useStore = create((set) => ({
    scripts: [],

    fetchTutorialScript: async (category) => {
        try {
            const apiClient = getApiClient();
            const res = await apiClient.get('/scripts/category', {
                params: { category },
            });

            if (res.status === 200) {
                set({ scripts: res.data.body.scripts });
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

// 캐릭터 정보 관련  store
export const useAnimalStore = create((set) => ({
    animals: {},
    nowAnimal: {},
    // 호출 후 nowAnimal => 현재 캐릭터 데이터 조회 가능
    getAnimalData: async () => {
        try {
            const apiClient = getApiClient();
            const res = await apiClient.get('/member/animal');
            if (res.status === 200) {
                const animals = res.data.body.animals;
                console.log(animals);
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
            if (state.animals.length === newAnimals.length) {
                return; // animals가 변함이 없으면 업데이트 하지 않음
            }
            return {
                animals: newAnimals,
                nowAnimal: newAnimals[newAnimals.length - 1],
            };
        }),
}));
