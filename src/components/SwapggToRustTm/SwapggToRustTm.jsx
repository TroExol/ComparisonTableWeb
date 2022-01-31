import React, {useEffect, useMemo} from 'react';

import './style.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress, Typography, Link, IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import Settings from './components/Settings';

const ComparisonTable = ({
    swapgg,
    rustTm,
    valute,
    settings,
    
    fetchSwapgg,
    fetchRustTm,
    fetchValute,
    fetchSettings,
    updateSettings,
}) => {
    const load = () => {
        fetchSwapgg();
        fetchRustTm();
        fetchValute();
    };
    
    useEffect(() => {
        if (!settings.autoLoad) {
            return load();
        }
        
        const loadInterval = setInterval(load, settings.autoLoad * 1000);
        
        return () => clearInterval(loadInterval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.autoLoad]);
    
    const calcProfit = (priceFrom, priceTo) => {
        const profit = Math.round((priceTo - priceFrom) / Math.max(priceFrom, priceTo) * 10000) / 100;
        return Number(profit.toFixed(2));
    };
    
    const formattedItems = useMemo(() => {
        return swapgg.items.reduce((acc, swapggItem) => {
            const rustTmItem = rustTm.items.find(item => item.market_hash_name === swapggItem.marketName);
            
            if (!rustTmItem) {
                return acc;
            }
            
            const profit = calcProfit(swapggItem.price.value / 100, rustTmItem.buy_order * 0.95);
            
            acc.push({
                rustTmId: rustTmItem.id.replace('_', '-'),
                name: swapggItem.marketName,
                priceSwapgg: (swapggItem.price.value / 100).toFixed(3),
                priceRustTm: rustTmItem.buy_order,
                priceRustTmRub: (rustTmItem.buy_order * valute).toFixed(2),
                profit,
                swapggHave: swapggItem.stock.have,
            });
            
            return acc;
        }, [])
            .sort((item1, item2) => item2.profit - item1.profit);
    }, [swapgg, rustTm, valute]);
    
    const filteredItems = useMemo(() => {
        if (!formattedItems) {
            return [];
        }
        
        return formattedItems.reduce((acc, item) => {
            if (settings.minSwapggHave && item.swapggHave < settings.minSwapggHave) {
                return acc;
            }
            if (settings.minSwapggPrice && item.priceItrade < settings.minSwapggPrice) {
                return acc;
            }
            if (settings.maxSwapggPrice && item.priceItrade > settings.maxSwapggPrice) {
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
    }, [formattedItems, settings]);
    
    const copyToClipboard = (value) => navigator.clipboard.writeText(value);
    
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                swap.gg -> rust.tm
            </Typography>
            <div className="settings">
                <Settings
                    settings={settings}
                    fetch={fetchSettings}
                    update={updateSettings} />
            </div>
            <div className="controls">
                <IconButton onClick={load} size="large">
                    <ReplayIcon color="primary" fontSize="inherit" />
                </IconButton>
            </div>
            {!swapgg.isLoading && !rustTm.isLoading ? (
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Цена swap.gg</TableCell>
                            <TableCell align="right">На swap.gg</TableCell>
                            <TableCell align="right">Цена rust.tm</TableCell>
                            <TableCell align="right">Профит</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map(item => (
                            <TableRow key={item.name} hover>
                                <TableCell>
                                    <Link
                                        href={`https://rust.tm/item/${item.rustTmId}-${item.name}`}
                                        underline="none"
                                        className="link-name"
                                        target="_blank">
                                        {item.name}
                                    </Link>
                                    <span className="copy">
                                        <IconButton size="small" onClick={() => copyToClipboard(item.name)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </span>
                                </TableCell>
                                <TableCell align="right">{item.priceSwapgg} $</TableCell>
                                <TableCell align="right">{item.swapggHave} шт</TableCell>
                                <TableCell align="right">{`${item.priceRustTm} $ (${item.priceRustTmRub} руб)`}</TableCell>
                                <TableCell align="right">{item.profit} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="loader">
                    <CircularProgress />
                </div>)}
        </>
    );
};

export default ComparisonTable;
