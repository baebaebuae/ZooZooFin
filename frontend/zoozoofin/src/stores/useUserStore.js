// {} 수정 완료 - 24.10.08 정진영
import { create } from 'zustand';
import { getApiClient } from './apiClient';

const useUserStore = create((set) => ({
    animalImg: '',
    animalAssets: 0,
    memberGoldBar: 0,
    turn: 1,
    isLoading: false,
    error: null,

    fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get('/member/profile');
            console.log(response.data)
            set({
                animalImg: response.data.body.animalImg,
                animalAssets: response.data.body.animalAssets,
                memberGoldBar: response.data.body.memberGoldBar,
                // turn: response.data.turn,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    updateUserProfile: (newData) => {
        set((state) => ({
            ...state,
            ...newData,
        }));
    },

    resetStore: () => {
        set({
            animalImg: '',
            animalAssets: 0,
            memberGoldBar: 0,
            turn: 1,
            isLoading: false,
            error: null,
        });
    },
}));

export default useUserStore;
