import { ConnectionDefinition } from "@shipengine/integration-platform-sdk";

const parcelPost: ConnectionDefinition = {
  id: "29291ae9-99f6-4a74-baa1-84058c3e28d2",
  name: "Parcel Post",
  description: "Parcel Post provides low-cost multi-carrier delivery services within the U.S. and to major international destinations",
  websiteURL: "https://parcel-post.net",
  logo: "../logo.svg",

  connectionForm: import("./forms/connect"),
  settingsForm: import("./forms/settings"),
  connect: import("./connect"),
};

export default parcelPost;
