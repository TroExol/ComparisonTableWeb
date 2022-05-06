import React, {useEffect} from 'react';
import {CircularProgress, InputAdornment, TextField} from '@mui/material';
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

    return settings ? (
        <div className='row'>
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
                        label='Мин. цена на rust.tm'
                        value={settings.minRustTmPrice || ''}
                        onChange={({target: {value}}) => change('minRustTmPrice', value)}
                        type='number'
                        disabled={disabled}
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                        }}/>
                </div>
                <div>
                    <TextField
                        label='Макс. цена на rust.tm'
                        value={settings.maxRustTmPrice || ''}
                        onChange={({target: {value}}) => change('maxRustTmPrice', value)}
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
    ) : (
        <div className='loader'>
            <CircularProgress/>
        </div>
    );
};

export default Settings;