import {combineReducers} from 'redux';
import lootfarmToRustTm from './components/LootfarmToRustTm/reducer';
import itradeToRustTm from './components/ItradeToRustTm/reducer';
import lootfarmToItrade from './components/LootfarmToItrade/reducer';
import main from './components/main/reducer';

export default combineReducers({
    lootfarmToRustTm,
    itradeToRustTm,
    lootfarmToItrade,
    main,
});