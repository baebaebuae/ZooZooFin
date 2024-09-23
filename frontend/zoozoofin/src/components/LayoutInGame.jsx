import { Outlet } from 'react-router-dom';

import Header from './Header';

const LayoutInGame = () => {
    // const showHeader = location.pathname !== '/start' && location.pathname !==  '/loading'
    // 없어도 돌아가긴 하는데 일단 두겠습니다

    return (
        <div>
            {/* {showHeader && <Header />} */}

            <Header />
            <Outlet />
        </div>
    );
};

export default LayoutInGame;
