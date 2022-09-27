/*const { readFileSync } = require("fs");*/
import { readFileSync } from "fs";
import * as nodePath from "path";
const srcFolder = nodePath.basename(`${nodePath.resolve()}/src`);

export const data = {
  menu: JSON.parse(readFileSync(`${srcFolder}/data/menu.json`, "utf8")),
  phone: JSON.parse(readFileSync(`${srcFolder}/data/phone.json`, "utf8")),
 
};
