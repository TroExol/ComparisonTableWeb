import {SetSettings} from './set';
import DefaultState from '../../defaultState';

const Fetch = () => async dispatch => {
    try {
        const settings = window.localStorage.getItem('settingsLootfarmToSwapgg');

        dispatch(SetSettings(settings ? JSON.parse(settings) : DefaultState.settings));
    } catch (error) {
        console.error('При получении настроек произошла ошибка', error);
    }
};

export default Fetch;