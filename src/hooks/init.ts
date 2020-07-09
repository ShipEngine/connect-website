import { Hook } from "@oclif/config";
import updateNotifier, { Settings, Package } from "update-notifier";
const pjson = require("../../package.json") as Package;

// Setup a weekly notification to let a user known if a new version of the cli is available for install
const hook: Hook<"init"> = async () => {
  const settings: Settings = {
    pkg: pjson,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7 // 1 week
  };

  updateNotifier(settings).notify();
}

export default hook;