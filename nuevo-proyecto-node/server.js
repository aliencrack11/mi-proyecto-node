const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Ruta principal con el mensaje "Elquechuga"
app.get('/', (req, res) => {
  let html = '<h1>Elquechuga</h1>';
  const videosDir = path.join(__dirname, 'videos');

  // Lee los archivos de la carpeta "videos"
  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error('Error al leer la carpeta de videos:', err);
      res.send(html + '<p>Error al cargar los videos</p>');
      return;
    }

    // Filtra solo archivos de video (por extensión)
    const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.webm'));

    // Añade los videos al HTML como elementos de video
    videoFiles.forEach(video => {
      html += `
        <div>
          <video width="320" height="240" controls>
            <source src="/videos/${video}" type="video/mp4">
            Tu navegador no soporta videos.
          </video>
        </div>
      `;
    });

    res.send(html);
  });
});

// Servir archivos estáticos de la carpeta "videos"
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
