import * as fs from "fs";

export default class Filesystem
{
  static read(file: Files)
  {
    return JSON.parse(fs.readFileSync(file, { encoding: "utf8" }));
  }
}

export enum Files
{
  config = "/home/sleeptide/Documents/portal/lib/config.json"
} 
