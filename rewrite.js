const fs = require('fs');
let file = fs.readFileSync(
  'c:/Users/Admin/Downloads/portfolio/portfolio/utils/techIcons.tsx',
  'utf-8'
);

file = file.replace(/component:\s*<Si([A-Za-z]+)\s*\/>/g, (match, p1) => {
  const slug = p1.toLowerCase();
  return `component: <img src="https://cdn.simpleicons.org/${slug}" style={{ width: '1em', height: '1em', objectFit: 'contain', display: 'inline-block' }} alt="${slug}" onError={(e) => { e.currentTarget.src = "/assets/portfolio/skills/check.svg"; }} />`;
});

fs.writeFileSync(
  'c:/Users/Admin/Downloads/portfolio/portfolio/utils/techIcons.tsx',
  file
);
console.log('Done!');
