const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const jsEnvPath = path.join(__dirname, 'js', 'env.js');

if (!fs.existsSync(envPath)) {
    console.error('File .env tidak ditemukan. Silakan buat file .env terlebih dahulu.');
    process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split(/\r?\n/);
const envVars = {};

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        envVars[key] = val;
    }
}

const jsContent = `// Auto-generated from .env (Local only - do not commit to git)
window.__ENV__ = ${JSON.stringify(envVars, null, 4)};
`;

fs.writeFileSync(jsEnvPath, jsContent, 'utf8');
console.log('Berhasil memperbarui js/env.js dari file .env!');
