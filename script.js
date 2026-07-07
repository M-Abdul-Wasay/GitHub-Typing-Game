const SNIPPETS = [
  {
    repo: "torvalds/linux", lang: "C", color: "#555555", file: "list.c",
    code: `static inline void list_add(struct node *n,\n    struct node *prev)\n{\n    n->next = prev->next;\n    prev->next = n;\n    n->prev = prev;\n}`
  },
  {
    repo: "psf/requests", lang: "Python", color: "#3572A5", file: "retry.py",
    code: `def with_retry(fn, attempts=3):\n    for i in range(attempts):\n        try:\n            return fn()\n        except IOError:\n            if i == attempts - 1:\n                raise`
  },
  {
    repo: "rust-lang/rust", lang: "Rust", color: "#dea584", file: "sum.rs",
    code: `fn checked_sum(nums: &[i32]) -> Option<i32> {\n    nums.iter().try_fold(0, |acc, &x| {\n        acc.checked_add(x)\n    })\n}`
  },
  {
    repo: "golang/go", lang: "Go", color: "#00ADD8", file: "worker.go",
    code: `func worker(jobs <-chan int, out chan<- int) {\n    for j := range jobs {\n        out <- j * j\n    }\n    close(out)\n}`
  },
  {
    repo: "vercel/next.js", lang: "TypeScript", color: "#3178c6", file: "debounce.ts",
    code: `function debounce<T extends Function>(fn: T, ms: number) {\n  let timer: ReturnType<typeof setTimeout>;\n  return (...args: any[]) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n}`
  },
  {
    repo: "facebook/react", lang: "JavaScript", color: "#f1e05a", file: "useToggle.js",
    code: `function useToggle(initial = false) {\n  const [on, setOn] = useState(initial);\n  const toggle = () => setOn(v => !v);\n  return [on, toggle];\n}`
  },
  {
    repo: "rails/rails", lang: "Ruby", color: "#701516", file: "slug.rb",
    code: `def slugify(text)\n  text.downcase\n      .gsub(/[^a-z0-9]+/, "-")\n      .gsub(/^-|-$/, "")\nend`
  },
  {
    repo: "twbs/bootstrap", lang: "CSS", color: "#563d7c", file: "grid.css",
    code: `.col {\n  flex: 1 0 0%;\n  padding-right: 12px;\n  padding-left: 12px;\n}`
  }
];

let current, chars, states, idx, startTime, mistakesTotal, correctTotal, timerInterval;

const codeText = document.getElementById('codeText');
const lineNumbers = document.getElementById('lineNumbers');
const overlay = document.getElementById('overlay');
const hiddenInput = document.getElementById('hiddenInput');
const codeBox = document.getElementById('codeBox');

function pickSnippet(avoid){
  let pool = SNIPPETS;
  if (avoid && SNIPPETS.length > 1) pool = SNIPPETS.filter(s => s !== avoid);
  return pool[Math.floor(Math.random() * pool.length)];
}

function loadSnippet(snippet){
  current = snippet;
  chars = Array.from(snippet.code);
  states = new Array(chars.length).fill('untyped');
  idx = 0;
  startTime = null;
  mistakesTotal = 0;
  correctTotal = 0;
  clearInterval(timerInterval);

  document.getElementById('repoName').textContent = snippet.repo;
  document.getElementById('repoLang').textContent = '· ' + snippet.lang;
  document.getElementById('tabFileName').textContent = snippet.file;
  document.getElementById('tabLangDot').style.background = snippet.color;

  const lineCount = snippet.code.split('\n').length;
  lineNumbers.textContent = Array.from({length: lineCount}, (_, i) => i + 1).join('\n');

  overlay.querySelector('span').textContent = 'click to focus, then start typing';
  updateStats(true);
  render();
  overlay.classList.remove('hide');
}

function render(){
  let html = '';
  for (let i = 0; i < chars.length; i++){
    const ch = chars[i];
    const escaped = ch.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    let cls = 'char-' + states[i];
    if (i === idx) cls += ' char-cursor';
    html += `<span class="${cls}">${escaped}</span>`;
  }
  codeText.innerHTML = html;
}

function updateStats(reset){
  if (reset){
    document.getElementById('wpmVal').textContent = '0';
    document.getElementById('accVal').textContent = '100%';
    document.getElementById('timeVal').textContent = '0.0s';
    document.getElementById('plusStat').textContent = '+0';
    document.getElementById('minusStat').textContent = '-0';
    document.getElementById('addBar').style.width = '0%';
    document.getElementById('remBar').style.width = '0%';
    return;
  }
  const elapsedMin = Math.max((Date.now() - startTime) / 60000, 1/600);
  const wpm = Math.round((correctTotal / 5) / elapsedMin);
  const totalKeystrokes = correctTotal + mistakesTotal;
  const acc = totalKeystrokes === 0 ? 100 : Math.round((correctTotal / totalKeystrokes) * 100);

  document.getElementById('wpmVal').textContent = wpm;
  document.getElementById('accVal').textContent = acc + '%';
  document.getElementById('timeVal').textContent = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
  document.getElementById('plusStat').textContent = '+' + correctTotal;
  document.getElementById('minusStat').textContent = '-' + mistakesTotal;

  const total = Math.max(correctTotal + mistakesTotal, 1);
  document.getElementById('addBar').style.width = (correctTotal/total*100) + '%';
  document.getElementById('remBar').style.width = (mistakesTotal/total*100) + '%';
}

function handleKey(e){
  if (idx >= chars.length) return;

  if (e.key === 'Tab'){ e.preventDefault(); return; }

  if (e.key === 'Backspace'){
    e.preventDefault();
    if (idx > 0){
      idx--;
      states[idx] = 'untyped';
      render();
    }
    return;
  }

  let inputChar = null;
  if (e.key === 'Enter') inputChar = '\n';
  else if (e.key.length === 1) inputChar = e.key;
  else return;

  e.preventDefault();

  if (!startTime){
    startTime = Date.now();
    timerInterval = setInterval(() => updateStats(false), 200);
  }

  const expected = chars[idx];
  if (inputChar === expected){
    states[idx] = 'correct';
    correctTotal++;
  } else {
    states[idx] = 'incorrect';
    mistakesTotal++;
  }
  idx++;
  render();
  updateStats(false);

  if (idx >= chars.length){
    clearInterval(timerInterval);
    overlay.querySelector('span').textContent = 'done — press "Next Test" to continue';
    overlay.classList.remove('hide');
  }
}

hiddenInput.addEventListener('keydown', handleKey);
codeBox.addEventListener('click', () => hiddenInput.focus());
overlay.addEventListener('click', () => hiddenInput.focus());
hiddenInput.addEventListener('focus', () => {
  if (idx < chars.length) overlay.classList.add('hide');
});
hiddenInput.addEventListener('blur', () => {
  if (idx < chars.length){
    overlay.querySelector('span').textContent = 'click to focus, then start typing';
    overlay.classList.remove('hide');
  }
});

// Fallback: if focus ever slips (e.g. the click missed the box),
// catch the very next keypress anywhere on the page and route it in.
document.addEventListener('keydown', (e) => {
  if (document.activeElement !== hiddenInput){
    hiddenInput.focus();
    handleKey(e);
  }
});

// Auto-focus on load so typing works immediately, no click required.
window.addEventListener('load', () => hiddenInput.focus());

document.getElementById('restartBtn').addEventListener('click', () => {
  loadSnippet(current);
  hiddenInput.focus();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  loadSnippet(pickSnippet(current));
  hiddenInput.focus();
});

loadSnippet(pickSnippet());