import * as fs from 'fs';
export function toOutput(filename: string, content: string) {
  fs.writeFileSync(`./test_output/${filename}`, content);
}
