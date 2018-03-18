#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');
const  Git  = require('git-exec');
const inquirer = require('inquirer');
const eslint = JSON.stringify({
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "node": true,
      "mocha": true,
      "browser": true,
      "es6": true
    },
    "extends": ["eslint:recommended"],
    "plugins": [
    ],
    "rules": {
      "no-console": 0,
      "space-before-blocks": 1,
      "arrow-spacing": 1,
      "keyword-spacing": 1,
      "space-infix-ops": 1,
      "space-in-parens": 1,
      "spaced-comment": 1,
      "semi": 1,
      "no-multiple-empty-lines": 1
    }
  });

function errOrSucc (err, filename) { // write file success or error log
    (err) ? console.log(`${err}: Error file could not be created.`) : console.log(`${filename} file successfully created.`);
}


let questions = [{ // prompt question
message: 'What type of project would you like to create?',
type: 'list',
choices: [
    'Node Api',
    'Web Page'
],
name: 'projType'
},
{
    message: 'Name your project',
    type: 'input',
    name: 'projName'
}];

inquirer.prompt(questions).then((answers) => {
    (answers['projType'] === 'Node Api') ? createNodeProject(answers['projName']) : createWebPage(answers['projName']);
});

function createNodeProject (projName) {
    const root = `${process.cwd()}/${projName}`;
    fs.mkdir(root, (err) => {
        errOrSucc(err, root);
        fs.writeFile(`${root}/index.js`, "// Index.js", (err) => { errOrSucc(err, 'index')});
        fs.mkdir(`${root}/spec`, (err) => {  // SPEC FOLDER CREATION
            errOrSucc(err, `${root}/spec`);
            fs.writeFile(`${root}/spec/index.spec.js`, "// Index.spec.js", (err)=>{errOrSucc(err, 'index-spec')})});
        exec('npm init -y', {cwd:`${root}`}, (err)=>{})
        exec('npm i mocha chai -D', {cwd:`${root}`}, (err)=>{})
        fs.writeFile(`${root}/.npmignore`,'//.npmignore', (err)=>{ errOrSucc(err, 'npmignore')})
        fs.writeFile(`${root}/README.md`, '#README', (err)=>{ errOrSucc(err, 'README')})
        fs.writeFile(`${root}/.eslintrc`, eslint, (err)=>{ errOrSucc(err, 'eslint')})
        fs.writeFile(`${root}/.gitignore`, 'node_modules', (err)=>{ errOrSucc(err, 'gitignore')})
        Git.init(null, `${root}`, (err)=>{});
    });
}

function createWebPage (projName) {
    const root = `${process.cwd()}/${projName}`;
    fs.mkdir(root, (err) => {
        errOrSucc(err, root);
        fs.writeFile(`${root}/index.html`, '', (err)=>{ errOrSucc(err, 'index.html')})
        fs.mkdir(`${root}/css`, (err) => {
            errOrSucc(err, `${root}/css`);
            fs.writeFile(`${root}/css/index.css`, '', (err)=>{ errOrSucc(err, 'index.css')})
        })
        fs.mkdir(`${root}/js`, (err) => {
            errOrSucc(err, `${root}/js`);
            fs.writeFile(`${root}/js/index.js`, '', (err)=>{ errOrSucc(err, 'index.js')})
        })
    })
}