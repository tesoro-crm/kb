import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsPath = path.join(__dirname, '../src/content/docs');

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    // Check if file has frontmatter
    if (lines[0] !== '---') return false;
    
    let inFrontmatter = false;
    let titleInFrontmatter = false;
    let hasH1 = false;
    
    for (const line of lines) {
      // Toggle frontmatter state
      if (line === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      
      // Check for title in frontmatter
      if (inFrontmatter && line.startsWith('title:')) {
        titleInFrontmatter = true;
      }
      
      // Check for H1 heading
      if (!inFrontmatter && line.match(/^#\s/)) {
        hasH1 = true;
      }
      
      // If we found both, we can stop checking
      if (titleInFrontmatter && hasH1) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`Error checking ${filePath}:`, error);
    return false;
  }
}

function checkDirectory(directory) {
  const files = fs.readdirSync(directory);
  let hasIssues = false;
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      hasIssues = checkDirectory(fullPath) || hasIssues;
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      if (checkFile(fullPath)) {
        console.log(`Potential double title in: ${fullPath}`);
        hasIssues = true;
      }
    }
  }
  
  return hasIssues;
}

console.log('Checking for potential double titles...');
const issuesFound = checkDirectory(docsPath);

if (!issuesFound) {
  console.log('No potential double titles found!');
} else {
  console.log('\nPotential double titles found in the above files.');
  console.log('Please review these files and remove either the title from the frontmatter or the H1 heading.');
}

process.exit(issuesFound ? 1 : 0);
