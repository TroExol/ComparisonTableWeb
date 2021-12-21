import {SetSettings} from './set';
import DefaultState from '../../defaultState';

const Update = value => async (dispatch) => {
    try {
        dispatch(SetSettings(value ? value : DefaultState.settings));
    } catch (error) {
        console.error('При изменении настроек произошла ошибка', error);
    }
};

export default Update;