import FetchLootfarm from '../../main/actions/blocks/lootfarm/fetch';
import FetchItrade from '../../main/actions/blocks/itrade/fetch';
import {calcProfit} from '../../../helpers/math';
import {SetItems} from './setItems';
import {SetIsLoading} from './setIsLoading';

const Fetch = () =>
    async (dispatch, getState) => {
        const {
            lootfarmToItrade: {
                settings,
            },
        } = getState();

        try {
            dispatch(SetIsLoading(true));

            const lootfarm = await dispatch(FetchLootfarm());
            const itrade = await dispatch(FetchItrade());

            const formattedItems = lootfarm.reduce((acc, lootfarmItem) => {
                const itradeItem = itrade.find(item => item.name === lootfarmItem.name);

                if (!itradeItem) {
                    return acc;
                }

                const profit = calcProfit(lootfarmItem.price / 100, itradeItem.price * 0.9);

                acc.push({
                    name: lootfarmItem.name,
                    priceLootfarm: lootfarmItem.price / 100,
                    priceItrade: itradeItem.price,
                    priceItradeWithCommission: Number((itradeItem.price * 0.9).toFixed(2)),
                    profit,
                    lootfarmHave: lootfarmItem.have,
                    itradeHave: itradeItem.same,
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
                if (settings.minItradeHave && item.itradeHave < settings.minItradeHave) {
                    return acc;
                }
                if (settings.maxItradeHave && item.itradeHave > settings.maxItradeHave) {
                    return acc;
                }
                if (settings.minLootfarmPrice && item.priceLootfarm < settings.minLootfarmPrice) {
                    return acc;
                }
                if (settings.maxLootfarmPrice && item.priceLootfarm > settings.maxLootfarmPrice) {
                    return acc;
                }
                if (settings.minItradePrice && item.priceItrade < settings.minItradePrice) {
                    return acc;
                }
                if (settings.maxItradePrice && item.priceItrade > settings.maxItradePrice) {
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