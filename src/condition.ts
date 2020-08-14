import { CommandContainer } from './command-container';

export class Condition {
  constructor(public commandName: string) {}

  public isValid(event: string, data: any, commands: CommandContainer): boolean {
    return commands.execute(this.commandName, data);
  }
}
