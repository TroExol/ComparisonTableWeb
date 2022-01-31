import {connect} from 'react-redux';
import swapggToRustTm from './SwapggToRustTm.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(swapggToRustTm);
