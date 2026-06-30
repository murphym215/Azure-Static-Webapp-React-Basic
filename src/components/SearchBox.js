import React from "react";
function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search documents..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBox;
