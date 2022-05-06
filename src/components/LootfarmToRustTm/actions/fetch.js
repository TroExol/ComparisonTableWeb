import FetchRustTm from '../../main/actions/blocks/rustTm/fetch';
import FetchValute from '../../main/actions/blocks/valute/fetch';
import FetchLootfarm from '../../main/actions/blocks/lootfarm/fetch';
import {calcProfit} from '../../../helpers/math';
import {SetItems} from './setItems';
import {SetIsLoading} from './setIsLoading';

const Fetch = () =>
    async (dispatch, getState) => {
        const {
            lootfarmToRustTm: {
                settings,
            },
        } = getState();

        try {
            dispatch(SetIsLoading(true));

            const rustTm = await dispatch(FetchRustTm());
            const valute = await dispatch(FetchValute());
            const lootfarm = await dispatch(FetchLootfarm());

            const formattedItems = lootfarm.reduce((acc, lootfarmItem) => {
                const rustTmItem = rustTm.find(item => item.market_hash_name === lootfarmItem.name);

                if (!rustTmItem) {
                    return acc;
                }

                const profit = calcProfit(lootfarmItem.price / 100, rustTmItem.buy_order * 0.95);

                acc.push({
                    rustTmId: rustTmItem.id.replace('_', '-'),
                    name: lootfarmItem.name,
                    priceLootfarm: lootfarmItem.price / 100,
                    priceRustTm: rustTmItem.buy_order,
                    priceRustTmRub: (rustTmItem.buy_order * valute).toFixed(2),
                    profit,
                    lootfarmHave: lootfarmItem.have,
                });

                return acc;
            }, [])
                .sort((item1, item2) => item2.profit - item1.profit);

            if (!formattedItems) {
                dispatch(SetIsLoading(false));
                return [];
            }

            const filteredItems = formattedItems.reduce((acc, item) => {
                if (settings.minLootfarmHave && item.lootfarmHave < settings.minLootfarmHave) {
                    return acc;
                }
                if (settings.minLootfarmPrice && item.priceLootfarm < settings.minLootfarmPrice) {
                    return acc;
                }
                if (settings.maxLootfarmPrice && item.priceLootfarm > settings.maxLootfarmPrice) {
                    return acc;
                }
                if (settings.minRustTmPrice && item.priceRustTm < settings.minRustTmPrice) {
                    return acc;
                }
                if (settings.maxRustTmPrice && item.priceRustTm > settings.maxRustTmPrice) {
                    return acc;
                }
                if (settings.minProfit && item.profit < settings.minProfit) {
                    return acc;
                }
                if (settings.maxProfit && item.profit > settings.maxProfit) {
                    return acc;
                }

                acc.push(item);
                return acc;
            }, []);

            dispatch(SetItems(filteredItems));
            dispatch(SetIsLoading(false));
        } catch (error) {
            console.error('При загрузке и обработке данных возникла ошибка', error);
            dispatch(SetIsLoading(false));
        }
    };

export default Fetch;