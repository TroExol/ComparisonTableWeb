import DefaultState from './defaultState';

import {SET_LOOTFARM_ITEMS, MutateLootfarmItems} from './actions/blocks/lootfarm/setItems';
import {SET_LOOTFARM_IS_LOADING, MutateLootfarmIsLoading} from './actions/blocks/lootfarm/setIsLoading';
import {SET_RUST_TM_ITEMS, MutateRustTmItems} from './actions/blocks/rustTm/setItems';
import {SET_RUST_TM_IS_LOADING, MutateRustTmIsLoading} from './actions/blocks/rustTm/setIsLoading';
import {SET_ITRADE_ITEMS, MutateItradeItems} from './actions/blocks/itrade/setItems';
import {SET_ITRADE_IS_LOADING, MutateItradeIsLoading} from './actions/blocks/itrade/setIsLoading';
import {SET_SWAPGG_ITEMS, MutateSwapggItems} from './actions/blocks/swapgg/setItems';
import {SET_SWAPGG_IS_LOADING, MutateSwapggIsLoading} from './actions/blocks/swapgg/setIsLoading';
import {SET_VALUTE, MutateValute} from './actions/blocks/valute/set';

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

        case SET_ITRADE_ITEMS:
            return MutateItradeItems(state, payload);

        case SET_ITRADE_IS_LOADING:
            return MutateItradeIsLoading(state, payload);

        case SET_SWAPGG_ITEMS:
            return MutateSwapggItems(state, payload);

        case SET_SWAPGG_IS_LOADING:
            return MutateSwapggIsLoading(state, payload);

        case SET_VALUTE:
            return MutateValute(state, payload);

        default:
            return state;
    }
};

export default reducer;