import { create } from 'zustand';

const useCapitalStore = create((set) => ({
    loanAmount: 0,
    loanPeriod: 0,
    expectedFinalAmount: 0,
    expectedFinalTurn: 0,

    // 대출 금액 설정
    setLoanAmount: (amount) => set(() => ({ loanAmount: amount })),

    // 대출 기간 설정
    setLoanPeriod: (period) => set(() => ({ loanPeriod: period })),

    // 최종 상환 금액 설정
    setExpectedFinalAmount: (amount) => set(() => ({ expectedFinalAmount: amount })),

    // 예상 상환 턴 설정
    setExpectedFinalTurn: (turn) => set(() => ({ expectedFinalTurn: turn })),

    // 상환 방식
    selectedRepayType: '만기일시상환',

    // 대출 결정 완료
}));

export default useCapitalStore;
