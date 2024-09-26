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

    // selectedProduct로 그대로 바꿔질것

    // 임시 예금 데이터
    // const tempProduct = {
    //     productId: 1,
    //     name: '예금이름',
    //     period: 5,
    //     rate: 3,
    //     amount: 3000000,
    //     finalReturn: 1600000,
    //     restTurn: 2,
    //     endTurn: 13,
    // };

    // 임시 적금 데이터
    const tempProduct = {
        productId: 1,
        name: '적금이름',
        period: 5,
        rate: 3,
        amount: 100000,
        payment: 300000, // 이게 뭐지?
        finalReturn: 1600000,
        restTurn: 2,
        endTurn: 13,
        warning: false,
    };

    // "savingsId": 0,
    // "name": "string",
    // "period": 0,
    // "amount": 0,
    // "payment": 0,
    // "finalReturn": 0,
    // "restTurn": 0,
    // "endTurn": 0,
    // "warning": true,

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
                        <div>
                            {/* {products.map((product) => ( */}

                            <ProductTerminationCard
                                // key={tempProduct.savingsId}
                                productName={tempProduct.name}
                                period={tempProduct.period}
                                rate={tempProduct.rate}
                                savingsAmount={tempProduct.amount}
                                restTurn={tempProduct.restTurn}
                                endTurn={tempProduct.endTurn}
                                // handleClick={handleClick(product)}
                                handleClick={() => handleClick(tempProduct)}
                            />
                            {/* ))} */}
                        </div>
                    );
                } else if (currentCard === 2) {
                    return (
                        <ProductTerminationDetailCard
                            productName={selectedProduct.name}
                            period={selectedProduct.period}
                            savingsAmount={selectedProduct.amount}
                            finalReturn={selectedProduct.finalReturn}
                            restTurn={selectedProduct.restTurn}
                            endTurn={selectedProduct.endTurn}
                            goToNextCard={goToNextCard}
                        />
                    );
                }
            })()}
        </Block>
    );
};

export default TerminateProduct;
