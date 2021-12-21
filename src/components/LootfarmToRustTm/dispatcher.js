import FetchLootfarm from '../main/actions/blocks/lootfarm/fetch';
import FetchRustTm from '../main/actions/blocks/rustTm/fetch';
import FetchValute from '../main/actions/blocks/valute/fetch';
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