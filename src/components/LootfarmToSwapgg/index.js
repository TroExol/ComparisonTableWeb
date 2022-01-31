import {connect} from 'react-redux';
import lootfarmToSwapgg from './LootfarmToSwapgg.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(lootfarmToSwapgg);
