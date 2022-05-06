import FetchRustTm from '../../main/actions/blocks/rustTm/fetch';
import FetchValute from '../../main/actions/blocks/valute/fetch';
import FetchItrade from '../../main/actions/blocks/itrade/fetch';
import {calcProfit} from '../../../helpers/math';
import {SetItems} from './setItems';
import {SetIsLoading} from './setIsLoading';

const Fetch = () =>
    async (dispatch, getState) => {
        const {
            itradeToRustTm: {
                settings,
            },
        } = getState();

        try {
            dispatch(SetIsLoading(true));

            const rustTm = await dispatch(FetchRustTm());
            const valute = await dispatch(FetchValute());
            const itrade = await dispatch(FetchItrade());

            const formattedItems = itrade.reduce((acc, itradeItem) => {
                const rustTmItem = rustTm.find(item => item.market_hash_name === itradeItem.name);

                if (!rustTmItem) {
                    return acc;
                }

                const profit = calcProfit(itradeItem.price, rustTmItem.buy_order * 0.95);

                acc.push({
                    rustTmId: rustTmItem.id.replace('_', '-'),
                    name: itradeItem.name,
                    priceItrade: itradeItem.price.toFixed(3),
                    priceRustTm: rustTmItem.buy_order,
                    priceRustTmRub: (rustTmItem.buy_order * valute).toFixed(2),
                    profit,
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
                if (settings.minItradeHave && item.itradeHave < settings.minItradeHave) {
                    return acc;
                }
                if (settings.minItradePrice && item.priceItrade < settings.minItradePrice) {
                    return acc;
                }
                if (settings.maxItradePrice && item.priceItrade > settings.maxItradePrice) {
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