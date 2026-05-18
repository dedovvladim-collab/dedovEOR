
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a=>{ if(a.getAttribute('href')===path) a.classList.add('active'); });

  const topBtn = document.querySelector('.back-to-top');
  if(topBtn){
    window.addEventListener('scroll',()=>topBtn.classList.toggle('visible', window.scrollY>420));
    topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

  document.querySelectorAll('.accordion-btn').forEach(btn=>{
    btn.addEventListener('click',()=>btn.closest('.accordion-item').classList.toggle('open'));
  });

  const quiz = document.querySelector('#quiz-form');
  if(quiz){
    const answers = {q1:'b',q2:'c',q3:'b',q4:'a',q5:'c',q6:'b',q7:'c',q8:'a',q9:'b',q10:'c'};
    const result = document.querySelector('#quiz-result');
    quiz.addEventListener('submit', function(e){
      e.preventDefault();
      let score=0, total=Object.keys(answers).length;
      Object.entries(answers).forEach(([q,a])=>{const checked=quiz.querySelector(`input[name="${q}"]:checked`); if(checked && checked.value===a) score++;});
      let level = score>=8?'отличный результат':score>=6?'хороший результат':score>=4?'нужно повторить отдельные темы':'рекомендуется заново изучить материал';
      result.innerHTML = `Результат: ${score} из ${total}. ${level}.`;
      result.scrollIntoView({behavior:'smooth', block:'center'});
    });
    const reset = document.querySelector('#reset-quiz');
    if(reset){reset.addEventListener('click',()=>{quiz.reset(); result.innerHTML='Ответьте на вопросы и нажмите «Проверить». ';});}
  }
});
