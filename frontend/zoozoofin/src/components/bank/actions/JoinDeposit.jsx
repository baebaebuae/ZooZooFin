import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const JoinDeposit = () => {
    const [currentCard, setCurrentCard] = useState(1);

    const joinGuideMessages = {
        1: '가입할 상품을 골라봐.',
        2: '얼마를 저축할거야?',
        3: '가입 정보를 확인하고 서명해줘.',
    };

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 상품 정보 받아오기
    const fetchProducts = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/deposit`,
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

    const handleClick = (product) => {
        console.log('handleClick 클릭됨');
        setSelectedProduct(product);
        setCurrentCard(currentCard + 1);
    };

    return (
        <Block>
            <MessageBox>
                <NormalIcon icon={IconChick} />
                <div>{joinGuideMessages[currentCard]}</div>
            </MessageBox>
            <button onClick={handleClick}>다음</button>

            {!selectedProduct ? (
                <div>
                    {products.map((product) => (
                        <ProductCard
                            key={product.depositTypeId}
                            productName={product.depositName}
                            productRate={product.depositRate}
                            productPeriod={product.depositPeriod}
                            handleClick={() => handleClick(product)} // 선택된 상품 저장
                        />
                    ))}
                </div>
            ) : (
                <ProductJoinCard
                    productName={selectedProduct.depositName}
                    productPeriod={selectedProduct.depositPeriod}
                    productRate={selectedProduct.depositRate}
                    isLoan={false}
                    currentTurn={5}
                    maxAmount={10000000}
                    isSavings={false}
                />
            )}
        </Block>
    );
};

export default JoinDeposit;
