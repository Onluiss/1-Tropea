// /utils/publish.js
"use strict";

export function publish(channel, name, data = {}) {
  if (!channel) return;
  channel.publish(name, data);
}

if (typeof window !== 'undefined') {
  window.publish = publish;
}
