"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { replaceEmoticons } from './replaceEmoticons.js';
import { state } from '../state.js';

export function sendMessage() {
  if (!isBrowser()) return;
  const txt = document.getElementById('text');
  if (!txt) return;
  let t = txt.innerHTML;
  t = replaceEmoticons(t);
  if (!t.trim()) return;
  const msg = { sender: state.userName, text: t, time: new Date().toLocaleTimeString() };
  try { state.ablyChannel.publish('message', msg); }
  catch { alert('Errore invio messaggio'); }
  txt.innerHTML = '';
}

if (typeof window !== 'undefined') {
  window.sendMessage = deps => sendMessage(deps);
}
