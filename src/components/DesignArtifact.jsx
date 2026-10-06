import React from 'react';
import { Compass } from 'lucide-react';
import { REFERENCES, imageUrl } from '../data/game';

export default function DesignArtifact({ post }) {
  const ref = REFERENCES.find(r => r.id === post.reference);
  const photo = ref ? <img src={imageUrl(ref)} alt="수집한 디자인 사진 소스"/> : <div className="design-photo-placeholder"><Compass size={28}/><span>수집한 사진으로 채워주세요</span></div>;
  const words = <div className="design-keywords">{(post.keywords || []).map(word => <span key={word}>#{word}</span>)}</div>;
  const title = <h2>{post.title || '어떤 이야기를 담을까요?'}</h2>;
  const body = <p>{post.caption || '수집한 사진과 키워드로 디자인을 작성하세요.'}</p>;
  const format = post.format || 'feed';
  return <div className={`design artifact artifact-${format}`} style={{ background: post.color }}><small>DECON / {post.taskName}</small>
    {format === 'website' ? <><div className="artifact-web-nav"><b>decon.</b><span>회사 소개　 제품　 방문 안내</span></div><div className="artifact-web-hero">{title}{body}</div>{photo}{words}<div className="artifact-web-footer">COFFEE & AI / SEONGSU</div></> : format === 'package' ? <div className="artifact-print"><div className="print-front"><small>앞면</small>{title}{photo}{words}</div><div className="print-side"><small>옆면</small><b>DECON</b>{body}</div></div> : format === 'bag' ? <><div className="artifact-guide">각대봉투 · 앞면 인쇄 그래픽</div>{title}{photo}{words}{body}<div className="artifact-fold">하단 접힘 영역 / DESIGN SOURCE</div></> : format === 'sleeve' ? <><div className="artifact-guide">컵홀더 · 펼친 인쇄면</div><div className="artifact-band"><div>{title}{words}</div>{photo}</div>{body}<small className="source-credit">SOURCE / 3주 차 각대봉투</small></> : format === 'window' ? <><div className="artifact-guide">시트지 · 유리창 부착 그래픽</div>{title}<div className="artifact-window-panel">{photo}{words}</div>{body}</> : format === 'interior' || format === 'research' ? <><div className="artifact-guide">{format === 'interior' ? '현장 작업 기록 / 컬러 & 공간' : '간판 레퍼런스 / RESEARCH BOARD'}</div>{photo}{title}{words}{body}</> : <>{title}{photo}{words}{body}</>}
  </div>;
}
