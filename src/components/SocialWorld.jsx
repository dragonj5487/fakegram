import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle, BookOpen } from 'lucide-react';
import { ACCOUNTS, availablePosts, availableStories } from '../data/socialWorld';
import { JOBS, WEEKS } from '../data/scenario';
import DesignArtifact from './DesignArtifact';

export function WorldAvatar({ account }) {
  const person = ACCOUNTS[account];
  return <span className="avatar world-avatar" style={{ background: person.color }}>{person.avatar}</span>;
}
export function WorldDialog({ title, close, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    element.showModal();
    return () => { element.close(); previous?.focus(); };
  }, []);
  return <dialog ref={dialog} className="world-dialog" aria-label={title} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}>
    <div className="world-dialog-content"><button className="world-close" aria-label="닫기" onClick={close}><X size={20}/></button>{children}</div>
  </dialog>;
}
export function StoryRail({ week, seen, openStory, openProfile }) {
  const stories = availableStories(week);
  return <section className="story-section" aria-label="주차별 스토리와 계정">

    <div className="story-rail">{stories.slice().reverse().map(story => <button key={story.id} className={`story-button ${seen.includes(story.id) ? 'seen' : ''}`} aria-label={`${story.week}주 차 스토리: ${story.title}${seen.includes(story.id) ? ' (읽음)' : ' (새 스토리)'}`} onClick={() => openStory(story.id)}><span className="story-ring"><WorldAvatar account={story.account}/></span><b>{story.week}주 차</b><small>{story.title}</small></button>)}</div>

  </section>;
}
export function StoryViewer({ id, week, openStory, openProfile, close }) {
  const stories = availableStories(week);
  const index = stories.findIndex(story => story.id === id);
  const story = stories[index];
  if (!story) return null;
  return <WorldDialog title={`${story.week}주 차 스토리`} close={close}>
    <div className="story-progress" aria-label={`${index + 1} / ${stories.length}`}>{stories.map((item, i) => <span key={item.id} className={i <= index ? 'seen' : ''}/>)}</div>
    <button className="world-account" onClick={() => openProfile(story.account)}><WorldAvatar account={story.account}/><span><b>decon.official</b><small>{story.week}주 차 · 스토리 아카이브</small></span></button>
    <div className="story-canvas"><small>DECON / WEEK {String(story.week).padStart(2, '0')}</small><span className="story-symbol" aria-hidden="true">✳</span><h2>{story.title}</h2><p>{story.text}</p><span className="story-caption">커피 한 잔과, 그 뒤의 시간.</span></div>
    <p className="world-fiction">기존 업무를 바탕으로 구성한 게임 속 스토리입니다.</p>
    <div className="story-controls"><button disabled={index === 0} onClick={() => openStory(stories[index - 1].id)}><ChevronLeft size={17}/>이전</button><span>{index + 1} / {stories.length}</span><button onClick={() => index === stories.length - 1 ? close() : openStory(stories[index + 1].id)}>{index === stories.length - 1 ? '닫기' : '다음'}<ChevronRight size={17}/></button></div>
  </WorldDialog>;
}
export function CommunityFeed({ week, account, currentOnly = false, openProfile, social }) {
  const posts = availablePosts(week, account).filter(post => !currentOnly || post.week === week);
  return <div className="community-feed">{posts.map(post => <article className="post world-post" key={post.id}>
    <div className="post-head"><button className="world-account" onClick={() => openProfile(post.account)}><WorldAvatar account={post.account}/><span><b>{ACCOUNTS[post.account].handle}</b><small>{post.week}주 차 · {ACCOUNTS[post.account].kind}</small></span></button></div>
    <div className={`world-post-art world-art-${post.account}`}><small>{post.motif} / {String(post.week).padStart(2, '0')}</small><span aria-hidden="true">{post.account === 'company' ? '✳' : post.account === 'peer' ? 'Aa' : '☕'}</span><h3>{post.title}</h3></div>
    <div className="post-copy"><p><b>{ACCOUNTS[post.account].handle}</b> {post.text}</p><p className="world-fiction">{post.account === 'company' ? '게임 연출 게시물' : '가상 인물의 게시물 · 실제 인물의 발언이 아닙니다.'}</p></div>{social(post.id, 8, post.week)}
  </article>)}</div>;
}
export function ProfilePanel({ account, week, openProfile, openStory, openMessages, social, close }) {
  const person = ACCOUNTS[account];
  return <WorldDialog title={`${person.name} 프로필`} close={close}>
    <div className="world-profile"><WorldAvatar account={account}/><div><small>{person.handle}</small><h2>{person.name}</h2><span>{person.kind}</span></div></div>
    <p className="profile-bio">{person.bio}</p><p className="world-fiction">게임 속 프로필 · 소개와 공개 게시물은 게임 연출입니다.</p>
    {account === 'boss' && <><button className="primary" onClick={openMessages}><MessageCircle size={16}/>대표님과의 업무 대화</button><button className="profile-link" onClick={() => openProfile('company')}>@decon.official · 디컨 회사 계정 →</button><p className="profile-empty">공개 게시물은 없습니다. 업무 대화는 DM에서 이어집니다.</p></>}
    {account === 'company' && <><button className="profile-link" onClick={() => openProfile('boss')}>대표 윤하은 프로필 →</button><div className="profile-stories">{availableStories(week).map(story => <button key={story.id} onClick={() => openStory(story.id)}>{story.week}주 차<span>{story.title}</span></button>)}</div></>}
    <CommunityFeed week={week} account={account} openProfile={openProfile} social={social}/>
  </WorldDialog>;
}
export function ReviewPanel({ game, openMessages, close }) {
  const currentWeek = JOBS[game.jobIndex].week;
  const [selected, setSelected] = useState(currentWeek);
  const record = WEEKS[selected - 1];
  const posts = game.posts.filter(post => post.week === selected);
  const messages = game.messages.filter(message => message.week === selected);
  return <WorldDialog title="주차별 작업 회고" close={close}>
    <div className="review-title"><BookOpen size={22}/><div><small>MY SEVEN WEEKS</small><h2>내가 남긴 기록</h2></div></div>
    <p className="profile-bio">{game.name}님의 작업과 대화. 지나온 주차를 다시 펼쳐보세요.</p>
    <div className="review-week-tabs" aria-label="회고 주차 선택">{WEEKS.map(item => <button key={item.week} disabled={item.week > currentWeek} aria-pressed={selected === item.week} onClick={() => setSelected(item.week)}>{item.week}주</button>)}</div>
    <div className="review-note"><small>{selected}주 차 · {record.place}</small><p>{record.note}</p><span>게시한 작업 {posts.length} / {record.tasks.length} · 대화 {messages.length}개</span></div>
    <button className="profile-link" onClick={() => openMessages()}>전체 대화 보기 →</button>
    {record.tasks.map(task => <p className="review-task" key={task}><span>{posts.some(post => post.taskName === task) ? '✓ 게시 완료' : '진행 기록 없음'}</span>{task}</p>)}
    {posts.map(post => <article className="post" key={post.id}><div className="post-head"><b>{post.taskName}</b></div><DesignArtifact post={post}/><div className="post-copy"><p>{post.caption}</p>{post.source && <p>재사용한 소스 · {post.source}</p>}</div></article>)}
  </WorldDialog>;
}
