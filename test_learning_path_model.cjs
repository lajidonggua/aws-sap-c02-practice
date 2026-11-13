const assert=require('node:assert/strict');
const M=require('./learning_path_model.js');
const lessons=[{id:'a'},{id:'b'},{id:'c'}],now=1800000000000;
let r;for(const days of [1,3,7,14,14]){r=M.review(r,'clear',now);assert.equal(r.dueAt,now+days*M.DAY);}
assert.equal(r.streak,4);assert.equal(r.reviews,5);
r=M.review(r,'fuzzy',now);assert.equal(r.streak,0);assert.equal(r.dueAt,now+M.DAY);
r=M.review(r,'clear',now);assert.equal(r.streak,1);assert.equal(r.dueAt,now+M.DAY);
assert.throws(()=>M.review(r,'mastered',now));
const p={reviews:{a:{dueAt:now-1,reviewedAt:now-1000},b:{dueAt:now,reviewedAt:now-1000}}};
assert.deepEqual(M.due(lessons,p,now).map(l=>l.id),['a','b']);
assert.equal(M.recommend(lessons,p,now).id,'a');
p.draft={id:'c',openedAt:now};assert.equal(M.recommend(lessons,p,now).id,'c');
p.reviews.c={dueAt:now+M.DAY,reviewedAt:now};assert.equal(M.recommend(lessons,p,now).id,'a');
assert.equal(M.recommend(lessons,{reviews:{a:{dueAt:now+1},b:{dueAt:now+1}}},now).id,'c');
console.log('Learning path: review intervals, reset, cap, due boundary and unfinished-session priority passed.');
