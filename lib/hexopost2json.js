const md2json = require('fcms-md2json');

/* eslint-env node */
'use strict';

const path = require('path');
const fs = require('fs');

const glob = require('glob');
// Get all .md files' path in an directory
const getMarkdownPaths = (src) => {
    // Get .md file by default
    return glob.sync(src + '/**/*.md');
};

module.exports = (src) => {
    return getMarkdownPaths(src)
        .map((path) => {
            const fileContent = fs.readFileSync(path, 'utf8');
            let post = md2json(fileContent);
            // Use file creation time if missing date metadata
            if (!post.date) {
                const stat = fs.lstatSync(path);
                post.date = stat.birthtime;
            }
            return post;
        });
}
