import styled from 'styled-components';
import {
    ProductCard,
    ProductJoinCard,
    ProductCheckCard,
    ProductTerminationCard,
    ProductTerminationDetailCard,
} from '@components/bank/DepositCards';
import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';
import { Link } from 'react-router-dom';

const SampleBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ComponentsBank = () => {
    return (
        <SampleBlock>
            <Link to="/bank">Back</Link>

            <MessageBox>
                <NormalIcon icon={IconChick} />
                <div>가입할 상품을 골라봐.</div>
            </MessageBox>
            <h2>해지 상품 상세 정보</h2>

            <ProductTerminationDetailCard
                productName={'주주적금'}
                turn={5}
                currentTurn={10}
                restTurn={2}
                savingsAmount={3000000}
                finalSavingsAmount={9000000}
                ifSpecial={false}
            />
            <h2>해지 상품 카드</h2>
            <ProductTerminationCard
                productName={'주주적금'}
                turn={5}
                rate={3}
                currentTurn={10}
                restTurn={2}
                savingsAmount={3000000}
                ifSpecial={false}
            />

            <h2>ProductCard</h2>

            <ProductCard productName={'주주예금'} turn={5} rate={3} $isLoan={false} />

            <h2>ProductJoinCard</h2>
            <h3>예금</h3>

            <ProductJoinCard
                productName={'주주예금'}
                turn={5} // ProductCard에서 넘겨받을 것
                rate={3}
                currentTurn={10}
                $isLoan={false}
                maxAmount={1000000} // 현재 사용자가 가진 돈 입력
                isSavings={true} // 예금일 때
            />

            <h3>적금</h3>

            <ProductJoinCard
                productName={'주주적금'}
                turn={5}
                rate={3}
                currentTurn={10}
                $isLoan={false}
                maxAmount={1000000}
                isSavings={false} // 적금일 때
            />

            <h2>ProductCheckCard</h2>
            <h3>예금</h3>

            <ProductCheckCard
                productName={'주주예금'}
                turn={5}
                rate={3}
                currentTurn={10}
                savingsAmount={3000000}
                finalSavingsAmount={15000000}
                ifSpecial={true}
            />

            <h3>적금</h3>

            <ProductCheckCard
                productName={'주주적금'}
                turn={5}
                rate={3}
                currentTurn={10}
                savingsAmount={3000000}
                finalSavingsAmount={15000000}
                ifSpecial={false}
            />
        </SampleBlock>
    );
};

export default ComponentsBank;
