import React,{useState} from 'react';
import './searchBar.css'; // Import CSS for search bar styles
/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
<FontAwesomeIcon icon={faSearch} className="search-icon" />*/
const CashierSearchBar = ({setSearchText}) => {
    
//sdsdsjdjsd
  return (
    <div className="cashier-search-container">
      <input
        type="text"
        className="cashier-search-input"
        placeholder="Search..."
        onChange={(e)=>setSearchText(e.target.value)}
        
      />
      
    </div>
  );
};

export default CashierSearchBar;
