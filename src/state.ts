import { Action } from './action';
import { CommandContainer } from './command-container';

export abstract class State {
  public entryActions: Action[] = [];
  public exitActions: Action[] = [];

  constructor(public name: string) {}

  public abstract process(event: string, data: any, commands: CommandContainer): State;
  public abstract onEnter(commands: CommandContainer);
  public abstract onExit(commands: CommandContainer);
}
