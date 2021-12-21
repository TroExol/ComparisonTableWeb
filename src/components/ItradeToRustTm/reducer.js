import DefaultState from './defaultState';

import {SET_SETTINGS, MutateSettings} from './actions/settings/set';

const reducer = (state = DefaultState, {type, payload}) => {
    switch (type) {
        case SET_SETTINGS:
            return MutateSettings(state, payload);
        
        default:
            return state;
    }
};

export default reducer;