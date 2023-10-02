import React from 'react';

export function Galeria_pages() {
  return (
    <div>
      {/* Snapwidget WIDGET */}
      <script src="https://snapwidget.com/js/snapwidget.js"></script>
      <iframe
        src="https://snapwidget.com/embed/1039072"
        className="snapwidget-widget"
        allowtransparency="true"
        frameBorder="0"
        style={{
          border: 'none',
          overflow: 'hidden',
          width: '100%',
          height: '450px',
        }}
      ></iframe>
    </div>
  );
}
