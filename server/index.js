const fs = require('fs');
const glob = require('glob');
const clone = require('git-clone');
// const fs = require('fs-extra');
const path = require('path');
const YAML = require('yaml');

const { repo, output } = require('./config');

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
const DBDir = output.dir // path.join(__dirname, output.dir);

if (!fs.existsSync(DBDir)) {
  fs.mkdirSync(DBDir, { recursive: true})
}

const posts = MdFiles
  .map(function(filePath) {
    const file = fs.readFileSync(filePath, 'utf8').trim();
    if (file.startsWith('---')) {
      const dashIdx = file.indexOf('---', 3);
      const frontmatter = YAML.parse(file.substring(3, dashIdx));
      // + 3 to trim `---`
      const content = file.substring(dashIdx + 3);
      const {name} = path.parse(filePath)
      return { name, ...frontmatter, content, summary: content.substr(0, 200) };
    } else {
      throw new Error(filePath + ' must has a frontmatter and starts with `---`');
    }
  })
  .sort( (pre, next) => +new Date(pre.date) > +new Date(next.date) )
  .map((post, idx) => {
    post.id = idx + 1; // id should start with 1
    fs.writeFileSync(
      path.join(DBDir, post.id + '.json'), 
      JSON.stringify(post, null, 2),
    );
    // post.pre = post.id - 1 > 1 ? post.id : null;
    // post.next = post.id - 1 > 1 ? post.id : null;
    const {content, ...summaryPost} = post;
    return summaryPost;
  })

// db/index.json
fs.writeFileSync(
  path.join(DBDir, 'index.json'),
  JSON.stringify( {count: posts.length, posts}, null, 2)
)