import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { ProductTerminationCard } from '@components/bank/ProductTerminationCard';
import { ProductTerminationDetailCard } from '@components/bank/ProductTerminationDetailCard';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.svg?react';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const TerminateProduct = ({ productType }) => {
    const [currentCard, setCurrentCard] = useState(1);

    const terminateGuideMessages = {
        1: '해지할 상품을 골라봐.',
        2: '해지할 상품 정보를 확인하고 서명해줘.',
    };

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/${productType}/my`,
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
                    'Access-Control-Allow-Origin': `http://localhost:5173`,
                    'Access-Control-Allow-Credentials': 'true',
                },
            });
            if (res.status === 200) {
                console.log(res.data.body);
                setProducts(res.data.body);
            }
        } catch (error) {
            console.error('error: ', error);
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

    // 임시 예금 데이터
    // const tempProducts = [
    //     {
    //         productId: 1,
    //         name: '예금이름',
    //         period: 5,
    //         rate: 3,
    //         amount: 3000000,
    //         finalReturn: 3100000,
    //         restTurn: 2,
    //         endTurn: 13,
    //     },
    // ];

    // 임시 적금 데이터
    const tempProducts = [
        {
            productId: 1,
            name: '적금이름1',
            period: 5,
            rate: 3,
            amount: 180000,
            payment: 60000,
            finalReturn: 187290,
            restTurn: 2,
            endTurn: 13,
            warning: false,
        },
        {
            productId: 2,
            name: '적금이름2',
            period: 10,
            rate: 10,
            amount: 450000,
            payment: 90000, // 적금에만 있는 변수
            finalReturn: 451240,
            restTurn: 5,
            endTurn: 13,
            warning: true, // 적금에만 있는 변수
        },
    ];

    return (
        <Block>
            {currentCard < 3 && (
                <MessageBox>
                    <NormalIcon icon={IconChick} />
                    <div>{terminateGuideMessages[currentCard]}</div>
                </MessageBox>
            )}

            <button onClick={handleClick}>다음</button>

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <Block>
                            {tempProducts.map((product) => {
                                const commonProps = {
                                    productType: productType,
                                    productName: product.name,
                                    period: product.period,
                                    rate: product.rate,
                                    amount: product.amount,
                                    savingsAmount: product.amount,
                                    restTurn: product.restTurn,
                                    endTurn: product.endTurn,
                                    handleClick: () => handleClick(product),
                                };

                                return (
                                    <ProductTerminationCard
                                        key={product.productId}
                                        {...commonProps} // 공통 props 스프레드
                                        {...(productType === 'savings' && {
                                            payment: product.payment,
                                        })} // savings인 경우에만 payment 추가
                                    />
                                );
                            })}
                        </Block>
                    );
                } else if (currentCard === 2) {
                    return (
                        <ProductTerminationDetailCard
                            productType={productType}
                            productName={selectedProduct.name}
                            period={selectedProduct.period}
                            amount={selectedProduct.amount}
                            finalReturn={selectedProduct.finalReturn}
                            restTurn={selectedProduct.restTurn}
                            endTurn={selectedProduct.endTurn}
                            goToNextCard={goToNextCard}
                            {...(productType === 'savings' && {
                                payment: selectedProduct.payment,
                                warning: selectedProduct.warning,
                            })}
                        />
                    );
                }
            })()}
        </Block>
    );
};

export default TerminateProduct;
