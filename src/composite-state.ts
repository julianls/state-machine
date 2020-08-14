import { SimpleState } from './simple-state';
import { State } from './state';
import { Transition } from './transition';
import { Action } from './action';
import { Condition } from './condition';
import { CommandContainer } from './command-container';

export class CompositeState extends SimpleState {
  public states: State[] = [];
  public transitions: Transition[] = [];
  public entryState: State;
  public activeState: State;

  constructor(name: string) {
    super(name);
  }

  public process(event: string, data: any, commands: CommandContainer): State {
    const subActiveState = this.activeState.process(event, data, commands) as SimpleState;
    for (const transition of this.transitions) {
      if (transition.sourceState === this.activeState && transition.isValid(event, data, commands)) {
        this.setState(transition.execute(this, data, commands), commands);
        break;
      }
    }

    if (subActiveState && subActiveState.isExit) this.setState(this.states[1], commands);

    return this.activeState;
  }

  public onEnter(commands: CommandContainer) {
    // console.log("EnterState::" + this.name);

    if (this.entryState && this.activeState !== this.entryState) this.setState(this.entryState, commands);

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

  public setState(state: State, commands: CommandContainer = null) {
    if (this.activeState) this.activeState.onExit(commands);
    this.activeState = state;
    this.activeState.onEnter(commands);
  }

  public addState(name: string): SimpleState {
    const state = new SimpleState(name);
    this.states.push(state);
    return state;
  }

  public addEntryState(): SimpleState {
    const state = this.addState('entry');
    this.entryState = state;
    return state;
  }

  public addExitState(name: string = 'exit'): SimpleState {
    const state = this.addState(name);
    state.isExit = true;
    return state;
  }

  public addCompositeState(name: string): CompositeState {
    const state = new CompositeState(name);
    this.states.push(state);
    return state;
  }

  public addTransition(
    event: string,
    sourceState: string,
    targetState: string,
    actionCommand: string = '',
    conditionCommand: string = '',
  ): Transition {
    const transition = new Transition(event);
    transition.sourceState = this.findState(sourceState);
    transition.targetState = this.findState(targetState);
    if (actionCommand) transition.actions.push(new Action(actionCommand));
    if (conditionCommand) transition.condition = new Condition(conditionCommand);
    this.transitions.push(transition);
    return transition;
  }

  public findState(name: string): State {
    for (const state of this.states) if (state.name === name) return state;
    return null;
  }
}
