import Update from 'immutability-helper';

export const SET_ITEMS = Symbol();

export const SetItems = data => ({
    type: SET_ITEMS,
    payload: data,
});

export const MutateItems = (state, value) => {
    return Update(state, {
        items: {$set: value},
    });
};
