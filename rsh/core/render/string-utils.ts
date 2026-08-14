// Regular expression for stripping ANSI escape codes
const ANSI_REGEX = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

export function stripAnsi(text: string): string {
  return text.replace(ANSI_REGEX, '');
}

export function visibleLength(text: string): number {
  return stripAnsi(text).length;
}

export function truncate(text: string, maxLength: number, suffix: string = '…'): string {
  const plain = stripAnsi(text);
  if (plain.length <= maxLength) return text;
  if (maxLength <= suffix.length) return suffix.slice(0, maxLength);

  // If text has ANSI escapes, truncate cleanly without leaving hanging open color codes
  const plainTruncated = plain.slice(0, maxLength - suffix.length) + suffix;
  return plainTruncated;
}

export function padEndVisible(text: string, targetLength: number, padChar: string = ' '): string {
  const currentLength = visibleLength(text);
  if (currentLength >= targetLength) return text;
  return text + padChar.repeat(targetLength - currentLength);
}

export function padStartVisible(text: string, targetLength: number, padChar: string = ' '): string {
  const currentLength = visibleLength(text);
  if (currentLength >= targetLength) return text;
  return padChar.repeat(targetLength - currentLength) + text;
}

export function centerVisible(text: string, targetLength: number, padChar: string = ' '): string {
  const currentLength = visibleLength(text);
  if (currentLength >= targetLength) return text;
  const totalPad = targetLength - currentLength;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;
  return padChar.repeat(leftPad) + text + padChar.repeat(rightPad);
}

export function wrapText(text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  const rawLines = text.split('\n');

  for (const rawLine of rawLines) {
    if (visibleLength(rawLine) <= maxWidth) {
      lines.push(rawLine);
      continue;
    }

    const words = rawLine.split(' ');
    let currentLine = '';

    for (const word of words) {
      if (!currentLine) {
        currentLine = word;
      } else if (visibleLength(currentLine + ' ' + word) <= maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }
  }

  return lines;
}
