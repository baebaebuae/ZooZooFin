import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import { ProductCard } from '@components/bank/ProductCard';
import { ProductJoinCard } from '@components/bank/ProductJoinCard';
import { ProductCheckCard } from '@components/bank/ProductCheckCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const JoinProduct = ({ productType }) => {
    const [currentCard, setCurrentCard] = useState(1);

    const joinGuideMessages = {
        1: '가입할 상품을 골라봐.',
        2: '얼마를 저축할거야?',
        3: '가입 정보를 확인하고 서명해줘.',
    };

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [savingsAmount, setSavingsAmount] = useState(null);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/${productType}`,
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                    'Access-Control-Allow-Origin': `http://localhost:5173`,
                    'Access-Control-Allow-Credentials': 'true',
                },
            });
            if (res.status === 200) {
                // console.log(res.data.body);
                setProducts(res.data.body);
            }
        } catch (error) {
            // console.error('error: ', error);
            return error;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {}, [products]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const handleClick = (product) => {
        setSelectedProduct(product);
        goToNextCard();
    };

    const saveAmount = (savingsAmount, expectedFinalAmount) => {
        goToNextCard();
        setSavingsAmount(savingsAmount);
        setExpectedFinalAmount(expectedFinalAmount);
    };

    return (
        <Block>
            {currentCard < 4 && (
                <MessageBox>
                    <NormalIcon icon={IconChick} />
                    <div>{joinGuideMessages[currentCard]}</div>
                </MessageBox>
            )}

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <div>
                            {products.map((product) =>
                                // productType 조건 처리 -- 좀 불필요해서 백엔드에 변수명 변경 요청
                                productType === 'deposit' ? (
                                    <ProductCard
                                        key={product.depositTypeId}
                                        productName={product.depositName}
                                        productRate={product.depositRate}
                                        productPeriod={product.depositPeriod}
                                        handleClick={() => handleClick(product)} // 선택된 상품 저장
                                    />
                                ) : (
                                    <ProductCard
                                        key={product.savingsTypeId}
                                        productName={product.savingsName}
                                        productRate={product.savingsRate}
                                        productPeriod={product.savingsPeriod}
                                        handleClick={() => handleClick(product)} // 선택된 상품 저장
                                    />
                                )
                            )}
                        </div>
                    );
                } else if (!savingsAmount && currentCard === 2) {
                    return (
                        <ProductJoinCard
                            productName={selectedProduct.depositName}
                            productPeriod={selectedProduct.depositPeriod}
                            productRate={selectedProduct.depositRate}
                            isLoan={false}
                            currentTurn={5}
                            maxAmount={10000000}
                            isSavings={false} // true=적금, false=예금
                            saveAmount={saveAmount}
                        />
                    );
                } else if (savingsAmount && currentCard === 3) {
                    return (
                        <ProductCheckCard
                            productName={selectedProduct.depositName}
                            productPeriod={selectedProduct.depositPeriod}
                            productRate={selectedProduct.depositRate}
                            currentTurn={5}
                            savingsAmount={savingsAmount}
                            expectedFinalAmount={expectedFinalAmount}
                            specialRate={6} // 캐릭터 특별 능력 없으면 null이거나 0이거나
                            goToScript={goToNextCard}
                        />
                    );
                }
            })()}
        </Block>
    );
};

export default JoinProduct;
