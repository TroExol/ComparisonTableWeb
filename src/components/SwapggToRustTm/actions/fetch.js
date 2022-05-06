import FetchRustTm from '../../main/actions/blocks/rustTm/fetch';
import FetchValute from '../../main/actions/blocks/valute/fetch';
import FetchSwapgg from '../../main/actions/blocks/swapgg/fetch';
import {calcProfit} from '../../../helpers/math';
import {SetItems} from './setItems';
import {SetIsLoading} from './setIsLoading';

const Fetch = () =>
    async (dispatch, getState) => {
        const {
            swapggToRustTm: {
                settings,
            },
        } = getState();

        try {
            dispatch(SetIsLoading(true));

            const rustTm = await dispatch(FetchRustTm());
            const valute = await dispatch(FetchValute());
            const swapgg = await dispatch(FetchSwapgg());

            const formattedItems = swapgg.reduce((acc, swapggItem) => {
                const rustTmItem = rustTm.find(item => item.market_hash_name === swapggItem.marketName);

                if (!rustTmItem) {
                    return acc;
                }

                const profit = calcProfit(swapggItem.price.value * 1.08 / 100, rustTmItem.buy_order * 0.95);

                acc.push({
                    rustTmId: rustTmItem.id.replace('_', '-'),
                    name: swapggItem.marketName,
                    priceSwapgg: (swapggItem.price.value * 1.08 / 100).toFixed(3),
                    priceRustTm: rustTmItem.buy_order,
                    priceRustTmRub: (rustTmItem.buy_order * valute).toFixed(2),
                    profit,
                    swapggHave: swapggItem.stock.have,
                });

                return acc;
            }, [])
                .sort((item1, item2) => item2.profit - item1.profit);

            if (!formattedItems) {
                dispatch(SetIsLoading(false));
                return [];
            }

            const filteredItems = formattedItems.reduce((acc, item) => {
                if (settings.minSwapggHave && item.swapggHave < settings.minSwapggHave) {
                    return acc;
                }
                if (settings.minSwapggPrice && item.priceSwapgg < settings.minSwapggPrice) {
                    return acc;
                }
                if (settings.maxSwapggPrice && item.priceSwapgg > settings.maxSwapggPrice) {
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