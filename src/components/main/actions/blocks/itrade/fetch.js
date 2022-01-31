import Axios from 'axios';

import {SetItradeItems} from './setItems';
import {SetItradeIsLoading} from './setIsLoading';

const Fetch = () => async (dispatch) => {
    try {
        dispatch(SetItradeIsLoading(true));
        
        const {data} = await Axios.get('http://localhost:7001/items/itrade');
        
        dispatch(SetItradeItems(data));
    } catch (error) {
        console.error(error?.message);
        dispatch(SetItradeItems([]));
    } finally {
        dispatch(SetItradeIsLoading(false));
    }
};

export default Fetch;