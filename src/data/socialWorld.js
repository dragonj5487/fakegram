export const ACCOUNTS = {
  company: { handle: 'decon.official', name: '디컨', avatar: 'd.', bio: '커피와 AI가 만나는 일상. 디컨의 브랜드와 공간을 기록합니다.', kind: '회사 계정', color: '#e8eee8' },
  boss: { handle: 'yoonhaeun.ceo', name: '윤하은', avatar: '윤', bio: '디컨 대표 · 커피와 디자인, 새로운 시작.', kind: '대표 계정', color: '#eeeae5' },
  peer: { handle: 'yoon.designlog', name: '윤 · 디자인 일기', avatar: '윤', bio: '작업과 생활 사이, 아직 배우는 중입니다.', kind: '가상 인물', color: '#e9e8f0' },
  cafe: { handle: 'slow.seongsu', name: '느린 성수', avatar: '느', bio: '걷다가 만난 카페와 작은 장면들.', kind: '가상 인물', color: '#f2e9de' },
};

const weekly = [
  ['첫 번째 페이지', '커피와 AI를 소개하는 첫 이미지. 작은 시작을 기록합니다.', '첫 의뢰를 받으면 괜히 메일함을 자꾸 열어 보게 된다. 잘하고 싶은 마음.', '오늘의 커피는 조금 천천히. 창가 자리에 앉아 새 노트를 펼쳤다.'],
  ['손에 담기는 디자인', '화면에서 포장으로. 브랜드의 다음 장면을 준비합니다.', '과제 파일 옆에 작업 파일. 두 창을 번갈아 보다가 커피가 식었다.', '포장이 예뻐서 하나 더 샀다. 종이 한 장에도 누군가의 시간이 있겠지.'],
  ['종이 위의 온기', '빵을 담는 봉투에도 디컨의 이야기를 담습니다.', '최종, 진짜최종, 최종수정. 파일 이름이 점점 길어지는 주간.', '빵 냄새가 좋아서 잠깐 멈췄다. 봉투를 접는 소리까지 좋은 오후.'],
  ['하나에서 다음으로', '컵홀더와 유리창. 같은 브랜드가 서로 다른 곳에 놓입니다.', '하나를 끝냈는데 할 일 목록은 그대로다. 오늘은 알림을 잠시 꺼 두었다.', '유리창 너머로 보이는 준비 중인 공간. 지나가는 사람은 완성된 모습만 보니까.'],
  ['공간을 채우는 시간', '화면 밖에서도 공간을 준비하는 시간이 이어집니다.', '오늘은 책상보다 밖에 오래 있었다. 돌아와서 노트북을 다시 열었다.', '새로 칠한 벽과 늦은 오후의 햇빛. 사진에는 조용한 순간만 남았다.'],
  ['거리에서 찾는 형태', '멀리서도 읽히는 이름. 간판의 첫인상을 살펴봅니다.', '답장을 쓰고 지웠다. 짧게 보내면 차가워 보일까, 길게 보내면 변명 같을까.', '산책하다 간판만 잔뜩 찍었다. 같은 거리도 보고 싶은 것에 따라 달라진다.'],
  ['다시, 화면으로', '흩어진 브랜드의 장면들을 웹사이트 한 화면으로 연결합니다.', '파일은 남는다. 그 파일을 만들던 내 마음도 어딘가에 남았으면 좋겠다.', '오늘도 카페는 평소처럼 문을 열었다. 누군가의 긴 하루와는 별개로.'],
];

export const STORIES = weekly.map(([title, text], i) => ({ id: `story-${i + 1}`, week: i + 1, account: 'company', title, text }));
export const WORLD_POSTS = weekly.flatMap(([title, text, peer, cafe], i) => [
  { id: `world-company-${i + 1}`, week: i + 1, account: 'company', title, text, motif: 'DECON / NOTES' },
  { id: `world-peer-${i + 1}`, week: i + 1, account: 'peer', title: '작업과 생활 사이', text: peer, motif: 'DESIGN DIARY' },
  { id: `world-cafe-${i + 1}`, week: i + 1, account: 'cafe', title: '오늘의 작은 장면', text: cafe, motif: 'SLOW MOMENTS' },
]);
export function availableStories(week) { return STORIES.filter(item => item.week <= week); }
export function availablePosts(week, account) { return WORLD_POSTS.filter(item => item.week <= week && (!account || item.account === account)).slice().reverse(); }
export function searchMessages(messages, query = '', week = '') {
  const term = query.trim().normalize('NFC').toLocaleLowerCase();
  return messages.map((message, index) => ({ ...message, index })).filter(message =>
    (!week || message.week === Number(week)) && (!term || `${message.text} ${message.attachment === 'contract' ? '디자인 용역계약서' : message.attachment === 'company' ? '디컨 회사소개 자료' : ''}`.normalize('NFC').toLocaleLowerCase().includes(term)));
}

export function replySuggestions(game, job) {
  if (game.phase !== 'awaitingReply') return [];
  const word = job.replyWord;
  return [
    { label: '적극적으로', text: word ? `${word}하는 마음으로 준비할게요. 꼼꼼히 작업하겠습니다!` : '네, 꼼꼼히 작업해서 전달드리겠습니다!' },
    { label: '범위 확인하기', text: `${word ? `${word}됩니다. ` : ''}이번 작업은 안내해 주신 범위부터 진행하면 될까요?` },
    { label: '일정 이야기하기', text: `${word ? `${word}됩니다. ` : ''}학교 과제도 있어서 일정을 정리해 전달드리겠습니다.` },
  ];
}
