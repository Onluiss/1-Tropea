// /utils/legacySub.js
"use strict";

const subsRegistry = new WeakMap();

export function legacySub(channel, name, cb) {
  if (!channel) return () => {};

  let byEvent = subsRegistry.get(channel);
  if (!byEvent) {
    byEvent = new Map();
    subsRegistry.set(channel, byEvent);
  }

  let cbs = byEvent.get(name);
  if (!cbs) {
    cbs = new Set();
    byEvent.set(name, cbs);
  }

  if (!cbs.has(cb)) {
    channel.subscribe(name, cb);
    cbs.add(cb);
  }

  return () => {
    if (cbs.has(cb)) {
      channel.unsubscribe(name, cb);
      cbs.delete(cb);
    }
  };
}

if (typeof window !== 'undefined') {
  window.legacySub = legacySub;
}
