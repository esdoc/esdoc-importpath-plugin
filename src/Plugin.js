import fs from 'fs';

let option;
let packagePath = './package.json';

/**
 * take option
 * @param {Object} ev - handle event.
 */
export function onStart(ev) {
  option = ev.data.option;
  for (let item of option.replaces) {
    item.from = new RegExp(item.from);
  }
}

/**
 * take config for package.json path.
 * @param {Object} ev - handle event.
 */
export function onHandleConfig(ev) {
  if (ev.data.config.package) packagePath = ev.data.config.package;
}

/**
 * replace import path with using option.replaces.
 * @param {Object} ev - handle event.
 */
export function onHandleTag(ev) {
  // get package.json
  let packageName = '';
  let mainPath = '';
  try {
    const packageJSON = fs.readFileSync(packagePath).toString();
    const packageObj = JSON.parse(packageJSON);
    packageName = packageObj.name;
    if(packageObj.main) mainPath = packageObj.main;
  } catch (e) {
    // ignore
  }

  for (let tag of ev.data.tag) {
    if (!tag.importPath) continue;

    let importPath = tag.importPath;
    if (packageName) importPath = importPath.replace(new RegExp(`^${packageName}/`), '');

    for (let item of option.replaces) {
      importPath = importPath.replace(item.from, item.to);
    }

    if (importPath === mainPath) {
      tag.importPath = packageName;
    } else if (packageName) {
      tag.importPath = `${packageName}/${importPath}`;
    } else {
      tag.importPath = importPath;
    }
  }
}
