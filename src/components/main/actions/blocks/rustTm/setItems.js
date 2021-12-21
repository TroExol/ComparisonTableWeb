import Update from 'immutability-helper';

export const SET_RUST_TM_ITEMS = Symbol();

export const SetRustTmItems = data => ({
    type: SET_RUST_TM_ITEMS,
    payload: data,
});

export const MutateRustTmItems = (state, value) => Update(state, {
    rustTm: {items: {$set: value}},
});
