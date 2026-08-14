export function levenshtein(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) return bn;
  if (bn === 0) return an;

  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    let row = (matrix[i] = new Array<number>(an + 1));
    row[0] = i;
  }

  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }

  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1 // deletion
          )
        );
      }
    }
  }

  return matrix[bn][an];
}

export function suggestCommand(input: string, knownCommands: string[]): string[] {
  const clean = input.toLowerCase().trim();
  const scored = knownCommands.map((cmd) => {
    const dist = levenshtein(clean, cmd);
    const isPrefix = cmd.startsWith(clean) || clean.startsWith(cmd);
    const isSubstring = cmd.includes(clean);
    return {
      cmd,
      score: isPrefix ? dist - 2 : isSubstring ? dist - 1 : dist,
    };
  });

  scored.sort((a, b) => a.score - b.score);
  return scored.filter((s) => s.score <= 3).map((s) => s.cmd).slice(0, 3);
}
