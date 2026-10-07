import { initialGame, JOBS } from './scenario.js';

export const SAVE_KEY = 'decon-seven-weeks-v1';
const phases = new Set(['greeting', 'smallTalk', 'smallTalkFollowup', 'requesting', 'awaitingReply', 'drafting', 'reviewing', 'revision', 'approved', 'handoff', 'collaborationOffer', 'awaitingContract', 'salaryOffer', 'resignation', 'contract', 'weekTransition', 'avoiding', 'finished', 'seriousTalk', 'exitDiscussion']);
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const strings = value => Array.isArray(value) && value.every(item => typeof item === 'string');
const draftValid = value => object(value) && ['title', 'caption', 'color', 'reference'].every(key => typeof value[key] === 'string') && strings(value.keywords);
const effects = new Set(['awaitReply', 'seriousTalk', 'exitDiscussion', 'smallTalk', 'smallTalkFollowup', 'revise', 'approve', 'draft', 'collaborationOffer', 'attachContract', 'salaryOffer', 'resignation', 'next', 'finish']);

export function validGame(game) {
  if (!object(game) || !game.started || !phases.has(game.phase)) return false;
  const defaults = initialGame();
  if (!Object.entries(defaults).every(([key, value]) => value === null || (Array.isArray(value) ? Array.isArray(game[key]) : typeof game[key] === typeof value))) return false;
  if (!game.name.trim() || !Number.isInteger(game.jobIndex) || !JOBS[game.jobIndex]) return false;
  if (!['piece', 'monthly'].includes(game.payMode)) return false;
  if (!Object.entries(defaults).filter(([, value]) => typeof value === 'number').every(([key]) => Number.isFinite(game[key]) && game[key] >= 0)) return false;
  if (!draftValid(game.draft) || !object(game.collection) || !strings(game.collection.photos) || !strings(game.collection.keywords) || !strings(game.alerts)) return false;
  if (![game.submitted, game.approved].every(value => value === null || draftValid(value))) return false;
  if (!game.posts.every(post => draftValid(post) && Number.isInteger(post.id) && JOBS[post.id] && post.week === JOBS[post.id].week && post.format === JOBS[post.id].format && typeof post.name === 'string')) return false;
  if (new Set(game.posts.map(post => post.id)).size !== game.posts.length) return false;
  if (!game.messages.every(message => object(message) && typeof message.text === 'string' && ['boss', 'me'].includes(message.sender) && typeof message.time === 'string' && Number.isInteger(message.week) && message.week >= 1 && message.week <= 7)) return false;
  if (!game.queue.every(message => object(message) && typeof message.text === 'string' && (message.effect == null || effects.has(message.effect)))) return false;
  if (game.queue.some(message => message.effect === 'approve') && !game.submitted) return false;
  if (game.queue.some(message => message.effect === 'next') && !JOBS[game.jobIndex + 1]) return false;
  if (game.phase === 'approved' && !game.approved) return false;
  if (game.phase === 'weekTransition' && (!object(game.transition) || game.transition.from !== JOBS[game.jobIndex].week || (game.pendingJobIndex === null ? game.transition.to !== null : !JOBS[game.pendingJobIndex] || game.transition.to !== JOBS[game.pendingJobIndex].week))) return false;
  return true;
}

// Storage is resolved inside try/catch: browsers can deny even access to localStorage.
export function loadProgress(storage) {
  try {
    const raw = (storage ?? globalThis.localStorage).getItem(SAVE_KEY);
    if (!raw) return { snapshot: null, error: '' };
    const data = JSON.parse(raw);
    if (data.version !== 1 || !validGame(data.game) || !object(data.socials) || !strings(data.seenStories) || typeof data.reply !== 'string' || !Number.isFinite(data.socialTime) || !Number.isFinite(data.savedAt)) throw new Error('invalid');
    if (!Object.values(data.socials).every(value => object(value) && (value.comments === undefined || strings(value.comments)) && (value.reaction === undefined || typeof value.reaction === 'string'))) throw new Error('invalid');
    // Update the scripted introduction in old saves without changing player text or progress.
    const oldIntro = '\uB514\uCEE8 \uB300\uD45C \uC815\uC870\uC740\uC785\uB2C8\uB2E4';
    const renameIntro = text => text.replaceAll(oldIntro, '디컨 대표 윤하은입니다');
    data.game.messages = data.game.messages.map(message => message.sender === 'boss' ? { ...message, text: renameIntro(message.text) } : message);
    data.game.queue = data.game.queue.map(message => ({ ...message, text: renameIntro(message.text) }));
    data.game.alerts = data.game.alerts.map(renameIntro);
    return { snapshot: data, error: '' };
  } catch { return { snapshot: null, error: '저장 기록을 읽지 못했습니다. 새 게임을 시작할 수 있습니다.' }; }
}
export function saveProgress(snapshot, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(SAVE_KEY, JSON.stringify({ ...snapshot, version: 1, savedAt: Date.now() }));
    return true;
  } catch { return false; }
}
export function clearProgress(storage) {
  try { (storage ?? globalThis.localStorage).removeItem(SAVE_KEY); return true; } catch { return false; }
}
