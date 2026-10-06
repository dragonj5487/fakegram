import test from 'node:test';
import assert from 'node:assert/strict';
import { JOBS, WEEKS, TOTAL_JOBS, initialGame, gameReducer, revisionErrors, submissionError } from '../src/data/scenario.js';
import { REFERENCES, ALL_KEYWORDS } from '../src/data/game.js';

function drain(state) {
  while (state.queue.length) {
    const before = state.messages.length;
    state = gameReducer(state, { type: 'DELIVER' });
    assert.equal(state.messages.length, before + 1, 'each scheduled event delivers exactly one message');
  }
  return state;
}
function started() {
  let state = drain(gameReducer(initialGame(), { type: 'START', name: '지민' }));
  state = drain(gameReducer(state, { type: 'REPLY', text: '안녕하세요! 오늘은 학교 수업을 듣고 왔어요.' }));
  state = drain(gameReducer(state, { type: 'REPLY', text: '네, 카페와 디자인 모두 좋아해요!' }));
  state = gameReducer(state, { type: 'RECEIVE_COMPANY' });
  for (const ref of REFERENCES) state = gameReducer(state, { type: 'COLLECT_PHOTO', id: ref.id });
  for (const word of ALL_KEYWORDS) state = gameReducer(state, { type: 'COLLECT_WORD', word });
  return state;
}
function edit(state, values) {
  for (const [field, value] of Object.entries(values)) state = gameReducer(state, { type: 'EDIT', field, value });
  return state;
}
test('a player name begins the story, and early replies require hopeful words', () => {
  const empty = initialGame();
  assert.equal(gameReducer(empty, { type: 'START', name: '   ' }), empty);
  let state = started();
  assert.equal(state.name, '지민');
  assert.equal(state.phase, 'awaitingReply');
  assert.ok(!state.messages.some(message => message.text.includes('첫 답장에')));
  const before = state.messages.length;
  state = drain(gameReducer(state, { type: 'REPLY', text: '네' }));
  assert.equal(state.phase, 'awaitingReply');
  assert.equal(state.messages.length, before, 'missing word is guided in the input, without a boss message');
  state = drain(gameReducer(state, { type: 'REPLY', text: '첫 업무가 기대됩니다!' }));
  assert.equal(state.phase, 'drafting');
});
test('seven weeks progress from a no-revision freelance job through a contract and employee work', () => {
  let state = started();
  assert.equal(TOTAL_JOBS, 8);
  assert.equal(WEEKS[3].tasks.length, 2);
  for (let index = 0; index < TOTAL_JOBS; index++) {
    const job = JOBS[index];
    assert.equal(state.jobIndex, index);
    if (job.week === 6) {
      assert.equal(state.phase, 'seriousTalk');
      state = drain(gameReducer(state, { type: 'REPLY', text: '늦어서 죄송합니다. 시간을 맞추겠습니다.' }));
    }
    assert.equal(state.phase, 'awaitingReply');
    state = drain(gameReducer(state, { type: 'REPLY', text: job.replyWord ? `새 업무를 ${job.replyWord}하며 준비할게요!` : '네.' }));
    assert.equal(state.phase, 'drafting');
    if (job.reuse) {
      const bag = state.posts.find(post => post.format === 'bag');
      assert.equal(state.draft.reference, bag.reference);
      assert.deepEqual(state.draft.keywords, bag.keywords);
      const invalid = edit(state, { title: '컵홀더', caption: '설명', reference: 'space', keywords: job.themes.slice(0, 2) });
      assert.ok(submissionError(invalid).includes('각대봉투'));
    }
    state = edit(state, { title: '첫 번째 시안', caption: '첫 시안 설명', reference: job.reuse ? state.draft.reference : 'coffee', keywords: job.themes.slice(0, 2), color: '#48372f' });
    assert.equal(submissionError(state), '');
    assert.equal(gameReducer(state, { type: 'PUBLISH' }), state, 'cannot publish an unreviewed draft');
    state = gameReducer(state, { type: 'SUBMIT' });
    assert.equal(state.posts.length, index, 'sending a draft must not create a feed post');
    assert.equal(state.phase, 'reviewing');
    assert.equal(gameReducer(state, { type: 'EDIT', field: 'title', value: 'sneaked edit' }), state);
    assert.equal(gameReducer(state, { type: 'PUBLISH' }), state);
    state = drain(state);
    if (index === 0) {
      assert.equal(state.phase, 'approved', 'first freelance draft is approved without revisions');
      assert.equal(state.revisions, 0);
      assert.ok(!state.messages.some(message => message.text.includes('바꿔 주세요')));
      assert.equal(state.employed, false);
    } else {
      assert.equal(state.phase, 'revision');
      assert.ok(revisionErrors(state.draft, job).length > 0);
      state = drain(gameReducer(state, { type: 'SUBMIT' }));
      assert.equal(state.phase, 'revision', 'an unchanged revision must not get approval');
      state = edit(state, { title: '디컨 디자인', caption: `${job.revisionPhrase} — 수정한 시안`, color: '#344a37' });
      assert.deepEqual(revisionErrors(state.draft, job), []);
      state = drain(gameReducer(state, { type: 'SUBMIT' }));
    }
    assert.equal(state.phase, 'approved');
    assert.equal(state.posts.length, index);
    assert.equal(gameReducer(state, { type: 'EDIT', field: 'caption', value: 'changed after approval' }), state);
    state = gameReducer(state, { type: 'PUBLISH' });
    assert.equal(state.posts.length, index + 1);
    assert.equal(state.phase, 'handoff');
    assert.equal(gameReducer(state, { type: 'PUBLISH' }), state, 'double publishing is blocked');
    if (job.format === 'window') assert.ok(state.queue.some(item => item.text.includes('다음 주 월요일 오전 9시')));
    state = drain(state);
    if (index === 0) {
      assert.equal(state.phase, 'collaborationOffer');
      assert.equal(state.jobIndex, 0);
      assert.equal(state.contractReceived, false, 'no contract is sent before the player replies');
      assert.equal(gameReducer(state, { type: 'SIGN_CONTRACT', name: 'wrong' }), state);
      state = drain(gameReducer(state, { type: 'REPLY', text: '네, 함께 계속 작업하고 싶습니다!' }));
      assert.equal(state.phase, 'awaitingContract');
      assert.equal(state.contractReceived, true);
      assert.ok(state.messages.some(message => message.text.includes('계약서 바로 보내드릴게요')));
      assert.equal(state.messages.at(-1).attachment, 'contract');
      assert.equal(gameReducer(state, { type: 'SIGN_CONTRACT', name: '지민' }), state, 'attachment must be clicked before signing');
      state = gameReducer(state, { type: 'OPEN_CONTRACT' });
      assert.equal(state.phase, 'contract');
      state = gameReducer(state, { type: 'CLOSE_CONTRACT' });
      assert.equal(state.phase, 'awaitingContract');
      state = gameReducer(state, { type: 'OPEN_CONTRACT' });
      state = drain(gameReducer(state, { type: 'SIGN_CONTRACT', name: '지민' }));
      assert.equal(state.employed, true);
    }
    if (index === 1) {
      assert.equal(state.phase, 'salaryOffer');
      assert.ok(state.messages.at(-1).text.includes('학업'));
      assert.ok(state.messages.at(-1).text.includes('50만 원'));
      state = drain(gameReducer(state, { type: 'REPLY', text: '네, 월 50만 원으로 받겠습니다.' }));
      assert.equal(state.payMode, 'monthly');
    }
    if (index === TOTAL_JOBS - 1) {
      assert.equal(state.phase, 'resignation');
      assert.equal(state.finished, false);
      assert.equal(gameReducer(state, { type: 'REPLY', text: '네' }), state);
      state = drain(gameReducer(state, { type: 'REPLY', text: '저는 여기까지 하고 퇴사하겠습니다.' }));
      assert.equal(state.phase, 'exitDiscussion');
      assert.equal(state.finished, false);
      state = drain(gameReducer(state, { type: 'REPLY', text: '인수인계 자료는 전달했습니다. 모든 책임에 동의하는 것은 아닙니다.' }));
      assert.equal(state.resigned, true);
      assert.equal(state.employed, false);
      assert.ok(state.messages.some(message => message.sender === 'me' && message.text.includes('퇴사')));
    }
    if (index !== 3) {
      assert.equal(state.phase, 'weekTransition', 'each week must pause before reopening the platform');
      assert.equal(state.jobIndex, index);
      assert.equal(state.transition.from, job.week);
      state = drain(gameReducer(state, { type: 'BEGIN_WEEK' }));
    } else {
      assert.equal(state.jobIndex, 4, 'cup holder to window graphics stays in the same week');
      assert.equal(state.transition, null);
    }
  }
  assert.equal(state.finished, true);
  assert.equal(state.resigned, true);
  assert.equal(state.phase, 'finished');
  assert.equal(state.posts.length, 8);
  assert.equal(new Set(state.posts.map(post => post.id)).size, 8);
  assert.ok(state.posts.find(post => post.format === 'sleeve').source.includes('각대봉투'));
  assert.ok(state.messages.some(message => message.text.includes('무슨 일 있나요')));
  assert.deepEqual(state.posts.map(post => post.week), [1, 2, 3, 4, 4, 5, 6, 7]);
});
test('a monthly pay proposal can be questioned or declined without silently changing the rate', () => {
  const state = { ...started(), jobIndex: 1, phase: 'salaryOffer', employed: true };
  const uncertain = drain(gameReducer(state, { type: 'REPLY', text: '조건이 어떻게 되는 건가요?' }));
  assert.equal(uncertain.phase, 'salaryOffer');
  assert.equal(uncertain.payMode, 'piece');
  const declined = drain(gameReducer(state, { type: 'REPLY', text: '건당 20만 원을 유지하고 싶습니다.' }));
  assert.equal(declined.payMode, 'piece');
  assert.equal(declined.phase, 'weekTransition');
  assert.equal(declined.transition.to, 3);
});
test('company attachment must be received and adds reusable keywords without duplicates', () => {
  const fresh = gameReducer(initialGame(), { type: 'START', name: '지민' });
  assert.equal(gameReducer(fresh, { type: 'RECEIVE_COMPANY' }), fresh);
  let delivered = drain(fresh);
  delivered = drain(gameReducer(delivered, { type: 'REPLY', text: '안녕하세요!' }));
  delivered = drain(gameReducer(delivered, { type: 'REPLY', text: '네, 디자인을 좋아해요.' }));
  assert.equal(delivered.companyReceived, false);
  assert.ok(submissionError(delivered).includes('회사 자료'));
  const received = gameReducer(delivered, { type: 'RECEIVE_COMPANY' });
  assert.equal(received.companyReceived, true);
  assert.deepEqual(received.collection.keywords, ['브랜드', '미래', '연결', '커피']);
  assert.equal(gameReducer(received, { type: 'RECEIVE_COMPANY' }), received);
});
test('late or short replies prompt concern once per task, while early days cannot defer', () => {
  const early = started();
  assert.equal(gameReducer(early, { type: 'DEFER' }), early);
  const later = { ...early, jobIndex: 5, phase: 'awaitingReply' };
  let state = drain(gameReducer(later, { type: 'DEFER' }));
  assert.equal(state.phase, 'drafting');
  assert.equal(state.replyCount, early.replyCount, 'silence does not invent a player reply');
  assert.equal(state.lateReplies, 1);
  assert.ok(state.messages.at(-1).text.includes('무슨 일 있나요'));
  assert.equal(gameReducer(state, { type: 'DEFER' }), state);
  const unread = { ...later, phase: 'revision', unread: 2 };
  state = drain(gameReducer(unread, { type: 'CONCERN' }));
  assert.equal(state.phase, 'revision');
  assert.equal(state.concernAsked, true);
  const reset = gameReducer(state, { type: 'START', name: '다른 이름' });
  assert.equal(reset.jobIndex, 0);
  assert.equal(reset.posts.length, 0);
  assert.equal(reset.concernAsked, false);
});

test('small talk waits for two player replies before introducing the first job', () => {
  let state = drain(gameReducer(initialGame(), { type: 'START', name: '지민' }));
  assert.equal(state.phase, 'smallTalk');
  assert.ok(!state.messages.some(m => m.attachment || m.text.includes('기업소개')));
  assert.equal(gameReducer(state, { type: 'EDIT', field: 'title', value: 'premature' }), state);
  state = drain(gameReducer(state, { type: 'REPLY', text: '학교 수업 듣고 왔어요.' }));
  assert.equal(state.phase, 'smallTalkFollowup');
  assert.ok(state.messages.some(m => m.text.includes('학업도 병행')));
  assert.ok(!state.messages.some(m => m.attachment));
  state = drain(gameReducer(state, { type: 'REPLY', text: '네, 좋아해요!' }));
  assert.equal(state.phase, 'awaitingReply');
  assert.ok(state.messages.some(m => m.attachment === 'company'));
});

test('week seven pressure interrupts work once and preserves the draft', () => {
 const draft = { title: '진행 중 시안', caption: '작성 중', reference: 'coffee', keywords: ['브랜드', '미래'], color: '#344a37' };
 const working = { ...initialGame('지민'), started: true, jobIndex: 7, phase: 'drafting', draft };
 assert.equal(gameReducer({ ...working, jobIndex: 6 }, { type: 'WORK_PRESSURE' }).pressureSent, false);
 let state = gameReducer(working, { type: 'WORK_PRESSURE' });
 assert.equal(state.pressureSent, true);
 assert.equal(state.draft, draft);
 assert.equal(state.phase, 'drafting');
 state = drain(state);
 assert.equal(state.messages[0].text, '재택근무란, 쉬면서 개인의 일정을 반영하여 근무하는 것이지 그저 쉬는 것이 아닙니다.');
 assert.ok(state.messages.at(-1).text.includes('지민님이 책임'));
 assert.equal(gameReducer(state, { type: 'WORK_PRESSURE' }), state);
 assert.equal(state.phase, 'drafting');
});
