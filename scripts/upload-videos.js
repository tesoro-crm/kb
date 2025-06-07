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

async function uploadVideo(filePath, fileName) {
  try {
    console.log(`Uploaden van ${fileName}...`);
    
    // Lees het videobestand
    const fileBuffer = await fs.readFile(filePath);
    
    // Maak FormData aan
    const form = new FormData();
    form.append('file', fileBuffer, { filename: fileName });
    form.append('requireSignedURLs', 'false');
    form.append('maxDurationSeconds', '600');
    
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
