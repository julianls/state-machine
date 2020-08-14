import { State } from './state';
import { CommandContainer } from './command-container';

export class SimpleState extends State {
  constructor(name: string, public isExit: boolean = false) {
    super(name);
  }

  public process(event: string, data: any, commands: CommandContainer): State {
    return this;
  }

  public onEnter(commands: CommandContainer) {
    // console.log("EnterState::" + this.name);
    for (const action of this.entryActions) {
      action.execute(null, commands);
    }
  }

  public onExit(commands: CommandContainer) {
    // console.log("ExitState::" + this.name);
    for (const action of this.exitActions) {
      action.execute(null, commands);
    }
  }
}
