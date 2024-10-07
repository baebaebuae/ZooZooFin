import { create } from 'zustand';
import { getApiClient } from '../../../../stores/apiClient';

const useStockStore = create((set) => ({
    // 구매,판매 총 가격
    totalPrice: 0,
    totalStock: 0,

    setTotalPrice: (price) => set({ totalPrice: price }),
    setTotalStock: (stock) => set({ totalStock: stock }),

    // 보유 주식 작성중

    stockList: {},

    // 주식 채널 주식 리스트 확인
    domesticStocks: [],
    overseasStocks: [],
    ETFStocks: [],

    fetchStocklist: async ({ turn }) => {
        try {
            const apiClient = getApiClient();
            const requests = [];

            // 기본적으로 domestic 주식 목록을 가져옴
            requests.push(apiClient.get('/stock/list/domestic'));
            // turn이 5 이상이면 해외 주식 목록도 가져옴
            if (turn >= 5) {
                requests.push(apiClient.get('/stock/list/oversea'));
            }
            // turn이 10 이상이면 ETF 목록도 가져옴
            if (turn >= 10) {
                requests.push(apiClient.get('/stock/list/etf'));
            }
            // Promise.all을 사용해 모든 요청을 병렬로 처리
            const responses = await Promise.all(requests);
            const [domesticResponse, overseaResponse, etfResponse] = responses;

            console.log(domesticResponse.data.body);

            set({ domesticStocks: domesticResponse.data });

            // 해외 주식 업데이트 (turn >= 5일 때만)
            if (overseaResponse) {
                set({ overseasStocks: overseaResponse.data });
            }

            // ETF 주식 업데이트 (turn >= 10일 때만)
            if (etfResponse) {
                set({ ETFStocks: etfResponse.data });
            }
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

export default useStockStore;
