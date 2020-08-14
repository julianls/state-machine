import { IBaseCommand } from './base-command';

export class CommandContainer {
  private commands: { [id: string]: IBaseCommand } = {};

  register(id: string, command: IBaseCommand) {
    this.commands[id] = command;
  }

  execute(id: string, data: any): boolean {
    const command = this.commands[id];
    if (command) return command.execute(data);
    else return false;
  }
}
