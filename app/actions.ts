export const actions = {
  reply(opt){
    console.log("Creating action for opt", opt);
    return {
      type: 'reply',
      option: opt
    };
  }
};