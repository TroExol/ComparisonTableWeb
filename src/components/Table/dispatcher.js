import FetchLootfarm from './actions/lootfarm/fetch';
import FetchRustTm from './actions/rustTm/fetch';
import FetchValute from './actions/valute/fetch';
import FetchSettings from './actions/settings/fetch';
import UpdateSettings from './actions/settings/update';

const dispatcher = dispatch => ({
    fetchLootfarm: () => dispatch(FetchLootfarm()),
    fetchRustTm: () => dispatch(FetchRustTm()),
    fetchValute: () => dispatch(FetchValute()),
    fetchSettings: () => dispatch(FetchSettings()),
    updateSettings: value => dispatch(UpdateSettings(value)),
});

export default dispatcher;