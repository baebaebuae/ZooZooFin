// 상단 토글
// ex. 예적금|대출 .. 밖에 없긴 하지만 일단 분류
import styled from 'styled-components';
import { useState } from 'react';

const SwitchBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SwitchButton = styled.div`
    width: 150px;
    padding: 10px 0px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
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

export const Switch = ({ onTabChange }) => {
    const switchData = [
        { id: 1, content: '예적금' },
        { id: 2, content: '대출' },
    ];
    const [activeTab, setActiveTab] = useState(switchData[0].id);

    const handleTabChange = (tab) => {
        setActiveTab(tab.id);
        onTabChange(tab.content);
    };

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
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab.content}
                        </SwitchButton>
                    ))}
                </SwitchButtonBox>
            </SwitchBox>
        </>
    );
};
