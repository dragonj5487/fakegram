import React, { useState } from 'react';
import { JOBS } from '../data/scenario';
export default function ResumeGame({ snapshot, resume, restart }) {
  const [confirm, setConfirm] = useState(false);
  return <main className="resume-screen"><section className="resume-card"><span className="resume-brand">페이크그램</span><small>다시 열린 화면, 이어지는 이야기</small><h1>{snapshot.game.name}님의<br/>7주가 남아 있어요.</h1><p>{JOBS[snapshot.game.jobIndex].week}주 차 · {snapshot.game.finished ? '협업 종료' : JOBS[snapshot.game.jobIndex].name}</p><p>게시한 작업 {snapshot.game.posts.length}개 · {new Date(snapshot.savedAt).toLocaleString('ko-KR')} 저장</p><button className="primary" onClick={resume}>{snapshot.game.finished ? '지난 기록 돌아보기' : '이어서 하기'}</button>{confirm ? <div className="restart-confirm"><p>새로 시작하면 이 브라우저의 기존 진행 기록을 덮어씁니다.</p><button onClick={restart}>새 게임 시작</button><button onClick={() => setConfirm(false)}>취소</button></div> : <button className="reset" onClick={() => setConfirm(true)}>공고부터 새로 시작</button>}<p className="world-fiction">이 브라우저에 자동 저장됩니다. 다른 기기와 공유되지 않습니다.</p></section></main>;
}
