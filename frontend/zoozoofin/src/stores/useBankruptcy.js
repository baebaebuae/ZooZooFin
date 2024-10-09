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

        // 내일 지불해야 할 총액 계산
        const totalPayments = nextLoanRepayment + nextSavingsPayment + nextCapitalRepayment;

        // nextCapitalRepayment가 0이 아닐 경우에만 파산 위험 체크
        if (nextCapitalRepayment !== 0) {
            // 파산 위험 (내 자산보다 지불해야 할 금액이 큰 경우)
            if (totalAssets + totalPayments < 0) {
                const deficit = Math.abs(totalAssets + totalPayments);
                return {
                    isBankrupt: true,
                    message: `주의: 내일 지불해야 할 금액이 현재 자산을 초과합니다. 부족액: ${deficit}`,
                    deficit
                };
            }
        }

        // nextCapitalRepayment가 0이거나 파산 위험이 없는 경우
        return {
            isBankrupt: false,
            message: "현재 자산으로 내일의 지불을 충분히 커버할 수 있습니다.",
            surplus: totalAssets + totalPayments
        };
    } catch (error) {
        console.error('파산 위험 확인 중 오류 발생:', error);
        return {
            error: true,
            message: "파산 위험을 확인하는 중 오류가 발생했습니다."
        };
    }
};