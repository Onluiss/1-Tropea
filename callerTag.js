"use strict";

// callerTag.js
//export function getCallerTag() {
//  const frames = (new Error()).stack?.split('\n') ?? [];

//  for (let i = 3; i < frames.length; i++) {
//    /* esempio di frame V8:
//       "    at enableTurnReady (hand.js:123:45)"            */
//    const line = frames[i].trim();

//    /* salta anonimi */
//    if (line.includes('<anonymous>')) continue;

//    /* 1. prendi il nome funzione (può mancare) */
//    const fnMatch   = line.match(/\s*at\s+([^\s(]+)/);
//    const fnNameRaw = fnMatch ? fnMatch[1] : '';
//
//    /* 2. prendi il path file:line:col dentro le parentesi */
//    const fileMatch = line.match(/\(([^)]+)\)/) || line.match(/at\s+([^\s]+)$/);
//    if (!fileMatch) continue;

//    /* estrai solo il basename del file */
//    const filePath = fileMatch[1];
//    const fileName = filePath.split(/[\\/]/).pop().split(':')[0];

    /* costruisci etichetta finale */
//    const fnName = fnNameRaw ? fnNameRaw.split('.').pop() : '<anon>';
//    return `${fnName} → in ${fileName}`;
//  }

//  return '<sconosciuto>';
//}

// colori/attribute
// const RED_BOLD = '\x1b[1m\x1b[31m';
// onst BLUE_BOLD = '\x1b[1m\x1b[34m';
// const RESET    = '\x1b[0m';

// export function getCallerTag() {
//   const frames = (new Error()).stack?.split('\n') ?? [];

//   const chain = [];

//   for (let i = 3; i < frames.length; i++) {
//     const line = frames[i].trim();
//     if (line.includes('<anonymous>')) break;  // fermati appena esci dal codice utente

    /* 1. nome funzione (se presente) */
//     const fnMatch = line.match(/\s*at\s+([^\s(]+)/);
//     const fnName  = (fnMatch ? fnMatch[1] : '<anon>').split('.').pop();

    /* 2. path completo file:line:col */
//     const pathMatch = line.match(/\(([^)]+)\)/) || line.match(/at\s+([^\s]+)$/);
//     if (!pathMatch) continue;

//     const tail           = pathMatch[1].split(/[\\/]/).pop();   // es. "connection.js:336:27"
//     const [file, lineNo] = tail.split(':');                     // separa "connection.js"  e  "336"

//     const isAbly = tail.includes('ably');
//     const color = isAbly ? BLUE_BOLD : RED_BOLD;
//     chain.push(`${color}${fnName}${RESET} (${file}:${lineNo})`);
//   }

//   return chain.length
//   ? '\n' + chain.reverse().map(f => `→ ${f}`).join('\n') // ogni frame su riga nuova
//   : '<sconosciuto>';
// }

// callerTag.js
export function getCallerTag() {
  const stack  = (new Error()).stack || '';
  const frames = stack.split('\n');
  if (frames.length < 4) return '<sconosciuto>';

  function parseFrame(frame) {
    const line = frame.trim();
    if (line.includes('<anonymous>')) return null;
    const fnMatch   = line.match(/\s*at\s+([^\s(]+)/);
    const fnName    = fnMatch ? fnMatch[1].split('.').pop() : '<anon>';
    const pathMatch = line.match(/\(([^)]+)\)/) || line.match(/at\s+([^\s]+)$/);
    if (!pathMatch) return null;
    const tail         = pathMatch[1].split(/[\\/]/).pop();  // "file.js:23:5"
    const [file, ln]   = tail.split(':');
    return { fnName, file, lineNo: ln };
  }

  const currFrame   = parseFrame(frames[2]); // dove hai messo il log
  const callerFrame = parseFrame(frames[3]); // chi ti ha chiamato
  if (!currFrame || !callerFrame) return '<sconosciuto>';

  const fnCurr       = currFrame.fnName;
  const fnCaller     = callerFrame.fnName;
  const callerFile   = callerFrame.file;
  const callerLineNo = callerFrame.lineNo;

  // fnCurr bold blue, fnCaller bold green, callerFile:callerLine bold light-red
  return (
    `\x1b[1;34m${fnCurr}\x1b[0m ← chiamata da ` +
    `\x1b[1;32m${fnCaller}\x1b[0m ← in ` +
    `\x1b[1;91m${callerFile}:${callerLineNo}\x1b[0m`
  );
}
