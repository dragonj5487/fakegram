import React from 'react';
import { Check, Compass } from 'lucide-react';
import { REFERENCES, imageUrl, designBrief, validateMaterials } from '../data/game';

export default function MaterialComposer({ week, taskName, brief, collection, reference, setReference, keywords, setKeywords, title, setTitle, caption, setCaption, color, setColor, preview, publish, canPublish, explore, themes, revision, source, submitLabel = '대표님께 시안 전달하기' }) {
  const requirements = themes ? { themes } : designBrief(week);
  const error = validateMaterials({ reference, keywords }, collection);
  function toggle(word) {
    setKeywords(words => words.includes(word) ? words.filter(v => v !== word) : words.length < 3 ? [...words, word] : words);
  }
  return <div className="composer-layout"><div className="composer-preview"><small>미리보기</small>{preview}</div><div className="composer-controls">
    <small className="eyebrow">DESIGN STUDIO / WEEK {String(week).padStart(2, '0')}</small>
    <h2>{taskName}</h2><p className="muted">{brief}</p>
    {source && <div className="source-note"><Check size={15}/>3주 차 각대봉투의 사진·키워드를 가져왔어요. 사진 소스는 유지해 주세요.</div>}
    {revision && <section className="revision-check"><b>대표님 수정 요청</b>{revision.map(request => <p key={request.text} className={request.done ? 'satisfied' : ''}>{request.done ? <Check size={14}/> : <span>○</span>}{request.text}</p>)}</section>}
    <div className="work-brief"><b>대표님이 원하는 분위기</b><p>{requirements.themes.join(' · ')}</p><small>사진 1장 + 키워드 2~3개를 조합해 주세요.</small></div>
    <div className="material-heading"><h3>01 수집한 사진 선택</h3><span>{collection.photos.length}장 보유</span></div>
    {collection.photos.length ? <div className="material-photos">{REFERENCES.filter(r => collection.photos.includes(r.id)).map(r => <button className={reference === r.id ? 'chosen' : ''} aria-pressed={reference === r.id} key={r.id} onClick={() => setReference(r.id)}><img src={imageUrl(r, 240)} alt={r.alt}/><span>{r.title}</span>{reference === r.id && <Check size={17}/>}</button>)}</div> : <div className="material-empty">아직 수집한 사진이 없어요. 둘러보기에서 사진을 눌러 수집하세요.</div>}
    <div className="material-heading"><h3>02 키워드 조합</h3><span>{keywords.length} / 3 선택</span></div>
    {collection.keywords.length ? <div className="keyword-list">{collection.keywords.map(word => <button className={keywords.includes(word) ? 'chosen' : ''} aria-pressed={keywords.includes(word)} disabled={!keywords.includes(word) && keywords.length === 3} key={word} onClick={() => toggle(word)}>{keywords.includes(word) && <Check size={13}/>}#{word}</button>)}</div> : <div className="material-empty">게시물 속 키워드를 눌러 수집해 보세요.</div>}
    <button className="explore-materials" onClick={explore}><Compass size={17}/>둘러보기에서 재료 더 수집하기</button>
    <div className="material-heading"><h3>03 디자인 작성</h3></div>
    <label>디자인 제목·문구<input value={title} maxLength={60} placeholder="선택한 키워드로 문구를 작성하세요" onChange={e => setTitle(e.target.value)}/></label>
    <button className="suggest-copy" disabled={keywords.length < 2} onClick={() => setTitle(`${keywords[0]} 속에 담은 ${keywords[1]}`)}>키워드로 문구 초안 만들기</button>
    <label>배경색<div className="swatches">{['#344a37', '#48372f', '#293e53', '#733f45', '#202020', '#566b77', '#455d9e', '#67518c', '#a55b63', '#ad704b', '#8a783c', '#4c7974', '#77745c', '#58704d', '#8d616e', '#686868'].map(c => <button key={c} style={{ background: c }} aria-label={c} aria-pressed={color === c} onClick={() => setColor(c)}>{color === c && <Check size={18} color="white"/>}</button>)}</div></label><label className="custom-color">직접 고르기<input type="color" aria-label="사용자 지정 배경색" value={color} onChange={e => setColor(e.target.value)}/><span>{color.toUpperCase()}</span></label>
    <label>게시물 설명<textarea value={caption} placeholder="디자인 의도와 소식을 작성하세요" onChange={e => setCaption(e.target.value)}/></label>
    <p className="material-validation" role="status">{error || '재료가 준비됐어요. 시안을 전달하고 대표님 피드백을 기다려 주세요.'}</p>
    <p className="muted">시안 작업 +35분 · 피드에는 승인 후 게시됩니다.</p>
    <button className="primary" disabled={!canPublish || Boolean(error) || !title.trim() || !caption.trim()} onClick={publish}>{submitLabel}</button>
  </div></div>;
}
