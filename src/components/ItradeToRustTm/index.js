import {connect} from 'react-redux';
import itradeToRustTm from './ItradeToRustTm.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(itradeToRustTm);
