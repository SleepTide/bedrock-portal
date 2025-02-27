import "colors";

export default class Logger
{
  static info(...message: any[])
  {
    console.log(`(INFO)`.cyan + ` [${this.getTime()}] ${message.join(" ")}`);
  }

  static error(...message: any[])
  {
    console.log(`(ERROR)`.red + ` [${this.getTime()}] ${message.join(" ")}`);
  }

  static warn(...message: any[])
  {
    console.log(`(WARNING)`.yellow + ` [${this.getTime()}] ${message.join(" ")}`);
  }

  static getTime(time = Date.now())
  {
    return new Date(time).toLocaleString();
  }
}
