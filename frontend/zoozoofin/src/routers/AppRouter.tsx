import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Juju from '../pages/test/Juju';
import JJHoney from '../pages/test/JJHoney';
import Sinijini from '../pages/test/Sinijini';
import Jignonne from '../pages/test/Jignonne';

import Start from '../pages/Start';
import LayoutInGame from '../components/LayoutInGame';

import Bank from '../pages/Bank';
import Ending from '../pages/Ending';
import MyRoom from '../pages/MyRoom';
import Map from '../pages/Map';
import Laptop from '../pages/Laptop';
import Lender from '../pages/Lender';
import School from '../pages/School';
import Stock from '../pages/Stock';
import Tutorial from '../pages/Tutorial';
import Work from '../pages/Work';
import WalletPage from '../pages/test/WalletPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/start" />} />
            <Route path="/start" element={<Start />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/map" element={<Map />} />
            <Route element={<LayoutInGame />}>
                <Route path="/bank" element={<Bank />} />
                <Route path="/laptop" element={<Laptop />} />
                <Route path="/lender" element={<Lender />} />
                <Route path="/school" element={<School />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/work" element={<Work />} />
                <Route path="/myroom" element={<MyRoom />} />
            </Route>
            <Route path="/ending" element={<Ending />} />
            <Route path="/wallet" element={<WalletPage />} />

            <Route path="/juju" element={<Juju />} />
            <Route path="/jjhoney" element={<JJHoney />} />
            <Route path="/sinijini" element={<Sinijini />} />
            <Route path="/jignonne" element={<Jignonne />} />
        </Routes>
    );
};
export default AppRouter;
