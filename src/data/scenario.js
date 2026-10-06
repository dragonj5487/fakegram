import { validateMaterials } from './game.js';

export const JOBS = [
  { week: 1, name: '회사 기업소개 피드', format: 'feed', place: '재택', note: '새로운 시작. 내가 이 회사의 첫인상을 만든다.', brief: '카페와 AI를 접목한 디컨의 기업소개 피드를 작성해 주세요.', themes: ['브랜드', '미래', '연결'], replyWord: '기대', replyExample: '디컨의 첫 시작을 함께하게 되어 기대됩니다! 멋진 소개 피드를 만들어보겠습니다.', revisionPhrase: '커피와 AI의 만남', intro: '반가워요! 첫 업무는 우리 회사 기업소개 피드예요. 카페와 AI를 연결하는 느낌으로 부탁해요.' },
  { week: 2, name: '제품 포장 패키지', format: 'package', place: '재택', note: '피드만 만드는 일이 아니었다. 그래도 배우면 되겠지.', brief: '디컨 제품을 포장할 패키지의 앞면과 옆면 그래픽을 구성해 주세요.', themes: ['브랜드', '신선함', '커피'], replyWord: '열심히', replyExample: '패키지 작업도 열심히 해보겠습니다! 브랜드에 어울리게 준비하겠습니다.', revisionPhrase: '신선하게 담은 커피', intro: '오늘은 제품 포장 패키지를 만들어 주세요. 인쇄할 거라 앞면과 옆면도 같이 보고 싶어요.' },
  { week: 3, name: '빵을 담는 각대봉투', format: 'bag', place: '재택', note: '새로운 도전이라고 부르면, 조금은 견딜 수 있었다.', brief: '빵을 담을 각대봉투의 인쇄 그래픽을 작성해 주세요. 다음 주 다른 인쇄물에도 재사용합니다.', themes: ['따뜻함', '일상', '브랜드'], replyWord: '도전', replyExample: '각대봉투는 새로운 도전이네요! 빵과 어울리는 디자인으로 준비해보겠습니다.', revisionPhrase: '오늘 구운 빵', intro: '이번에는 빵을 넣을 각대봉투 디자인이에요. 따뜻한 느낌으로, 디자인 소스도 남겨주세요.' },
  { week: 4, name: '각대봉투 소스로 컵홀더', format: 'sleeve', place: '재택', note: '지난주 만든 것을 이번 주 또 쓴다. 답장은 조금 짧아졌다.', brief: '3주 차 각대봉투의 사진과 그래픽 소스를 가져와 컵홀더의 가로 인쇄면으로 재구성해 주세요.', themes: ['따뜻함', '일상', '브랜드'], reuse: true, revisionPhrase: '손안의 작은 여유', intro: '지난주 각대봉투에서 소스를 뽑아서 컵홀더도 만들어 주세요. 같은 브랜드니까 금방 되죠?' },
  { week: 4, name: '카페 유리창 시트지', format: 'window', place: '재택', note: '컵홀더를 끝냈더니, 이번 주의 업무는 아직 끝나지 않았다.', brief: '유리창에 붙일 시트지의 문구와 그래픽을 구성해 주세요. 멀리서도 읽히게 작성합니다.', themes: ['공간', '성수', '오픈'], revisionPhrase: '디컨 성수', intro: '컵홀더 좋네요. 바로 이어서 유리창 시트지 디자인도 부탁해요. 오늘 안으로 볼 수 있을까요?' },
  { week: 5, name: '셀프 인테리어 작업 기록', format: 'interior', place: '카페 출근', note: '9시 35분에 도착했다. 디자인을 하러 왔는데, 손에 페인트 붓을 쥐었다.', brief: '페인트와 공간 레퍼런스를 골라 셀프 인테리어 계획과 작업 기록을 작성해 주세요.', themes: ['공간', '성수', '기록'], revisionPhrase: '셀프 인테리어', intro: '출근했죠? 오늘은 셀프 인테리어할 거예요. 벽 페인트랑 공간 정리, 작업 기록까지 같이 부탁해요.' },
  { week: 6, name: '가게 간판 레퍼런스 조사', format: 'research', place: '재택', note: '또 업무 시작 시간을 넘겼다. 디자인은 좋지만 지각만 하지 말라는 말이 남았다.', brief: '간판에 참고할 공간 사진과 키워드를 수집하고, 조사 이유를 정리해 주세요.', themes: ['공간', '브랜드', '발견'], revisionPhrase: '간판 레퍼런스', intro: '가게 간판도 바꿔야겠어요. 오늘은 간판 디자인 레퍼런스부터 조사해서 정리해 주세요.' },
  { week: 7, name: '회사 웹사이트 시안', format: 'website', place: '재택', note: '네. 오늘의 답장은 그 한 글자로도 충분할 것 같았다.', brief: '수집한 소스로 회사 웹사이트 첫 화면 시안을 구성하고, 소개 문구와 페이지 설명을 작성해 주세요.', themes: ['브랜드', '미래', '연결'], revisionPhrase: '디컨 공식 웹사이트', intro: '회사 웹사이트도 만들어 주세요. AI 쓰면 금방이잖아요. 카페 소개부터 제품까지 보여주면 좋겠어요.' },
];
export const WEEKS = Array.from({ length: 7 }, (_, i) => {
  const jobs = JOBS.filter(job => job.week === i + 1);
  return { week: i + 1, place: jobs[0].place, note: jobs[0].note, tasks: jobs.map(job => job.name) };
});
export const TOTAL_JOBS = JOBS.length;
export function initialGame(name = '') {
  return { name, started: false, employed: false, contractReceived: false, payMode: 'piece', resigned: false, companyReceived: false, pressureSent: false, transition: null, pendingJobIndex: null, jobIndex: 0, phase: 'onboarding', draft: blankDraft(), submitted: null, approved: null, posts: [], messages: [], queue: [], alerts: [], unread: 0, collection: { photos: [], keywords: [] }, stress: 12, time: 540, reply: '', replyCount: 0, replyCharacters: 0, lateReplies: 0, revisions: 0, concernAsked: false, finished: false };
}
export function blankDraft() { return { title: '', caption: '', color: '#48372f', reference: '', keywords: [] }; }
function stamp(state) { return `${String(Math.floor(state.time / 60)).padStart(2, '0')}:${String(state.time % 60).padStart(2, '0')}`; }
function playerMessage(state, text) { return { sender: 'me', text, week: JOBS[state.jobIndex].week, time: stamp(state), name: state.name }; }
function item(text, effect, week) { return { text, effect, week }; }
function requestScript(index, name) {
  const job = JOBS[index];
  const script = [];
  if (job.week >= 4 && job.format !== 'window') script.push(item(job.week === 4 ? `${name}님, 오늘 업무 시작 확인이 15분 늦었네요. 다음부터는 9시에 맞춰 주세요.` : job.week === 5 ? `${name}님, 9시 출근인데 9시 35분에 오셨네요. 지난주에도 늦으셨죠. 우선 들어오세요.` : `${name}님, 오늘도 업무 시작 시간이 지났는데 연락이 없네요. 지각이 반복되고 있어요.`, null, job.week));
  if (job.week === 6) {
    script.push(item('오늘은 업무 전에 진지하게 대화를 나눠보죠.', null, 6), item('디자인은 마음에 들고 결과물도 다 좋아요. 다만 지각만 안 하셨으면 좋겠어요. 같이 일하는 사람들도 기다리고 있으니까요.', 'seriousTalk', 6));
    return script;
  }
  script.push(item(`${name} 디자이너님, ${job.intro}`, null, job.week));
  if (index === 0) script.push({ ...item('기업소개에 참고할 회사 자료 보내드려요. 디컨의 방향과 핵심 키워드를 담았습니다.', null, 1), attachment: 'company' });
  script.push(item('시안 먼저 메시지로 보내주세요. 제가 보고 승인하면 피드에 올려주세요.', null, job.week), item('참고 자료는 둘러보기에서 모으고, 사진 1장과 키워드 2~3개를 조합해 주세요.', 'awaitReply', job.week));
  return script;
}
function pressureScript(name) {
  return [
    item('재택근무란, 쉬면서 개인의 일정을 반영하여 근무하는 것이지 그저 쉬는 것이 아닙니다.', null, 7),
    item('지금 확인되는 피그마 웹사이트 시안은 지난번과 비교해 변경되거나 개선된 부분이 없어 보입니다.', null, 7),
    item('학업을 병행하시는 상황을 이해하고 존중해 왔지만, 이제 그 범위가 지나치다고 판단됩니다. 이곳은 회사이며, 사회입니다.', null, 7),
    item('학교 과제로 업무에 지장이 생기면 급여 조정의 문제뿐 아니라 다른 근무자에게도 불편을 주는 부분입니다.', null, 7),
    item('지난주 다른 팀원은 10시에 출근해서 전달받을 자료가 없어 15시까지 기다렸습니다. 18시까지 주신다는 말에 그대로 퇴근했고요.', null, 7),
    item(`그 팀원의 인건비와 기다린 시간은 ${name}님이 책임지실 건가요?`, null, 7),
  ];
}
export function revisionErrors(draft, job) {
  const errors = [];
  if (!draft.title.includes('디컨')) errors.push('제목에 「디컨」을 넣어 주세요.');
  if (!draft.caption.includes(job.revisionPhrase)) errors.push(`설명에 「${job.revisionPhrase}」을 넣어 주세요.`);
  if (draft.color !== '#344a37') errors.push('배경색을 브랜드 초록색으로 바꿔 주세요.');
  if (!draft.keywords.some(word => job.themes.includes(word))) errors.push(`「${job.themes.join(' / ')}」 중 수집한 키워드 하나를 사용해 주세요.`);
  return errors;
}
export function submissionError(state) {
  const job = JOBS[state.jobIndex];
  if (state.jobIndex === 0 && !state.companyReceived) return '대표님이 보낸 회사 자료를 먼저 받아 주세요.';
  const error = validateMaterials(state.draft, state.collection);
  if (error) return error;
  if (!state.draft.title.trim() || !state.draft.caption.trim()) return '문구와 설명을 모두 작성해 주세요.';
  if (job.reuse) {
    const source = state.posts.find(post => post.format === 'bag');
    if (!source || source.reference !== state.draft.reference) return '3주 차 각대봉투에서 가져온 사진 소스를 유지해 주세요.';
  }
  return '';
}
export function gameReducer(state, action) {
  const job = JOBS[state.jobIndex];
  switch (action.type) {
    case 'START': {
      if (!action.name.trim()) return state;
      const fresh = initialGame(action.name.trim().slice(0, 20));
      return { ...fresh, started: true, phase: 'greeting', queue: [item(`${fresh.name}님, 안녕하세요! 디컨 대표 정조은입니다. 지원해 주셔서 감사해요 🙂`, null, 1), item('오늘 하루는 어떻게 보내고 계셨어요?', 'smallTalk', 1)] };
    }
    case 'DELIVER': {
      if (!state.queue.length) return state;
      const [next, ...remaining] = state.queue;
      let result = { ...state, queue: remaining, messages: [...state.messages, { sender: 'boss', text: next.text, attachment: next.attachment, week: next.week || job.week, time: stamp(state) }], alerts: [...state.alerts, next.text], unread: state.unread + 1, time: state.time + 1 };
      if (next.effect === 'awaitReply') result.phase = 'awaitingReply';
      if (next.effect === 'seriousTalk') result.phase = 'seriousTalk';
      if (next.effect === 'exitDiscussion') result.phase = 'exitDiscussion';
      if (next.effect === 'smallTalk') result.phase = 'smallTalk';
      if (next.effect === 'smallTalkFollowup') result.phase = 'smallTalkFollowup';
      if (next.effect === 'revise') result.phase = 'revision';
      if (next.effect === 'approve') { result.phase = 'approved'; result.approved = { ...state.submitted, keywords: [...state.submitted.keywords] }; }
      if (next.effect === 'draft') result.phase = 'drafting';
      if (next.effect === 'collaborationOffer') result.phase = 'collaborationOffer';
      if (next.effect === 'attachContract') { result.phase = 'awaitingContract'; result.contractReceived = true; }
      if (next.effect === 'salaryOffer') result.phase = 'salaryOffer';
      if (next.effect === 'resignation') result.phase = 'resignation';
      if (next.effect === 'next') {
        const nextIndex = state.jobIndex + 1;
        const nextJob = JOBS[nextIndex];
        const source = nextJob.reuse ? state.posts.find(post => post.format === 'bag') : null;
        if (nextJob.week !== job.week) {
          result = { ...result, phase: 'weekTransition', pendingJobIndex: nextIndex, transition: { from: job.week, to: nextJob.week }, queue: [], alerts: [] };
        } else {
          result = { ...result, jobIndex: nextIndex, phase: 'requesting', draft: source ? { ...blankDraft(), reference: source.reference, keywords: [...source.keywords], color: source.color } : blankDraft(), submitted: null, approved: null, concernAsked: false, queue: requestScript(nextIndex, state.name) };
        }
      }
      if (next.effect === 'finish') { result.phase = 'weekTransition'; result.transition = { from: 7, to: null }; result.pendingJobIndex = null; result.alerts = []; }
      return result;
    }
    case 'READ': return { ...state, unread: 0, alerts: [] };
    case 'RECEIVE_COMPANY': {
      if (state.companyReceived || !state.messages.some(message => message.attachment === 'company')) return state;
      return { ...state, companyReceived: true, collection: { ...state.collection, keywords: [...new Set([...state.collection.keywords, '브랜드', '미래', '연결', '커피'])] } };
    }
    case 'SIGN_CONTRACT': {
      if (state.phase !== 'contract' || action.name.trim() !== state.name) return state;
      return { ...state, employed: true, phase: 'handoff', messages: [...state.messages, playerMessage(state, '용역계약서 서명본 전달드립니다. 앞으로 잘 부탁드립니다!')], queue: [item('앞으로도 함께 잘해봐요! 저희가 확인하고 서명본 보내드릴게요.'), item('다음 주에는 제품 포장 패키지부터 부탁드릴게요.', 'next')] };
    }
    case 'OPEN_CONTRACT': return state.contractReceived && state.phase === 'awaitingContract' ? { ...state, phase: 'contract', alerts: [] } : state;
    case 'CLOSE_CONTRACT': return state.phase === 'contract' ? { ...state, phase: 'awaitingContract' } : state;
    case 'BEGIN_WEEK': {
      if (state.phase !== 'weekTransition') return state;
      if (state.pendingJobIndex === null) return { ...state, phase: 'finished', finished: true, transition: null };
      const index = state.pendingJobIndex;
      const nextJob = JOBS[index];
      const source = nextJob.reuse ? state.posts.find(post => post.format === 'bag') : null;
      return { ...state, jobIndex: index, phase: 'requesting', pendingJobIndex: null, transition: null, draft: source ? { ...blankDraft(), reference: source.reference, keywords: [...source.keywords], color: source.color } : blankDraft(), submitted: null, approved: null, concernAsked: false, time: nextJob.week >= 4 ? 540 + (nextJob.week - 3) * 15 + (nextJob.week === 5 ? 5 : 0) : 540, queue: requestScript(index, state.name), stress: Math.max(0, state.stress - 5) };
    }
    case 'DISMISS': return { ...state, alerts: [] };
    case 'COLLECT_PHOTO': return { ...state, collection: { ...state.collection, photos: [...new Set([...state.collection.photos, action.id])] } };
    case 'COLLECT_WORD': return { ...state, collection: { ...state.collection, keywords: [...new Set([...state.collection.keywords, action.word])] } };
    case 'EDIT': return ['drafting', 'revision'].includes(state.phase) ? { ...state, draft: { ...state.draft, [action.field]: action.value } } : state;
    case 'WORK_PRESSURE': {
      if (job.week !== 7 || state.pressureSent || state.queue.length || !['drafting', 'revision'].includes(state.phase)) return state;
      return { ...state, pressureSent: true, stress: Math.min(100, state.stress + 12), queue: pressureScript(state.name) };
    }
    case 'SUBMIT': {
      if (!['drafting', 'revision'].includes(state.phase) || state.queue.length || submissionError(state)) return state;
      const submitted = { ...state.draft, keywords: [...state.draft.keywords] };
      const revision = state.phase === 'revision';
      const errors = revisionErrors(submitted, job);
      const greeting = item(revision ? '수정본 받았어요. 다시 볼게요.' : '시안 받았어요. 잠깐 볼게요.');
      const queue = state.jobIndex === 0 ? [greeting, item('회사 자료를 이렇게 잘 풀어주셨네요. 정말 좋은 디자인이에요!'), item('수정할 부분 없어요. 이대로 피드에 게시해 주세요.', 'approve')] : revision && !errors.length ? [greeting, item('브랜드 색상도 맞고, 요청한 문구도 들어갔네요.'), item('좋아요! 이 시안으로 진행해 주세요. 피드에 게시해도 됩니다.', 'approve')] : [greeting, item('전체 방향은 보이는데, 몇 가지 바꿔 주세요.'), ...(!revision ? [item('제목에 「디컨」을 넣어 주세요.'), item(`설명에는 「${job.revisionPhrase}」을 꼭 넣어 주세요.`), item('배경은 브랜드 초록색으로 통일해 주세요.'), item(`키워드는 「${job.themes.join(' / ')}」 중 하나 이상 사용해 주세요.`)] : errors.map(text => item(text))), item('수정한 뒤 시안으로 다시 전달해 주세요. 아직 피드에는 올리지 마세요.', 'revise')];
      return { ...state, submitted, approved: null, phase: 'reviewing', pressureSent: state.pressureSent || job.week === 7, queue: job.week === 7 && !state.pressureSent ? [...pressureScript(state.name), ...queue] : queue, messages: [...state.messages, playerMessage(state, revision ? '수정 완료되었습니다.' : `${job.name} 시안 전달드립니다.`)], time: state.time + 35, stress: Math.min(100, state.stress + (revision ? 3 : 7)), revisions: state.revisions + (revision ? 1 : 0) };
    }
    case 'PUBLISH': {
      if (state.phase !== 'approved' || !state.approved || state.queue.length || state.posts.some(post => post.id === state.jobIndex)) return state;
      const post = { ...state.approved, id: state.jobIndex, week: job.week, taskName: job.name, format: job.format, name: state.name, feedback: '좋아요! 이 시안으로 진행해 주세요.', source: job.reuse ? '3주 차 각대봉투' : null };
      const more = state.jobIndex < JOBS.length - 1;
      if (state.jobIndex === 0) return { ...state, posts: [...state.posts, post], phase: 'handoff', queue: [item('정말 좋은 디자인이에요. 브랜드가 살아나는 것 같아요!'), item(`${state.name} 디자이너님, 이번 한 건으로 끝내기 아쉬워요. 우리 같이 계속 작업해요. 함께 일해보실래요?`, 'collaborationOffer')], alerts: [], time: state.time + 10 };
      if (state.jobIndex === 1) return { ...state, posts: [...state.posts, post], phase: 'handoff', queue: [item('패키지까지 정말 수고했어요.'), item('학업이랑 같이 병행하고 계시니까, 건당으로 돈을 받지 말고 월급처럼 해서 50만 원 받을래요?', 'salaryOffer')], alerts: [], time: state.time + 10 };
      if (!more) return { ...state, posts: [...state.posts, post], phase: 'handoff', queue: [item('웹사이트 시안도 확인했어요. 이번 주도 수고했어요.'), item('다음 주에는 또 다른 작업이 있어요. 계속 같이 해주실 거죠?', 'resignation')], alerts: [], time: state.time + 10 };
      let queue = [item('게시 확인했어요. 수고했어요.')];
      if (job.format === 'window') queue.push(item('그리고 다음 주 월요일 오전 9시에 카페로 출근해 주세요. 직접 할 일이 좀 있어요.'));
      queue.push(item(more ? (job.week === JOBS[state.jobIndex + 1].week ? '아, 아직 업무가 하나 더 있어요. 바로 이어서 부탁드릴게요.' : '이번 주도 수고했어요. 다음 주 업무는 다시 연락드릴게요.') : '7주 동안 작업은 잘 받았어요. 급여와 계약 이야기는 다음에 하죠.', more ? 'next' : 'finish'));
      return { ...state, posts: [...state.posts, post], phase: 'handoff', queue, alerts: [], time: state.time + 10 };
    }
    case 'REPLY': {
      const text = action.text.trim();
      if (!text || state.queue.length || state.finished) return state;
      if (state.phase === 'seriousTalk') return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, phase: 'requesting', queue: [item(/죄송|주의|맞추|늦지/.test(text) ? '네. 말씀만이 아니라 다음부터 시간에 맞춰 주셨으면 합니다.' : '상황은 알겠습니다. 그래도 업무 시작 시간과 자료 전달 약속은 지켜 주세요.', null, 6), item(`${state.name} 디자이너님, ${job.intro}`, null, 6), item('레퍼런스를 모으고 시안을 전달해 주세요.', 'awaitReply', 6)] };
      if (state.phase === 'exitDiscussion') return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, phase: 'handoff', queue: [item('전달하신 답장은 확인했습니다. 책임에 관한 제 입장은 그대로입니다.', null, 7), item('인수인계 자료는 전달받은 것으로 정리하겠습니다. 여기서 협업을 종료하겠습니다.', 'finish', 7)] };
      if (['smallTalk', 'smallTalkFollowup'].includes(state.phase)) {
        const first = state.phase === 'smallTalk';
        const response = /수업|학교|과제|공부/.test(text) ? '학업도 병행하고 계시는군요. 바쁜 와중에 시간 내주셔서 감사해요!' : /긴장|떨/.test(text) ? '처음이라 조금 긴장되시죠? 편하게 이야기해 주세요 🙂' : /카페|커피/.test(text) ? '커피 이야기가 나오니 반갑네요. 저도 커피 한 잔 하면서 연락드리고 있어요 🙂' : '그렇군요 🙂 이렇게 만나 뵙게 돼서 반가워요.';
        return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, phase: first ? 'greeting' : 'requesting', queue: first ? [item(response), item('저희는 이제 막 시작하는 작은 팀이에요. 카페와 디자인에도 관심이 있으신가요?', 'smallTalkFollowup', 1)] : [item('이야기 나눠 보니 더 반갑네요. 앞으로 잘 부탁드려요! 그럼 첫 작업을 소개해 드릴게요.', null, 1), ...requestScript(0, state.name)] };
      }
      if (state.phase === 'awaitingReply' && job.replyWord && !text.includes(job.replyWord)) return state;
      if (state.phase === 'collaborationOffer') return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, phase: 'handoff', queue: [item('좋습니다. 계약서 바로 보내드릴게요~'), { ...item('첨부한 계약서 확인해 주세요. 기본 양식이라 이름만 적어 주시면 됩니다.', 'attachContract'), attachment: 'contract' }] };
      if (state.phase === 'salaryOffer') {
        const reject = /건당|거절|아니|유지|싫|어려|안 받/.test(text);
        const accept = !reject && /네|넵|좋|50|월|받|동의|괜찮|알겠/.test(text);
        const response = reject ? '그럼 건당 20만 원 조건은 유지할게요. 다음 작업도 부탁드릴게요.' : accept ? '좋아요. 앞으로는 월 정액 50만 원으로 할게요. 수정이랑 추가 작업은 같이 부탁드려요.' : '월 정액 50만 원으로 할까요, 아니면 건당 20만 원을 유지할까요? 답장을 부탁드려요.';
        return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, payMode: accept ? 'monthly' : state.payMode, phase: reject || accept ? 'handoff' : 'salaryOffer', queue: [item(response), ...(reject || accept ? [item('다음 주 업무는 다시 연락드릴게요.', 'next')] : [])] };
      }
      if (state.phase === 'resignation') {
        if (!/퇴사|그만두|종료하|마무리하/.test(text)) return state;
        return { ...state, messages: [...state.messages, playerMessage(state, text)], replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, phase: 'handoff', resigned: true, employed: false, queue: [item('피곤한 얼굴과 짜증이 섞인 말투는 그러려니 했습니다. 하지만 본인 실수와 과실에 어울리지 않는 핑계를 대는 건 이해하기 어렵네요.', null, 7), item('기분 좋게 퇴사할 수 있도록 인수인계도 괜찮다고 말씀드렸습니다. 그간 두 달 가까이 본인의 태도와 근무 방식을 돌아보셨으면 합니다.', null, 7), item('책임을 진다고 보면 되나요?', null, 7), item('지각 및 업무 누락, 마감일 지연, 업무 방해에 대해 회신이 없으니 책임을 진다고 보면 될지요.', null, 7), item(`${state.name}님.`, 'exitDiscussion', 7)] };
      }
      if (['awaitingContract', 'contract', 'weekTransition'].includes(state.phase)) return state;
      const late = job.week >= 4 && (text.length <= 8 || action.late);
      let response = '네, 확인했어요. 작업 진행 상황도 공유해 주세요.';
      let effect;
      if (state.phase === 'awaitingReply') {
        response = /범위|어디까지/.test(text) ? '네, 안내한 범위부터 진행해 주세요. 우선 시안을 보고 이야기해요.' : /일정|과제/.test(text) ? (job.week <= 3 ? '네, 일정 정리해서 알려주세요. 시안 기다릴게요.' : '일정은 확인했어요. 시안 전달도 늦지 않게 부탁드려요.') : job.week <= 3 ? '좋은 마음이네요! 기대할게요. 시안부터 전달해 주세요.' : '네. 시안부터 보내주세요.'; effect = 'draft';
      }
      const queue = [item(response, effect)];
      if (late && !state.concernAsked) queue.push(item(`${state.name} 디자이너님, 무슨 일 있나요? 요즘 답장이 짧아진 것 같아서요.`));
      return { ...state, messages: [...state.messages, playerMessage(state, text)], queue, replyCount: state.replyCount + 1, replyCharacters: state.replyCharacters + text.length, concernAsked: state.concernAsked || late, lateReplies: state.lateReplies + (action.late ? 1 : 0) };
    }
    case 'DEFER': {
      if (job.week < 4 || state.queue.length || state.finished || state.concernAsked) return state;
      return { ...state, lateReplies: state.lateReplies + 1, concernAsked: true, time: state.time + 30, phase: state.phase === 'awaitingReply' ? 'avoiding' : state.phase, queue: [item(`${state.name} 디자이너님, 메시지 확인하셨나요?`), item('디자이너님, 무슨 일 있나요? 답장이 없어서요.', state.phase === 'awaitingReply' ? 'draft' : undefined)] };
    }
    case 'CONCERN': {
      if (job.week < 4 || !state.unread || state.queue.length || state.concernAsked || state.finished || !['awaitingReply', 'drafting', 'revision'].includes(state.phase)) return state;
      return { ...state, concernAsked: true, lateReplies: state.lateReplies + 1, queue: [item(`${state.name} 디자이너님, 무슨 일 있나요? 메시지 확인이 늦어지는 것 같아서요.`)] };
    }
    default: return state;
  }
}
