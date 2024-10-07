import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ProductCard } from '@components/bank/ProductCard';
import { ProductJoinCard } from '@components/bank/ProductJoinCard';
import { ProductCheckCard } from '@components/bank/ProductCheckCard';
import { Loading } from '@components/root/loading';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import IconChick from '@assets/images/icons/icon_chick.png';

import { getApiClient } from '@stores/apiClient';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    height: 100vh;
`;

const FixedMessageBox = styled.div`
    flex-shrink: 0;
`;

const ProductBlock = styled.div`
    flex-grow: 1;
    width: 100%;
    overflow-y: auto;
    /* max-height: 100%; */
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
`;

const JoinProduct = ({ productType, goToScript }) => {
    const [currentCard, setCurrentCard] = useState(1);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [savingsAmount, setSavingsAmount] = useState(null);
    const [expectedFinalAmount, setExpectedFinalAmount] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        const apiClient = getApiClient();

        try {
            const res = await apiClient.get(`/${productType}`);

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
        if (currentCard > 3) {
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

    const saveAmount = (savingsAmount, expectedFinalAmount) => {
        goToNextCard();
        setSavingsAmount(savingsAmount);
        setExpectedFinalAmount(expectedFinalAmount);
    };

    const joinGuideMessages = {
        1: '가입할 상품을 골라봐.',
        2: '얼마를 저축할거야?',
        3: '가입 정보를 확인하고 서명해줘.',
    };

    return (
        <Block>
            {currentCard < 4 && (
                <FixedMessageBox>
                    <MessageBox>
                        <NormalIcon icon={IconChick} />
                        <div>{joinGuideMessages[currentCard]}</div>
                    </MessageBox>
                </FixedMessageBox>
            )}

            {(() => {
                if (!selectedProduct && currentCard === 1) {
                    return (
                        <ProductBlock>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.typeId}
                                    productName={product.name}
                                    productRate={product.rate}
                                    productPeriod={product.period}
                                    handleClick={() => handleClick(product)}
                                />
                            ))}
                        </ProductBlock>
                    );
                } else if (!savingsAmount && currentCard === 2) {
                    return (
                        <ProductJoinCard
                            productType={productType}
                            productName={selectedProduct.name}
                            productPeriod={selectedProduct.period}
                            productRate={selectedProduct.rate}
                            $isLoan={false}
                            currentTurn={5}
                            maxAmount={10000000}
                            isSavings={productType === 'savings'} // true=적금, false=예금
                            saveAmount={saveAmount}
                        />
                    );
                } else if (savingsAmount && currentCard === 3) {
                    return (
                        <ProductBlock>
                            <ProductCheckCard
                                productType={productType}
                                productTypeId={selectedProduct.typeId}
                                productName={selectedProduct.name}
                                productPeriod={selectedProduct.period}
                                productRate={selectedProduct.rate}
                                currentTurn={5}
                                savingsAmount={savingsAmount}
                                expectedFinalAmount={expectedFinalAmount}
                                specialRate={6} // 캐릭터 특별 능력 없으면 null이거나 0이거나
                                goToScript={goToNextCard}
                            />
                        </ProductBlock>
                    );
                } else if (currentCard === 4) {
                    return <Loading content={'가입 처리중'} />;
                }
            })()}
        </Block>
    );
};

export default JoinProduct;
