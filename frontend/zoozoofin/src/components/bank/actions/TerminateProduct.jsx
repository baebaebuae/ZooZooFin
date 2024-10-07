import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductTerminationCard } from '@components/bank/ProductTerminationCard';
import { ProductTerminationDetailCard } from '@components/bank/ProductTerminationDetailCard';
import { Loading } from '@components/root/loading';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.png';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 20px; */
`;

const ProductContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px; */
`;

const FixedMessageBox = styled.div`
    flex-shrink: 0;
    height: 50px;
    margin-bottom: 20px;
`;

const ProductBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    max-height: 100%;
    height: calc(100vh - 200px); // fixed value...
    /* height: 400px; */
    /* flex-grow: 1; */
    padding: 10px;
    box-sizing: border-box;
`;

const TerminateProduct = ({ productType, goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get(
                `/${productType}/my`,
                {},
                {
                    headers: { animalId: 1 },
                }
            );

            console.log(res.data.body);
            setProducts(res.data.body);
        } catch (error) {
            // console.error('error: ', error);
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
                goToScript();
            }, 2000);

            return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
        }
    }, [currentCard]);

    const goToNextCard = () => {
        setCurrentCard(currentCard + 1);
    };

    const handleClick = (product) => {
        setSelectedProduct(product);
        goToNextCard();
    };

    const terminateGuideMessages = {
        1: '해지할 상품을 골라봐.',
        2: '해지할 상품 정보를 확인하고 서명해줘.',
    };

    return (
        <Block>
            {currentCard < 3 && (
                <FixedMessageBox>
                    <MessageBox>
                        <NormalIcon icon={IconChick} />
                        <div>{terminateGuideMessages[currentCard]}</div>
                    </MessageBox>
                </FixedMessageBox>
            )}

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <ProductContainer>
                            <ProductBlock>
                                {products.map((product) => {
                                    const commonProps = {
                                        productType: productType,
                                        productName: product.name,
                                        period: product.period,
                                        rate: product.rate,
                                        amount: product.amount,
                                        restTurn: product.restTurn,
                                        endTurn: product.endTurn,
                                        handleClick: () => handleClick(product),
                                    };

                                    return (
                                        <ProductTerminationCard
                                            key={
                                                productType === 'deposit'
                                                    ? product.depositId
                                                    : product.savingsId
                                            }
                                            {...commonProps}
                                            {...(productType === 'savings' && {
                                                payment: product.payment,
                                            })} // savings인 경우에만 payment 추가
                                        />
                                    );
                                })}
                            </ProductBlock>
                        </ProductContainer>
                    );
                } else if (currentCard === 2) {
                    return (
                        <ProductBlock>
                            <ProductTerminationDetailCard
                                productType={productType}
                                productId={
                                    productType === 'deposit'
                                        ? selectedProduct.depositId
                                        : selectedProduct.savingsId
                                }
                                productName={selectedProduct.name}
                                period={selectedProduct.period}
                                amount={selectedProduct.amount}
                                payment={selectedProduct.payment}
                                // 현재 턴까지 낸 금액에 0.5% 이율 적용한, 현재 해지시 예상 금액 변수 추가 예정
                                deleteReturn={selectedProduct.deleteReturn}
                                restTurn={selectedProduct.restTurn}
                                endTurn={selectedProduct.endTurn}
                                goToScript={goToNextCard}
                                {...(productType === 'savings' && {
                                    payment: selectedProduct.payment,
                                    warning: selectedProduct.warning,
                                })}
                            />
                        </ProductBlock>
                    );
                } else if (currentCard === 3) {
                    return <Loading content={'해지 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default TerminateProduct;
