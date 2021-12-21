import Axios from 'axios';

import {SetRustTmItems} from './setItems';
import {SetRustTmIsLoading} from './setIsLoading';

const Fetch = () => async (dispatch) => {
    try {
        dispatch(SetRustTmIsLoading(true));
    
        const {data} = await Axios.get('http://localhost:7000/items/rusttm');
        
        dispatch(SetRustTmItems(data));
    } catch (error) {
        console.error('При загрузке предметов rust.tm произошла ошибка', error);
    } finally {
        dispatch(SetRustTmIsLoading(false));
    }
};

export default Fetch;