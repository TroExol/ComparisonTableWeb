import {connect} from 'react-redux';
import lootfarmToItrade from './LootfarmToItrade.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(lootfarmToItrade);
