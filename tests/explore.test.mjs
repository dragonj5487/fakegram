import test from 'node:test';
import assert from 'node:assert/strict';
import { searchExplore, ALL_KEYWORDS, validateMaterials } from '../src/data/game.js';
test('explore unlocks three discoverable, usable references each week', () => {
 for(let week=1;week<=7;week++) {
  const refs=searchExplore('',[],week).references;
  assert.equal(refs.length,10+(week-1)*3);
  for(const ref of refs.filter(r=>r.unlockWeek===week)) {
   assert.ok(searchExplore(ref.title,[],week).references.some(r=>r.id===ref.id));
   assert.equal(validateMaterials({reference:ref.id, keywords:ALL_KEYWORDS.slice(0,2)}, {photos:[ref.id],keywords:ALL_KEYWORDS}), '');
  }
 }
 assert.equal(searchExplore('페인트',[],4).references.length,0);
 assert.ok(searchExplore('페인트',[],5).references.length>0);
 assert.equal(searchExplore('zz-no-result',[],7).references.length,0);
 const post={title:'독특한 개인작업',caption:'기업소개',keywords:['새로운검색어'],name:'지원자'};
 assert.equal(searchExplore('새로운검색어',[post],1).posts.length,1);
});
