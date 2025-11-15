// Simple To‑Do using localStorage
const STORAGE_KEY = 'todo.local.tasks.v1';

let tasks = [];
let filter = 'all';

const $form = document.getElementById('task-form');
const $input = document.getElementById('task-input');
const $list = document.getElementById('task-list');
const $count = document.getElementById('count');
const $clearCompleted = document.getElementById('clear-completed');
const $filters = document.getElementById('filters');

function generateId(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  }catch(e){
    tasks = [];
  }
}

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }

function addTask(title){
  tasks.unshift({ id: generateId(), title: title.trim(), completed: false, createdAt: Date.now() });
  save();
  render();
}

function updateTask(id, updates){
  tasks = tasks.map(t => t.id === id ? {...t, ...updates} : t);
  save();
  render();
}

function removeTask(id){
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function clearCompleted(){
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
}

function setFilter(f){
  filter = f;
  Array.from($filters.querySelectorAll('button')).forEach(b => b.classList.toggle('active', b.dataset.filter === f));
  render();
}

function visibleTasks(){
  if(filter === 'active') return tasks.filter(t => !t.completed);
  if(filter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

function render(){
  $list.innerHTML = '';
  const visible = visibleTasks();
  visible.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task' + (t.completed ? ' completed' : '');
    li.dataset.id = t.id;

    const left = document.createElement('div');
    left.className = 'left';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.completed;
    cb.addEventListener('change', () => updateTask(t.id, { completed: cb.checked }));

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = t.title;
    title.contentEditable = true;
    title.spellcheck = false;
    title.addEventListener('blur', () => {
      const newTitle = title.textContent.trim();
      if(!newTitle){ removeTask(t.id); return; }
      if(newTitle !== t.title) updateTask(t.id, { title: newTitle });
    });
    title.addEventListener('keydown', (e) => {
      if(e.key === 'Enter'){ e.preventDefault(); title.blur(); }
    });

    left.appendChild(cb);
    left.appendChild(title);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const del = document.createElement('button');
    del.textContent = '✕';
    del.title = 'Delete';
    del.addEventListener('click', () => removeTask(t.id));
    actions.appendChild(del);

    li.appendChild(left);
    li.appendChild(actions);

    $list.appendChild(li);
  });

  $count.textContent = `${tasks.filter(t=>!t.completed).length} items`;
}

$form.addEventListener('submit', e => {
  e.preventDefault();
  const v = $input.value;
  if(!v.trim()) return;
  addTask(v);
  $input.value = '';
});

$clearCompleted.addEventListener('click', () => clearCompleted());

$filters.addEventListener('click', e => {
  const btn = e.target.closest('button');
  if(!btn) return;
  setFilter(btn.dataset.filter);
});

window.addEventListener('storage', (e) => {
  if(e.key === STORAGE_KEY) load(), render();
});

// init
load();
render();
setFilter('all');
