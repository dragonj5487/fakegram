import React from 'react';
export function weekDate(week) {
  const date = new Date(Date.UTC(2026, 2, 2 + (week - 1) * 7));
  return `${date.getUTCMonth() + 1}월 ${date.getUTCDate()}일`;
}
export default function WeekTransition({ from, to, name, note }) {
  return <main className="week-transition" aria-live="polite"><span className="transition-brand">페이크그램</span><div className="transition-content"><small>{from}주 차의 마지막 메시지를 닫고</small><div className="transition-calendar"><span>{weekDate(from)}</span><div className="passing-line"/><span>{to ? weekDate(to) : '7주간의 기록'}</span></div><h1>{to ? '일주일이 흘렀다.' : '어느새, 일곱 주가 흘렀다.'}</h1><p>{to ? note : `${name}님의 작업과 대화는 피드에 남았다.`}</p><div className="transition-week">{to ? `${to}주 차` : '마지막 화면을 열며'}</div><div className="transition-progress"><span/></div><small className="transition-loading">{to ? '페이크그램에 다시 접속하는 중' : '나의 기록을 불러오는 중'}<span>…</span></small></div><span className="transition-footer">읽지 않은 메시지, 다시 켜지는 화면.</span></main>;
}
