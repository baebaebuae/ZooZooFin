import styled from 'styled-components';

import { NormalIcon } from '@components/root/icon';
import IconLender from '@assets/images/icons/icon_lender.png';
import IconCarrot from '@assets/images/icons/icon_carrot.png';

import { Card } from '@components/root/card';

import { ProductDetail } from '@components/lender/ProductDetail';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 10px;
`;

const CardBlock = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 35px;
    width: 75%;
`;

const TextRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 95%;
`;

const TextStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin: 0;
    font-size: ${({ type }) => (type === 'content' ? '20px' : '14px')};
    color: ${({ type, theme }) => (type === 'content' ? theme.colors.warn : theme.colors.gray)};
    font-weight: ${({ type }) => (type === 'content' ? 'bold' : 'normal')};
`;

const ProductCard = () => {
    const productName = '콩팥 캐피탈';
    const maxLoan = 100000000;
    // 테스트를 위한 현재턴 임의 값 설정
    const currentTurn = 30;

    return (
        <>
            <CardBlock>
                <NormalIcon icon={IconLender} />
                <ProductName>{productName}</ProductName>
                <TextRowContainer>
                    <TextStyle type="list">대출 한도</TextStyle>
                    <TextStyle type="content">
                        {maxLoan.toLocaleString()}
                        <NormalIcon icon={IconCarrot} />
                    </TextStyle>
                </TextRowContainer>
                <TextRowContainer>
                    <TextStyle type="list">이자율</TextStyle>
                    <TextStyle type="content">복리 10%</TextStyle>
                </TextRowContainer>
                <ProductDetail currentTurn={currentTurn} />
            </CardBlock>
        </>
    );
};

export default ProductCard;
