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
                    label='Мин. кол-во на itrade.gg'
                    value={settings.minItradeHave || ''}
                    onChange={({target: {value}}) => change('minItradeHave', value)}
                    type='number'
                    disabled={disabled}
                    InputProps={{
                        startAdornment: <InputAdornment position='start'>шт</InputAdornment>,
                    }}/>
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