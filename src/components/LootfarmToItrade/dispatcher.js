import FetchLootfarm from '../main/actions/blocks/lootfarm/fetch';
import FetchItrade from '../main/actions/blocks/itrade/fetch';
import FetchSettings from './actions/settings/fetch';
import UpdateSettings from './actions/settings/update';

const dispatcher = dispatch => ({
    fetchLootfarm: () => dispatch(FetchLootfarm()),
    fetchItrade: () => dispatch(FetchItrade()),
    fetchSettings: () => dispatch(FetchSettings()),
    updateSettings: value => dispatch(UpdateSettings(value)),
});

export default dispatcher;