// 상단 토글
// ex. 예적금|대출 .. 밖에 없긴 하지만 일단 분류
import styled from 'styled-components';
import { useState } from 'react';

const SwitchBox = styled.div``;

const SwitchButton = styled.div`
    width: 150px;
    padding: 10px 0px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 5px solid
        ${({ $isActive }) =>
            $isActive
                ? ({ theme }) => theme.colors.primaryDeep
                : ({ theme }) => theme.colors.background};
    cursor: pointer;
    background-color: transparent;
`;
const SwitchButtonBox = styled.div`
    display: flex;
`;

const SwitchContent = styled.div``;

export const Switch = () => {
    const switchData = [
        { id: 1, title: '예적금', content: '예적금 정보' },
        { id: 2, title: '대출', content: '대출 정보' },
    ];
    const [activeTab, setActiveTab] = useState(switchData[0].id);
    return (
        <>
            <SwitchBox>
                <SwitchButtonBox>
                    {switchData.map((tab) => (
                        <SwitchButton
                            key={tab.id}
                            $isActive={activeTab === tab.id}
                            // 경고문
                            // isActive라는 prop이 tyled-component까지는 전달되지만,
                            // html로는 전달되지 않도록 앞에 $ 붙여줘야함
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.title}
                        </SwitchButton>
                    ))}
                </SwitchButtonBox>
                <SwitchContent>{switchData[activeTab - 1].content}</SwitchContent>
            </SwitchBox>
        </>
    );
};
