#!/usr/bin/env node
'use strict';
const path = require('path');
const jp = require('fs-jetpack');
const { spawn } = require('child_process');
const colors = require('colors');
const args = process.argv.slice(2);
const pjson = require('./package.json');

const commands = {
  "app": { func: args => createProject(args), count: 2 },
  "component": {func: args => createComponent(args), count: 2 },
  "service": { func: args => createService(args), count: 2 },
  "version": { func: args => getVersion(args), count: 1}
};

const commandStr = args[0] && args[0].toLowerCase();
const command = commands[commandStr];
if (command && args.length === command.count) {
  command.func(args);
} else {
  console.log(
`
Viage CLI Version: ${pjson.version}

Invalid or missing Parameters:

  Usage: viage <command> <name>

  Example: viage app hello-world

Where command can be:
  app - Create a new empty hello world viage project in the current directory. The name is the folder name and the project name and must be lower case, with words sperated by dashes. Example: my-project

  component - Create a new empty component in the current project. The name is the component name and must be lower case, with words sperated by dashes. Example: my-component

  service - Create  a new empty service in the current project. The name is the service name and must be lower case, with words sperated by dashes. Example: my-service

  version - Return the current version.

To update type: npm install -g viage-cli
`.green);
}

function toProperName(name) {
  let result = name.charAt(0).toUpperCase();
  let cap = false;
  for (let i = 1; i < name.length; ++i){
    const char = name.charAt(i);
    if (char === "_" || char === "-" || char === " "){
      cap = true;
    } else if (cap) {
      result += char.toUpperCase();
      cap = false;
    } else {
      result += char;
    }
  }
  return result;
}

function toHyphonatedName(name) {
  let result = name.charAt(0).toLowerCase();
  for (let i = 1; i < name.length; ++i) {
    const char = name.charAt(i);
    const lower = char.toLowerCase();
    result += (lower == char) ? lower : "-" + lower;
  }
  return result;
}

function makeFirstCharLower (name) {
  if (name && name.length) {
    let result = '' + name.charAt(0).toLowerCase();
    result += name.slice(1);
    return result;
  } else {
    return name;
  }
}

function createProject(args) {
  const name = args[1];
  const dest = path.join(process.cwd(), name);
  const src = __dirname;

  // make our new directory
  console.log(`\n\n\tCreating Directory ${dest}...`.green);
  jp.dir(dest);
  jp.dir(path.join(dest, 'tests'));

  // copy all the source files over
  console.log('\n\n\tCopying Viage Files...'.green);
  jp.copy(path.join(__dirname, 'src'), path.join(dest, 'src'), { overwrite: true });

  // copy a specific set of files
  [
    'tsconfig.json',
    'webpack.common.js',
    'webpack.dev.js',
    'webpack.prod.js',
    'embed.js',
    'target.gitignore',
    'server.js'
  ].forEach((file) => {
    jp.copy(path.join(src, file), path.join(dest, file), { overwrite: true });
  });

  // rename an files that need renaming
  [
    {file: 'target.gitignore', name: '.gitignore'},
  ].forEach( e => jp.rename(path.join(dest, e.file), e.name));

  // write out the package.json
  console.log('\n\n\tInstalling Modules...'.green);
  const targetPackage = require('./target-package.json');
  targetPackage.name = name;
  targetPackage.description = `${name}, a Viage Project`;
  jp.write(path.join(dest, 'package.json'), JSON.stringify(targetPackage, null, 2));

  // install the package
  const child = spawn(`cd ${dest} && npm install`, { shell: true });
  child.stdout.on('data', data => console.log(data.toString()));
  child.stderr.on('data', data => console.error(data.toString()));
  child.on('exit', () => {
    console.log(`\n\n\tSuccess! Created ${dest}`.green);
    process.exit(0);
  });
  child.on('error', (err) => {
    console.error(`\n\n\tFailed! Error: ${err}`.red);
    process.exit(1);
  });
}

function createComponent(args) {
  const name = path.basename(args[1]);
  const namePath = (name === args[1]) ? path.join('src', 'components') : path.dirname(args[1]);
  const properName = toProperName(name);
  const hyphonatedName = toHyphonatedName(properName);

  const code =
`import { Component } from 'viage';

export class ${properName} extends Component {
  constructor() {
    super('${hyphonatedName}');
  }
  init() {
    this.setHTML(\`
      <h1 style="text-align: center">Component ${properName} works</h1>
    \`);
    return this;
  }
}
`;
  const fullPath = path.join(process.cwd(), namePath, `${hyphonatedName}.ts`);
  console.log(`\n\n\tCreated a Component at: ${fullPath}`.green);
  jp.write(fullPath, code);
  process.exit(0);
}

function createService(args) {
  const name = path.basename(args[1]);
  const namePath = (name === args[1]) ? path.join('src', 'services') : path.dirname(args[1]);
  const properName = toProperName(name);
  const hyphonatedName = toHyphonatedName(properName);

  const code =
`import { Service } from 'viage';

export class ${properName} extends Service {
  constructor() {
    super();
  }
}
export const ${makeFirstCharLower(properName)} = new ${properName} ();
`;
  const fullPath = path.join(process.cwd(), namePath, `${hyphonatedName}.ts`);
  console.log(`\n\n\tCreated a Service at: ${fullPath}`.green);
  jp.write(fullPath, code);
  process.exit(0);
}

function getVersion() {
  console.log(`\nViage CLI Version ${pjson.version}\n`);
}