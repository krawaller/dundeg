import Promise from './promise'

export class World {
  entities = {}
  attachments = {root:{}}
  hooks = {}
  pending:any
  private nextId = 0
  addEntity(entity, targetEntity=undefined){
    let newId = 'E' + ++this.nextId;
    this.entities[newId] = entity;
    Object.keys(entity.hooks).forEach(hook => {
      this.hooks[hook] = this.hooks[hook] || {};
      this.hooks[hook][newId] = entity.hooks[hook].bind(entity);
    });
    entity.id = newId;
    if (targetEntity){
      this.connectEntity(entity, targetEntity);
    }
    return newId;
  }
  getAllEntities(){
    return Object.keys(this.entities).map(id => this.entities[id]);
  }
  connectEntity(entity, targetEntity){
    let targetId = targetEntity.id;
    this.attachments[targetId] = this.attachments[targetId] || {};
    this.attachments[targetId][entity.id] = 1;
    entity.attachedTo = targetId;
  }
  getParent(entity){
    return entity.attachedTo === 'root' ? this : this.entities[entity.attachedTo];
  }
  getAttachments(entity){
    return Object.keys(this.attachments[entity.id]||{}).map(id=> this.entities[id]);
  }
  getEntity(id){
    return this.entities[id];
  }
  exists(entity){
    return !!this.entities[entity.id];
  }
  removeEntity(entity){
    let id = entity.id;
    Object.keys(this.attachments[id]||{}).forEach(id => this.removeEntity(this.entities[id]));
    Object.keys(this.entities[id].hooks).forEach(hook => {
      delete this.hooks[hook][id];
    });
    delete this.entities[id];
  }
  askUser(questionText, opts){
    if (this.pending){
      throw new Error("Already a pending question!");
    }
    return new Promise((resolve,reject)=>{
      this.pending = {
        options: opts,
        reply: (optName)=>{
          delete this.pending;
          opts[optName](this).then(result=>{
            resolve([optName, result]);
          });
        }
      }
    });
  }
  answer(optName){
    if (!this.pending){
      throw new Error("Answered "+optName+" but no pending question!");
    } else if (!this.pending.options[optName]){
      throw new Error("Unknown answer: "+optName);
    }
    this.pending.reply(optName);
  }
  sendEvent(name, event):Promise<any> {
    return new Promise((resolve, reject)=>{
      let promises = Object.keys(this.hooks[name] || {}).map(id=>{
        return Promise.resolve(this.hooks[name][id](event, this));
      });
      Promise.all(promises).then(inputArr => {
        inputArr = inputArr.filter(i=>i !== undefined).sort((a1,a2) => {
          return a1.prio === undefined || a1.prio < a2.prio ? -1 : 1;
        });
        switch(event.type){
          case 'collect':
            return resolve( inputArr );
          case 'build':
            inputArr.push(last => ({operation: 'final', value: last.value}));
            let final = inputArr.reduce( (mem,mutator,idx)=> {
              if (mem.forced && idx !== inputArr.length-1) return mem;
              let newCalc = mutator(mem);
              let history = mem.history;
              delete mem.history;
              newCalc.history = history.concat(mem);
              return newCalc;
            }, {value: event.start || 0, history: [], operation: 'start'});
            return resolve( final );
          default: throw 'Unknown event type: '+event.type
        }
      });
    });
  }
}
