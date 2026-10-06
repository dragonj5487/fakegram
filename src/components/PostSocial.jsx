import React, { useId, useRef, useState } from 'react';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';

export default function PostSocial({ id, name, likes, value = {}, update }) {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const input = useRef(null);
  const panelId = useId();
  const comments = value.comments || [];
  function change(patch) { update(id, { ...value, ...patch }); }
  return <div className="post-social">
    <div className="actions">
      <button aria-label="좋아요" aria-pressed={!!value.liked} onClick={() => change({ liked: !value.liked })}><Heart color={value.liked ? '#ed4956' : 'currentColor'} fill={value.liked ? '#ed4956' : 'none'}/></button>
      <button aria-label="댓글 보기" aria-expanded={showComments} aria-controls={panelId} onClick={() => setShowComments(open => !open)}><MessageCircle/>{comments.length > 0 && <span>{comments.length}</span>}</button>
      <button className="save" aria-label="게시물 저장" aria-pressed={!!value.saved} onClick={() => change({ saved: !value.saved })}><Bookmark fill={value.saved ? 'currentColor' : 'none'}/></button>
    </div>
    <div className="social-copy"><b>좋아요 {likes + (value.liked ? 1 : 0)}개</b>
      <button className="comment-count" aria-expanded={showComments} aria-controls={panelId} onClick={() => setShowComments(open => !open)}>{showComments ? '댓글 접기' : comments.length ? `댓글 ${comments.length}개 모두 보기` : '댓글 달기'}</button>
      {showComments && <section id={panelId} className="comment-panel" aria-label="게시물 댓글">
        <div className="social-comments" aria-live="polite">{comments.length ? comments.map((text, i) => <p key={i}><b>{name}</b> {text}</p>) : <p className="comment-empty">아직 댓글이 없어요. 첫 댓글을 남겨보세요.</p>}</div>
        <form className="comment-form" onSubmit={e => { e.preventDefault(); if (!comment.trim()) return; change({ comments: [...comments, comment.trim()] }); setComment(''); input.current?.focus(); }}>
          <input ref={input} aria-label="댓글 내용" placeholder="댓글 달기…" value={comment} maxLength={300} onChange={e => setComment(e.target.value)}/><button disabled={!comment.trim()}>게시</button>
        </form>
      </section>}
    </div>
  </div>;
}
