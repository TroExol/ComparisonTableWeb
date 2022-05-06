export const calcProfit = (priceFrom, priceTo) => {
    const profit = Math.round((priceTo - priceFrom) / Math.max(priceFrom, priceTo) * 10000) / 100;
    return Number(profit.toFixed(2));
};