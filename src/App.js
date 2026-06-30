import React, { useState, useEffect } from "react";
import DocumentCard from "./components/DocumentCard";
import DocumentTable from "./components/DocumentTable";
import SearchBox from "./components/SearchBox";
import "./App.css";

function App() {
  const [documents, setDocuments] = useState([]);
  const [view, setView] = useState("cards");
  const [searchText, setSearchText] = useState("");
  

  useEffect(() => {
    fetch("https://function-app-api-get-documents-ddc4hac0gdfjf3h2.eastus-01.azurewebsites.net/api/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error("Error loading documents:", err));
  }, []);
  
  const filteredDocuments = documents.filter((doc) => doc.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="container">
      <h1>Document Catalog</h1>
      {/* search box */}      
    <SearchBox 
      value={searchText}
      onChange={setSearchText}
    />

      <div className="toolbar">
        <button onClick={() => setView("cards")}>Card View</button>
        <button onClick={() => setView("table")}>Table View</button>
      </div>

      {view === "cards" ? (
        <div className="card-grid">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={filteredDocuments} />
      )}
    </div>
  );
}

export default App;
