import React from "react";
import SearchBox from "./SearchBox";
function Toolbar({
  searchText,
  setSearchText,
  view,
  setView
}) {
  return (
    <div className="toolbar">
      
      <SearchBox 
         value={searchText}
         onChange={setSearchText}
      />

      <button onClick={() => setView("cards")}>
        Card View
      </button>

      <button onClick={() => setView("table")}>
        Table View
      </button>

    </div>
  );
}

export default Toolbar;
