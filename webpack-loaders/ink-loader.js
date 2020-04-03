const tmp = require('tmp');
const fs = require('fs');
const { execSync } = require('child_process');

// We use a custom temp dir instead of the system one, because the
// flatpak wrapper can't read from the system:
const tempDir = './temp';

module.exports = function load() {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tmpDest = tmp.fileSync({ dir: tempDir });

  try {
    execSync(`./tools/inklecate -o ${tmpDest.name} ${this.resourcePath}`);
  } catch (error) {
    this.emitError(error.stdout);
  }

  const buffer = fs.readFileSync(tmpDest.name);
  const output = buffer.toString('utf8');

  tmpDest.removeCallback();

  return `export default ${output}`;
};
