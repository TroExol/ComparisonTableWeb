import {connect} from 'react-redux';
import lootfarmToItrade from './ItradeToLootfarm.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(lootfarmToItrade);
