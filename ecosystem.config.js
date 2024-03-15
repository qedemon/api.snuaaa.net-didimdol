const {apps: serverApps} = require("./server.config");

const targets = {
  all: {
    apps: [...serverApps]
  },
  server: {
    apps: [...serverApps]
  }
}

const target = process.argv[4]??"all";

module.exports = targets[target];