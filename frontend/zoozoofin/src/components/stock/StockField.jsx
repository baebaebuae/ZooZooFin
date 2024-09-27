import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { DefaultField } from './StockComponent';
import { DefaultFieldIcon, ActiveFieldIcon } from './StockIcons'; // ActiveFieldIcon도 임포트 필요

// StockFieldList 정의
const StockFieldList = {
    Manufacturing: '제조',
    Ship: '조선',
    IT: 'IT',
    Entertainment: '엔터',
    Bio: '바이오',
    Food: '식품',
    Chemistry: '화학',
    Bank: '금융',
};

// Carousel Div
const FieldBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 110%;
    padding: 15px 0;
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
    width: max-content;
    gap: 20px;
`;

// 무한 스크롤 원리 적용
const StockField = () => {
    const fieldBoxRef = useRef(null);
    const [items, setItems] = useState(Object.entries(StockFieldList));
    const [activeIndex, setActiveIndex] = useState(null); // 활성화된 필드의 인덱스를 관리

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
        setItems((prevItems) => [...prevItems, ...Object.entries(StockFieldList)]);
    };

    useEffect(() => {
        const fieldBox = fieldBoxRef.current;

        fieldBox.addEventListener('scroll', handleScroll);

        // 컴포넌트 unmount 시 이벤트 제거
        return () => {
            fieldBox.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 아이템 클릭 시 활성화된 인덱스를 설정하는 함수
    const handleFieldClick = (index, key) => {
        setActiveIndex(index); // 클릭한 필드의 인덱스를 저장
        console.log(`Clicked key : ${key}!!`);
    };

    return (
        <FieldBox ref={fieldBoxRef}>
            <Wrapper>
                {items.map(([key, value], index) => (
                    <DefaultField key={index} onClick={() => handleFieldClick(index, key)}>
                        {/* 클릭된 인덱스와 현재 인덱스가 같으면 ActiveFieldIcon, 아니면 DefaultFieldIcon */}
                        {activeIndex === index ? (
                            <ActiveFieldIcon field={key} />
                        ) : (
                            <DefaultFieldIcon field={key} />
                        )}
                        {value}
                    </DefaultField>
                ))}
            </Wrapper>
        </FieldBox>
    );
};

export default StockField;
