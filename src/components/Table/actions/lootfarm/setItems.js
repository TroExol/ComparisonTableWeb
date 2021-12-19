import Update from 'immutability-helper';

export const SET_LOOTFARM_ITEMS = Symbol();

export const SetLootfarmItems = data => ({
    type: SET_LOOTFARM_ITEMS,
    payload: data,
});

export const MutateLootfarmItems = (state, value) => Update(state, {
    lootfarm: {items: {$set: value}},
});
