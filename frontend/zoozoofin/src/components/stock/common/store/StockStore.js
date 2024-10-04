import axios from 'axios';
import { create } from 'zustand';

const useStockStore = create((set) => ({
    // 구매,판매 총 가격
    totalPrice: 0,
    totalStock: 0,

    setTotalPrice: (price) => set({ totalPrice: price }),
    setTotalStock: (stock) => set({ totalStock: stock }),

    // 보유 주식 작성중

    stockList: {},

    // 구매 및 판매
}));

export default useStockStore;
