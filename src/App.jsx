import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import store from './store';

// import LootfarmToRustTm from './components/LootfarmToRustTm';
// import ItradeToRustTm from './components/ItradeToRustTm';
import LootfarmToItrade from './components/LootfarmToItrade';
import ItradeToLootfarm from './components/ItradeToLootfarm';
// import SwapggToRustTm from './components/SwapggToRustTm';
import LootfarmToSwapgg from './components/LootfarmToSwapgg';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar/>
                <div>
                    <Routes>
                        {/*<Route*/}
                        {/*    index*/}
                        {/*    element={<LootfarmToRustTm/>}/>*/}
                        {/*<Route*/}
                        {/*    path='/lootfarm2rusttm'*/}
                        {/*    element={<LootfarmToRustTm/>}/>*/}
                        {/*<Route*/}
                        {/*    path='/itrade2rusttm'*/}
                        {/*    element={<ItradeToRustTm/>}/>*/}
                        <Route
                            path='/lootfarm2itrade'
                            element={<LootfarmToItrade/>}/>
                        <Route
                            path='/itrade2lootfarm'
                            element={<ItradeToLootfarm/>}/>
                        {/*<Route*/}
                        {/*    path='/swapgg2rusttm'*/}
                        {/*    element={<SwapggToRustTm/>}/>*/}
                        <Route
                            path='/lootfarm2swapgg'
                            element={<LootfarmToSwapgg/>}/>
                        <Route
                            path='*'
                            element={<Navigate to='/lootfarm2itrade' replace/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
