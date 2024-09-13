// import React from 'react';
import { Link } from 'react-router-dom';

const Map = () => {
    return (
        <>
            <h1>지도</h1>
            <div>
                <Link to="/bank">은행</Link>
            </div>
            <div>
                <Link to="/myroom">내 방</Link>
            </div>
            <div>
                <Link to="/lender">콩팥 캐피탈</Link>
            </div>
            <div>
                <Link to="/school">학교</Link>
            </div>
            <div>
                <Link to="/work">당근게임</Link>
            </div>
        </>
    );
};

export default Map;
