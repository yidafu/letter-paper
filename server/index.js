const fs = require('fs');
const glob = require('glob');
const clone = require('git-clone');
// const fs = require('fs-extra');
const path = require('path');
const YAML = require('yaml');

const { repo } = require('./config');

if (!fs.existsSync(path.join(__dirname, repo.name))) {
  clone(repo.path, repo.name, function() {
    console.log(`succeed to clone ${repo.path}`);
  });
}

const MdFiles = glob.sync(
  path.join(__dirname, repo.name, '/**/*.md'),
  {
    ignore: '**/README.md',
  },
);

const posts = MdFiles.map(function(filePath) {
  const file = fs.readFileSync(filePath, 'utf8').trim();
  if (file.startsWith('---')) {
    const dashIdx = file.indexOf('---', 3);
    const frontmatter = YAML.parse(file.substring(3, dashIdx));
    // + 3 to trim `---`
    const content = file.substring(dashIdx + 3);
    return { ...frontmatter, content, summay: content.substr(0, 200) };
  } else {
    throw new Error(filePath + ' must has a frontmatter and starts with `---`');
  }
});

console.log(posts);

