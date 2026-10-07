import './social.css';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Home, Compass, MessageCircle, PlusSquare, Bookmark, Menu, Clock, Search, Send, Check, X, Coffee, Lock, ChevronRight } from 'lucide-react';
import MaterialComposer from './components/MaterialComposer';
import Onboarding from './components/Onboarding';
import ServiceContract from './components/ServiceContract';
import WeekTransition, { weekDate } from './components/WeekTransition';
import DesignArtifact from './components/DesignArtifact';
import PostSocial from './components/PostSocial';
import ResumeGame from './components/ResumeGame';
import { StoryRail, StoryViewer, CommunityFeed, ProfilePanel, ReviewPanel, WorldAvatar } from './components/SocialWorld';
import { ACCOUNTS, searchMessages, replySuggestions } from './data/socialWorld';
import { loadProgress, saveProgress, clearProgress } from './data/progress';
import { REFERENCES, REFERENCE_NOTES, imageUrl, searchExplore } from './data/game';
import { JOBS, WEEKS, TOTAL_JOBS, initialGame, gameReducer, revisionErrors, submissionError } from './data/scenario';

function sessionReducer(state, action) {
 if (action.type === 'RESTORE') return action.game;
 if (action.type === 'RESET') return initialGame();
 return gameReducer(state, action);
}


function Avatar({ own = false, name = '', size = 38 }) {
  return <span className="avatar" style={{ width: size, height: size, background: own ? '#efefef' : '#efefef' }}>{own ? name.slice(0, 1) || '나' : '윤'}</span>;
}
const phaseNames = { seriousTalk: '근무 시간에 대한 대화', exitDiscussion: '퇴사 후 마지막 대화', greeting: '첫 인사 도착 중', smallTalk: '대표님과 첫 인사', smallTalkFollowup: '서로 알아가는 중', requesting: '업무 지시 도착 중', awaitingReply: '업무 시작 답장', drafting: '시안 작성', reviewing: '대표님 검토 중', revision: '수정 요청', approved: '게시 승인', handoff: '다음 연락 도착 중', collaborationOffer: '함께 일하자는 제안', awaitingContract: '계약서 첨부 · 확인 대기', salaryOffer: '월 정액 제안 · 답장 대기', resignation: '마지막 답장', contract: '용역계약서 확인', weekTransition: '시간이 흐르는 중', avoiding: '답장 미루는 중', finished: '퇴사 · 협업 종료' };

export default function App() {
  const [boot, setBoot] = useState(loadProgress);
 const [game, dispatch] = useReducer(sessionReducer, undefined, initialGame);
 const [seenStories, setSeenStories] = useState([]);
 const [world, setWorld] = useState(null);
 const [messageQuery, setMessageQuery] = useState('');

 const [saveFailed, setSaveFailed] = useState(false);
  const [view, setView] = useState('홈');
  const [exploreQuery, setExploreQuery] = useState('');
  const [socials, setSocials] = useState({});
  const [socialTime, setSocialTime] = useState(0);
  useEffect(() => { if (!game.started) return; const timer = setInterval(() => setSocialTime(t => t + 1), 15000); return () => clearInterval(timer); }, [game.started]);
  function social(id, base = 1, publishedWeek = 1) { return <PostSocial id={id} name={game.name} likes={base + socialTime + Math.max(0, JOBS[game.jobIndex].week - publishedWeek) * 9} value={socials[id]} update={(key, value) => setSocials(items => ({ ...items, [key]: value }))}/>; }
  const exploreResults = searchExplore(exploreQuery, game.posts, JOBS[game.jobIndex].week);
  const [modal, setModal] = useState(null);
  const [reply, setReply] = useState('');
  const [toast, setToast] = useState('');
  const saved = Boolean(socials.official?.saved);
 const matchingMessages = searchMessages(game.messages, messageQuery);
 const filteringMessages = Boolean(messageQuery.trim());
 useEffect(() => {
   if (game.started) setSaveFailed(!saveProgress({ game, socials, socialTime, seenStories, reply }));
 }, [game, socials, socialTime, seenStories, reply]);
 function resetSession() {
   clearTimeout(toastTimer.current);
   const cleared = clearProgress();
   setBoot({ snapshot: null, error: cleared ? '' : '기존 저장 기록을 지우지 못했습니다. 브라우저 저장 공간을 확인해 주세요.' });
   dispatch({ type: 'RESET' }); setSocials({}); setSocialTime(0); setSeenStories([]);
   setWorld(null); setModal(null); setReply(''); setToast(''); setExploreQuery('');
   setMessageQuery(''); setView('홈'); setSaveFailed(false);
 }
 function resumeSession() {
   const snapshot = boot.snapshot;
   setSocials(snapshot.socials); setSocialTime(snapshot.socialTime); setSeenStories(snapshot.seenStories);
   setReply(snapshot.reply); dispatch({ type: 'RESTORE', game: snapshot.game });
   setBoot({ snapshot: null, error: '' }); setView(snapshot.game.finished ? '내 프로필' : '홈');
 }
 function openProfile(account) { setModal(null); setWorld({ type: 'profile', account }); }
 function openStory(id) { setModal(null); setSeenStories(items => items.includes(id) ? items : [...items,id]); setWorld({ type: 'story', id }); }
 function openReview() { setModal(null); setWorld({ type: 'review' }); }
 function reviewMessages() { setMessageQuery(''); openMessages(); }
  const toastTimer = useRef(null);
  const chatEnd = useRef(null);
  const job = JOBS[game.jobIndex];
  const draft = { ...game.draft, format: job.format, taskName: job.name };
  const busy = game.queue.length > 0;
  const introducing = ['greeting', 'smallTalk', 'smallTalkFollowup'].includes(game.phase);
  useEffect(() => { if (game.started && introducing) setView('메시지'); }, [game.started, introducing]);
  const replyWord = game.phase === 'resignation' ? '퇴사' : game.phase === 'awaitingReply' ? job.replyWord : null;
  const needsReplyWord = Boolean(replyWord && !reply.includes(replyWord));
  const todayPosts = game.posts.filter(p => p.week === job.week);
  const clock = `${String(Math.floor(game.time / 60)).padStart(2, '0')}:${String(game.time % 60).padStart(2, '0')}`;

  useEffect(() => {
    if (!game.queue.length) return;
    const timer = setTimeout(() => dispatch({ type: 'DELIVER' }), game.phase === 'handoff' ? 2400 : 1700);
    return () => clearTimeout(timer);
  }, [game.queue, game.phase]);
  useEffect(() => {
    if (view === '메시지' && !filteringMessages && !world) { dispatch({ type: 'READ' }); chatEnd.current?.scrollIntoView({ block: 'nearest' }); }
  }, [view, game.messages, filteringMessages, world]);
  useEffect(() => {
    if (!game.started || job.week < 4 || !game.unread || busy || game.concernAsked || game.finished) return;
    const timer = setTimeout(() => dispatch({ type: 'CONCERN' }), 20000);
    return () => clearTimeout(timer);
  }, [game.started, job.week, game.unread, busy, game.concernAsked, game.finished, game.phase]);
  useEffect(() => {
    if (job.week !== 7 || game.pressureSent || busy || !['drafting', 'revision'].includes(game.phase)) return;
    const timer = setTimeout(() => dispatch({ type: 'WORK_PRESSURE' }), 12000);
    return () => clearTimeout(timer);
  }, [job.week, game.pressureSent, busy, game.phase]);
  useEffect(() => { if (['seriousTalk', 'exitDiscussion'].includes(game.phase)) { setModal(null); setWorld(null); setView('메시지'); } }, [game.phase]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);
  useEffect(() => {
    if (game.phase !== 'weekTransition') return;
    setModal(null); setWorld(null); setReply(''); setToast(''); setView('홈');
    const timer = setTimeout(() => { dispatch({ type: 'BEGIN_WEEK' }); window.scrollTo(0, 0); }, 4500);
    return () => clearTimeout(timer);
  }, [game.phase, game.pendingJobIndex]);
  useEffect(() => { if (game.phase === 'contract') { setModal(null); setToast(''); } }, [game.phase]);
  useEffect(() => { if (game.finished) setModal('ending'); }, [game.finished]);

  function notify(text) { clearTimeout(toastTimer.current); setToast(text); toastTimer.current = setTimeout(() => setToast(''), 3500); }
  function navigate(name) { setView(name); if (name === '메시지') dispatch({ type: 'READ' }); }
  function openMessages() { setModal(null); setWorld(null); navigate('메시지'); }
  function openWork() {
    setWorld(null);
    if (['seriousTalk', 'exitDiscussion', 'smallTalk', 'smallTalkFollowup', 'collaborationOffer', 'salaryOffer', 'resignation', 'awaitingContract'].includes(game.phase)) { openMessages(); notify(game.phase === 'awaitingContract' ? '대화방의 첨부 계약서를 눌러 확인해 주세요.' : '대표님에게 답장을 보내주세요.'); return; }
    if (game.phase === 'awaitingReply') { openMessages(); notify(job.replyWord ? `「${job.replyWord}」을 담아 업무 시작 답장을 보내주세요.` : '대표님께 답장하거나 잠시 후 확인을 선택해 주세요.'); return; }
    if (['greeting', 'requesting', 'handoff', 'avoiding'].includes(game.phase)) { openMessages(); notify('대표님 메시지가 도착하고 있어요.'); return; }
    if (game.finished) { setModal('ending'); return; }
    setModal('create');
  }
  function edit(field, value) { dispatch({ type: 'EDIT', field, value }); }
  function submit() {
    const error = submissionError(game);
    if (error) { notify(error); return; }
    dispatch({ type: 'SUBMIT' }); setModal(null); notify('대표님께 시안을 전달했습니다. 피드에는 아직 게시되지 않았어요.');
  }
  function publish() {
    if (game.phase !== 'approved' || busy) return;
    dispatch({ type: 'PUBLISH' }); setModal(null); navigate('홈'); notify('승인된 시안을 피드에 게시했습니다.');
  }
  function sendReply(e) {
    e.preventDefault(); if (!reply.trim() || busy || game.finished) return;
    if (game.phase === 'awaitingContract') { notify('먼저 대화방에 첨부된 계약서를 확인해 주세요.'); return; }
    if (needsReplyWord) { notify(`「${replyWord}」을 포함해 답장을 작성해 주세요.`); return; }
    dispatch({ type: 'REPLY', text: reply }); setReply('');
  }
  function defer() { dispatch({ type: 'DISMISS' }); dispatch({ type: 'DEFER' }); notify('메시지를 잠시 뒤에 확인하기로 했습니다.'); }
  function collectPhoto(id) {
    if (game.collection.photos.includes(id)) return;
    dispatch({ type: 'COLLECT_PHOTO', id }); notify('사진을 수집했습니다.');
  }
  function collectWord(word) {
    if (game.collection.keywords.includes(word)) return;
    dispatch({ type: 'COLLECT_WORD', word }); notify(`「${word}」 키워드를 수집했습니다.`);
  }
  function keywordButtons(words) {
    return <div className="keyword-list">{words.map(word => <button key={word} aria-pressed={game.collection.keywords.includes(word)} className={game.collection.keywords.includes(word) ? 'collected' : ''} onClick={() => collectWord(word)}>{game.collection.keywords.includes(word) ? <Check size={13}/> : <PlusSquare size={13}/>}#{word}</button>)}</div>;
  }
  function referenceGrid(refs) {
    return <div className="reference-grid">{refs.map(ref => <article className="reference-card" key={ref.id}><div className="reference-account"><span>@{REFERENCE_NOTES[ref.id].account}</span><small>{ref.category}</small></div><button className="reference-image" onClick={() => setModal({ type: 'reference', ref })}><img src={imageUrl(ref, 600)} alt={ref.alt} loading="lazy"/></button><button className={`collect-photo ${game.collection.photos.includes(ref.id) ? 'collected' : ''}`} onClick={() => collectPhoto(ref.id)}>{game.collection.photos.includes(ref.id) ? <Check size={16}/> : <PlusSquare size={16}/>} {game.collection.photos.includes(ref.id) ? '사진 수집 완료' : '사진 수집하기'}</button>{social('ref-' + ref.id, 12, ref.unlockWeek || 1)}<div className="reference-info"><h2>{ref.title}</h2><p>{REFERENCE_NOTES[ref.id].text}</p>{keywordButtons(REFERENCE_NOTES[ref.id].keywords)}</div></article>)}</div>;
  }
  function collectionSummary() {
    return <section className="collection-summary"><div><small>MY MATERIALS</small><h2>사진 {game.collection.photos.length}장 · 키워드 {game.collection.keywords.length}개</h2><p>수집한 재료는 7주 동안 계속 사용할 수 있어요.</p></div><button onClick={openWork}>만들기로</button></section>;
  }
  function workPanel() {
    const errors = revisionErrors(game.draft, job);
    if (['drafting', 'revision'].includes(game.phase)) return <MaterialComposer week={job.week} taskName={job.name} brief={job.brief} themes={job.themes} source={job.reuse} collection={game.collection} reference={game.draft.reference} setReference={v => edit('reference', v)} keywords={game.draft.keywords} setKeywords={update => edit('keywords', typeof update === 'function' ? update(game.draft.keywords) : update)} title={game.draft.title} setTitle={v => edit('title', v)} caption={game.draft.caption} setCaption={v => edit('caption', v)} color={game.draft.color} setColor={v => edit('color', v)} preview={<DesignArtifact post={draft}/>} revision={game.phase === 'revision' ? [ { text: '제목에 「디컨」 넣기', done: game.draft.title.includes('디컨') }, { text: `설명에 「${job.revisionPhrase}」 넣기`, done: game.draft.caption.includes(job.revisionPhrase) }, { text: '배경을 브랜드 초록색으로 변경', done: game.draft.color === '#344a37' }, { text: `${job.themes.join(' / ')} 중 키워드 사용`, done: !errors.some(error => error.startsWith('「')) } ] : null} publish={submit} canPublish={!busy} submitLabel={game.phase === 'revision' ? '수정 시안 다시 전달하기' : '대표님께 시안 전달하기'} explore={() => { setModal(null); navigate('둘러보기'); }}/>
    const preview = game.approved || game.submitted || game.draft;
    return <><small className="eyebrow">DESIGN REVIEW / WEEK {job.week}</small><h2>{job.name}</h2><div className={`review-status ${game.phase === 'approved' ? 'approved' : ''}`}>{game.phase === 'approved' ? <Check size={20}/> : <Clock size={20}/>}<div><b>{game.phase === 'approved' ? '대표님이 게시를 승인했습니다.' : '대표님이 시안을 검토하고 있습니다.'}</b><p>{game.phase === 'approved' ? '승인된 시안을 그대로 페이크그램 피드에 게시할 수 있어요.' : job.week === 1 ? '첫 시안을 검토하고 있어요. 대표님 메시지를 기다려 주세요.' : '메시지가 하나씩 도착합니다. 수정 요청을 모두 확인해 주세요.'}</p></div></div><DesignArtifact post={{ ...preview, format: job.format, taskName: job.name }}/><button className="primary" disabled={game.phase !== 'approved' || busy} onClick={publish}>{game.phase === 'approved' ? '승인된 시안을 피드에 게시하기' : '대표님 승인 후 게시 가능'}</button><button className="reset" onClick={openMessages}>대표님 메시지 확인하기</button></>;
  }
  const nav = [['홈', Home], ['둘러보기', Compass], ['메시지', MessageCircle], ['만들기', PlusSquare], ['수집함', Bookmark]];
  if (!game.started && boot.snapshot) return <ResumeGame snapshot={boot.snapshot} resume={resumeSession} restart={resetSession}/>;
 if (!game.started) return <>{boot.error && <p className="save-warning" role="status">{boot.error}</p>}<Onboarding start={name => { setBoot({ snapshot: null, error: '' }); dispatch({ type: 'START', name }); }}/></>;
  if (game.phase === 'contract') return <ServiceContract name={game.name} sign={name => dispatch({ type: 'SIGN_CONTRACT', name })} back={() => { dispatch({ type: 'CLOSE_CONTRACT' }); navigate('메시지'); }}/>;
  if (game.phase === 'weekTransition') return <WeekTransition {...game.transition} name={game.name} note={JOBS[game.pendingJobIndex]?.note}/>;
  return <div>
    <aside className="sidebar"><a className="brand" href="#" onClick={e => { e.preventDefault(); navigate('홈'); }}>페이크그램</a><nav>{nav.map(([name, Icon]) => <button className={`nav-item ${view === name ? 'active' : ''}`} key={name} onClick={() => name === '만들기' ? openWork() : navigate(name)}><span><Icon size={24}/>{name === '메시지' && game.unread > 0 && <b className="badge">{game.unread}</b>}</span><label>{name}</label></button>)}<button className="nav-item" onClick={() => navigate('내 프로필')}><Avatar own name={game.name} size={25}/><label>내 프로필</label></button></nav><div className="sidebar-bottom"><div className="employee"><i/><div>{game.name} 디자이너<small>{game.resigned ? '퇴사 · 협업 종료' : game.employed ? `협업 ${job.week}주 차 · 용역계약` : '프리랜서 · 건당 20만 원'}</small></div></div><button className="nav-item" onClick={() => setModal('about')}><Menu size={23}/><label>더 보기</label></button></div></aside>
    <div className="workspace"><header className="mobile-brand"><a href="#" onClick={e => { e.preventDefault(); navigate('홈'); }}>페이크그램</a><button onClick={openMessages} aria-label="메시지 열기"><MessageCircle size={23}/>{game.unread > 0 && <span className="mobile-unread">{game.unread}</span>}</button></header>
    <div className="layout"><main>
    {saveFailed && <p className="save-warning" role="status">자동 저장 실패 · 브라우저 저장 공간을 확인해 주세요.</p>}
    {view !== '홈' && <div className="heading"><h1>{view}</h1></div>}
    {view === '홈' && <StoryRail week={job.week} seen={seenStories} openStory={openStory} openProfile={openProfile}/>}
    {view === '둘러보기' ? <><div className="explore-search"><Search size={20}/><input type="search" aria-label="둘러보기 피드 검색" placeholder="검색" value={exploreQuery} onChange={e => setExploreQuery(e.target.value)}/>{exploreQuery && <button aria-label="검색어 지우기" onClick={() => setExploreQuery('')}><X size={18}/></button>}</div>{!exploreResults.references.length && !exploreResults.posts.length ? <div className="empty explore-empty"><Search size={30}/><p>죄송합니다. 피드를 찾을 수 없어요</p></div> : <>{exploreResults.posts.length > 0 && <div className="reference-grid">{exploreResults.posts.map(post => <article className="reference-card explore-own-post" key={post.id}><div className="reference-account"><span>@{post.name}</span><small>내 게시물</small></div><DesignArtifact post={post}/><button className={'collect-photo ' + (game.collection.photos.includes(post.reference) ? 'collected' : '')} onClick={() => collectPhoto(post.reference)}>{game.collection.photos.includes(post.reference) ? <Check size={16}/> : <PlusSquare size={16}/>} {game.collection.photos.includes(post.reference) ? '사진 수집 완료' : '사진 수집하기'}</button>{social('post-' + post.id, 1, post.week)}<div className="reference-info"><h2>{post.title}</h2><p>{post.caption}</p>{keywordButtons(post.keywords)}</div></article>)}</div>}{referenceGrid(exploreResults.references)}</>}</> : view === '메시지' ? <section className="messages"><div className="chat-heading"><button aria-label="윤하은 프로필 열기" onClick={() => openProfile('boss')}><Avatar/></button><div><h2><button onClick={() => openProfile('boss')}>대표 윤하은</button></h2><p>업무 대화방 · {phaseNames[game.phase]}</p></div></div><div className="message-search"><label><Search size={17}/><input type="search" aria-label="대화 기록 검색" placeholder="대화 내용·첨부 자료 검색" value={messageQuery} onChange={e => setMessageQuery(e.target.value)}/></label></div>{filteringMessages && <div className="message-results" role="status"><span>{matchingMessages.length}개의 대화</span><button onClick={() => { setMessageQuery(''); }}>검색 지우기 · 전체 대화</button></div>}<div className="chat-scroll">{!matchingMessages.length && filteringMessages && <p className="message-empty">검색 결과가 없습니다. 다른 단어나 주차를 선택해 보세요.</p>}{matchingMessages.map((m, i) => <React.Fragment key={m.index}>{(i === 0 || matchingMessages[i - 1].week !== m.week) && <div className="chat-week">WEEK {m.week}</div>}<div className={`chat ${m.sender === 'me' ? 'chat-own' : ''}`}><Avatar own={m.sender === 'me'} name={game.name}/><div><b>{m.sender === 'me' ? game.name : '대표 윤하은'}<small>{m.time}</small></b><p>{m.text}</p>{m.attachment === 'contract' && <button className="company-attachment contract-attachment" disabled={game.employed || game.resigned} onClick={() => dispatch({ type: 'OPEN_CONTRACT' })}><Bookmark size={18}/><span><b>디자인 용역계약서.pdf</b><small>{game.employed || game.resigned ? '서명본 전달 완료' : '건당 20만 원 · 클릭해서 계약서 확인'}</small></span><ChevronRight size={16}/></button>}{m.attachment === 'company' && <button className="company-attachment" onClick={() => setModal('company')}><Bookmark size={18}/><span><b>디컨 회사소개 자료</b><small>{game.companyReceived ? '수신 완료 · 키워드 4개 수집됨' : '자료를 받으면 회사 키워드가 추가됩니다'}</small></span><ChevronRight size={16}/></button>}</div></div></React.Fragment>)}{busy && !filteringMessages && <div className="typing" role="status">대표 윤하은님이 입력 중…</div>}<div ref={chatEnd}/></div>
    {introducing && !busy && <div className="reply-prompt"><b>먼저, 가볍게 인사를 나눠 보세요.</b><p>오늘 하루나 관심 있는 디자인 이야기를 자유롭게 적어 주세요.</p></div>}
    {game.phase === 'collaborationOffer' && <div className="reply-prompt"><b>함께 일하자는 제안이 도착했어요.</b><p>대표님께 당신의 답장을 보내세요. 답장 후 계약서가 도착합니다.</p><button onClick={() => setReply('네, 저도 함께 계속 작업하고 싶어요! 잘 부탁드립니다.')}>함께하고 싶다고 답장하기</button></div>}
    {game.phase === 'awaitingContract' && <div className="reply-prompt"><b>첨부된 계약서를 확인해 주세요.</b><p>대화 위의 「디자인 용역계약서.pdf」를 누르면 계약서가 열립니다.</p></div>}
    {game.phase === 'salaryOffer' && <div className="reply-prompt salary-prompt"><b>건당 20만 원에서, 월 정액 50만 원으로?</b><p>학업을 병행한다는 이유로 정산 방식이 바뀌려 합니다. 답장을 보내 선택해 보세요.</p><button onClick={() => setReply('네, 월 50만 원으로 받겠습니다.')}>월 50만 원으로 답장</button><button onClick={() => setReply('기존 건당 20만 원을 유지하고 싶습니다.')}>건당 조건 유지 요청</button></div>}
    {game.phase === 'seriousTalk' && <div className="reply-prompt"><b>대표님이 근무 시간에 대한 이야기를 꺼냈다.</b><p>반복된 지각과 지금의 상황에 대해 당신의 말로 답장하세요.</p></div>}
    {game.phase === 'exitDiscussion' && <div className="reply-prompt"><b>퇴사를 말했지만, 메시지는 끝나지 않았다.</b><p>책임에 대한 대표님의 말에 어떻게 답할지 직접 적어 보세요.</p><button onClick={() => setReply('작업물과 인수인계 자료는 전달했습니다. 모든 책임을 제가 진다는 뜻은 아닙니다. 여기서 협업을 마무리하겠습니다.')}>마지막 답장 초안</button></div>}
    {game.phase === 'resignation' && <div className="reply-prompt resignation-prompt"><b>이번에는, 다음 업무를 받지 않기로 했다.</b><p>「퇴사」를 포함해 마지막 답장을 작성하세요.</p><button onClick={() => setReply('대표님, 저는 여기까지 하고 퇴사하겠습니다. 작업 원본은 전달드렸습니다.')}>마지막 답장 초안</button></div>}
    {job.week >= 4 && !game.finished && ['awaitingReply', 'drafting', 'revision'].includes(game.phase) && <div className="quiet-prompt"><span>{job.note}</span><button disabled={busy} onClick={() => setReply(job.week === 4 ? '네, 진행하겠습니다.' : '네.')}>짧게 답하기</button>{!game.concernAsked && <button disabled={busy} onClick={defer}>잠시 뒤에 확인하기</button>}</div>}
    {!busy && replySuggestions(game, job).length > 0 && <div className="reply-options"><small>답장 초안 · 선택 후 자유롭게 고쳐 보내세요</small><div>{replySuggestions(game, job).map(option => <button key={option.label} onClick={() => setReply(option.text)}>{option.label}</button>)}</div></div>}
    <form className="reply-form" onSubmit={sendReply}><textarea aria-label="대표님에게 답장" aria-describedby={replyWord ? 'reply-word-guide' : undefined} value={reply} maxLength={500} disabled={game.finished} placeholder={game.finished ? '7주의 대화가 끝났습니다.' : game.phase === 'resignation' ? '「퇴사」를 포함해 마지막 답장을 작성하세요.' : replyWord ? `「${replyWord}」을 포함해 희망찬 마음으로 답장을 작성하세요.` : introducing ? (game.phase === 'smallTalkFollowup' ? '카페나 디자인에 대한 관심을 이야기해 보세요.' : '인사와 함께 오늘 하루 이야기를 적어 보세요.') : '답장을 입력하세요...'} onChange={e => setReply(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); sendReply(e); } }}/><button aria-label="답장 전송" disabled={!reply.trim() || needsReplyWord || busy || game.finished || game.phase === 'awaitingContract'}><Send size={21}/></button></form>
    {replyWord && <div className="reply-input-guide" id="reply-word-guide"><span>{needsReplyWord ? `「${replyWord}」을 포함해 당신의 마음을 전해 보세요.` : `「${replyWord}」이 담겼어요. 답장을 보낼 수 있습니다.`}</span><button onClick={() => setReply(game.phase === 'resignation' ? '대표님, 저는 여기까지 하고 퇴사하겠습니다.' : job.replyExample || '네, 확인했습니다.')}>답장 초안</button></div>}
    <p className="reply-hint">Enter 전송 · Shift+Enter 줄바꿈</p>
    {['drafting', 'revision', 'reviewing', 'approved'].includes(game.phase) && <button className="create-button" onClick={openWork}>{game.phase === 'revision' ? '수정 요청대로 시안 고치기' : game.phase === 'approved' ? '승인된 시안 게시하기' : '만들기로 이동'}</button>}</section> : <>
    {view === '내 프로필' && <button className="review-entry" onClick={openReview}>주차별 작업과 대화 돌아보기 →</button>}{view === '내 프로필' && <div className="profile"><Avatar own name={game.name} size={65}/><div><h2>{game.name}</h2><p>디컨 디자이너 · {job.week}주 차 · 승인된 게시물 {game.posts.length}개</p></div></div>}
    {view === '홈' && <CommunityFeed week={job.week} currentOnly openProfile={openProfile} social={social}/>}
    {view !== '수집함' && game.posts.slice().reverse().map(post => <article className="post" key={post.id}><div className="post-head"><Avatar own name={game.name}/><div><b>{game.name} <em>대표님 승인</em></b><small>WEEK {post.week} · {post.taskName}{post.source ? ` · ${post.source} 소스 재사용` : ''}</small></div><Check size={19}/></div><DesignArtifact post={post}/>{social('post-' + post.id, 1, post.week)}<div className="post-copy"><p className="muted">yoonhaeun.ceo {post.feedback}</p></div></article>)}
    {(view === '홈' || (view === '수집함' && saved)) && <article className="post"><div className="post-head"><span className="avatar brand-avatar" style={{ width: 38, height: 38 }}>d.</span><div><b><button onClick={() => openProfile('company')}>decon.official</button> <span className="verified">✓</span><em>공식 계정</em></b><small>디컨 성수 · 새로운 팀원</small></div></div><div className="photo"><img src={imageUrl(REFERENCES[0])} alt="커피 한 잔과 원두"/><div className="photo-top">DECON COFFEE & AI<span>SEONGSU</span></div><div className="photo-text"><small>A NEW WAY TO BREW</small><h2>좋은 커피.<br/>더 나은 내일.</h2><p>커피와 AI가 만나는 가장 일상적인 순간.</p></div><div className="photo-bottom">DECON, SEONGSU<span>✳</span></div></div>{social('official', 24)}<div className="post-copy"><p><b>decon.official</b> {game.name} 디자이너님, 디컨에 오신 걸 환영합니다. 함께 새로운 내일을 만들어요. ☕</p><p className="hashtags">#디컨 #카페와AI #우리는한팀</p></div></article>}
    {view === '수집함' && <>{collectionSummary()}<div className="collected-keywords"><h2>수집한 키워드</h2>{game.collection.keywords.length ? keywordButtons(game.collection.keywords) : <p>둘러보기의 게시물에서 키워드를 눌러보세요.</p>}</div>{referenceGrid(REFERENCES.filter(r => game.collection.photos.includes(r.id)))}</>}
    {view === '내 프로필' && !game.posts.length && <div className="empty"><Lock size={30}/><h2>아직 승인된 게시물이 없어요</h2><p>시안을 전달하고 수정·승인을 거치면 게시할 수 있습니다.</p><button className="primary" onClick={openWork}>첫 업무 확인하기</button></div>}</>}
    {game.finished && <section className="week-finish"><Check size={20}/><div><b>7주 끝에, 퇴사를 선택했습니다.</b><p>{game.name}님의 작업과 대화를 돌아보세요.</p></div><button className="primary" onClick={() => setModal('ending')}>7주 돌아보기</button></section>}
    <footer>© 2026 FAKEGRAM<span>피드에 남은, 나의 7주.</span></footer></main>
    <aside className="right"><div className="account"><Avatar own name={game.name} size={48}/><div><b>{game.name}</b><small>나의 디자인 기록</small></div><button onClick={() => navigate('내 프로필')}>내 프로필</button></div>
    <div className="suggested-heading"><b>회원님을 위한 추천</b><button onClick={() => navigate('둘러보기')}>모두 보기</button></div>
    <div className="suggested-accounts">{Object.entries(ACCOUNTS).map(([id, person]) => <button className="suggested-account" key={id} onClick={() => openProfile(id)}><WorldAvatar account={id}/><span><b>{person.handle}</b><small>{person.name} · {person.kind}</small></span><em>프로필</em></button>)}</div>
    <div className="work-reminder"><small>{job.week}주 차 · {phaseNames[game.phase]}</small><b>{job.name}</b><button onClick={openWork}>{game.finished ? '지난 기록 보기' : '작업 확인하기'} →</button></div>
    <button className="profile-link" onClick={openReview}>주차별 회고 ↗</button><p className="platform-note">소개 · 도움말 · 게임 속 가상 SNS<br/>© 2026 FAKEGRAM<br/><span>{saveFailed ? '자동 저장 실패' : '이 브라우저에 자동 저장됨'}</span></p></aside></div></div>
    {game.alerts.length > 0 && <section className="boss-alert" role="alert" aria-labelledby="boss-alert-title"><div className="boss-alert-top"><span className="boss-alert-label"><MessageCircle size={15}/>새 업무 메시지</span><span>{game.unread}개 미확인</span><button aria-label="대표님 메시지 알림 닫기" onClick={() => dispatch({ type: 'DISMISS' })}><X size={18}/></button></div><div className="boss-alert-sender"><Avatar size={44}/><div><h2 id="boss-alert-title">대표님께 메시지가 왔습니다</h2><span>대표 윤하은 · yoonhaeun.ceo</span></div></div><p className="boss-alert-message" key={game.messages.length}>{game.alerts[game.alerts.length - 1]}</p>{busy && <p className="next-message-hint">대표님이 다음 메시지를 입력하고 있습니다…</p>}<div className="boss-alert-actions"><button onClick={() => job.week >= 4 && !busy && !game.concernAsked ? defer() : dispatch({ type: 'DISMISS' })}>나중에 확인</button><button className="boss-alert-open" onClick={openMessages}>메시지 확인</button></div></section>}
    {toast && <div className="toast" role="status"><Check size={18}/>{toast}</div>}
    {world?.type === 'profile' && <ProfilePanel account={world.account} week={job.week} openProfile={openProfile} openStory={openStory} openMessages={openMessages} social={social} close={() => setWorld(null)}/>}
    {world?.type === 'story' && <StoryViewer id={world.id} week={job.week} openStory={openStory} openProfile={openProfile} close={() => setWorld(null)}/>}
    {world?.type === 'review' && <ReviewPanel game={game} openMessages={reviewMessages} close={() => setWorld(null)}/>}
    {modal && <div className="backdrop" onClick={() => setModal(null)}><section className={modal === 'create' ? 'modal composer-modal' : 'modal'} role="dialog" aria-modal="true" aria-label="작업 창" onClick={e => e.stopPropagation()}><button className="close" aria-label="닫기" onClick={() => setModal(null)}><X/></button>{modal === 'company' ? <><small className="eyebrow">DECON / COMPANY MATERIALS</small><h2>디컨 회사소개 자료</h2><div className="company-document"><p><b>우리가 하는 일</b>커피와 AI를 연결해 새로운 카페 경험을 만드는 회사입니다.</p><p><b>브랜드의 방향</b>커피 한 잔의 일상에서 더 나은 미래를 찾습니다.</p><p><b>첫 번째 의뢰</b>회사소개를 페이크그램 피드 한 장으로 정리해 주세요.</p></div><div className="keyword-list">{['브랜드', '미래', '연결', '커피'].map(word => <span className="company-word" key={word}>#{word}</span>)}</div><button className="primary" disabled={game.companyReceived} onClick={() => { dispatch({ type: 'RECEIVE_COMPANY' }); notify('회사 자료를 받았습니다. 키워드 4개가 추가됐어요.'); }}>{game.companyReceived ? '회사 자료 수신 완료' : '회사 자료 받기 · 키워드 수집'}</button></> : modal === 'create' ? workPanel() : modal === 'ending' ? <><small className="eyebrow">SEVEN WEEKS / {game.name}</small><h2>저는 여기까지 하겠습니다.</h2><p>회사를 소개하고, 패키지를 만들고, 봉투의 소스를 컵홀더로 옮겼습니다. 시트지를 끝낸 다음 주엔 페인트 붓을 들었고, 마지막 DM에는 웹사이트가 적혀 있었습니다.</p><div className="ending">승인·게시한 작업 <b>{game.posts.length} / {TOTAL_JOBS}개</b><br/>수정 시안 전달 <b>{game.revisions}회</b><br/>직접 보낸 답장 <b>{game.replyCount}회</b><br/>미룬 연락 <b>{game.lateReplies}회</b><br/>정산 조건 <b>{game.payMode === 'monthly' ? '월 정액 50만 원' : '건당 20만 원'}</b><br/>마지막 선택 <b>퇴사 · 협업 종료</b></div><p>열심히 일하고 싶었던 마음과, 말없이 화면을 닫고 싶었던 마음. 둘 다 당신의 7주에 남았습니다. 마지막 답장은 다음 업무가 아닌, 퇴사였습니다.</p><button className="primary" onClick={openReview}>주차별 작업 기록 보기</button><button className="reset" onClick={() => { clearTimeout(toastTimer.current); resetSession(); dispatch({ type: 'START', name: game.name }); }}>같은 이름으로 다시 시작</button><button className="reset" onClick={resetSession}>공고부터 다시 보기</button></> : modal === 'about' ? <><small className="eyebrow">ABOUT FAKEGRAM</small><h2>커피는 한 잔, 업무는 무한 리필.</h2><p>채용 공고의 약속과 실제 업무 사이에서 일하는 디자이너의 첫 7주입니다. 둘러보기에서 재료를 수집하고, 시안을 전달한 뒤 수정과 승인을 거쳐 게시하세요.</p><p>초반에는 기대를 담아 답장하고, 후반에는 짧게 답하거나 연락을 미룰 수 있습니다. 대표님 대사는 게임에 작성된 이야기로 작동합니다.</p><p className="muted">주차 사이에는 일주일이 흐르는 전환 화면이 나타납니다. 진행 상황과 시안, 작성 중인 답장, SNS 반응은 이 브라우저에 자동 저장됩니다. 새로고침 후 이어하기를 선택할 수 있습니다. 스토리와 주변 게시물은 게임 연출이며, 주변 인물은 가상 인물입니다.</p><button className="primary" onClick={openReview}>주차별 회고 보기</button><button className="reset" onClick={() => setModal(null)}>피드로 돌아가기</button></> : modal.type === 'reference' ? <><small className="eyebrow">@{REFERENCE_NOTES[modal.ref.id].account}</small><h2>{modal.ref.title}</h2><img className="reference-preview" src={imageUrl(modal.ref)} alt={modal.ref.alt}/><p>{REFERENCE_NOTES[modal.ref.id].text}</p><button className="primary" onClick={() => collectPhoto(modal.ref.id)}>{game.collection.photos.includes(modal.ref.id) ? '사진 수집 완료 ✓' : '사진 수집하기'}</button><h3 className="reference-keyword-heading">발견한 키워드</h3>{keywordButtons(REFERENCE_NOTES[modal.ref.id].keywords)}</> : null}</section></div>}
  </div>;
}
