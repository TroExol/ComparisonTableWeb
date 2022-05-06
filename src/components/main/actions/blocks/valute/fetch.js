import Axios from 'axios';

import {SetValute} from './set';

const Fetch = () => async dispatch => {
    try {
        const {data: {value}} = await Axios.get('http://localhost:7001/valute/usd');

        dispatch(SetValute(value));

        return value;
    } catch (error) {
        console.error(error?.message);

        return null;
    }
};

export default Fetch;