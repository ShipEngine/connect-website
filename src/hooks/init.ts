import { Hook } from "@oclif/config";
import updateNotifier, { Settings, Package } from "update-notifier";
import fs from "fs";
import path from "path";

const pjson = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "package.json"), "utf8")) as Package;

// Setup a weekly notification to let a user known if a new version of the cli is available for install
const hook: Hook<"init"> = () => {
  const settings: Settings = {
    pkg: pjson,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 1 // 1 day
  };

  updateNotifier(settings).notify();
}

export default hook;
