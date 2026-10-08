const fs = require('fs');
const path = require('path');

const srcSvg = fs.readFileSync(path.join(__dirname, '../public/stats-icons/IG.svg'), 'utf8');

// Extract defs but REMOVE all filter tags so no SVG blur clipping occurs
let defsMatch = srcSvg.match(/<defs>([\s\S]*?)<\/defs>/);
let defs = defsMatch ? defsMatch[1] : '';

// Remove filters from defs
defs = defs.replace(/<filter[\s\S]*?<\/filter>/g, '');

// 1. YouTube body
const ytMatch = srcSvg.match(/<g filter="url\(#filter0_d_9897_242\)">([\s\S]*?)<\/g>\s*<g filter="url\(#filter1_d_9897_242\)">/);
const ytBody = ytMatch ? ytMatch[1].trim() : '';

// 2. TikTok body
const ttMatch = srcSvg.match(/<g filter="url\(#filter1_d_9897_242\)">([\s\S]*?)<\/g>\s*<g filter="url\(#filter2_d_9897_242\)">/);
const ttBody = ttMatch ? ttMatch[1].trim() : '';

// 3. Instagram body
const igMatch = srcSvg.match(/<g filter="url\(#filter2_d_9897_242\)">([\s\S]*?)<\/g>\s*<defs>/);
const igBody = igMatch ? igMatch[1].trim() : '';

// Bounding box centers:
// YouTube center: (79.44, 75.75) -> viewBox size 104x104 -> x: 27.44, y: 23.75
// TikTok center: (159.43, 75.72) -> viewBox size 104x104 -> x: 107.43, y: 23.72
// Instagram center: (122.09, 118.40) -> viewBox size 104x104 -> x: 70.09, y: 66.40

const ytSvg = `<svg viewBox="27.44 23.75 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${defs}
  </defs>
  <g>
    ${ytBody}
  </g>
</svg>`;

const ttSvg = `<svg viewBox="107.43 23.72 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${defs}
  </defs>
  <g>
    ${ttBody}
  </g>
</svg>`;

const igSvg = `<svg viewBox="70.09 66.40 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${defs}
  </defs>
  <g>
    ${igBody}
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, '../public/stats-icons/badge-youtube.svg'), ytSvg);
fs.writeFileSync(path.join(__dirname, '../public/stats-icons/badge-tiktok.svg'), ttSvg);
fs.writeFileSync(path.join(__dirname, '../public/stats-icons/badge-instagram.svg'), igSvg);

// 4. Calendar Base
const calSrc = fs.readFileSync(path.join(__dirname, '../public/stats-icons/tear-off-calendar 1.svg'), 'utf8');
const calBase = calSrc.replace(/<path d="M77\.7443 126\.073[\s\S]*?fill="url\(#paint11_linear_9894_124\)"\/>/, '');
fs.writeFileSync(path.join(__dirname, '../public/stats-icons/turnaround-base.svg'), calBase);

console.log('Clean SVGs without filter clipping generated successfully!');
