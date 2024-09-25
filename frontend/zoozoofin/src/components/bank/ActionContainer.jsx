import styled from 'styled-components';
import JoinDeposit from '@components/bank/actions/JoinDeposit';
import TerminateDeposit from '@components/bank/actions/TerminateDeposit';
import { Link } from 'react-router-dom';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

// currentAction: script에서 예금 가입/예금 해지/적금 가입/.../대출 가입 등 받아옴
const ActionContainer = ({ currentAction }) => {
    const renderComponent = () => {
        switch (currentAction) {
            case 'joinDeposit':
                return <JoinDeposit />;
            case 'terminateDeposit':
                return <TerminateDeposit />;

            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    };

    return (
        <Block>
            <Link to="/bank">BankMain</Link>

            {/* currentAction에 따라 Component 렌더링 */}
            {renderComponent()}
        </Block>
    );
};

export default ActionContainer;
