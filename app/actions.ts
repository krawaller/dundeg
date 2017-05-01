import { CalculationResult } from '../engine/src/interfaces'

export const actions = {
  reply(opt){
    return {
      type: 'reply',
      option: opt
    };
  },
  showCalculation(calc:CalculationResult,dig?: string){
    console.log("CALC",calc);
    return {
      type: 'showcalc',
      calc: calc,
      dig: dig
    };
  },
  backCalculation(){
    return {
      type: 'backcalc'
    };
  },
  beginBattle(){
    return {
      type: 'beginBattle'
    }
  }
};