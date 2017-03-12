import assert = require("assert");

import { World } from '../../src/world'

class TestEntity {
  constructor(hooks={}){
    this.hooks = hooks;
  }
  id: any
  hooks: any
}

(function testWorld(){
  let world = new World();
  let entity = new TestEntity();
  let entity2 = new TestEntity();
  let entity3 = new TestEntity();
  world.addEntity(entity);
  assert.ok(world.exists(entity));
  world.addEntity(entity2, entity);
  assert.equal(world.getParent(entity2), entity);
  assert.deepEqual(world.getAttachments(entity), [entity2]);
  world.addEntity(entity3);
  world.removeEntity(entity);
  assert.ok(!world.exists(entity));
  assert.ok(!world.exists(entity2));
  assert.ok(world.exists(entity3));
})();

(function testHooks(){
  let world = new World();
  let calledWithArg;
  let calledWithContext;
  let result1 = {foo:'bar', prio: 3};
  let result2 = {foo:'bin', prio: 2};
  let entity = new TestEntity({
    testhook(data){
      calledWithArg = data;
      calledWithContext = this;
      return result1;
    }
  });
  let entity2 = new TestEntity({
    testhook(data){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(result2),1000);
      });
    }
  })
  world.addEntity(entity);
  world.addEntity(entity2);
  let eventData = {foo: 'bar'};
  world.sendEvent('testhook', eventData).then( result => {
    console.log("ALLL BACK! :D", result)
    assert.deepEqual(result, [result2, result1]);
  });
  assert.equal(calledWithArg, eventData);
  assert.equal(calledWithContext, entity);
})();