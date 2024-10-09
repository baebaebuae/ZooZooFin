import { create } from 'zustand';
import { getApiClient } from '../../../../stores/apiClient';

const useStockStore = create((set) => ({
    // 구매,판매 총 가격
    totalPrice: 0,
    totalStock: 0,

    setTotalPrice: (price) => set({ totalPrice: price }),
    setTotalStock: (stock) => set({ totalStock: stock }),

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

            requests.push(apiClient.get('/stock/list/oversea'));

            requests.push(apiClient.get('/stock/list/etf'));

            // Promise.all을 사용해 모든 요청을 병렬로 처리
            const responses = await Promise.all(requests);
            console.log(responses);
            const [domesticResponse, overseaResponse, etfResponse] = responses;
            set({ domesticStocks: domesticResponse.data.body.stockDetails });

            // 해외 주식 업데이트 (turn >= 5일 때만)
            if (overseaResponse) {
                set({ overseasStocks: overseaResponse.data.body.stockDetails });
            }

            // ETF 주식 업데이트 (turn >= 10일 때만)
            if (etfResponse) {
                console.log(etfResponse);
                set({ ETFStocks: etfResponse.data.body.stockDetails });
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            set({ error: error.message, isLoading: false });
        }
    },

    // 상세 정보 조회를 위한 선택된 stockId, stockRate 저장
    clickedStockId: null,
    clickedStockInfo: {},
    clickedStockDetail: {},
    clickedStockCharts: [],
    setClickedStockId: (stockid) => set({ clickedStockId: stockid }),
    setClickedStockCharts: (charts) => set({ clickedStockCharts: charts }),
    // fetchStockInfo
    fetchStockInfo: async (stockId) => {
        try {
            const apiClient = getApiClient();
            const response = await apiClient.get(`/stock/info/${stockId}`);
            // console.log(response);
            set({ clickedStockInfo: response.data.body });
        } catch (error) {
            console.error(`Failed to fetch stock detail for stockId: ${stockId}`, error);
        }
    },

    fetchStockDetail: async (stockId) => {
        try {
            const apiClient = getApiClient();
            console.log(stockId);
            const response = await apiClient.get(`/stock/statements/${stockId}`);
            // console.log(response);
            set({ clickedStockDetail: response.data.body });
        } catch (error) {
            console.error(`Failed to fetch stock detail for stockId: ${stockId}`, error);
        }
    },

    // resetStore 구현 중
    resetStore: () => {},
}));

// 보유 주식 관련 store 생성
export const useUserStockStore = create((set) => ({
    // 주식 채널 주식 리스트 확인
    myDomesticStocks: [],
    myOverseasStocks: [],
    myETFStocks: [],

    clickedMyStock: {},
    setClickedMyStock: (myStock) => set({ clickedMyStock: myStock }),

    fetchMyStocklist: async ({ turn }) => {
        try {
            const apiClient = getApiClient();
            const requests = [];

            // 기본적으로 domestic 주식 목록을 가져옴
            requests.push(apiClient.get('/stock/domestic'));
            // turn이 5 이상이면 해외 주식 목록도 가져옴
            if (turn >= 5) {
                requests.push(apiClient.get('/stock/oversea'));
            }
            // turn이 10 이상이면 ETF 목록도 가져옴
            if (turn >= 10) {
                requests.push(apiClient.get('/stock/etf'));
            }
            // Promise.all을 사용해 모든 요청을 병렬로 처리
            const responses = await Promise.all(requests);
            const [domesticResponse, overseaResponse, etfResponse] = responses;

            console.log(responses);
            console.log('myDomesticResponse', domesticResponse);
            if (domesticResponse) {
                set({ myDomesticStocks: domesticResponse.data.body });
            }

            // 해외 주식 업데이트 (turn >= 5일 때만)
            if (overseaResponse) {
                set({ myOverseasStocks: overseaResponse.data.body });
            }

            // ETF 주식 업데이트 (turn >= 10일 때만)
            if (etfResponse) {
                set({ myETFStocks: etfResponse.data.body });
            }
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useStockStore;
