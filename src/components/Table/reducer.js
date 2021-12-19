import DefaultState from './defaultState';

import {SET_LOOTFARM_ITEMS, MutateLootfarmItems} from './actions/lootfarm/setItems';
import {SET_LOOTFARM_IS_LOADING, MutateLootfarmIsLoading} from './actions/lootfarm/setIsLoading';
import {SET_RUST_TM_ITEMS, MutateRustTmItems} from './actions/rustTm/setItems';
import {SET_RUST_TM_IS_LOADING, MutateRustTmIsLoading} from './actions/rustTm/setIsLoading';
import {SET_VALUTE, MutateValute} from './actions/valute/set';
import {SET_SETTINGS, MutateSettings} from './actions/settings/set';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_LOOTFARM_ITEMS:
            return MutateLootfarmItems(state, payload);
        
        case SET_LOOTFARM_IS_LOADING:
            return MutateLootfarmIsLoading(state, payload);
        
        case SET_RUST_TM_ITEMS:
            return MutateRustTmItems(state, payload);
        
        case SET_RUST_TM_IS_LOADING:
            return MutateRustTmIsLoading(state, payload);
        
        case SET_VALUTE:
            return MutateValute(state, payload);
        
        case SET_SETTINGS:
            return MutateSettings(state, payload);
        
        default:
            return state;
    }
};

export default reducer;