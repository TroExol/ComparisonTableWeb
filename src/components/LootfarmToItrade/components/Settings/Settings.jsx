import React, {useEffect} from 'react';
import {CircularProgress, InputAdornment, TextField} from '@mui/material';
import './style.css';

const Settings = ({
    settings,
    
    update,
    fetch,
}) => {
    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const change = (key, value) => {
        const newSettings = {...settings};
        newSettings[key] = value;
        update(newSettings);
    };
    
    return settings ? (
        <div className="row">
            <div>
                <TextField
                    label="Мин. кол-во на loot.farm"
                    value={settings.minLootfarmHave || ''}
                    onChange={({target: {value}}) => change('minLootfarmHave', value)}
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">шт</InputAdornment>,
                    }}
                />
            </div>
            <div className="column">
                <div>
                    <TextField
                        label="Макс. кол-во на itrade.gg"
                        value={settings.maxItradeHave || ''}
                        onChange={({target: {value}}) => change('maxItradeHave', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">шт</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Мин. кол-во на itrade.gg"
                        value={settings.minItradeHave || ''}
                        onChange={({target: {value}}) => change('minItradeHave', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">шт</InputAdornment>,
                        }}
                    />
                </div>
            </div>
            <div className="column">
                <div>
                    <TextField
                        label="Мин. цена на loot.farm"
                        value={settings.minLootfarmPrice || ''}
                        onChange={({target: {value}}) => change('minLootfarmPrice', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Макс. цена на loot.farm"
                        value={settings.maxLootfarmPrice || ''}
                        onChange={({target: {value}}) => change('maxLootfarmPrice', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
            </div>
            <div className="column">
                <div>
                    <TextField
                        label="Мин. цена на itrade.gg"
                        value={settings.minItradePrice || ''}
                        onChange={({target: {value}}) => change('minItradePrice', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Макс. цена на itrade.gg"
                        value={settings.maxItradePrice || ''}
                        onChange={({target: {value}}) => change('maxItradePrice', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
            </div>
            <div className="column">
                <div>
                    <TextField
                        label="Мин. профит"
                        value={settings.minProfit || ''}
                        onChange={({target: {value}}) => change('minProfit', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Макс. профит"
                        value={settings.maxProfit || ''}
                        onChange={({target: {value}}) => change('maxProfit', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        }}
                    />
                </div>
            </div>
            <div>
                <TextField
                    label="Автоматическая перезагрузка"
                    value={settings.autoLoad || ''}
                    onChange={({target: {value}}) => change('autoLoad', value)}
                    type="number"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">сек</InputAdornment>,
                    }}
                />
            </div>
        </div>
    ) : (
        <div className="loader">
            <CircularProgress />
        </div>
    );
};

export default Settings;