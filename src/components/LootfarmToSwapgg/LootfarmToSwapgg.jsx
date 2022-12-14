import React, {useEffect} from 'react';

import './style.css';
import {
    Typography,
    IconButton,
} from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import Settings from './components/Settings';
import List from './components/List';
import {fetchInterval} from '../../helpers/misc';

const ComparisonTable = ({
    items,
    isLoading,
    settings,

    fetch,
    fetchSettings,
    updateSettings,
}) => {
    useEffect(() => {
        return fetchInterval(fetch, settings.autoLoad * 1000);
    }, [fetch, settings.autoLoad]);

    return (
        <>
            <Typography
                variant='h4'
                gutterBottom
                component='div'>
                loot.farm -&gt; swap.gg
            </Typography>
            <div className='settings'>
                <Settings
                    disabled={isLoading}
                    settings={settings}
                    fetch={fetchSettings}
                    update={updateSettings}/>
            </div>
            <div className='controls'>
                <IconButton
                    onClick={fetch}
                    size='large'
                    disabled={isLoading}>
                    <ReplayIcon
                        color='primary'
                        fontSize='inherit'/>
                </IconButton>
            </div>
            <List
                isLoading={isLoading}
                items={items}/>
        </>
    );
};

export default ComparisonTable;
