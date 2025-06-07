import fs from 'fs';
import path from 'path';

// Basis configuratie met bekende video's
const VIDEOS_CONFIG = {
  FILTERS_VOORNAAM: {
    id: 'e8c2fc778291443cb296387d406928af',
    title: 'Filteren op voornaam',
    description: 'Demonstratie van het filteren op het veld Voornaam in TesoroCRM'
  },
  FILTERS_OPEN_SLUITEN: {
    id: '74e3bf754db943a398ea67deb7e62aad',
    title: 'Filterpaneel openen en sluiten',
    description: 'Demonstratie van het openen en sluiten van het filterpaneel in TesoroCRM'
  }
};

function generateConfig() {
  let config = '// Automatisch gegenereerd - Niet handmatig bewerken!\n';
  config += '// Dit bestand wordt automatisch bijgewerkt.\n\n';
  
  config += 'export const VIDEOS = {\n';
  
  Object.entries(VIDEOS_CONFIG).forEach(([key, video], index, array) => {
    config += `  ${key}: {\n`;
    config += `    id: '${video.id}',\n`;
    config += `    title: '${video.title.replace(/'/g, "\\'")}',\n`;
    config += `    description: '${(video.description || '').replace(/'/g, "\\'")}'\n`;
    config += '  }';
    if (index < array.length - 1) config += ',';
    config += '\n';
  });
  
  config += '};\n\n';
  config += 'export const CLOUDFLARE_STREAM_URL = \'https://customer-5j7pwes53hyjitp3.cloudflarestream.com\';\n';
  
  return config;
}

async function updateVideoConfig() {
  try {
    const configContent = generateConfig();
    const configPath = path.join(process.cwd(), 'src', 'config', 'videos.js');
    
    // Maak de config map aan als deze niet bestaat
    await fs.promises.mkdir(path.dirname(configPath), { recursive: true });
    
    // Schrijf het configuratiebestand
    await fs.promises.writeFile(configPath, configContent, 'utf8');
    
    console.log('✅ Video configuratie succesvol bijgewerkt!');
    console.log(`📁 Pad: ${configPath}`);
  } catch (error) {
    console.error('❌ Fout bij bijwerken van de video configuratie:', error);
    process.exit(1);
  }
}

// Voer het script uit
updateVideoConfig();
