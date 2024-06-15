import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import './kitchenStaffSearchBar.css'; // Import CSS for additional styles

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const KitchenStaffSearchBar = ({ setSearchText }) => {
  return (
    <div className="kitchen-search-container">
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <input
        type="text"
        className="kitchen-search-input"
        placeholder="Search Order ID"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default KitchenStaffSearchBar;
