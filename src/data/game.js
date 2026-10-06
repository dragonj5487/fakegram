export const REFERENCES = [
  { id: 'bread', title: '갓 구운 빵의 온기', category: '베이커리', photo: 'photo-1509440159596-0249088772ff', alt: '갓 구운 빵', color: '#b28a65' },
  { id: 'package', title: '손에 담는 브랜드', category: '패키지 디자인', photo: 'photo-1544787219-7f47ccb76574', alt: '차와 패키지의 분위기', color: '#92785e' },
  { id: 'sign', title: '거리에서 만나는 카페', category: '간판과 외관', photo: 'photo-1501339847302-ac426a4a7cbb', alt: '카페 공간과 외관 디자인 참고', color: '#344a37' },
  { id: 'identity', title: '단정한 브랜드의 시작', category: '브랜드 아이덴티티', photo: 'photo-1495474472287-4d71bcdd2085', alt: '커피 브랜드의 이미지 참고', color: '#e1d8cd' },
  { id: 'coffee', title: '커피의 질감', category: '제품 사진', photo: 'photo-1442512595331-e89e73853f31', alt: '커피 한 잔과 원두', color: '#344a37' },
  { id: 'space', title: '빛이 머무는 공간', category: '공간과 인테리어', photo: 'photo-1501339847302-ac426a4a7cbb', alt: '따뜻한 빛이 들어오는 카페 내부', color: '#48372f' },
  { id: 'latte', title: '한 잔의 디테일', category: '메뉴 연출', photo: 'photo-1511081692775-05d0f180a065', alt: '라테 아트가 담긴 커피', color: '#733f45' },
  { id: 'beans', title: '원두에서 시작되는 이야기', category: '브랜드 소재', photo: 'photo-1447933601403-0c6688de566e', alt: '커피 원두의 질감', color: '#293e53' },
  { id: 'table', title: '일상의 작은 장면', category: '라이프스타일', photo: 'photo-1495474472287-4d71bcdd2085', alt: '테이블 위 커피와 일상의 소품', color: '#596347' },
  { id: 'bar', title: '카페의 첫인상', category: '공간 레퍼런스', photo: 'photo-1554118811-1e0d58224f24', alt: '카페 카운터와 실내 공간', color: '#625140' },
];
export const REFERENCE_NOTES = {
  bread: { account: 'bread.morning', text: '갓 구운 빵을 담는 봉투. 베이커리의 따뜻한 아침을 포장합니다.', keywords: ['빵', '봉투', '따뜻함'] },
  package: { account: 'package.studio', text: '포장부터 전해지는 브랜드. 패키지와 컵홀더에도 이야기를 담아요.', keywords: ['패키지', '컵홀더', '브랜드'] },
  sign: { account: 'street.cafe', text: '성수 거리에서 발견한 카페. 간판과 유리창 시트지가 만드는 첫인상.', keywords: ['간판', '시트지', '성수'] },
  identity: { account: 'brand.notes', text: '기업소개부터 웹사이트까지, 같은 톤으로 연결되는 브랜드 디자인.', keywords: ['기업소개', '웹사이트', '연결'] },
  coffee: { account: 'slow.coffee', text: '바쁜 하루에도 따뜻한 커피 한 잔. 작은 여유가 오늘을 바꿉니다.', keywords: ['따뜻함', '여유', '커피'] },
  space: { account: 'space.archive', text: '빛이 채우는 공간. 함께 만든 성수의 카페가 곧 오픈합니다.', keywords: ['공간', '성수', '오픈'] },
  latte: { account: 'daily.latte', text: '당신의 취향을 발견하는 시간. 오늘의 추천은 부드러운 라테입니다.', keywords: ['취향', '발견', '추천'] },
  beans: { account: 'roast.journal', text: '신선한 원두가 만드는 새로운 시작. 한 잔에 담은 우리의 브랜드 이야기.', keywords: ['신선함', '시작', '브랜드'] },
  table: { account: 'weekend.table', text: '주말의 일상을 함께 나누어요. 찾아주신 모든 분께 감사의 마음을 전합니다.', keywords: ['주말', '일상', '감사'] },
  bar: { account: 'next.brew', text: '새로운 연결이 만드는 미래. 당신의 경험을 기록하고 다음을 상상합니다.', keywords: ['연결', '미래', '기록'] },
};
const WEEK_DISCOVERIES = [
  [['포장에 담은 마음', '포장', '정성', '선물'], ['신선한 한 잔', '원두', '향기', '신선함'], ['작은 브랜드의 표정', '로고', '정체성', '브랜드']],
  [['아침의 베이커리', '빵', '아침', '온기'], ['종이 위의 패턴', '패턴', '종이', '봉투'], ['동네의 작은 가게', '동네', '일상', '따뜻함']],
  [['한 손에 담긴 커피', '컵홀더', '휴식', '커피'], ['창문 너머의 인사', '시트지', '유리창', '오픈'], ['이어지는 디자인', '확장', '연결', '통일감']],
  [['벽에 남은 색', '페인트', '질감', '공간'], ['가구와 빛', '가구', '조명', '인테리어'], ['공간을 채우는 기록', '현장', '기록', '성수']],
  [['멀리서 보이는 이름', '간판', '가독성', '서체'], ['거리의 타이포그래피', '타이포', '외관', '발견'], ['밤에도 켜진 카페', '네온', '밤', '빛']],
  [['첫 화면의 인사', '웹사이트', '첫화면', '미래'], ['읽기 좋은 디자인', '레이아웃', '여백', '정보'], ['온라인으로 이어지는 경험', '디지털', '경험', '연결']],
];
WEEK_DISCOVERIES.forEach((entries, index) => entries.forEach(([title, ...keywords], slot) => {
  const source = REFERENCES[(index * 3 + slot) % 10];
  const id = `discovery-${index + 2}-${slot}`;
  REFERENCES.push({ ...source, id, title, category: '디자인 레퍼런스', unlockWeek: index + 2 });
  REFERENCE_NOTES[id] = { account: `archive.week${index + 2}.${slot + 1}`, text: `${title}. ${keywords.join(', ')}에서 발견하는 새로운 디자인 영감.`, keywords };
}));
export const ALL_KEYWORDS = [...new Set(Object.values(REFERENCE_NOTES).flatMap(note => note.keywords))];
export function searchExplore(query, posts = [], week = 1) {
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase().replace(/[#\s]+/g, '');
  const needle = normalize(query);
  const matches = fields => !needle || normalize(fields.join(' ')).includes(needle);
  return {
    references: REFERENCES.filter(ref => { const note = REFERENCE_NOTES[ref.id]; return (ref.unlockWeek || 1) <= week && matches([ref.title, ref.category, ref.alt, note.account, note.text, ...note.keywords]); }),
    posts: posts.filter(post => matches([post.title, post.caption, post.taskName, post.name, ...(post.keywords || [])])).slice().reverse(),
  };
}
const DAY_THEMES = [
  ['브랜드', '미래', '연결'],
  ['브랜드', '신선함', '커피'],
  ['따뜻함', '일상', '브랜드'],
  ['따뜻함', '일상', '브랜드', '공간', '성수', '오픈'],
  ['공간', '성수', '기록'],
  ['공간', '브랜드', '발견'],
  ['기록', '미래', '브랜드', '시작'],
];
export function designBrief(day) {
  return { themes: DAY_THEMES[day - 1], requiredPhotos: 1, requiredKeywords: 2 };
}
export function validateMaterials({ reference, keywords }, collection) {
  if (!reference || !REFERENCES.some(ref => ref.id === reference) || !collection.photos.includes(reference)) return '둘러보기에서 수집한 사진 1장을 선택해 주세요.';
  if (keywords.length < 2 || keywords.length > 3) return '수집한 키워드를 2~3개 선택해 주세요.';
  if (new Set(keywords).size !== keywords.length || keywords.some(word => !ALL_KEYWORDS.includes(word) || !collection.keywords.includes(word))) return '수집한 서로 다른 키워드를 선택해 주세요.';
  return '';
}
export function imageUrl(ref, width = 900) { return `https://images.unsplash.com/${ref.photo}?auto=format&fit=crop&w=${width}&q=85`; }
