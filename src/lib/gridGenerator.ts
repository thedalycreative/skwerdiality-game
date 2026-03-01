import { DICTIONARY, MIN_WORD_LENGTH } from "./dictionary";

export interface GridCell {
  letter: string;
  row: number;
  col: number;
  id: string;
}

export interface GeneratedGrid {
  cells: GridCell[][];
  size: number;
  validWords: string[];
}

function areAdjacent(a: GridCell, b: GridCell): boolean {
  return (
    Math.abs(a.row - b.row) <= 1 &&
    Math.abs(a.col - b.col) <= 1 &&
    (a.row !== b.row || a.col !== b.col)
  );
}

// ─── Trie for fast prefix pruning ───

interface TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;
}

let _trie: TrieNode | null = null;

function getTrie(): TrieNode {
  if (!_trie) {
    const root: TrieNode = { children: new Map(), isWord: false };
    for (const word of DICTIONARY) {
      if (word.length > 8) continue;
      let node = root;
      for (const ch of word) {
        let child = node.children.get(ch);
        if (!child) {
          child = { children: new Map(), isWord: false };
          node.children.set(ch, child);
        }
        node = child;
      }
      node.isWord = true;
    }
    _trie = root;
  }
  return _trie;
}

// ─── Find valid words using trie-guided DFS ───

export function findAllValidWords(grid: GridCell[][], size: number): string[] {
  const trie = getTrie();
  const foundWords = new Set<string>();

  const nbrs: GridCell[][][] = [];
  for (let r = 0; r < size; r++) {
    nbrs[r] = [];
    for (let c = 0; c < size; c++) {
      const list: GridCell[] = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr,
            nc = c + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
            list.push(grid[nr][nc]);
          }
        }
      }
      nbrs[r][c] = list;
    }
  }

  const visited = new Uint8Array(size * size);
  const wordBuf: string[] = [];

  function dfs(row: number, col: number, node: TrieNode) {
    const ch = grid[row][col].letter.toLowerCase();
    const next = node.children.get(ch);
    if (!next) return;

    wordBuf.push(ch);

    if (wordBuf.length >= MIN_WORD_LENGTH && next.isWord) {
      foundWords.add(wordBuf.join(""));
    }

    if (next.children.size > 0 && wordBuf.length < 8) {
      for (const nb of nbrs[row][col]) {
        const nIdx = nb.row * size + nb.col;
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          dfs(nb.row, nb.col, next);
          visited[nIdx] = 0;
        }
      }
    }

    wordBuf.pop();
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      visited[r * size + c] = 1;
      dfs(r, c, trie);
      visited[r * size + c] = 0;
    }
  }

  return Array.from(foundWords).sort(
    (a, b) => b.length - a.length || a.localeCompare(b)
  );
}

// ─── Letter frequency weights ───

const LETTER_WEIGHTS: [string, number][] = [
  ["a", 12], ["b", 5], ["c", 5], ["d", 6], ["e", 14], ["f", 3],
  ["g", 5], ["h", 4], ["i", 10], ["j", 1], ["k", 4], ["l", 6],
  ["m", 5], ["n", 8], ["o", 10], ["p", 4], ["q", 1], ["r", 8],
  ["s", 8], ["t", 9], ["u", 6], ["v", 2], ["w", 3], ["x", 1],
  ["y", 4], ["z", 1],
];
const TOTAL_WEIGHT = LETTER_WEIGHTS.reduce((s, [, w]) => s + w, 0);

function weightedRandomLetter(): string {
  let rand = Math.random() * TOTAL_WEIGHT;
  for (const [letter, weight] of LETTER_WEIGHTS) {
    rand -= weight;
    if (rand <= 0) return letter;
  }
  return "e";
}

// ─── Seed letter sets (16 letters each) ───
// Each guarantees some obvious NSFW words + plenty of standard English

const SEED_SETS: string[][] = [
  ["d","i","c","k","n","u","b","o","h","m","p","l","s","t","e","a"],
  ["c","o","k","s","t","i","h","a","g","b","n","e","l","u","r","d"],
  ["a","n","l","s","u","t","b","o","e","d","i","c","k","h","m","p"],
  ["p","o","r","n","b","u","s","t","h","a","g","k","i","d","e","l"],
  ["b","o","w","a","n","k","h","u","m","p","r","i","d","e","s","l"],
  ["d","i","c","k","a","r","s","e","b","o","n","g","l","u","h","t"],
  ["n","u","d","e","p","o","r","k","s","h","a","g","b","l","t","i"],
  ["c","u","n","t","h","o","s","e","b","r","a","g","m","i","l","k"],
  ["t","i","s","b","o","n","e","r","s","h","a","g","d","u","l","k"],
  ["o","r","g","y","d","u","m","p","k","n","b","s","l","i","c","e"],
  ["c","o","k","n","u","d","e","s","h","a","g","t","r","i","p","l"],
  ["d","i","c","k","b","u","m","s","t","a","n","g","h","o","l","e"],
  ["s","l","u","t","b","o","n","e","h","a","r","k","d","i","m","p"],
  ["w","a","n","k","b","o","r","e","d","s","h","u","t","c","l","i"],
  ["k","n","o","b","r","u","d","e","s","h","a","f","t","g","l","i"],
];

// ─── Grid generation ───

export function generateGrid(size: number = 4): GeneratedGrid {
  const seedIdx = Math.floor(Math.random() * SEED_SETS.length);
  const letters = [...SEED_SETS[seedIdx]];

  // Shuffle letter placement
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  // Replace 1-2 letters for variety
  const replaceCount = 1 + Math.floor(Math.random() * 2);
  const indices = Array.from({ length: size * size }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, replaceCount);
  for (const idx of indices) {
    letters[idx] = weightedRandomLetter();
  }

  const cells: GridCell[][] = [];
  for (let r = 0; r < size; r++) {
    const row: GridCell[] = [];
    for (let c = 0; c < size; c++) {
      row.push({
        letter: letters[r * size + c].toUpperCase(),
        row: r,
        col: c,
        id: `${r}-${c}`,
      });
    }
    cells.push(row);
  }

  const validWords = findAllValidWords(cells, size);

  // If too sparse, fallback to pure shuffled seed
  if (validWords.length < 8) {
    const fb = [...SEED_SETS[seedIdx]];
    for (let i = fb.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fb[i], fb[j]] = [fb[j], fb[i]];
    }
    const fbCells: GridCell[][] = [];
    for (let r = 0; r < size; r++) {
      const row: GridCell[] = [];
      for (let c = 0; c < size; c++) {
        row.push({
          letter: fb[r * size + c].toUpperCase(),
          row: r,
          col: c,
          id: `${r}-${c}`,
        });
      }
      fbCells.push(row);
    }
    return { cells: fbCells, size, validWords: findAllValidWords(fbCells, size) };
  }

  return { cells, size, validWords };
}

// ─── Path validation ───

export function isValidPath(path: GridCell[]): boolean {
  for (let i = 1; i < path.length; i++) {
    if (!areAdjacent(path[i - 1], path[i])) return false;
  }
  const ids = path.map((c) => c.id);
  return new Set(ids).size === ids.length;
}

export function isValidWord(word: string): boolean {
  return word.length >= MIN_WORD_LENGTH && DICTIONARY.has(word.toLowerCase());
}
