import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import store from './store';

import LootfarmToRustTm from './components/LootfarmToRustTm';
import ItradeToRustTm from './components/ItradeToRustTm';
import LootfarmToItrade from './components/LootfarmToItrade';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <div>
                    <Routes>
                        <Route index element={<LootfarmToRustTm />} />
                        <Route path="/lootfarm2rusttm" element={<LootfarmToRustTm />} />
                        <Route path="/itrade2rusttm" element={<ItradeToRustTm />} />
                        <Route path="/lootfarm2itrade" element={<LootfarmToItrade />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
