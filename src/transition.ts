import { Action } from './action';
import { Condition } from './condition';
import { State } from './state';
import { CompositeState } from './composite-state';
import { CommandContainer } from './command-container';

export class Transition {
  public actions: Action[] = [];
  public condition: Condition = null;
  public sourceState: State;
  public targetState: State;

  constructor(public event: string) {}

  public isValid(event: string, data: any, commands: CommandContainer): boolean {
    if (event !== this.event) return false;

    if (this.condition === null) return true;

    return this.condition.isValid(event, data, commands);
  }

  public execute(context: CompositeState, data: any, commands: CommandContainer): State {
    for (const action of this.actions) action.execute(data, commands);

    return context.findState(this.targetState.name);
  }
}
