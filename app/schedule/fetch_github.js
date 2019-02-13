const { Subscription } = require('egg');
const fs = require('fs');
const octokit = require('../util/octokit');
const { base64ToUtf8 } = require('../util/convert');

const blackList = [
  'imgs',
  '.gitignore',
  'README.md',
  'LICENSE',
];

module.exports = class FetchGithub extends Subscription {
  static get schedule() {
    return {
      interval: '1h',
      type: 'worker',
    };
  }
  async subscribe() {
    const {
      app: {
        config: {
          repo: repoConf
        }
      }
    } = this;
    console.log('fetch github data start: ');
    try {

      const repo = await octokit.repos.getBranch(repoConf);
      const tree_sha = repo.data.commit.sha;
      const repoTree = await octokit.git.getTree({
        ...repoConf,
        tree_sha,
      });

      const { tree } = repoTree.data;
      const directories = tree
        .filter((node, idx) => node.type === 'tree' && !blackList.includes(node.path));

      const dirReqs = directories.map(node => (
        octokit.repos.getContents({
          ...repoConf,
          sha: node.sha,
          path: node.path,
        })
      ));

      const subDirs = await Promise.all(dirReqs);

      // node.js dosen't has `Array.prototype.flat`, Alternative:
      //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
      const postFileDatas = subDirs
        .map(resp => resp.data)
        .reduce((acc, val) => acc.concat(val));
      const postFileReqs = postFileDatas.filter(file => file.path.toLocaleLowerCase().endsWith('.md'))
        .map(fileNode => octokit.repos.getContents({
          ...repoConf,
          sha: fileNode.sha,
          path: fileNode.path,
        }));

      const postFiles = await Promise.all(postFileReqs);

      const postDatas = postFiles.map(v => {
        const {
          data,
          data: {
            content
          }
        } = v;
        const utf8Content = base64ToUtf8(content);
        data.content = utf8Content;
        data.encoding = 'utf8';
        return data;
      });
      this.ctx.app._blogCache = postDatas;
      // fs.writeFileSync('db.json', JSON.stringify(postDatas, null, 2));
    } catch (e) {
      console.log('errer occurred when fetch data: ', e);
    }
  }
};
