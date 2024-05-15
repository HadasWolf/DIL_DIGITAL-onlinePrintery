const OS = require("os");

const TOTAL_MEMORY = `${OS.totalmem() / 1073741824} GB`;
const FREE_MEMORY = `${OS.freemem() / 1073741824} GB`;
const NAME_SYSTEM = `${OS.platform()}`;
const VERSION_SYSTEM = `${OS.version()}`;
const TYPE = `${OS.type()}`;
const HOST_COMPUTER = `${OS.hostname()}`;
const ARCHITECTURE_SYSTEM = `${OS.arch()}`;

console.table({
  NAME_SYSTEM,
  TOTAL_MEMORY,
  FREE_MEMORY,
  VERSION_SYSTEM,
  TYPE,
  HOST_COMPUTER,
  ARCHITECTURE_SYSTEM,
});
