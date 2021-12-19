import Axios from 'axios';

import {SetValute} from './set';

const Fetch = () => async (dispatch) => {
    try {
        const {data: {value}} = await Axios.get('http://localhost:7000/valute/usd');
        
        dispatch(SetValute(value));
    } catch (error) {
        console.error('При загрузке предметов валюты USD произошла ошибка', error);
    }
};

export default Fetch;