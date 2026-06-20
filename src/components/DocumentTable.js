import React from "react";
function DocumentTable({ documents }) {
  return (
    <table className="doc-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id}>
            <td>{doc.title}</td>
            <td>{doc.category}</td>
            <td>{doc.description}</td>
            <td><a href={doc.url} target="_blank" rel="noopener noreferrer">Preview</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DocumentTable;
