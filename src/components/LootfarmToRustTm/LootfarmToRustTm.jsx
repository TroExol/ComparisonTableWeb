import React, {useEffect} from 'react';

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
import {copyToClipboard, fetchInterval} from '../../helpers/misc';

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
                loot.farm -&gt; rust.tm
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
            {!isLoading ? (
                <Table
                    className='table'
                    stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell align='right'>Цена loot.farm</TableCell>
                            <TableCell align='right'>На loot.farm</TableCell>
                            <TableCell align='right'>Цена rust.tm</TableCell>
                            <TableCell align='right'>Профит</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length
                            ? items.map(item => (
                                <TableRow
                                    key={item.name}
                                    hover>
                                    <TableCell>
                                        <Link
                                            href={`https://rust.tm/item/${item.rustTmId}-${item.name}`}
                                            underline='none'
                                            className='link-name'
                                            target='_blank'>
                                            {item.name}
                                        </Link>
                                        <span className='copy'>
                                            <IconButton
                                                size='small'
                                                onClick={() => copyToClipboard(item.name)}>
                                                <ContentCopyIcon/>
                                            </IconButton>
                                        </span>
                                    </TableCell>
                                    <TableCell align='right'>{item.priceLootfarm} $</TableCell>
                                    <TableCell align='right'>{item.lootfarmHave} шт</TableCell>
                                    <TableCell align='right'>{`${item.priceRustTm} $ (${item.priceRustTmRub} руб)`}</TableCell>
                                    <TableCell align='right'>{item.profit} %</TableCell>
                                </TableRow>
                            ))
                            : <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography align='center'>
                                        Не найдено предметов
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            ) : (
                <div className='loader'>
                    <CircularProgress/>
                </div>)}
        </>
    );
};

export default ComparisonTable;
