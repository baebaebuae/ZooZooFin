import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
    DefaultField,
    AtciveText,
    DefaultText,
} from '@components/stock/common/container/FieldIconContainer';
import { DefaultFieldIcon, ActiveFieldIcon } from '@components/stock/common/icon/StockIcons';
import { useUserStockStore } from '../common/store/StockStore';

// 채널 별 주식 분야 리스트
export const StockFieldList = {
    domestic: {
        Manufacturing: '제조',
        Ship: '조선',
        IT: 'IT',
        Entertainment: '엔터',
        Bio: '바이오',
        Food: '식품',
        Chemistry: '화학',
        Bank: '금융',
    },
    overseas: {
        Manufacturing: '제조',
        Micro: '반도체',
        IT: 'IT',
        Entertainment: '엔터',
        Bio: '바이오',
        Food: '식품',
        Oil: '화학/정유',
        Bank: '금융',
    },
    ETF: {
        Energy: '에너지/화학',
        Micro: '반도체',
        IT: 'IT',
        House: '리츠',
        Bio: '바이오',
        China: '중국',
        Construction: '기계/건설',
        Bank: '금융',
    },
};

const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

// 환율
const ExchangeRatebox = styled.div`
    display: ${({ field }) => (field === 'overseas' ? 'flex' : 'none')};
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 8px 10px 2px;
    gap: 30px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 5px solid ${({ theme }) => theme.colors.primary};
    border-radius: 15px 15px 0px 0px;
    width: 65%;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    margin: 0 auto;
`;

// 환율 가격 컨테이너
const PriceContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    height: 20px;
    gap: 8px;
`;

const TextStyle = styled.div`
    margin: auto 0px;
    color: ${({ theme, type, now }) =>
        type === 'list'
            ? theme.colors.gray
            : now === 'up'
              ? theme.colors.warn
              : now === 'down'
                ? theme.colors.primaryDeep
                : 'black'};
    font-size: ${({ size }) => (size === 'small' ? '12px' : '15px')};
    font-weight: ${({ type }) => (type === 'content' ? 'bold' : 'normal')};
`;

// Carousel Div
const FieldBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 110%;
    padding: 25px 0;
    gap: 30px;
    background: rgba(217, 217, 217, 0.6);
    border: 6px solid ${({ theme }) => theme.colors.primary};
    overflow-x: auto;
    &::-webkit-scrollbar {
        display: none; /* 스크롤 바 숨기기 */
    }
`;

// 무한 스크롤을 위한 Wrapper
const Wrapper = styled.div`
    display: flex;
    padding-left: 10px;
    width: max-content;
    gap: 20px;
`;

// 보유 주식 필드 조회
const getMyStockFields = (nowItems, field) => {
    const searchFields = StockFieldList[field];
    const result = [];

    Object.entries(searchFields).forEach(([key, value]) => {
        if (nowItems.includes(value)) {
            result[key] = value; // 일치하는 key-value 쌍을 result에 추가
        }
    });

    return result;
};

// 무한 스크롤 원리 적용
const StockField = ({ field, type, onFieldSelect }) => {
    const fieldBoxRef = useRef(null);
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [items, setItems] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null); // 활성화된 필드의 인덱스를 관리

    const { myDomesticStocks, myOverseasStocks, myETFStocks } = useUserStockStore();
    // 데이터 로드 함수
    const loadItems = () => {
        let nowItems = [];
        let result = {};

        if (type === 'buy') {
            nowItems = Object.entries(StockFieldList[field]);
            console.log(nowItems);
            setItems(nowItems);
            setLoading(false);
        } else if (type === 'sell') {
            if (field === 'domestic') {
                nowItems = myDomesticStocks.holdingsList.map((item) => item.stockField);
            } else if (field === 'overseas') {
                nowItems = myOverseasStocks.holdingsList.map((item) => item.stockField);
            } else if (field === 'ETF') {
                nowItems = myETFStocks.holdingsList.map((item) => item.stockField);
            }

            result = getMyStockFields(nowItems, field);
            setItems(Object.entries(result)); // 객체를 배열로 변환
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems(); // 데이터 로드
    }, [type, field]); // type과 field가 변경될 때마다 호출

    // 스크롤이 끝에 도달했는지 확인하는 함수
    const handleScroll = () => {
        const fieldBox = fieldBoxRef.current;

        if (fieldBox.scrollLeft + fieldBox.clientWidth >= fieldBox.scrollWidth - 10) {
            // 스크롤이 끝에 도달하면 분야 리스트 다시 추가
            addMoreItems();
        }
    };

    // 리스트에 아이템 추가하는 함수
    const addMoreItems = () => {
        setItems((prevItems) => [...prevItems, ...Object.entries(StockFieldList[field])]);
    };

    useEffect(() => {
        const fieldBox = fieldBoxRef.current;

        fieldBox.addEventListener('scroll', handleScroll);

        // 컴포넌트 unmount 시 이벤트 제거
        return () => {
            fieldBox.removeEventListener('scroll', handleScroll);
        };
    });

    // 아이템 클릭 시 활성화된 인덱스를 설정하는 함수
    const handleFieldClick = (index, key) => {
        setActiveIndex(index); // 클릭한 필드의 인덱스를 저장
        onFieldSelect(key);
    };

    return (
        <FieldContainer>
            <ExchangeRatebox field={type}>
                <TextContainer>
                    <TextStyle type="list">오늘의 환율</TextStyle>
                </TextContainer>
                {/* 환율 금액 업데이트 예정 */}
                <PriceContainer>
                    <TextStyle type="content" size="large">
                        1342.25
                    </TextStyle>
                    <TextStyle size="small" now="up">
                        00.0%
                    </TextStyle>
                </PriceContainer>
            </ExchangeRatebox>
            <FieldBox ref={fieldBoxRef}>
                <Wrapper>
                    {loading ? (
                        <div>주식 분야 확인 중 . . .</div>
                    ) : (
                        items.map(([key, value], index) => (
                            <DefaultField
                                key={index}
                                onClick={() => handleFieldClick(index, value)}
                            >
                                {/* 클릭된 인덱스와 현재 인덱스가 같으면 ActiveFieldIcon, 아니면 DefaultFieldIcon */}
                                {activeIndex === index ? (
                                    <ActiveFieldIcon field={key} />
                                ) : (
                                    <DefaultFieldIcon field={key} />
                                )}
                                {activeIndex === index ? (
                                    <AtciveText>{value}</AtciveText>
                                ) : (
                                    <DefaultText>{value}</DefaultText>
                                )}
                            </DefaultField>
                        ))
                    )}
                </Wrapper>
            </FieldBox>
        </FieldContainer>
    );
};

export default StockField;
