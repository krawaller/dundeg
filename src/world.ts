
export class World {
  entities = {}
  attachments = {root:{}}
  hooks = {}
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
  sendEvent(name, event){
    return new Promise((resolve, reject)=>{
      let promises = Object.keys(this.hooks[name] || {}).map(id=>{
        return Promise.resolve(this.hooks[name][id](event));
      });
      Promise.all(promises).then(result => {
        resolve( result.sort((a1,a2) => {
          return a1.prio < a2.prio ? -1 : 1;
        }) );
      });
    });
  }
}
