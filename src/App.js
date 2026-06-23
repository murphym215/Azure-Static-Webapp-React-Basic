import React, { useState, useEffect } from "react";
import DocumentCard from "./components/DocumentCard";
import DocumentTable from "./components/DocumentTable";
import "./App.css";

function App() {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("cards");

  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error("Error loading documents:", err));
  }, []);

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
