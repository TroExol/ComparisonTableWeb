import Axios from 'axios';

import {SetRustTmItems} from './setItems';
import {SetRustTmIsLoading} from './setIsLoading';

const Fetch = () => async dispatch => {
    try {
        dispatch(SetRustTmIsLoading(true));

        const {data} = await Axios.get('http://localhost:7001/items/rusttm');

        dispatch(SetRustTmItems(data));
        dispatch(SetRustTmIsLoading(false));

        return data;
    } catch (error) {
        console.error(error?.message);
        dispatch(SetRustTmItems([]));
        dispatch(SetRustTmIsLoading(false));

        return [];
    }
};

export default Fetch;