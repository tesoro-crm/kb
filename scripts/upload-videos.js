import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import FormData from 'form-data';

// Laad .env bestand
dotenv.config();

// Configuratie
const VIDEOS_DIR = path.join(process.cwd(), 'public/videos');
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.error('Fout: CLOUDFLARE_ACCOUNT_ID en CLOUDFLARE_API_TOKEN moeten zijn ingesteld in .env');
  process.exit(1);
}

async function getVideoByName(fileName) {
  try {
    // Eerst proberen we exacte match op bestandsnaam
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream?search=${encodeURIComponent(fileName)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const result = await response.json();
    
    if (response.ok && result.result && result.result.length > 0) {
      // Vind de video met exact dezelfde bestandsnaam
      return result.result.find(video => 
        video.meta && 
        video.meta.original_filename === fileName
      );
    }
    return null;
  } catch (error) {
    console.error('Fout bij ophalen video:', error.message);
    return null;
  }
}

async function deleteVideo(videoId) {
  try {
    console.log(`Verwijderen van video ${videoId}...`);
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/${videoId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
        }
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    
    return true;
  } catch (error) {
    console.error('Fout bij verwijderen video:', error.message);
    throw error;
  }
}

async function uploadVideo(filePath, fileName) {
  try {
    console.log(`\nVerwerken van ${fileName}...`);
    
    // Lees het videobestand en haal de bestandsgrootte op
    const fileBuffer = await fs.readFile(filePath);
    const fileStats = await fs.stat(filePath);
    const fileSize = fileStats.size;
    
    // Controleer of de video al bestaat
    const existingVideo = await getVideoByName(fileName);
    
    if (existingVideo) {
      // Als de bestandsgrootte overeenkomt, is het waarschijnlijk dezelfde video
      if (existingVideo.size === fileSize) {
        console.log(`ℹ️  Video '${fileName}' bestaat al met dezelfde grootte (${(fileSize / 1024 / 1024).toFixed(2)} MB). Overslaan...`);
        console.log(`   Video ID: ${existingVideo.uid}`);
        console.log(`   Preview: ${existingVideo.preview}`);
        return existingVideo;
      }
      
      console.log(`🔄 Bestaande video '${fileName}' heeft een andere grootte (${existingVideo.size} vs ${fileSize} bytes). Oude video wordt verwijderd...`);
      await deleteVideo(existingVideo.uid);
    }
    
    console.log(`⬆️  Uploaden van ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`);
    
    // Maak FormData aan voor de nieuwe upload
    const form = new FormData();
    form.append('file', fileBuffer, { 
      filename: fileName,
      knownLength: fileSize
    });
    form.append('requireSignedURLs', 'false');
    form.append('maxDurationSeconds', '600');
    // Voeg metadata toe voor betere tracking
    form.append('meta', JSON.stringify({
      name: fileName,
      uploaded_via: 'kb-upload-script',
      timestamp: new Date().toISOString()
    }));
    
    // Upload de video naar Cloudflare Stream
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          ...form.getHeaders()
        },
        body: form
      }
    );
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.errors.map(e => e.message).join(', '));
    }
    
    console.log(`✅ Succesvol geüpload!`);
    console.log(`   Video ID: ${result.result.uid}`);
    console.log(`   Preview: ${result.result.preview}`);
    
    return result.result;
  } catch (error) {
    console.error(`❌ Fout bij uploaden van ${fileName}:`, error.message);
    throw error;
  }
}

async function processVideos() {
  try {
    // Controleer of de videos map bestaat
    try {
      await fs.access(VIDEOS_DIR);
    } catch {
      console.log(`Geen videos map gevonden op: ${VIDEOS_DIR}`);
      return;
    }
    
    // Lees alle bestanden in de map
    const files = await fs.readdir(VIDEOS_DIR);
    const videoFiles = files.filter(file => 
      file.endsWith('.mp4') || file.endsWith('.webm') || file.endsWith('.mov')
    );
    
    if (videoFiles.length === 0) {
      console.log('Geen video bestanden gevonden om te uploaden.');
      return;
    }
    
    console.log(`Gevonden video's: ${videoFiles.join(', ')}`);
    
    // Upload elke video
    for (const file of videoFiles) {
      const filePath = path.join(VIDEOS_DIR, file);
      await uploadVideo(filePath, file);
    }
    
    console.log('\nAlle video\'s zijn verwerkt!');
    
  } catch (error) {
    console.error('Er is een fout opgetreden:', error);
    process.exit(1);
  }
}

// Voer het script uit
processVideos();
