import { useState } from 'react';
import styled from 'styled-components';

import { MessageBox } from '@components/root/messageBox';
import { NormalIcon } from '@components/root/icon';
import CharBoar from '@assets/images/characters/boar.png';

import { Card, Divider } from '@components/root/card';
import { StampButton } from '@components/root/buttons';
import { StampModal } from '@components/root/stampModal';

import { ProductDetailInfo, ProductJoinInfo } from '@components/root/productDetailInfo';
import useCapitalStore from '@components/lender/store/CapitalStore';
import CapitalCheckCard from '@components/lender/CheckCapitalCard';

import { getApiClient } from '@stores/apiClient';

const Message = styled(MessageBox)`
    width: 75%;
`;

const joinLoan = async (capitalAmounts, capitalPeriod) => {
    // 현재 소셜 로그인 후 script 연결 되지 않음
    // api 요청 함수 작성 완료
    // test 추후 예정
    // const apiClient = getApiClient();
    console.log('capitalAmounts : ', capitalAmounts);
    console.log('capitalPeriod : ', capitalPeriod);
    const productData = {
        capitalAmounts: capitalAmounts,
        capitalPeriod: capitalPeriod,
    };

    return;
};

const CapitalCheck = ({ goToNextScript }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { loanAmount, loanPeriod } = useCapitalStore();
    return (
        <>
            <Message>
                <NormalIcon icon={CharBoar} />
                내용을 확인하고 서명하라고!
            </Message>
            <CapitalCheckCard />
            <StampButton onClick={() => setIsModalOpen(true)} />

            {isModalOpen && (
                <StampModal
                    action={() => joinLoan(loanAmount, loanPeriod)}
                    goToScript={goToNextScript}
                    handleCloseModal={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default CapitalCheck;
