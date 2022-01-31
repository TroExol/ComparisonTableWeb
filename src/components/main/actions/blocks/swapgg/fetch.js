import Axios from 'axios';

import {SetSwapggItems} from './setItems';
import {SetSwapggIsLoading} from './setIsLoading';

const Fetch = () => async (dispatch) => {
    try {
        dispatch(SetSwapggIsLoading(true));
        
        const {data} = await Axios.get('http://localhost:7001/items/swapgg');
        
        dispatch(SetSwapggItems(data));
    } catch (error) {
        console.error(error?.message);
        dispatch(SetSwapggItems([]));
    } finally {
        dispatch(SetSwapggIsLoading(false));
    }
};

export default Fetch;