import FetchLootfarm from '../main/actions/blocks/lootfarm/fetch';
import FetchSwapgg from '../main/actions/blocks/swapgg/fetch';
import FetchSettings from './actions/settings/fetch';
import UpdateSettings from './actions/settings/update';

const dispatcher = dispatch => ({
    fetchLootfarm: () => dispatch(FetchLootfarm()),
    fetchSwapgg: () => dispatch(FetchSwapgg()),
    fetchSettings: () => dispatch(FetchSettings()),
    updateSettings: value => dispatch(UpdateSettings(value)),
});

export default dispatcher;