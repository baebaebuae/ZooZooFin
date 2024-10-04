import { useState } from 'react';

import { Bill } from '@components/Bill';

const MyRoom = () => {
    const [isBillShown, setIsBillShown] = useState(false); // 전역으로 관리 예정

    const checkBill = () => {
        setIsBillShown(true);
    };

    return (
        <>
            <h1>내 방</h1>
            {!isBillShown && <Bill checkBill={() => checkBill()} />}
        </>
    );
};

export default MyRoom;
