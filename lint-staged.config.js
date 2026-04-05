// Quote file paths so commands work in directories with spaces.
// Example: D:/agentic ai/... would otherwise split into two arguments.
const quoteFiles = (filenames) =>
  filenames.map((name) => `"${name}"`).join(' ');

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  // Format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) =>
    `npx prettier --write ${quoteFiles(filenames)}`,

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `npx prettier --write ${quoteFiles(filenames)}`,
};
