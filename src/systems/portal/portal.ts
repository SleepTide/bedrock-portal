import { BedrockPortal, Joinability, Modules } from "bedrock-portal";
import { Authflow, Titles } from "prismarine-auth";
import Logger from "../../utils/logger/logger";
import Filesystem, { Files } from "../../utils/filesystem/filesystem";

export default class Portal
{
  private instance: BedrockPortal;

  constructor()
  {
    this.start();
  };

  private async start()
  {
    Logger.info("Starting portal...");

    const config = Filesystem.read(Files.config);

    this.instance = new BedrockPortal({
      ip: config.server.ip,
      port: config.server.port,
      world: config.world,
      joinability: Joinability.FriendsOfFriends,
      authflow: { cache: "lib/account", options: { flow: "live", authTitle: Titles.MinecraftNintendoSwitch }, username: "bot" }
    });

    Logger.info("setting up listeners...");

    this.setup();

    this.instance.use(Modules.AutoFriendAccept);
    this.instance.use(Modules.AutoFriendAdd);
    this.instance.use(Modules.UpdateMemberCount);
    this.instance.use(Modules.RedirectFromRealm, {
      clientOptions: config.bot,
      chatCommand: config.chat_invite
    });

    await this.instance.start();

    Logger.info(`${this.instance.host.profile.gamertag} is online!`);
  }

  private setup()
  {
    this.instance.on("playerJoin", (player) =>
    {
      Logger.info(`${player.profile.gamertag} has joined the friend connect.`);
    })
    this.instance.on("playerLeave", (player) =>
    {
      Logger.info(`${player.profile.gamertag} has left the friend connect.`);
    })
    this.instance.on("friendAdded", (player) =>
    {
      Logger.info(`${player.profile.gamertag} has been added.`);
    })
    this.instance.on("friendRemoved", (player) =>
    {
      Logger.info(`${player.profile.gamertag} has been unadded.`);
    })

    Logger.info("Listeners has been setup.");
  }
}
