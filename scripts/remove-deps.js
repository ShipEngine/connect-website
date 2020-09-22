const fs = require("fs");
const path = require("path");

const packagePath = path.join(process.cwd(), "package.json");

const rawPjson = fs.readFileSync(packagePath);
const pjson = JSON.parse(rawPjson);

delete pjson.devDependencies;
delete pjson.dependencies;
delete pjson.eslintConfig;
delete pjson.browserslist;

fs.writeFileSync(packagePath, JSON.stringify(pjson, undefined, 2))
