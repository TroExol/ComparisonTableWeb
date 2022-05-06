import DefaultState from './defaultState';

import {SET_SETTINGS, MutateSettings} from './actions/settings/set';
import {SET_ITEMS, MutateItems} from './actions/setItems';
import {SET_IS_LOADING, MutateIsLoading} from './actions/setIsLoading';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_SETTINGS:
            return MutateSettings(state, payload);

        case SET_ITEMS:
            return MutateItems(state, payload);

        case SET_IS_LOADING:
            return MutateIsLoading(state, payload);

        default:
            return state;
    }
};

export default reducer;