import Update from 'immutability-helper';

export const SET_ITRADE_IS_LOADING = Symbol();

export const SetItradeIsLoading = data => ({
    type: SET_ITRADE_IS_LOADING,
    payload: data,
});

export const MutateItradeIsLoading = (state, value) => Update(state, {
    itrade: {isLoading: {$set: value}},
});
