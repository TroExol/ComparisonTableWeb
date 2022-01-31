import Update from 'immutability-helper';

export const SET_SWAPGG_ITEMS = Symbol();

export const SetSwapggItems = data => ({
    type: SET_SWAPGG_ITEMS,
    payload: data,
});

export const MutateSwapggItems = (state, value) => Update(state, {
    swapgg: {items: {$set: value}},
});
