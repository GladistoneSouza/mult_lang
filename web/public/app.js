const md = window.markdownit({ html:false, linkify:true, typographer:true });
const $ = s => document.querySelector(s);
let files = [], current = null;
const done = new Set(JSON.parse(localStorage.getItem('mult_lang_done') || '[]'));

function save(){ localStorage.setItem('mult_lang_done', JSON.stringify([...done])); updateProgress(); }
function updateProgress(){
  const total = files.length || 1, n = files.filter(f => done.has(f.id)).length;
  $('#progressText').textContent = `${n} de ${files.length} materiais concluídos`;
  $('#bar').style.width = `${Math.round(n/total*100)}%`;
}
function label(f){
  if(f.id === 'licoes_01_a_03.md') return ['Lições 1–3','Cumprimentos, cafeteria e frases simples'];
  if(f.id === 'vocabulario_atual.md') return ['Vocabulário atual','Palavras que já apareceram no estudo'];
  return [f.name,'Orientação do curso atual'];
}
function render(list=files){
  $('#lessons').innerHTML = list.map(f => { const [a,b]=label(f); return `<button class="card" data-id="${f.id}"><span class="check">${done.has(f.id)?'✓':'○'}</span><span><strong>${a}</strong><small>${b}</small></span><b>›</b></button>` }).join('') || '<p>Nenhum resultado.</p>';
  document.querySelectorAll('.card').forEach(b => b.onclick=()=>openFile(b.dataset.id));
}
async function openFile(id){
  current=id; const f=files.find(x=>x.id===id); const text=await fetch(`/api/file?name=${encodeURIComponent(id)}`).then(r=>r.text());
  $('#markdown').innerHTML=md.render(text); $('#home').classList.add('hidden'); $('#reader').classList.remove('hidden'); $('#back').classList.remove('hidden'); $('#title').textContent=label(f)[0]; updateComplete(); scrollTo(0,0);
}
function updateComplete(){ $('#complete').textContent = done.has(current) ? '✓ Concluído — tocar para desfazer' : 'Marcar como concluído'; }
function goHome(){ current=null; $('#reader').classList.add('hidden'); $('#home').classList.remove('hidden'); $('#back').classList.add('hidden'); $('#title').textContent='Meu estudo'; render(); scrollTo(0,0); }
$('#back').onclick=goHome;
$('#complete').onclick=()=>{ done.has(current)?done.delete(current):done.add(current); save(); updateComplete(); };
$('#search').oninput=async e=>{ const q=e.target.value.trim(); if(!q) return render(); const r=await fetch(`/api/search?q=${encodeURIComponent(q)}`).then(x=>x.json()); render(r); };

fetch('/api/course').then(r=>r.json()).then(data=>{ files=data.files; render(); updateProgress(); });
