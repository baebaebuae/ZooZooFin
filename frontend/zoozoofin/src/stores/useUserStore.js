import { create } from 'zustand';
import { getApiClient } from './apiClient';

const useUserStore = create((set, get) => ({
    animalImg: '',
    animalAssets: 0,
    memberGoldBar: 0,
    turn: 1,
    isLoading: false,
    error: null,
    isTurnChecked: false,

    updateTurnChecked: () => {
        set((state) => ({ isTurnChecked: !state.isTurnChecked }));
    },

    fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get('/member/profile');
            set({
                animalImg: response.data.body.animalImg,
                animalAssets: response.data.body.animalAssets,
                memberGoldBar: response.data.body.memberGoldBar,
                turn: response.data.body.turn,
                isLoading: false,
            });
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    updateUserProfile: async (newData) => {
        set((state) => ({
            ...state,
            ...newData,
        }));
        // 로컬 업데이트 후 서버와 동기화
        await get().fetchUserProfile();
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
