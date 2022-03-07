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
    lootfarm,
    rustTm,
    valute,
    settings,
    
    fetchLootfarm,
    fetchRustTm,
    fetchValute,
    fetchSettings,
    updateSettings,
}) => {
    const load = () => {
        fetchLootfarm();
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
        return lootfarm.items.reduce((acc, lootfarmItem) => {
            const rustTmItem = rustTm.items.find(item => item.market_hash_name === lootfarmItem.name);
            
            if (!rustTmItem) {
                return acc;
            }
            
            const profit = calcProfit(lootfarmItem.price / 100, rustTmItem.buy_order / 1000 * 0.95);
            
            acc.push({
                rustTmId: rustTmItem.id.replace('_', '-'),
                name: lootfarmItem.name,
                priceLootfarm: lootfarmItem.price / 100,
                priceRustTm: rustTmItem.buy_order / 1000,
                priceRustTmRub: (rustTmItem.buy_order  / 1000 * valute).toFixed(2),
                profit,
                lootfarmHave: lootfarmItem.have,
            });
            
            return acc;
        }, [])
            .sort((item1, item2) => item2.profit - item1.profit);
    }, [lootfarm, rustTm, valute]);
    
    const filteredItems = useMemo(() => {
        if (!formattedItems) {
            return [];
        }
        
        return formattedItems.reduce((acc, item) => {
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
    }, [formattedItems, settings]);
    
    const copyToClipboard = (value) => navigator.clipboard.writeText(value);
    
    return (
        <>
            <Typography variant="h4" gutterBottom component="div">
                loot.farm -> rust.tm
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
            {!lootfarm.isLoading && !rustTm.isLoading ? (
                <Table className="table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align="right">Цена loot.farm</TableCell>
                            <TableCell align="right">На loot.farm</TableCell>
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
                                <TableCell align="right">{item.priceLootfarm} $</TableCell>
                                <TableCell align="right">{item.lootfarmHave} шт</TableCell>
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
