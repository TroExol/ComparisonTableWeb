import Update from 'immutability-helper';

export const SET_ITRADE_ITEMS = Symbol();

export const SetItradeItems = data => ({
    type: SET_ITRADE_ITEMS,
    payload: data,
});

export const MutateItradeItems = (state, value) => Update(state, {
    itrade: {items: {$set: value}},
});
