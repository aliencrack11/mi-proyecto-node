const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Ruta principal con el mensaje "Elquechuga"
app.get('/', (req, res) => {
  let html = `
    <style>
      body {
        background-image: url('/background.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        font-family: Arial, sans-serif;
        color: Black;
        text-align: center;
        margin: 0;
        padding: 0;
      }
      h1 {
        margin-top: 50px;
        font-size: 60px;
      }
      .video-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
      }
      .video-item {
        text-align: center;
      }
      .video-title {
        font-size: 20px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .social-links {
        margin-top: 30px;
        padding: 20px;
      }
      .social-links a {
        margin: 0 15px;
        text-decoration: none;
      }
      .social-links img {
        width: 40px;
        height: 40px;
      }
    </style>
    <h1>✞ 𝕰𝖑𝖖𝖚𝖊𝖈𝖍𝖚𝖌𝖆 ✞</h1>
    <div class="video-container">
  `;

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

    if (videoFiles.length === 0) {
      html += '<p>No hay videos disponibles</p>';
    } else {
      videoFiles.forEach(video => {
        const extension = path.extname(video).toLowerCase();
        const mimeType = extension === '.webm' ? 'video/webm' : 'video/mp4';
        const videoTitle = path.basename(video, extension); // Toma el nombre del archivo sin extensión

        html += `
          <div class="video-item">
            <div class="video-title">${videoTitle}</div>
            <video width="320" height="240" controls>
              <source src="/videos/${video}" type="${mimeType}">
              Tu navegador no soporta videos.
            </video>
          </div>
        `;
      });
    }

    html += '</div>'; // Cierre del contenedor de videos

    // Agregar enlaces de redes sociales
    html += `
      <div class="social-links">
        <a href="https://www.instagram.com/ibrandon_hits?igsh=MTg2Nm4ycGM1OG85bw==" target="_blank">
          <img src="/images/instagram-icon.png" alt="Instagram">
        </a>
        <a href="https://x.com/ELQUECHUGA?t=HMicjBvqXJIvifkTyP6k6Q&s=09" target="_blank">
          <img src="/images/twitter-icon.png" alt="Twitter">
        </a>
        <a href="https://youtube.com/@elquechugatv?si=G7PwqI9D31WJ_-Pw" target="_blank">
          <img src="/images/youtube-icon.png" alt="YouTube">
        </a>
        <a href="https://www.tiktok.com/@brandonlee369?_t=ZM-8u33kH7qRao&_r=1" target="_blank">
          <img src="/images/tiktok-icon.png" alt="TikTok">
        </a>
        <a href="https://kick.com/lee-brandon" target="_blank">
          <img src="/images/kick-icon.png" alt="Kick">
        </a>
      </div>
    `;

    res.send(html);
  });
});

// Servir archivos estáticos de la carpeta "videos" y "public"
app.use('/videos', express.static(path.join(__dirname, 'videos')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
