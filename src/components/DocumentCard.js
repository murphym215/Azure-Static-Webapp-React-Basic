import React from "react";

function DocumentCard({ doc }) {
  const openDoc = () => {
    window.open(doc.url, "_blank");
  };

  return (
    <div className="card">
      <h3>{doc.title}</h3>
      <p>{doc.description}</p>
      <p className="meta">{doc.category}</p>

      <button onClick={openDoc}>Preview</button>
    </div>
  );
}

export default DocumentCard;
