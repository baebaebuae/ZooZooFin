import styled from 'styled-components';
import { ProductCard, ProductJoinCard } from '@components/bank/DepositCards';
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
            <h2>ProductCard</h2>
            <Card>
                <ProductCard productName={'주주예금'} turn={5} rate={3} $isLoan={false} />
            </Card>
            <h2>ProductJoinCard</h2>
            <Card>
                <ProductJoinCard
                    productName={'주주예금'}
                    turn={5}
                    rate={3}
                    currentTurn={10}
                    $isLoan={false}
                    maxAmount={1000000}
                />
            </Card>
        </SampleBlock>
    );
};

export default BankPage;
