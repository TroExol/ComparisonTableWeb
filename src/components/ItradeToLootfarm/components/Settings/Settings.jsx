import React, {useEffect} from 'react';
import {Checkbox, FormControlLabel, InputAdornment, TextField} from '@mui/material';
import './style.css';

const Settings = ({
    disabled,
    settings,

    update,
    fetch,
}) => {
    useEffect(() => {
        fetch();
    }, []);

    const change = (key, value) => {
        const newSettings = {...settings};
        newSettings[key] = value;
        update(newSettings);
    };

    return (
        <div className='row'>
            <div className='column'>
                <div>
                    <TextField
                        label='Мин. кол-во на itrade.gg'
                        value={settings.minItradeHave || ''}
                        onChange={({target: {value}}) => change('minItradeHave', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>шт</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <FormControlLabel
                        label='Скрыть оверстоки на loot.farm'
                        disabled={disabled}
                        control={
                            <Checkbox
                                checked={settings.isHideOverstocks}
                                onChange={({target: {checked}}) => change('isHideOverstocks', checked)}/>
                        }/>
                </div>
            </div>
            <div className='column'>
                <div>
                    <TextField
                        label='Мин. кол-во на loot.farm'
                        value={settings.minLootfarmHave || ''}
                        onChange={({target: {value}}) => change('minLootfarmHave', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>шт</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <TextField
                        label='Макс. кол-во на loot.farm'
                        value={settings.maxLootfarmHave || ''}
                        onChange={({target: {value}}) => change('maxLootfarmHave', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>шт</InputAdornment>,
                        }}/>
                </div>
            </div>
            <div className='column'>
                <div>
                    <TextField
                        label='Мин. цена на loot.farm'
                        value={settings.minLootfarmPrice || ''}
                        onChange={({target: {value}}) => change('minLootfarmPrice', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <TextField
                        label='Макс. цена на loot.farm'
                        value={settings.maxLootfarmPrice || ''}
                        onChange={({target: {value}}) => change('maxLootfarmPrice', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        }}/>
                </div>
            </div>
            <div className='column'>
                <div>
                    <TextField
                        label='Мин. цена на itrade.gg'
                        value={settings.minItradePrice || ''}
                        onChange={({target: {value}}) => change('minItradePrice', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <TextField
                        label='Макс. цена на itrade.gg'
                        value={settings.maxItradePrice || ''}
                        onChange={({target: {value}}) => change('maxItradePrice', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        }}/>
                </div>
            </div>
            <div className='column'>
                <div>
                    <TextField
                        label='Мин. профит'
                        value={settings.minProfit || ''}
                        onChange={({target: {value}}) => change('minProfit', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <TextField
                        label='Макс. профит'
                        value={settings.maxProfit || ''}
                        onChange={({target: {value}}) => change('maxProfit', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                        }}/>
                </div>
            </div>
            <div>
                <TextField
                    label='Автоматическая перезагрузка'
                    value={settings.autoLoad || ''}
                    onChange={({target: {value}}) => change('autoLoad', value)}
                    type='number'
                    disabled={disabled}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>сек</InputAdornment>,
                    }}/>
            </div>
        </div>
    );
};

export default Settings;