import Update from 'immutability-helper';

export const SET_RUST_TM_IS_LOADING = Symbol();

export const SetRustTmIsLoading = data => ({
    type: SET_RUST_TM_IS_LOADING,
    payload: data,
});

export const MutateRustTmIsLoading = (state, value) => Update(state, {
    rustTm: {isLoading: {$set: value}},
});
