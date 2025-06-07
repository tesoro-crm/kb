import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Laad .env bestand
dotenv.config();

// Configuratie
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
  console.error('Fout: CLOUDFLARE_ACCOUNT_ID en CLOUDFLARE_API_TOKEN moeten zijn ingesteld in .env');
  process.exit(1);
}

async function getAllVideos() {
  let videos = [];
  let page = 1;
  const perPage = 100;
  let hasMore = true;

  console.log('Ophalen van alle video\'s...');
  
  try {
    while (hasMore) {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream?page=${page}&per_page=${perPage}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Fout bij ophalen video's: ${JSON.stringify(error)}`);
      }
      
      const result = await response.json();
      
      if (result.result && result.result.length > 0) {
        videos = [...videos, ...result.result];
        console.log(`Pagina ${page} opgehaald (${result.result.length} video's)`);
        
        if (result.result.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      } else {
        hasMore = false;
      }
    }
    
    return videos;
  } catch (error) {
    console.error('Fout bij ophalen video\'s:', error.message);
    throw error;
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
    
    console.log(`✅ Video ${videoId} succesvol verwijderd`);
    return true;
  } catch (error) {
    console.error(`❌ Fout bij verwijderen video ${videoId}:`, error.message);
    return false;
  }
}

async function cleanupDuplicates() {
  try {
    // Haal alle video's op
    const videos = await getAllVideos();
    console.log(`\nTotaal aantal video's gevonden: ${videos.length}`);
    
    // Groepeer video's op bestandsnaam
    const videosByName = {};
    videos.forEach(video => {
      const fileName = video.meta?.original_filename || 'onbekend';
      if (!videosByName[fileName]) {
        videosByName[fileName] = [];
      }
      videosByName[fileName].push(video);
    });
    
    // Identificeer dubbele video's
    let duplicatesFound = 0;
    const toDelete = [];
    
    Object.entries(videosByName).forEach(([fileName, videoList]) => {
      if (videoList.length > 1) {
        console.log(`\n${fileName}: ${videoList.length} versies gevonden`);
        
        // Sorteer op aanmaakdatum (nieuwste eerst)
        const sortedVideos = [...videoList].sort((a, b) => 
          new Date(b.created) - new Date(a.created)
        );
        
        // Houd de nieuwste versie, markeer de rest voor verwijdering
        const [newest, ...olderVersions] = sortedVideos;
        console.log(`  - Nieuwste: ${newest.uid} (${new Date(newest.created).toISOString()})`);
        
        olderVersions.forEach(video => {
          console.log(`  - Te verwijderen: ${video.uid} (${new Date(video.created).toISOString()})`);
          toDelete.push(video.uid);
        });
        
        duplicatesFound += olderVersions.length;
      }
    });
    
    if (toDelete.length === 0) {
      console.log('\nGeen dubbele video\'s gevonden.');
      return;
    }
    
    console.log(`\n${toDelete.length} video's gemarkeerd voor verwijdering.`);
    
    // Bevestiging voordat we verwijderen
    const readline = (await import('readline')).createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('\nWeet je zeker dat je deze video\'s wilt verwijderen? (ja/N) ', async (answer) => {
      readline.close();
      
      if (answer.toLowerCase() === 'ja') {
        console.log('\nVerwijderen van dubbele video\'s...');
        
        // Verwijder de video's in serie om rate limiting te voorkomen
        for (const videoId of toDelete) {
          await deleteVideo(videoId);
          // Kleine vertraging tussen requests
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        console.log('\n✅ Opruimen voltooid!');
      } else {
        console.log('\nGeen video\'s verwijderd.');
      }
    });
    
  } catch (error) {
    console.error('Er is een fout opgetreden:', error);
    process.exit(1);
  }
}

// Voer het script uit
cleanupDuplicates();
