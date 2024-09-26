import styled from 'styled-components';
import ActionContainer from '@components/bank/ActionContainer.jsx';
import { Link } from 'react-router-dom';

const BankBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Bank = () => {
    return (
        <BankBlock>
            <Link to="/bankcomp">ComponentsBank</Link>
            <Link to="/bank">BankMain</Link>

            {/* type==='script'일 때 */}
            {/* <BubbleBlock /> 렌더링 */}
            {/* script id 더하는 함수 작동 예정 */}

            {/* type==='action'일 때 */}
            <ActionContainer currentAction={'joinDeposit'} />
            {/* <ActionContainer currentAction={'terminateDeposit'} /> */}
            {/* 해당 action명 받아서 ActionContainer의 content 전환 */}
            {/* 단일 id */}
        </BankBlock>
    );
};

export default Bank;
