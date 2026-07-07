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
  },
  {
    repo: "spring-projects/spring-boot", lang: "Java", color: "#b07219", file: "Retryable.java",
    code: `public int retryCount(int attempts, int max) {\n    if (attempts >= max) {\n        return max;\n    }\n    return attempts + 1;\n}`
  },
  {
    repo: "JetBrains/kotlin", lang: "Kotlin", color: "#A97BFF", file: "Result.kt",
    code: `fun <T> safeCall(block: () -> T): T? {\n    return try {\n        block()\n    } catch (e: Exception) {\n        null\n    }\n}`
  },
  {
    repo: "apple/swift", lang: "Swift", color: "#F05138", file: "Clamp.swift",
    code: `func clamp<T: Comparable>(_ value: T, min lo: T, max hi: T) -> T {\n    return min(max(value, lo), hi)\n}`
  },
  {
    repo: "laravel/framework", lang: "PHP", color: "#4F5D95", file: "helpers.php",
    code: `function arrayGet($array, $key, $default = null) {\n    if (!isset($array[$key])) {\n        return $default;\n    }\n    return $array[$key];\n}`
  },
  {
    repo: "nlohmann/json", lang: "C++", color: "#f34b7d", file: "trim.cpp",
    code: `std::string trim(const std::string& s) {\n    size_t start = s.find_first_not_of(" \\t\\n");\n    size_t end = s.find_last_not_of(" \\t\\n");\n    return s.substr(start, end - start + 1);\n}`
  },
  {
    repo: "ohmyzsh/ohmyzsh", lang: "Shell", color: "#89e051", file: "has_cmd.sh",
    code: `has_cmd() {\n  command -v "$1" >/dev/null 2>&1\n}\n\nif has_cmd git; then\n  echo "git found"\nfi`
  },
  {
    repo: "elixir-lang/elixir", lang: "Elixir", color: "#6e4a7e", file: "chunker.ex",
    code: `def chunk_every(list, size) do\n  list\n  |> Enum.chunk_every(size)\n  |> Enum.reject(&(&1 == []))\nend`
  },
  {
    repo: "ghc/ghc", lang: "Haskell", color: "#5e5086", file: "Fib.hs",
    code: `fib :: Int -> Integer\nfib n = fibs !! n\n  where fibs = 0 : 1 : zipWith (+) fibs (tail fibs)`
  },
  {
    repo: "lua/lua", lang: "Lua", color: "#000080", file: "class.lua",
    code: `function Class(base)\n  local c = {}\n  c.__index = c\n  setmetatable(c, { __index = base })\n  return c\nend`
  },
  {
    repo: "dotnet/runtime", lang: "C#", color: "#178600", file: "Retry.cs",
    code: `public static T Retry<T>(Func<T> action, int attempts) {\n    for (int i = 0; i < attempts; i++) {\n        try { return action(); }\n        catch when (i < attempts - 1) { }\n    }\n    throw new Exception("failed");\n}`
  },
  {
    repo: "dart-lang/sdk", lang: "Dart", color: "#00B4AB", file: "debounce.dart",
    code: `Timer? _timer;\nvoid debounce(Duration d, void Function() fn) {\n  _timer?.cancel();\n  _timer = Timer(d, fn);\n}`
  },
  {
    repo: "scala/scala", lang: "Scala", color: "#c22d40", file: "Tree.scala",
    code: `sealed trait Tree\ncase object Leaf extends Tree\ncase class Node(l: Tree, v: Int, r: Tree) extends Tree`
  },
  {
    repo: "postgres/postgres", lang: "SQL", color: "#e38c00", file: "top_users.sql",
    code: `SELECT user_id, COUNT(*) AS orders\nFROM orders\nWHERE created_at > NOW() - INTERVAL '30 days'\nGROUP BY user_id\nORDER BY orders DESC\nLIMIT 10;`
  },
  {
    repo: "expressjs/express", lang: "JavaScript", color: "#f1e05a", file: "logger.js",
    code: `function logger(req, res, next) {\n  const start = Date.now();\n  res.on('finish', () => {\n    console.log(\`\${req.method} \${req.url} \${Date.now() - start}ms\`);\n  });\n  next();\n}`
  },
  {
    repo: "django/django", lang: "Python", color: "#3572A5", file: "middleware.py",
    code: `class TimingMiddleware:\n    def __init__(self, get_response):\n        self.get_response = get_response\n\n    def __call__(self, request):\n        response = self.get_response(request)\n        return response`
  },
  {
    repo: "redis/redis", lang: "C", color: "#555555", file: "bitcount.c",
    code: `int popcount(unsigned int x) {\n    int count = 0;\n    while (x) {\n        count += x & 1;\n        x >>= 1;\n    }\n    return count;\n}`
  },
  {
    repo: "tokio-rs/tokio", lang: "Rust", color: "#dea584", file: "channel.rs",
    code: `async fn producer(tx: Sender<i32>) {\n    for i in 0..10 {\n        tx.send(i).await.unwrap();\n    }\n}`
  },
  {
    repo: "kubernetes/kubernetes", lang: "Go", color: "#00ADD8", file: "labels.go",
    code: `func MatchesLabels(pod map[string]string, selector map[string]string) bool {\n    for k, v := range selector {\n        if pod[k] != v {\n            return false\n        }\n    }\n    return true\n}`
  },
  {
    repo: "sveltejs/svelte", lang: "TypeScript", color: "#3178c6", file: "store.ts",
    code: `function writable<T>(initial: T) {\n  let value = initial;\n  const subs = new Set<(v: T) => void>();\n  return {\n    set: (v: T) => { value = v; subs.forEach(fn => fn(v)); }\n  };\n}`
  },
  {
    repo: "discourse/discourse", lang: "Ruby", color: "#701516", file: "topics.rb",
    code: `def hot_topics(limit = 5)\n  Topic.where(closed: false)\n       .order(views: :desc)\n       .limit(limit)\nend`
  },
  {
    repo: "tailwindlabs/tailwindcss", lang: "CSS", color: "#563d7c", file: "truncate.css",
    code: `.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}`
  },
  {
    repo: "apache/kafka", lang: "Java", color: "#b07219", file: "Partitioner.java",
    code: `public int partition(String key, int numPartitions) {\n    if (key == null) {\n        return 0;\n    }\n    return Math.abs(key.hashCode()) % numPartitions;\n}`
  },
  {
    repo: "square/okhttp", lang: "Kotlin", color: "#A97BFF", file: "Cache.kt",
    code: `class LruCache<K, V>(private val maxSize: Int) {\n    private val map = LinkedHashMap<K, V>()\n    fun get(key: K): V? = map[key]\n}`
  },
  {
    repo: "vapor/vapor", lang: "Swift", color: "#F05138", file: "Middleware.swift",
    code: `struct TimingMiddleware: Middleware {\n    func respond(to req: Request, chainingTo next: Responder) -> EventLoopFuture<Response> {\n        let start = Date()\n        return next.respond(to: req)\n    }\n}`
  },
  {
    repo: "symfony/symfony", lang: "PHP", color: "#4F5D95", file: "Container.php",
    code: `class Container {\n    private array $services = [];\n\n    public function set(string $id, callable $factory): void {\n        $this->services[$id] = $factory;\n    }\n}`
  },
  {
    repo: "opencv/opencv", lang: "C++", color: "#f34b7d", file: "clamp.cpp",
    code: `template <typename T>\nT clamp(T value, T lo, T hi) {\n    return (value < lo) ? lo : (hi < value) ? hi : value;\n}`
  },
  {
    repo: "phoenixframework/phoenix", lang: "Elixir", color: "#6e4a7e", file: "socket.ex",
    code: `def handle_in("ping", _payload, socket) do\n  {:reply, {:ok, %{message: "pong"}}, socket}\nend`
  },
  {
    repo: "apache/spark", lang: "Scala", color: "#c22d40", file: "WordCount.scala",
    code: `val counts = textFile\n  .flatMap(line => line.split(" "))\n  .map(word => (word, 1))\n  .reduceByKey(_ + _)`
  },
  {
    repo: "flutter/flutter", lang: "Dart", color: "#00B4AB", file: "counter.dart",
    code: `class Counter extends ChangeNotifier {\n  int _count = 0;\n  int get count => _count;\n\n  void increment() {\n    _count++;\n    notifyListeners();\n  }\n}`
  },
  {
    repo: "aspnet/AspNetCore", lang: "C#", color: "#178600", file: "Extensions.cs",
    code: `public static class StringExtensions {\n    public static bool IsNullOrBlank(this string? s) {\n        return string.IsNullOrWhiteSpace(s);\n    }\n}`
  },
  {
    repo: "hashicorp/terraform", lang: "Go", color: "#00ADD8", file: "retry.go",
    code: `func RetryContext(ctx context.Context, fn func() error) error {\n    for {\n        err := fn()\n        if err == nil {\n            return nil\n        }\n        select {\n        case <-ctx.Done():\n            return ctx.Err()\n        default:\n        }\n    }\n}`
  },
  {
    repo: "numpy/numpy", lang: "Python", color: "#3572A5", file: "normalize.py",
    code: `def normalize(vec):\n    norm = sum(x * x for x in vec) ** 0.5\n    if norm == 0:\n        return vec\n    return [x / norm for x in vec]`
  },
  {
    repo: "moby/moby", lang: "Go", color: "#00ADD8", file: "container.go",
    code: `func IsRunning(state string) bool {\n    switch state {\n    case "running", "restarting":\n        return true\n    default:\n        return false\n    }\n}`
  }
];

let current, chars, states, idx, startTime, mistakesTotal, correctTotal, timerInterval, tabHeld = false;

const codeText = document.getElementById('codeText');
const lineNumbers = document.getElementById('lineNumbers');
const overlay = document.getElementById('overlay');
const hiddenInput = document.getElementById('hiddenInput');
const codeBox = document.getElementById('codeBox');
const cursorEl = document.getElementById('cursorEl');

let recentHistory = [];

function pickLocalSnippet(avoid){
  // Avoid repeating anything from the last several picks (up to half the library).
  const historyLimit = Math.max(1, Math.floor(SNIPPETS.length / 2));
  let pool = SNIPPETS.filter(s => !recentHistory.includes(s));
  if (pool.length === 0) pool = SNIPPETS.filter(s => s !== avoid);

  const pick = pool[Math.floor(Math.random() * pool.length)];

  recentHistory.push(pick);
  if (recentHistory.length > historyLimit) recentHistory.shift();

  return { ...pick, live: false };
}

// --- Live GitHub sourcing ---------------------------------------------
// Real files in real public repos. We fetch the whole file via GitHub's
// Contents API (CORS-enabled, no auth needed for public repos) then slice
// a random reasonable-looking chunk of consecutive lines out of it.
const SOURCES = [
  { owner: "torvalds", repo: "linux", path: "kernel/fork.c" },
  { owner: "python", repo: "cpython", path: "Lib/random.py" },
  { owner: "rust-lang", repo: "rust", path: "library/alloc/src/vec/mod.rs" },
  { owner: "golang", repo: "go", path: "src/strings/strings.go" },
  { owner: "facebook", repo: "react", path: "packages/shared/shallowEqual.js" },
  { owner: "microsoft", repo: "TypeScript", path: "src/compiler/core.ts" },
  { owner: "rails", repo: "rails", path: "activesupport/lib/active_support/core_ext/string/inflections.rb" },
  { owner: "twbs", repo: "bootstrap", path: "scss/mixins/_grid.scss" },
  { owner: "redis", repo: "redis", path: "src/sds.c" },
  { owner: "nodejs", repo: "node", path: "lib/events.js" },
  { owner: "django", repo: "django", path: "django/utils/text.py" },
  { owner: "laravel", repo: "framework", path: "src/Illuminate/Support/Str.php" },
  { owner: "kubernetes", repo: "kubernetes", path: "pkg/util/wait/wait.go" },
  { owner: "expressjs", repo: "express", path: "lib/utils.js" },
  { owner: "vuejs", repo: "core", path: "packages/reactivity/src/effect.ts" },
  { owner: "elixir-lang", repo: "elixir", path: "lib/elixir/lib/enum.ex" },
  { owner: "JuliaLang", repo: "julia", path: "base/math.jl" },
  { owner: "google", repo: "guava", path: "guava/src/com/google/common/base/Strings.java" }
];

const LANG_MAP = {
  c:{lang:'C',color:'#555555'}, h:{lang:'C',color:'#555555'},
  py:{lang:'Python',color:'#3572A5'},
  rs:{lang:'Rust',color:'#dea584'},
  go:{lang:'Go',color:'#00ADD8'},
  js:{lang:'JavaScript',color:'#f1e05a'},
  ts:{lang:'TypeScript',color:'#3178c6'},
  rb:{lang:'Ruby',color:'#701516'},
  scss:{lang:'SCSS',color:'#c6538c'}, css:{lang:'CSS',color:'#563d7c'},
  php:{lang:'PHP',color:'#4F5D95'},
  java:{lang:'Java',color:'#b07219'},
  jl:{lang:'Julia',color:'#a270ba'},
  ex:{lang:'Elixir',color:'#6e4a7e'}, exs:{lang:'Elixir',color:'#6e4a7e'},
  cpp:{lang:'C++',color:'#f34b7d'}, cc:{lang:'C++',color:'#f34b7d'}
};

function detectLang(path){
  const ext = path.split('.').pop().toLowerCase();
  return LANG_MAP[ext] || { lang: 'Code', color: '#8b949e' };
}

// atob() alone mangles multi-byte UTF-8; this decodes it properly.
function b64DecodeUnicode(str){
  return decodeURIComponent(
    Array.prototype.map.call(atob(str), c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

// Single-line comment markers across the languages we pull from:
// // (C-family/JS/Go/Rust/Java/Kotlin/Swift/PHP/TS), # (Python/Ruby/Shell/Elixir),
// -- (SQL/Lua/Haskell), <!-- (HTML/XML-ish).
const LINE_COMMENT_START = /^\s*(\/\/|#(?!!)|--|<!--|-->)/;

// Scans every line in the file ONCE and returns a boolean array the same
// length as `lines`, where true means "this entire line is comment, no
// real code on it." This tracks block-comment state (/* ... */) across
// line boundaries, so continuation lines that don't start with `*` (a
// common style) still get correctly recognized as comment lines.
function computeCommentFlags(lines){
  const flags = [];
  let inBlock = false;

  for (let raw of lines){
    let line = raw;
    let fullyComment = false;

    if (inBlock){
      const closeIdx = line.indexOf('*/');
      if (closeIdx === -1){
        fullyComment = true; // still inside the block comment
      } else {
        inBlock = false;
        const after = line.slice(closeIdx + 2);
        fullyComment = after.trim() === '';
        line = after; // only re-scan what's left, in case another comment opens on the same line
      }
    }

    if (!inBlock && !fullyComment){
      if (LINE_COMMENT_START.test(line) && line.trim() !== ''){
        fullyComment = true;
      } else {
        const openIdx = line.indexOf('/*');
        if (openIdx !== -1){
          const before = line.slice(0, openIdx).trim();
          const closeIdx = line.indexOf('*/', openIdx + 2);
          if (closeIdx === -1){
            inBlock = true;
            fullyComment = before === '';
          } else {
            const after = line.slice(closeIdx + 2).trim();
            fullyComment = before === '' && after === '';
          }
        }
      }
    }

    flags.push(fullyComment);
  }

  return flags;
}

// Grabs a random 4-9 line window that looks like real code (not a blank
// gap, a license header, or mostly comments), retrying a handful of times
// before giving up and just taking the first solid non-comment chunk it
// can find.
function extractSnippetFromText(text){
  const lines = text.split('\n');
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  const flags = computeCommentFlags(lines);

  for (let attempt = 0; attempt < 20; attempt++){
    const len = 4 + Math.floor(Math.random() * 6);
    if (lines.length <= len) break;
    let start = Math.floor(Math.random() * (lines.length - len));
    let end = start + len;

    // Trim leading/trailing blank or comment-only lines off this window.
    while (start < end && (lines[start].trim() === '' || flags[start])) start++;
    while (end > start && (lines[end - 1].trim() === '' || flags[end - 1])) end--;
    if (end - start < 3) continue;

    const slice = lines.slice(start, end);
    const sliceFlags = flags.slice(start, end);
    const joined = slice.join('\n');
    const nonBlank = slice.filter(l => l.trim() !== '').length;
    const commentOnlyCount = sliceFlags.filter(Boolean).length;
    const tooLong = slice.some(l => l.length > 90);
    const looksLikeLicense = /copyright|license|permission is hereby/i.test(joined);

    // Require: mostly non-blank, comment-only lines are at most 1 in 5,
    // reasonable line length, and not a license header.
    if (
      nonBlank >= Math.ceil(slice.length * 0.6) &&
      commentOnlyCount <= Math.floor(slice.length * 0.2) &&
      !tooLong &&
      !looksLikeLicense &&
      joined.trim().length > 20
    ){
      return { code: joined, startLine: start + 1 };
    }
  }

  // Fallback: walk forward until we land on a real code line, then grab
  // a run of lines, skipping (not including) any comment-only ones.
  let start = 0;
  while (start < lines.length && (lines[start].trim() === '' || flags[start])) start++;

  const collected = [];
  let i = start;
  while (i < lines.length && collected.length < 7){
    if (!flags[i]) collected.push(lines[i]);
    i++;
  }
  if (collected.length === 0) collected.push(lines[start] || '// (empty file)');

  return { code: collected.join('\n'), startLine: start + 1 };
}

async function fetchLiveSnippet(){
  const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const url = `https://api.github.com/repos/${src.owner}/${src.repo}/contents/${src.path}`;
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github.v3+json' } });
  if (!res.ok) throw new Error('GitHub fetch failed: ' + res.status);

  const json = await res.json();
  if (json.encoding !== 'base64' || !json.content) throw new Error('Unexpected response shape');

  const text = b64DecodeUnicode(json.content.replace(/\n/g, ''));
  const { code, startLine } = extractSnippetFromText(text);
  const meta = detectLang(src.path);

  return {
    repo: `${src.owner}/${src.repo}`,
    lang: meta.lang,
    color: meta.color,
    file: src.path.split('/').pop(),
    code,
    startLine,
    live: true
  };
}

function withTimeout(promise, ms){
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
  ]);
}

let isLoading = false;

// Fixed: this is the single source of truth for "give me a snippet".
// IMPORTANT: it loads a LOCAL snippet immediately and synchronously —
// the code box is never left blank/frozen waiting on the network.
// It then tries a live GitHub fetch in the background and swaps to it
// ONLY if the user hasn't started typing yet. If GitHub is blocked,
// rate-limited, slow, or unreachable (common on file:// pages, locked-down
// networks, or ad-blockers), the local snippet just stays — no crash,
// no empty box.
async function nextSnippet(){
  if (isLoading) return;
  isLoading = true;
  document.getElementById('nextBtn').disabled = true;

  // Show something typeable right away, no network dependency.
  loadSnippet(pickLocalSnippet(current));

  // Best-effort upgrade to a real live GitHub snippet.
  try {
    const liveSnippet = await withTimeout(fetchLiveSnippet(), 6000);
    if (idx === 0 && !startTime){
      loadSnippet(liveSnippet);
    }
  } catch (err) {
    console.warn('Live snippet fetch skipped/failed, staying on local snippet:', err);
  }

  document.getElementById('nextBtn').disabled = false;
  isLoading = false;
  hiddenInput.focus();
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
    html += `<span class="char-${states[i]}">${escaped}</span>`;
  }
  codeText.innerHTML = html;
  positionCursor();
}

// Moves the single persistent cursor element to sit at the current index.
// Because it's the same DOM node every time (not recreated), the CSS
// transition on transform makes it glide between letters instead of
// teleporting.
function positionCursor(){
  if (!chars.length) return;
  const atEnd = idx >= chars.length;
  const targetSpan = atEnd ? codeText.children[chars.length - 1] : codeText.children[idx];
  if (!targetSpan) return;

  const spanRect = targetSpan.getBoundingClientRect();
  const boxRect = codeBox.getBoundingClientRect();
  let left = spanRect.left - boxRect.left;
  const top = spanRect.top - boxRect.top;
  if (atEnd) left += spanRect.width;

  cursorEl.style.transform = `translate(${left}px, ${top}px)`;
  cursorEl.style.height = spanRect.height + 'px';
  cursorEl.classList.toggle('hide', atEnd);
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

function resumeAfterEdit(){
  if (idx < chars.length){
    overlay.classList.add('hide');
    if (startTime){
      clearInterval(timerInterval);
      timerInterval = setInterval(() => updateStats(false), 200);
    }
  }
}

function handleKey(e){
  // --- Tab + Enter: load a new snippet (matches the on-screen hint) ---
  if (e.key === 'Tab'){
    e.preventDefault();
    tabHeld = true;
    return;
  }
  if (e.key === 'Enter' && tabHeld){
    e.preventDefault();
    nextSnippet();
    return;
  }

  // --- Backspace, including VS Code's Ctrl/Cmd/Option+Backspace (delete word) ---
  if (e.key === 'Backspace'){
    e.preventDefault();
    if (idx === 0) return;

    if (e.ctrlKey || e.metaKey || e.altKey){
      let newIdx = idx;
      while (newIdx > 0 && /\s/.test(chars[newIdx - 1])) newIdx--;
      while (newIdx > 0 && /\w/.test(chars[newIdx - 1])) newIdx--;
      for (let i = newIdx; i < idx; i++) states[i] = 'untyped';
      idx = newIdx;
    } else {
      idx--;
      states[idx] = 'untyped';
    }

    resumeAfterEdit();
    render();
    return;
  }

  if (idx >= chars.length) return;

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
hiddenInput.addEventListener('keyup', (e) => {
  if (e.key === 'Tab') tabHeld = false;
});
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
window.addEventListener('resize', () => positionCursor());

document.getElementById('restartBtn').addEventListener('click', () => {
  loadSnippet(current);
  hiddenInput.focus();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  nextSnippet();
});

// Initial load — kick off with a snippet fetch (falls back to local list
// automatically if GitHub is unreachable or slow).
nextSnippet();