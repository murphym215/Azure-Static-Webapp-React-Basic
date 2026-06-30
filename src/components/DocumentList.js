import React from "react";
function DocumentList ({ documents, view}) {
    {view === "cards" ? (
        <div className="card-grid">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={filteredDocuments} />
      )}
}

export default DocumentList;