import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Loading } from '@components/root/loading';
import { LoanInfoCard } from '@components/loan/LoanInfoCard';
import { LoanRepayCard } from '@components/loan/LoanRepayCard';
import { LoanRepayDetailCard } from '@components/loan/LoanRepayDetailCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconFrog from '@assets/images/icons/icon_frog.svg?react';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const RepayLoan = ({ goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);

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
                <MessageBox>
                    <NormalIcon icon={IconFrog} />
                    <div>{joinGuideMessages[currentCard]}</div>
                </MessageBox>
            )}

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <Block>
                            <LoanInfoCard
                                charName={'토랭이'}
                                totalLoan={products.totalLoan}
                                restLoan={products.restLoan}
                            />

                            <LoanRepayCard
                                warning={false}
                                loanNumber={3}
                                loanRate={5}
                                payBackTurn={1}
                                loanPeriod={7}
                                loanRemain={300000}
                                handleClick={() => goToNextCard()}
                            />

                            {products.myLoanList && products.myLoanList.length > 0 ? (
                                products.myLoanList.map((product, index) => (
                                    <LoanRepayCard
                                        key={index}
                                        warning={false}
                                        loanNumber={selectedProduct.loanNumber}
                                        loanRate={selectedProduct.loanRate}
                                        payBackTurn={selectedProduct.payBackTurn}
                                        loanPeriod={selectedProduct.loanPeriod}
                                        loanRemain={selectedProduct.loanRemain}
                                        handleClick={() => handleClick(product)}
                                    />
                                ))
                            ) : (
                                <div>List 비었음</div>
                            )}
                        </Block>
                    );
                } else if (currentCard === 2) {
                    return (
                        <>
                            <LoanRepayDetailCard
                                // loanId={selectedProduct.loanId}
                                // loanNumber={selectedProduct.loanNumber}
                                // loanRate={selectedProduct.loanRate}
                                // payBackTurn={selectedProduct.payBackTurn}
                                // loanPeriod={selectedProduct.loanPeriod}
                                // loanAmount={selectedProduct.loanAmount}
                                // loanRemain={selectedProduct.loanRemain}
                                // warning={selectedProduct.warning}
                                // loanType={selectedProduct.loanType}
                                // isRepayAvailable={isRepayAvailable} // 없음
                                // ---> 중도 상환 가능한지 여부. ?
                                loanId={1}
                                loanNumber={2}
                                loanType={2}
                                isRepayAvailable={true}
                                loanRate={4}
                                payBackTurn={8}
                                loanPeriod={20}
                                loanAmount={1000000}
                                loanRemain={300000}
                                warning={false}
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
