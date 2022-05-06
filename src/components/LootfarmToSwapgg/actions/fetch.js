import FetchLootfarm from '../../main/actions/blocks/lootfarm/fetch';
import FetchSwapgg from '../../main/actions/blocks/swapgg/fetch';
import {calcProfit} from '../../../helpers/math';
import {SetItems} from './setItems';
import {SetIsLoading} from './setIsLoading';

const Fetch = () =>
    async (dispatch, getState) => {
        const {
            lootfarmToSwapgg: {
                settings,
            },
        } = getState();

        try {
            dispatch(SetIsLoading(true));

            const lootfarm = await dispatch(FetchLootfarm());
            const swapgg = await dispatch(FetchSwapgg());

            const formattedItems = lootfarm.reduce((acc, lootfarmItem) => {
                const swapggItem = swapgg.find(item => item.marketName === lootfarmItem.name);

                if (!swapggItem) {
                    return acc;
                }

                const profit = calcProfit(lootfarmItem.price / 100, swapggItem.price.value / 100);

                acc.push({
                    name: lootfarmItem.name,
                    priceLootfarm: lootfarmItem.price / 100,
                    priceSwapgg: swapggItem.price.value / 100,
                    profit,
                    lootfarmHave: lootfarmItem.have,
                    swapggHave: swapggItem.stock.have,
                    swapggMax: swapggItem.stock.max,
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
                if (settings.minSwapggHave && item.swapggHave < settings.minSwapggHave) {
                    return acc;
                }
                if (settings.isHideOverstocks && (item.swapggMax - item.swapggHave) <= 0) {
                    return acc;
                }
                if (settings.minLootfarmPrice && item.priceLootfarm < settings.minLootfarmPrice) {
                    return acc;
                }
                if (settings.maxLootfarmPrice && item.priceLootfarm > settings.maxLootfarmPrice) {
                    return acc;
                }
                if (settings.minSwapggPrice && item.priceSwapgg < settings.minSwapggPrice) {
                    return acc;
                }
                if (settings.maxSwapggPrice && item.priceSwapgg > settings.maxSwapggPrice) {
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