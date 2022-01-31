import React, {useEffect, useMemo} from 'react';

import './style.css';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress, Typography, IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import Settings from './components/Settings';

const ComparisonTable = ({
    lootfarm,
    itrade,
    settings,
    
    fetchLootfarm,
    fetchItrade,
    fetchSettings,
    updateSettings,
}) => {
    const load = () => {
        fetchLootfarm();
        fetchItrade();
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
        return lootfarm.items.reduce((acc, lootfarmItem) => {
            const itradeItem = itrade.items.find(item => item.name === lootfarmItem.name);
            
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
    }, [lootfarm, itrade]);
    
    const filteredItems = useMemo(() => {
        if (!formattedItems) {
            return [];
        }
        
        return formattedItems.reduce((acc, item) => {
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
    }, [formattedItems, settings]);
    
    const copyToClipboard = (value) => navigator.clipboard.writeText(value);
    
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                loot.farm -> itrade.gg
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
            {!lootfarm.isLoading && !itrade.isLoading ? (
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Цена loot.farm</TableCell>
                            <TableCell align="right">На loot.farm</TableCell>
                            <TableCell align="right">Цена itrade.gg</TableCell>
                            <TableCell align="right">На itrade.gg</TableCell>
                            <TableCell align="right">Профит</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map(item => (
                            <TableRow key={item.name} hover>
                                <TableCell>
                                    {item.name}
                                    <span className="copy">
                                        <IconButton size="small" onClick={() => copyToClipboard(item.name)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </span>
                                </TableCell>
                                <TableCell align="right">{item.priceLootfarm} $</TableCell>
                                <TableCell align="right">{item.lootfarmHave} шт</TableCell>
                                <TableCell align="right">{item.priceItrade} $ ({item.priceItradeWithCommission} $)</TableCell>
                                <TableCell align="right">{item.itradeHave} шт</TableCell>
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
