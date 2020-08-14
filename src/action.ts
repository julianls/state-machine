import { CommandContainer } from './command-container';

export class Action {
  constructor(public commandName: string) {}

  public execute(data: any, commands: CommandContainer) {
    commands.execute(this.commandName, data);
  }
}
