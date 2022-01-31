import {combineReducers} from 'redux';
import lootfarmToRustTm from './components/LootfarmToRustTm/reducer';
import itradeToRustTm from './components/ItradeToRustTm/reducer';
import lootfarmToItrade from './components/LootfarmToItrade/reducer';
import swapggToRustTm from './components/SwapggToRustTm/reducer';
import lootfarmToSwapgg from './components/LootfarmToSwapgg/reducer';
import main from './components/main/reducer';

export default combineReducers({
    lootfarmToRustTm,
    itradeToRustTm,
    lootfarmToItrade,
    swapggToRustTm,
    lootfarmToSwapgg,
    main,
});