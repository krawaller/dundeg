import * as test from "tape";

import { add } from '../../src/utils';

import { World } from '../../src/world'


class TestEntity {
  constructor(hooks={}){
    this.hooks = hooks;
  }
  id: any
  hooks: any
}

test("World UI functionality", t => {
  let world = new World();
  const optionName = "FOOBAR";
  const result = "RESULT";
  world.askUser("What do you want?", {
    [optionName]: (w)=> new Promise((resolve,reject)=>{
      t.equal(w, world, 'was called with world');
      resolve(result);
    })
  }).then(([opt,res]) => {
    t.equal(opt, optionName, 'optionname bubbled correctly');
    t.equal(res, result, 'eventual result was passed along');
    t.ok(!world.pending, 'pending has been removed');
    t.end();
  });
  world.answer(optionName);
});

test("Adding and removing entities to World", t => {
  let world = new World();
  let entity = new TestEntity();
  let entity2 = new TestEntity();
  let entity3 = new TestEntity();
  let id = world.addEntity(entity);
  t.ok(world.exists(entity), "The entity is now registered");
  t.equal(id, entity.id, "The entity was decorated with correct id");
  world.addEntity(entity2, entity);
  t.equal(world.getParent(entity2), entity, "The second entity has the first as parent");
  t.deepEqual(world.getAttachments(entity), [entity2], "The first entity has the second as attachment");
  world.addEntity(entity3);
  world.removeEntity(entity);
  t.ok(!world.exists(entity), "The entity was correctly removed");
  t.ok(!world.exists(entity2), "The second entity was removed too since its parent was removed");
  t.ok(world.exists(entity3), "The third entity is still there");
  t.end();
});

test("Doing a collection hook", t => {
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
  });
  world.addEntity(entity);
  world.addEntity(entity2);
  let eventData = {type: 'collect'};
  world.sendEvent('testhook', eventData).then( result => {
    t.deepEqual(result, [result2, result1], "Final result is correct order");
    t.end();
  });
  t.equal(calledWithArg, eventData, "First callback received event as argument");
  t.equal(calledWithContext, entity, "First callback was called in correct context");
});

test("Doing a builder hook", t => {
  let world = new World();
  let entity = new TestEntity({ testhook: ()=> add(3, 'test') });
  let entity2 = new TestEntity({ testhook: ()=> add(5, 'pest') });
  let entity3 = new TestEntity({ testhook: ()=> {} });
  world.addEntity(entity);
  world.addEntity(entity2);
  world.addEntity(entity3);
  let eventData = {type: 'build', start: 4};
  world.sendEvent('testhook', eventData).then(result => {
    t.equal(result.value, 12, "The accumulated result is correct");
    t.end();
  });
});
