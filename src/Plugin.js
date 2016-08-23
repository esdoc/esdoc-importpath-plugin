import fs from 'fs';

let option;
let packageObj;

/**
 * take option
 * @param {Object} ev - handle event.
 */
export function onStart(ev) {
  option = ev.data.option;

  if (Array.isArray(option.replaces)) {
    option.appendPackageName = option.appendPackageName;
    option.replaces = option.replaces.map((item) => {
      return {
        to: item.to,
        from: new RegExp(item.from),
      };
    });
  } else if (typeof option.replaces === 'string') {
    option.name = option.replaces;
  }
}

/**
 * take config for package.json path.
 * @param {Object} ev - handle event.
 */
export function onHandleConfig(ev) {
  packageObj = ev.data.config.package;
  if (typeof ev.data.config.package === 'string') {
    try {
      const packageJSON = fs.readFileSync(packageObj).toString();
      packageObj = JSON.parse(packageJSON);
    } catch (e) {
      // ignore
    }
  }
  if (typeof option.packageProp === 'string') {
    option.name = packageObj[option.packageProp];
  }
}

/**
 * replace import path with using option.replaces.
 * @param {Object} ev - handle event.
 */
export function onHandleTag(ev) {
  // get package.json
  for (let tag of ev.data.tag) {
    if (tag.importPath) {
      tag.importPath = getImportPath(tag.importPath);
    }
  }
}

function getImportPath(tagImportPath) {
  if (option.name) {
    return option.name;
  }

  // process the user's replace config.
  let importPath = tagImportPath;
  if (packageObj && packageObj.name) {
    importPath = importPath.replace(new RegExp(`^${packageObj.name}/`), '');
  }
  (option.replaces || []).forEach((item) => {
    importPath = importPath.replace(item.from, item.to);
  });

  // add the package name to the beginning of the import path
  if (option.appendPackageName) {
    return `${packageObj.name}/${importPath}`;
  }

  return importPath;
}
