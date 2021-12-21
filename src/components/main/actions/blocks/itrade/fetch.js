import Axios from 'axios';

import {SetItradeItems} from './setItems';
import {SetItradeIsLoading} from './setIsLoading';

const Fetch = () => async (dispatch) => {
    try {
        dispatch(SetItradeIsLoading(true));
        
        const {data} = await Axios.get('http://localhost:7000/items/itrade');
        
        dispatch(SetItradeItems(data));
    } catch (error) {
        console.error('При загрузке предметов itrade.gg произошла ошибка', error);
        dispatch(SetItradeItems([]));
    } finally {
        dispatch(SetItradeIsLoading(false));
    }
};

export default Fetch;