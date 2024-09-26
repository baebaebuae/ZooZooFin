import styled from 'styled-components';
import JoinProduct from '@components/bank/actions/JoinProduct';
import TerminateProduct from '@components/bank/actions/TerminateProduct';

const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

// currentAction: script에서 예금 가입/예금 해지/적금 가입/.../대출 가입 등 받아옴
const ActionContainer = ({ currentAction }) => {
    // switch문 말고 currentAction에 'join'이 포함되어 있으면- <Join>으로 이동하는 방식이 더 좋을수도(예/적금 재활용)
    // 예금, 대출 구현하고 결정
    const renderComponent = () => {
        switch (currentAction) {
            case 'joinDeposit':
                return <JoinProduct productType={'deposit'} />;
            case 'joinSavings':
                return <JoinProduct productType={'savings'} />;
            case 'terminateDeposit':
                return <TerminateProduct productType={'deposit'} />;
            case 'terminatSavings':
                return <TerminateProduct productType={'savings'} />;
            default:
                return <div>해당하는 페이지가 없어요. 현재 Action을 확인해주세요.</div>;
        }
    };

    return (
        <Block>
            {/* currentAction에 따라 Component 렌더링 */}
            {renderComponent()}
        </Block>
    );
};

export default ActionContainer;
