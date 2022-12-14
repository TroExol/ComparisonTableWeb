import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import {Link} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './style.css';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id='fade-button'
                aria-controls='fade-menu'
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <MenuIcon/>
            </Button>
            <Menu
                id='fade-menu'
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <Link*/}
                {/*        to='/lootfarm2rusttm'*/}
                {/*        className='link'>*/}
                {/*        loot.farm -&gt; rust.tm*/}
                {/*    </Link>*/}
                {/*</MenuItem>*/}
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <Link*/}
                {/*        to='/itrade2rusttm'*/}
                {/*        className='link'>*/}
                {/*        itrade.gg -&gt; rust.tm*/}
                {/*    </Link>*/}
                {/*</MenuItem>*/}
                <MenuItem onClick={handleClose}>
                    <Link
                        to='/lootfarm2itrade'
                        className='link'>
                        loot.farm -&gt; itrade.gg
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link
                        to='/itrade2lootfarm'
                        className='link'>
                        itrade.gg -&gt; loot.farm
                    </Link>
                </MenuItem>
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <Link*/}
                {/*        to='/swapgg2rusttm'*/}
                {/*        className='link'>*/}
                {/*        swap.gg -&gt; rust.tm*/}
                {/*    </Link>*/}
                {/*</MenuItem>*/}
                <MenuItem onClick={handleClose}>
                    <Link
                        to='/lootfarm2swapgg'
                        className='link'>
                        loot.farm -&gt; swap.gg
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Navbar;