import React from 'react';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const SelectCategory = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const menuHandleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="small"
        startIcon={<StorefrontIcon fontSize="small" />}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={menuHandleClick}
      >
        Catalog
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/singlecategory/All/0';
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/singlecategory/Accessories/0';
          }}
        >
          Accessories
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/singlecategory/Clothes/0';
          }}
        >
          Clothes
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/singlecategory/Gear/0';
          }}
        >
          Gear
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SelectCategory;
