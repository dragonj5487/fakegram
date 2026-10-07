import React, { useState } from 'react';
import { BriefcaseBusiness, MapPin, Banknote, Clock, ChevronRight, Building2 } from 'lucide-react';

export default function Onboarding({ start }) {
  const [name, setName] = useState('');
  return <div className="job-board">
    <header className="job-board-header"><div><span className="job-portal-logo">알바<span>로그</span></span><span className="job-header-label">채용공고</span></div><span className="job-header-caption">당신의 다음 일을 찾아보세요</span></header>
    <main className="job-posting">
      <div className="job-breadcrumb">채용공고<ChevronRight size={13}/>디자인 · 콘텐츠<ChevronRight size={13}/>프리랜서</div>
      <article className="job-posting-card">
        <div className="job-title-block"><div className="job-company"><span className="job-company-logo">d.</span><span>디컨 · DECON</span><span className="job-hiring-badge">모집중</span></div><h1>[재택 / 프리랜서] 카페·AI 스타트업<br className="job-title-break"/> 기업소개 피드 디자이너 모집</h1><p>카페와 AI를 접목한 디컨의 첫 브랜드 이야기를 함께 만들어 주세요.</p><div className="job-tags"><span>재택가능</span><span>경력무관</span><span>프리랜서</span><span>학업병행 가능</span></div></div>
        <div className="job-pay-strip"><Banknote size={23}/><span>건별 작업비</span><strong>200,000<span>원</span></strong><small>건당 20만 원</small></div>
        <dl className="job-conditions"><div><dt><BriefcaseBusiness size={18}/>고용형태</dt><dd>프리랜서 · 건별 의뢰</dd></div><div><dt><MapPin size={18}/>근무장소</dt><dd>재택 · 온라인 협업</dd></div><div><dt><Clock size={18}/>업무방식</dt><dd>자료 수신 후 시안 전달</dd></div><div><dt><Building2 size={18}/>모집분야</dt><dd>브랜드 / 콘텐츠 디자인</dd></div></dl>
        <div className="job-detail"><section><h2><span/>모집 내용</h2><p>디컨은 커피와 AI로 새로운 카페 경험을 만드는 작은 스타트업입니다.<br/>회사소개 자료를 바탕으로 브랜드를 소개하는 피드 디자인 한 건을 의뢰합니다.</p><ul><li>기업소개 피드 문구 및 그래픽 구성</li><li>회사 자료와 참고 사진을 활용한 디자인 작업</li><li>대표님과 메신저로 자료·시안 공유</li></ul></section><section><h2><span/>지원 자격</h2><p>신입·경력 무관. 새로운 브랜드와 함께 작업해보고 싶은 디자이너를 기다립니다.<br/>재택으로 진행하며, 학업과 병행하시는 분도 지원할 수 있습니다.</p></section><section className="job-company-note"><h2><span/>담당자의 한마디</h2><blockquote>“기업소개 피드 한 건부터 같이 해볼까요?<br/>회사 자료는 제가 보내드릴게요. 잘 부탁드립니다!”<span>대표 윤하은 · 디컨</span></blockquote></section></div>
        <section className="job-application"><div><h2>이 공고에 지원하기</h2><p>이름을 남기면 대표님과의 업무 대화가 시작됩니다.</p></div><form onSubmit={e => { e.preventDefault(); if (name.trim()) start(name.trim()); }}><label htmlFor="player-name">지원자 이름</label><div className="job-apply-controls"><input id="player-name" value={name} onChange={e => setName(e.target.value)} placeholder="이름을 입력하세요" maxLength={20} required autoComplete="off"/><button type="submit" disabled={!name.trim()}>지원하기</button></div></form><p className="job-fiction-note">게임 속 가상 채용공고입니다. 이름은 게임 화면에만 사용됩니다.</p></section>
      </article><footer className="job-board-footer">알바로그 · 가상의 채용 플랫폼<span>한 번의 지원으로 시작되는, 당신의 7주.</span></footer>
    </main>
  </div>;
}
