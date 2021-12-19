import Update from 'immutability-helper';

export const SET_LOOTFARM_IS_LOADING = Symbol();

export const SetLootfarmIsLoading = data => ({
    type: SET_LOOTFARM_IS_LOADING,
    payload: data,
});

export const MutateLootfarmIsLoading = (state, value) => Update(state, {
    lootfarm: {isLoading: {$set: value}},
});
