import React, {useEffect} from 'react';
import {CircularProgress, InputAdornment, TextField, Checkbox, FormControlLabel} from '@mui/material';
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
                        label="Мин. кол-во на swap.gg"
                        value={settings.minSwapggHave || ''}
                        onChange={({target: {value}}) => change('minSwapggHave', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">шт</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <FormControlLabel
                        label="Скрыть оверстоки на swap.gg"
                        control={
                            <Checkbox
                                checked={settings.isHideOverstocks}
                                onChange={({target: {checked}}) => change('isHideOverstocks', checked)} />
                    } />
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
                        label="Мин. цена на swap.gg"
                        value={settings.minSwapggPrice || ''}
                        onChange={({target: {value}}) => change('minSwapggPrice', value)}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Макс. цена на swap.gg"
                        value={settings.maxSwapggPrice || ''}
                        onChange={({target: {value}}) => change('maxSwapggPrice', value)}
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