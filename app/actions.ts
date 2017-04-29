export const actions = {
  reply(opt){
    return {
      type: 'reply',
      option: opt
    };
  },
  showCalculation(calc){
    console.log("CALC",calc);
    return {
      type: 'showcalc',
      calc: calc
    }
  }
};