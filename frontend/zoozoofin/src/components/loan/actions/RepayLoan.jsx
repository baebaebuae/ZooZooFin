import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { LoanInfoCard } from '@components/loan/LoanInfoCard';
import { LoanRepayCard } from '@components/loan/LoanRepayCard';
import { LoanRepayDetailCard } from '@components/loan/LoanRepayDetailCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconFrog from '@assets/images/icons/icon_frog.png';

import { getApiClient } from '@stores/apiClient';

import { useStore, useAnimalStore } from '../../../store.js';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const FixedMessageBox = styled.div`
    flex-shrink: 0;
`;

const ProductContainer = styled.div``;
const ProductBlock = styled.div`
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    /* max-height: 100%; */
    height: 450px;
    padding: 10px;
    box-sizing: border-box;
`;

const RepayLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const { nowAnimal } = useAnimalStore();

    // console.log('nowAnimal: ', nowAnimal);

    // 대출 상품 받아오기
    const fetchProducts = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get(
                '/loan/my',
                {},
                {
                    headers: { animalId: 1 },
                }
            );
            console.log(res.data.body);
            setProducts(res.data.body);
        } catch (error) {
            return error;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {}, [products]);

    // 도장 찍은 후 -로딩중- 모달 뜨고 사라지는 함수
    useEffect(() => {
        if (currentCard > 2) {
            const timer = setTimeout(() => {
                goToNextCard();
            }, 2000); // 대출 가능 여부 평가

            return () => clearTimeout(timer);
        }
    }, [currentCard]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const handleClick = (product) => {
        setSelectedProduct(product);
        goToNextCard();
        console.log('selectedProduct: ', selectedProduct);
    };

    const joinGuideMessages = {
        1: '어떤 대출 상품을 상환할거야?',
        2: '내용을 확인하고 아래에 서명해.',
    };

    return (
        <Block>
            {currentCard < 3 && (
                <FixedMessageBox>
                    <MessageBox>
                        <NormalIcon icon={IconFrog} />
                        <div>{joinGuideMessages[currentCard]}</div>
                    </MessageBox>
                </FixedMessageBox>
            )}

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <ProductBlock>
                            <LoanInfoCard
                                charName={nowAnimal.animalName}
                                totalLoan={products.totalLoan}
                                restLoan={products.restLoan}
                            />

                            {products.myLoanList && products.myLoanList.length > 0 ? (
                                products.myLoanList.map((product, index) => (
                                    <LoanRepayCard
                                        key={index}
                                        warning={false}
                                        loanNumber={product.loanNumber}
                                        loanRate={product.loanRate}
                                        payBackTurn={product.payBackTurn}
                                        loanPeriod={product.loanPeriod}
                                        loanRemain={product.loanRemain}
                                        handleClick={() => handleClick(product)}
                                    />
                                ))
                            ) : (
                                <div>받은 대출이 없어요.</div>
                            )}
                        </ProductBlock>
                    );
                } else if (currentCard === 2) {
                    return (
                        <>
                            <LoanRepayDetailCard
                                loanId={selectedProduct.loanId}
                                loanNumber={selectedProduct.loanNumber}
                                loanType={selectedProduct.loanType}
                                isRepayAvailable={true}
                                loanRate={selectedProduct.loanType}
                                payBackTurn={selectedProduct.payBackTurn}
                                loanPeriod={selectedProduct.loanPeriod}
                                loanAmount={selectedProduct.loanAmount}
                                loanRemain={selectedProduct.loanRemain}
                                warning={selectedProduct.warning}
                                goToScript={goToNextCard}
                            />
                        </>
                    );
                } else if (currentCard === 3) {
                    return <Loading content={'대출 상환 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default RepayLoan;
