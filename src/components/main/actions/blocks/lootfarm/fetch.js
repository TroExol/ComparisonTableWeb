import Axios from 'axios';

import {SetLootfarmItems} from './setItems';
import {SetLootfarmIsLoading} from './setIsLoading';

const Fetch = () => async dispatch => {
    try {
        dispatch(SetLootfarmIsLoading(true));

        const {data} = await Axios.get('http://localhost:7001/items/lootfarm');

        dispatch(SetLootfarmItems(data));
        dispatch(SetLootfarmIsLoading(false));

        return data;
    } catch (error) {
        console.error(error?.message);
        dispatch(SetLootfarmItems([]));
        dispatch(SetLootfarmIsLoading(false));
        return [];
    }
};

export default Fetch;