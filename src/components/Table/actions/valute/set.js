import Update from 'immutability-helper';

export const SET_VALUTE = Symbol();

export const SetValute = data => ({
    type: SET_VALUTE,
    payload: data,
});

export const MutateValute = (state, value) => Update(state, {
    valute: {$set: value},
});
