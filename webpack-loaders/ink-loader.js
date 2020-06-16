/* Copyright © 2020 Endless OS LLC
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
