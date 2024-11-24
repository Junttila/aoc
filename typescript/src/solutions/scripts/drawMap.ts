export function drawMap(canvas: string[][]) {
  return canvas.map(l => l.join('')).join('\n');
}
