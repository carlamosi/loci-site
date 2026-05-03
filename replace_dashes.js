const fs = require('fs');
const path = require('path');

function replaceDashesInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
        replaceDashesInDir(fullPath);
      }
    } else {
      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.md')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('—')) {
          content = content.replace(/—/g, '-');
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

replaceDashesInDir(__dirname);
console.log('Done replacing dashes.');
