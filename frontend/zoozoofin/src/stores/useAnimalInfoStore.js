import { create } from 'zustand';
import { getApiClient } from './apiClient';

const useAnimalInfoStore = create((set) => ({
    animalName: '',
    animalAbility: 0,
    animalHierarchy: '',
    animalCredit: 0,
    isWorkToday: false,
    isSolvedQuizToday: false,
    totalAmount: 0,
    totalAssets: 0,
    totalDeposit: 0,
    totalSavings: 0,
    totalStock: 0,
    totalLoan: 0,
    totalCapital: 0,
    isLoading: false,
    error: null,

    fetchAnimalInfo: async () => {
        set({ isLoading: true, error: null });
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get('/animal/info');
            console.log("AnimalInfo");
            console.log(response);
            if (response.data && response.data.body) {
                set({
                    ...response.data.body,
                    isLoading: false,
                });
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Failed to fetch animal info:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    updateAnimalInfo: (newData) => {
        set((state) => ({
            ...state,
            ...newData,
        }));
    },

    resetStore: () => {
        set({
            animalName: '',
            animalAbility: 0,
            animalHierarchy: '',
            animalCredit: 0,
            isWorkToday: false,
            isSolvedQuizToday: false,
            totalAmount: 0,
            totalAssets: 0,
            totalDeposit: 0,
            totalSavings: 0,
            totalStock: 0,
            totalLoan: 0,
            totalCapital: 0,
            isLoading: false,
            error: null,
        });
    },
}));

export default useAnimalInfoStore;