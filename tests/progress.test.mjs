import test from 'node:test';
import assert from 'node:assert/strict';
import { initialGame, gameReducer } from '../src/data/scenario.js';
import { SAVE_KEY, loadProgress, saveProgress, clearProgress } from '../src/data/progress.js';

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}
function snapshot(game) { return { game, socials: { official: { liked: true, comments: ['잘 봤어요'], saved: true } }, seenStories: ['story-1'], socialTime: 2, reply: '작성 중인 답장' }; }
test('old saves update the boss introduction while preserving player text and progress', () => {
  const storage = memoryStorage();
  const oldName = '\uC815\uC870\uC740';
  const intro = `디컨 대표 ${oldName}입니다. 지원해 주셔서 감사해요`;
  const game = gameReducer(initialGame(), { type: 'START', name: oldName });
  game.messages = [{ sender: 'boss', text: intro, time: '09:00', week: 1 }, { sender: 'me', text: oldName, time: '09:01', week: 1 }];
  game.queue[0].text = intro;
  game.alerts = [intro];
  saveProgress(snapshot(game), storage);
  const loaded = loadProgress(storage).snapshot;
  assert.ok(loaded.game.messages[0].text.includes('대표 윤하은입니다'));
  assert.ok(loaded.game.queue[0].text.includes('대표 윤하은입니다'));
  assert.ok(loaded.game.alerts[0].includes('대표 윤하은입니다'));
  assert.equal(loaded.game.messages[1].text, oldName);
  assert.equal(loaded.game.name, oldName);
  assert.equal(loaded.game.phase, game.phase);
});
test('save and resume preserve pending deliveries, drafts, reply, reactions and read stories', () => {
  const storage = memoryStorage();
  const game = gameReducer(initialGame(), { type: 'START', name: '지민' });
  game.draft.title = '아직 보내지 않은 시안';
  const original = snapshot(game);
  assert.equal(saveProgress(original, storage), true);
  const loaded = loadProgress(storage);
  assert.equal(loaded.error, '');
  for (const key of Object.keys(original)) assert.deepEqual(loaded.snapshot[key], original[key]);
  let resumed = loaded.snapshot.game;
  while (resumed.queue.length) resumed = gameReducer(resumed, { type: 'DELIVER' });
  assert.equal(resumed.messages.length, 2);
  assert.equal(resumed.phase, 'smallTalk');
  assert.equal(gameReducer(resumed, { type: 'DELIVER' }), resumed);
  assert.equal(clearProgress(storage), true);
  assert.equal(loadProgress(storage).snapshot, null);
});
test('invalid, unsupported and inaccessible saves fall back without crashing', () => {
  const storage = memoryStorage();
  for (const raw of ['broken json', JSON.stringify({ version: 99 }), JSON.stringify({ version: 1, game: null })]) {
    storage.setItem(SAVE_KEY, raw);
    assert.equal(loadProgress(storage).snapshot, null);
    assert.ok(loadProgress(storage).error);
  }
  const game = gameReducer(initialGame(), { type: 'START', name: '지민' });
  for (const patch of [{ jobIndex: 80 }, { draft: null }, { collection: null }, { queue: [null] }, { phase: 'weekTransition', transition: null }, { phase: 'approved' }, { queue: [{ text: '승인', effect: 'approve' }] }]) {
    saveProgress(snapshot({ ...game, ...patch }), storage);
    assert.equal(loadProgress(storage).snapshot, null);
  }
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); }, removeItem() { throw Error('blocked'); } };
  assert.equal(loadProgress(blocked).snapshot, null);
  assert.equal(saveProgress(snapshot(game), blocked), false);
  assert.equal(clearProgress(blocked), false);
});
test('contract, week transition and ending restore to the same narrative checkpoint', () => {
  const storage = memoryStorage();
  const base = { ...initialGame('지민'), started: true };
  const states = [
    { ...base, phase: 'contract', contractReceived: true },
    { ...base, phase: 'weekTransition', transition: { from: 1, to: 2 }, pendingJobIndex: 1 },
    { ...base, jobIndex: 7, phase: 'weekTransition', transition: { from: 7, to: null }, resigned: true },
    { ...base, jobIndex: 7, phase: 'finished', finished: true, resigned: true },
  ];
  for (const state of states) {
    saveProgress(snapshot(state), storage);
    assert.deepEqual(loadProgress(storage).snapshot.game, state);
  }
  saveProgress(snapshot(states[1]), storage);
  const next = gameReducer(loadProgress(storage).snapshot.game, { type: 'BEGIN_WEEK' });
  assert.equal(next.jobIndex, 1);
  assert.equal(next.phase, 'requesting');
});
