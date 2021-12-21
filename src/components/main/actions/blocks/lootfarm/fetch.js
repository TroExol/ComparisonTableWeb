import Axios from 'axios';

import {SetLootfarmItems} from './setItems';
import {SetLootfarmIsLoading} from './setIsLoading';

const Fetch = () => async (dispatch) => {
    try {
        dispatch(SetLootfarmIsLoading(true));
        
        const {data} = await Axios.get('http://localhost:7000/items/lootfarm');
        
        dispatch(SetLootfarmItems(data));
    } catch (error) {
        console.error('При загрузке предметов loot.farm произошла ошибка', error);
        dispatch(SetLootfarmItems([]));
    } finally {
        dispatch(SetLootfarmIsLoading(false));
    }
};

export default Fetch;