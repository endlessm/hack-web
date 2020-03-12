const tmp = require('tmp');
const fs = require('fs');
const { execSync } = require('child_process');

// We use a custom temp dir instead of the system one, because the
// flatpak wrapper can't read from the system:
const tempDir = './temp';

module.exports = (source) => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tmpSource = tmp.fileSync({ dir: tempDir });
  const tmpDest = tmp.fileSync({ dir: tempDir });

  fs.writeSync(tmpSource.fd, source);

  execSync(`./tools/inklecate -o ${tmpDest.name} ${tmpSource.name}`);

  const buffer = fs.readFileSync(tmpDest.name);
  const output = buffer.toString('utf8');

  tmpSource.removeCallback();
  tmpDest.removeCallback();

  return `export default ${output}`;
};
