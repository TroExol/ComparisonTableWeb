import React from 'react';

import store from './store'

import Table from './components/Table';
import {Provider} from 'react-redux';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Table />
            </div>
        </Provider>
    );
};

export default App;
