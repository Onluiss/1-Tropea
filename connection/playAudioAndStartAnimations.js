// connection/playAudioAndStartAnimations.js
"use strict";

import { state } from '../state.js';
import { connect } from './connect.js';
import { playAudio } from '../ui-utils/playAudio.js';
import { showDetailsAfterDelay } from '../ui-utils/showDetailsAfterDelay.js';
import { isBrowser } from '../utils/isBrowser.js';
import { setupTextInput } from '../chat/setupTextInput.js';
import { setupEmojiButton } from '../chat/setupEmojiButton.js';
import { loadEmojiPicker } from '../chat/loadEmojiPicker.js';
import { setupImageErrorHandlers } from '../chat/setupImageErrorHandlers.js';

export async function playAudioAndStartAnimations() {
  if (!isBrowser()) return null;

  // prevenzione doppio bootstrap
  const st = (window.state = window.state || state);
  if (!st._bootstrapped) st._bootstrapped = false;
  if (st._bootstrapped) return null;
  st._bootstrapped = true;

  await connect(); // deve essere safe senza DI

  const role = st.userRole || 'viewer';
  if ((role === 'creator' || role === 'player') && !st.gameStarted) {
    try { playAudio(st.audio, { reset: false }); } catch {}
  } else if (role !== 'creator' && role !== 'player') {
    try { playAudio(st.audio, { reset: false }); } catch {}
  }

  const delay = (role === 'viewer') ? 2000 : 1000;
  try { showDetailsAfterDelay(delay); } catch {}

  // setup componenti UI
  try { setupTextInput('#text', 500); } catch {}
  try { setupEmojiButton('#emoji-button'); } catch {}
  try { loadEmojiPicker('emoji-picker.html', '#emoji-picker-container'); } catch {}

  const fallback = st.cardBackUrl || '/carte-napoletane/asssss.png';
  try { setupImageErrorHandlers(fallback, 'Image Not Available'); } catch {}

  // teardown opzionale per reset flag bootstrap
  const teardown = () => { try { st._bootstrapped = false; } catch {} };
  return teardown;
}

if (typeof window !== 'undefined') {
  window.playAudioAndStartAnimations = playAudioAndStartAnimations;
}
