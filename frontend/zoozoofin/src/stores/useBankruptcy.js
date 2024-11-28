import useUserStore from './useUserStore';
import { getApiClient } from './apiClient';

export const checkBankruptcyRisk = async () => {
    const apiClient = getApiClient();
    const { animalAssets } = useUserStore.getState();

    try {
        // 내일의 지불 정보 가져오기
        const response = await apiClient.get('/home/next-turn-record');
        const { nextLoanRepayment, nextSavingsPayment, nextCapitalRepayment } = response.data;

        // 현재 자산
        const totalAssets = animalAssets;

        // nextCapitalRepayment가 0이 아닐 때만 파산 위험을 체크
        if (nextCapitalRepayment !== 0) {
            // 내일 지불해야 할 총액 계산
            const totalPayments = nextLoanRepayment + nextSavingsPayment + nextCapitalRepayment;
            if (totalAssets < totalPayments) {
                const deficit = totalPayments - totalAssets; 
                return {
                    isBankrupt: true,
                    deficit
                };
            }
        }

        // 파산 위험이 없는 경우
        return {
            isBankrupt: false,
            surplus: totalAssets - (nextLoanRepayment + nextSavingsPayment + nextCapitalRepayment)
        };
    } catch (error) {
        console.error('파산 위험 확인 중 오류 발생:', error);
        return {
            error: true,
            message: "파산 위험을 확인하는 중 오류가 발생했습니다."
        };
    }
};
