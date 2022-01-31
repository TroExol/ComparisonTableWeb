import Update from 'immutability-helper';

export const SET_SWAPGG_IS_LOADING = Symbol();

export const SetSwapggIsLoading = data => ({
    type: SET_SWAPGG_IS_LOADING,
    payload: data,
});

export const MutateSwapggIsLoading = (state, value) => Update(state, {
    swapgg: {isLoading: {$set: value}},
});
