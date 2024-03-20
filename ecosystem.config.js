const {apps: serverApps} = require("./server.config");
const {apps: syncServerApps} = require("./sync.config");

module.exports = {
  apps: [...serverApps, ...syncServerApps]
};