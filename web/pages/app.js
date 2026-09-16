const md=window.markdownit({html:false,linkify:true,typographer:true});
const $=s=>document.querySelector(s);
const files=[
 {id:'licoes_01_a_03.md',title:'Lições 1–3',desc:'Cumprimentos, cafeteria e frases simples'},
 {id:'vocabulario_atual.md',title:'Vocabulário atual',desc:'Palavras que já apareceram no estudo'},
 {id:'README.md',title:'Visão geral',desc:'Como funciona o curso atual'}
];
let current=null;
const done=new Set(JSON.parse(localStorage.getItem('mult_lang_done')||'[]'));
const rawBase='https://raw.githubusercontent.com/GladistoneSouza/mult_lang/master/french/current_course/';
function save(){localStorage.setItem('mult_lang_done',JSON.stringify([...done]));progress()}
function progress(){const n=files.filter(f=>done.has(f.id)).length;$('#progressText').textContent=`${n} de ${files.length} materiais concluídos`;$('#bar').style.width=`${n/files.length*100}%`}
function render(list=files){$('#lessons').innerHTML=list.map(f=>`<button class="card" data-id="${f.id}"><span class="check">${done.has(f.id)?'✓':'○'}</span><span><strong>${f.title}</strong><small>${f.desc}</small></span><b>›</b></button>`).join('')||'<p>Nenhum resultado.</p>';document.querySelectorAll('.card').forEach(b=>b.onclick=()=>openFile(b.dataset.id))}
async function getText(id){const r=await fetch(rawBase+encodeURIComponent(id),{cache:'no-store'});if(!r.ok)throw new Error('Falha ao carregar');return r.text()}
async function openFile(id){current=id;const f=files.find(x=>x.id===id);$('#markdown').innerHTML='<p>Carregando…</p>';$('#home').classList.add('hidden');$('#reader').classList.remove('hidden');$('#back').classList.remove('hidden');$('#title').textContent=f.title;try{$('#markdown').innerHTML=md.render(await getText(id))}catch{$('#markdown').innerHTML='<p>Não foi possível carregar esta lição.</p>'}updateComplete();scrollTo(0,0)}
function updateComplete(){$('#complete').textContent=done.has(current)?'✓ Concluído — tocar para desfazer':'Marcar como concluído'}
function home(){current=null;$('#reader').classList.add('hidden');$('#home').classList.remove('hidden');$('#back').classList.add('hidden');$('#title').textContent='Meu estudo';render();scrollTo(0,0)}
$('#back').onclick=home;$('#complete').onclick=()=>{done.has(current)?done.delete(current):done.add(current);save();updateComplete()};
$('#search').oninput=async e=>{const q=e.target.value.trim().toLowerCase();if(!q)return render();const matched=[];for(const f of files){try{const text=await getText(f.id);if((f.title+' '+f.desc+' '+text).toLowerCase().includes(q))matched.push(f)}catch{}}render(matched)};
render();progress();
