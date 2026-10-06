import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';
import { SERVICE_CLAUSES } from '../data/serviceContract';

export default function ServiceContract({ name, sign, back }) {
  const [signature, setSignature] = useState('');
  const [read, setRead] = useState(false);
  return <main className="onboarding contract-scene"><div className="recruit-layout"><section className="recruit-paper"><div className="paper-heading"><FileText size={20}/><span>디자인 용역계약서</span><small>첨부 01</small></div><span className="paper-label">DESIGN SERVICE AGREEMENT / DECON</span><h2>디자인 용역계약서</h2><p className="paper-sub">갑: 디컨 · 대표 정조은 / 을: {name}</p><div className="contract-rate"><span>용역대금</span><b>건당 200,000원</b></div><div className="service-clauses">{SERVICE_CLAUSES.map(clause => <section key={clause.title}><h3>{clause.title}</h3><p>{clause.text}</p></section>)}</div><form onSubmit={e => { e.preventDefault(); if (read && signature.trim() === name) sign(signature); }}><label className="name-label" htmlFor="employee-signature">용역 수행자 서명 · {name}</label><input id="employee-signature" value={signature} onChange={e => setSignature(e.target.value)} placeholder={`${name} 이름을 적어 주세요`} maxLength={20} required autoComplete="off"/><label className="contract-checkbox"><input type="checkbox" checked={read} onChange={e => setRead(e.target.checked)}/>게임 속 계약 내용을 확인했습니다.</label><button className="primary" disabled={!read || signature.trim() !== name}><Check size={17}/> 서명본을 대표님께 전달하기</button></form><button className="contract-back" onClick={back}>대화방으로 돌아가기</button><p className="fiction-note">이 문서는 게임 속 가상 회사의 설정입니다.</p></section></div></main>;
}
