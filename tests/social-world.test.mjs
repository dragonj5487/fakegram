import test from 'node:test';
import assert from 'node:assert/strict';
import { availableStories, availablePosts, searchMessages, replySuggestions, ACCOUNTS } from '../src/data/socialWorld.js';
import { initialGame, gameReducer, JOBS } from '../src/data/scenario.js';

test('social exploration unlocks only the current and previous weeks', () => {
  for (let week = 1; week <= 7; week++) {
    assert.equal(availableStories(week).length, week);
    assert.equal(availablePosts(week).length, week * 3);
    assert.ok(availablePosts(week).every(post => post.week <= week && ACCOUNTS[post.account]));
    assert.equal(availablePosts(week, 'company').length, week);
    assert.equal(availablePosts(week, 'peer').length, week);
    assert.equal(availablePosts(week, 'boss').length, 0);
  }
});
test('message search combines text, attachment names and weeks without changing the log', () => {
  const messages = [
    { text: '자료 확인 부탁해요.', week: 1, attachment: 'company' },
    { text: '첨부합니다.', week: 1, attachment: 'contract' },
    { text: '시안 전달드립니다.', week: 2 },
    { text: 'DECON 시안 수정해 주세요.', week: 4 },
  ];
  assert.deepEqual(searchMessages(messages, '시안', '4').map(m => m.index), [3]);
  assert.equal(searchMessages(messages, ' decon ').length, 1);
  assert.equal(searchMessages(messages, '회사소개')[0].attachment, 'company');
  assert.equal(searchMessages(messages, '계약서')[0].attachment, 'contract');
  assert.equal(searchMessages(messages, '없는말').length, 0);
  assert.equal(searchMessages(messages, '', '1').length, 2);
  assert.ok(messages.every(message => !('index' in message)));
});
test('reply tones change only the acknowledgement, preserving task order and next phase', () => {
  for (const jobIndex of [0, 1, 2, 3, 5, 7]) {
    const job = JOBS[jobIndex];
    const state = { ...initialGame('지민'), started: true, jobIndex, phase: 'awaitingReply' };
    const replies = replySuggestions(state, job);
    const responses = [];
    for (const option of replies) {
      if (job.replyWord) assert.ok(option.text.includes(job.replyWord));
      let next = gameReducer(state, { type: 'REPLY', text: option.text });
      responses.push(next.queue[0].text);
      while (next.queue.length) next = gameReducer(next, { type: 'DELIVER' });
      assert.equal(next.phase, 'drafting');
      assert.equal(next.jobIndex, jobIndex);
      assert.deepEqual(next.posts, state.posts);
      assert.equal(next.resigned, false);
    }
    assert.equal(new Set(responses).size, 3);
  }
  assert.deepEqual(replySuggestions({ phase: 'resignation' }, JOBS[7]), []);
});
