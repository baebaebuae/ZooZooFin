import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { NormalIcon } from '@components/root/icon';
import IconChicken from '@assets/images/icons/icon_chicken.svg?react';
import { ProductDetailInfo } from '@components/root/productDetailInfo';
import { Card } from '@components/root/card';

const ProductName = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ProductCards = ({ handleClick }) => {
    const [products, setProducts] = useState([]);

    // axios 실행 함수
    const fetchSavings = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_URL}/savings`,
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
        fetchSavings();
    }, []);

    useEffect(() => {
        // console.log('Products State: ', products);
    }, [products]);

    return (
        <>
            {products.length > 0 ? (
                products.map((product) => (
                    <Card key={product.savingsTypeId} onClick={handleClick}>
                        <NormalIcon icon={IconChicken}></NormalIcon>
                        <ProductName>{product.savingsName}</ProductName>
                        <ProductDetailInfo
                            infoTitle1={'기간'}
                            infoContent1={`${product.savingsPeriod}턴`}
                            infoTitle2={'이율'}
                            infoContent2={`${product.savingsRate}%`}
                            $isLoan={false}
                            isEarlyTermination={false}
                        ></ProductDetailInfo>
                    </Card>
                ))
            ) : (
                <div>로딩중</div>
            )}
        </>
    );
};
