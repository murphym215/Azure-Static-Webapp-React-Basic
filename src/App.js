import React, { useState } from "react";
import documents from "./data/documents.json";
import DocumentCard from "./components/DocumentCard";
import DocumentTable from "./components/DocumentTable";
import "./App.css";

function App() {
  const [view, setView] = useState("cards");

  return (
    <div className="container">
      <h1>Document Catalog</h1>

      <div className="toolbar">
        <button onClick={() => setView("cards")}>Card View</button>
        <button onClick={() => setView("table")}>Table View</button>
      </div>

      {view === "cards" ? (
        <div className="card-grid">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={documents} />
      )}
    </div>
  );
}

export default App;
