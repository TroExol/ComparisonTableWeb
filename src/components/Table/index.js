import {connect} from 'react-redux';
import table from './Table.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(table);
