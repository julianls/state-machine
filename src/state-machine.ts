import { CompositeState } from './composite-state';
import { CommandContainer } from './command-container';
import { IBaseCommand } from './base-command';

export class StateMachine extends CompositeState {
  private commands: CommandContainer = new CommandContainer();

  constructor() {
    super('');
  }

  public registerCommand(id: string, command: IBaseCommand) {
    this.commands.register(id, command);
  }

  public onevent(event: string, data: any) {
    this.process(event, data, this.commands);
  }

  executeCommand(id: string, data: any): boolean {
    return this.commands.execute(id, data);
  }
}
