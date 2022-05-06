import Axios from 'axios';

import {SetItradeItems} from './setItems';
import {SetItradeIsLoading} from './setIsLoading';

const Fetch = () => async dispatch => {
    try {
        dispatch(SetItradeIsLoading(true));

        const {data} = await Axios.get('http://localhost:7001/items/itrade');

        dispatch(SetItradeItems(data));
        dispatch(SetItradeIsLoading(false));

        return data;
    } catch (error) {
        console.error(error?.message);
        dispatch(SetItradeItems([]));
        dispatch(SetItradeIsLoading(false));

        return [];
    }
};

export default Fetch;