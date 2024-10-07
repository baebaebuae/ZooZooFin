import { create } from 'zustand';
import { getApiClient } from '@stores/apiClient';

export const useCreditStore = create((set) => ({
    credit: null, // 신용 등급 정보 초기값
    fetchCredit: async () => {
        const apiClient = getApiClient();
        try {
            const res = await apiClient.get('/loan/check');
            console.log(res.data.body);
            set({ credit: res.data.body });
        } catch (error) {
            set({ error: 'Failed to fetch credit' });
        }
    },
}));
