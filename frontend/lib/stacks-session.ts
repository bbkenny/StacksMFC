import { AppConfig, UserSession } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export const appDetails = {
  name: "Stacks Mini Finance Console",
  icon: "/favicon.ico",
};
