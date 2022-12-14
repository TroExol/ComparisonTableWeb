import {
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import {copyToClipboard} from '../../../../helpers/misc';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React from 'react';

export default function List({
    isLoading,
    items,
}) {
    return !isLoading ? (
        <Table
            className='table'
            stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align='right'>Цена itrade.gg</TableCell>
                    <TableCell align='right'>На itrade.gg</TableCell>
                    <TableCell align='right'>Цена loot.farm</TableCell>
                    <TableCell align='right'>На loot.farm</TableCell>
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
                                {item.name}
                                <span className='copy'>
                                    <IconButton
                                        size='small'
                                        onClick={() => copyToClipboard(item.name)}>
                                        <ContentCopyIcon/>
                                    </IconButton>
                                </span>
                            </TableCell>
                            <TableCell align='right'>{item.priceItrade} $</TableCell>
                            <TableCell align='right'>{item.itradeHave} шт</TableCell>
                            <TableCell align='right'>{item.priceLootfarm} $
                                ({item.priceLootfarmWithCommission} $)
                            </TableCell>
                            <TableCell align='right'>{item.lootfarmHave} шт
                                [{item.lootfarmMax - item.lootfarmHave}]
                            </TableCell>
                            <TableCell align='right'>{item.profit} %</TableCell>
                        </TableRow>
                    ))
                    : <TableRow>
                        <TableCell colSpan={6}>
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
        </div>
    );
}