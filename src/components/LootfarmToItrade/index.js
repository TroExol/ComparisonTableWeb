import {connect} from 'react-redux';
import lootfarmToRustTm from './LootfarmToItrade.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(lootfarmToRustTm);
