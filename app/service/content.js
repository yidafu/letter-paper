// 2019-02-09 created by Dov Yih
const { Service } = require('egg');
const fs = require('fs');
const YAML = require('yaml');
const path = require('path');

module.exports = class Content extends Service {

  /**
   * @readonly
   */
  async getContentsFromCache() {
    if (typeof this.app._blogContentCache === 'undefined' ||
          this.app._blogContentCache.length === 0) {
      this.app._blogContentCache = await this.genreateContents();
    }
    return this.app._blogContentCache;
  }
  /**
   * get raw data from api.gethub.com then cache these data
   *
   * @access private
   * @returns [array{post}]
   */
  async getDataFromCache() {
    if (typeof this.app._blogCache === 'undefined'
      || this.app._blogCache.length === 0) {
      // await this.app.runSchedule('fetch_github');
      this.app._blogCache = require('../../db.json');
    }
    // console.log(this.app._blogCache);
    return this.app._blogCache;
  }

  /**
   * generate post contents
   * @access private
   * @returns [Array{content}]
   */
  async genreateContents() {
    // const { app: { _blogCache }} = this;
    const _blogCache = await this.getDataFromCache();
    const len = _blogCache.length;
    // console.log(len, _blogCache);
    const contents = _blogCache
      // format posts data
      .map(function (file) {
        const content = file.content.trim();
        if (content.startsWith('---')) {
          const dashIdx = content.indexOf('---', 3);
          const frontmatter = YAML.parse(content.substring(3, dashIdx));
          // + 3 to trim `---`
          const contentWithoutFrontmatter = content.substring(dashIdx + 3);
          const summary = contentWithoutFrontmatter.indexOf('<!-- READMORE -->') === -1
            ? contentWithoutFrontmatter.substr(0, 200)
            : contentWithoutFrontmatter.split('<!-- READMORE -->')[0];
          const { name, path: filePath, html_url } = file;
          return {
            name,
            path: filePath,
            // content,
            summary, // @TODO Separator <!-- readmore -->
            ...frontmatter,
            url: html_url, // github page url
          };
        } else {
          throw new Error(file.path + ' must has a frontmatter and starts with `---`');
        }
      })
      .sort((pre, next) => Number(new Date(pre.date)) > Number(new Date(next.date)))
      .map((post, idx) => {
        post.id = idx + 1; // id should start with 1
        post.pre = post.id > 1 ? post.id : null;
        post.next = post.id < len ? post.id : null;
        return post;
      });
    return contents;
  }

  async index(offset = 0, limit = 10) {
    const _blogContents  = await this.getContentsFromCache();
    const begin = offset * limit;
    return _blogContents.slice(begin, begin + limit);
  }
};
