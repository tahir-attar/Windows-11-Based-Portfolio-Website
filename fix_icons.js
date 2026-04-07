const fs = require('fs');
const file = 'c:/Users/Admin/Downloads/portfolio/portfolio/utils/techIcons.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Colorize Next.js, Vercel, Prisma, Github (and other pure black SimpleIcons) to pure white
content = content.replace(/nextdotjs"/g, 'nextdotjs/white"');
content = content.replace(/vercel"/g, 'vercel/white"');
content = content.replace(/prisma"/g, 'prisma/white"');
content = content.replace(/github"/g, 'github/white"');
content = content.replace(/socketdotio"/g, 'socketdotio/white"');

// Fix AWS broken image -> use devicon or wikimedia
content = content.replace(
  /"https:\/\/cdn.simpleicons.org\/amazonaws(.*?)"/,
  '"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"'
);

fs.writeFileSync(file, content);
console.log('Fixed Icons correctly!');
