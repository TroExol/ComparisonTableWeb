import FetchSwapgg from '../main/actions/blocks/swapgg/fetch';
import FetchRustTm from '../main/actions/blocks/rustTm/fetch';
import FetchValute from '../main/actions/blocks/valute/fetch';
import FetchSettings from './actions/settings/fetch';
import UpdateSettings from './actions/settings/update';

const dispatcher = dispatch => ({
    fetchSwapgg: () => dispatch(FetchSwapgg()),
    fetchRustTm: () => dispatch(FetchRustTm()),
    fetchValute: () => dispatch(FetchValute()),
    fetchSettings: () => dispatch(FetchSettings()),
    updateSettings: value => dispatch(UpdateSettings(value)),
});

export default dispatcher;