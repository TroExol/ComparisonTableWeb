import Update from 'immutability-helper';

export const SET_SETTINGS = Symbol();

export const SetSettings = data => ({
    type: SET_SETTINGS,
    payload: data,
});

export const MutateSettings = (state, value) => {
    window.localStorage.setItem('settings', JSON.stringify(value));
    
    return Update(state, {
        settings: {$set: value},
    });
}
