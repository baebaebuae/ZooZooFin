import styled from 'styled-components';
import {
    ProductCard,
    ProductJoinCard,
    ProductCheckCard,
    ProductTerminationCard,
    ProductTerminationDetailCard,
} from '@components/bank/DepositCards';
import { Card } from '@components/root/card';

const SampleText = styled.h1`
    z-index: 1000;
`;

const SampleBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BankPage = () => {
    return (
        <SampleBlock>
            <SampleText>은행은행</SampleText>
            <h2>해지 상품 상세 정보</h2>
            <Card>
                <ProductTerminationDetailCard
                    productName={'주주적금'}
                    turn={5}
                    currentTurn={10}
                    restTurn={2}
                    savingsAmount={3000000}
                    finalSavingsAmount={9000000}
                    ifSpecial={false}
                />
            </Card>
            <h2>해지 상품 카드</h2>
            <Card>
                <ProductTerminationCard
                    productName={'주주적금'}
                    turn={5}
                    rate={3}
                    currentTurn={10}
                    restTurn={2}
                    savingsAmount={3000000}
                    ifSpecial={false}
                />
            </Card>

            <h2>ProductCard</h2>
            <Card>
                <ProductCard productName={'주주예금'} turn={5} rate={3} $isLoan={false} />
            </Card>
            <h2>ProductJoinCard</h2>
            <h3>예금</h3>
            <Card>
                <ProductJoinCard
                    productName={'주주예금'}
                    turn={5} // ProductCard에서 넘겨받을 것
                    rate={3}
                    currentTurn={10}
                    $isLoan={false}
                    maxAmount={1000000} // 현재 사용자가 가진 돈 입력
                    isSavings={true} // 예금일 때
                />
            </Card>
            <h3>적금</h3>
            <Card>
                <ProductJoinCard
                    productName={'주주적금'}
                    turn={5}
                    rate={3}
                    currentTurn={10}
                    $isLoan={false}
                    maxAmount={1000000}
                    isSavings={false} // 적금일 때
                />
            </Card>

            <h2>ProductCheckCard</h2>
            <h3>예금</h3>
            <Card>
                <ProductCheckCard
                    productName={'주주예금'}
                    turn={5}
                    rate={3}
                    currentTurn={10}
                    savingsAmount={3000000}
                    finalSavingsAmount={15000000}
                    ifSpecial={true}
                />
            </Card>
            <h3>적금</h3>
            <Card>
                <ProductCheckCard
                    productName={'주주적금'}
                    turn={5}
                    rate={3}
                    currentTurn={10}
                    savingsAmount={3000000}
                    finalSavingsAmount={15000000}
                    ifSpecial={false}
                />
            </Card>
        </SampleBlock>
    );
};

export default BankPage;
