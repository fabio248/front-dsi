import React from 'react';

export function Galeria_pages() {
  return (
    <div>
      {/* LightWidget WIDGET */}
      <script src='https://cdn.lightwidget.com/widgets/lightwidget.js'></script>
      <iframe
        src='//lightwidget.com/widgets/992f8edcbd495aceb08b91bd6e808a19.html'
        allowtransparency='true'
        className='lightwidget-widget'
        style={{
          width: '100%',
          height: '500px',
          border: '0',
          overflow: 'hidden',
        }}
      ></iframe>
    </div>
  );
}
