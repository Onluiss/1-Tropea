"use strict";

import { isBrowser } from '../utils/isBrowser.js';
import { getCallerTag } from '../callerTag.js';


export function updateArc(arcElement, fraction) {
  if (!isBrowser()) return;
  try { console.log(getCallerTag()); } catch {}
  // clamp [0,1]
  fraction = Math.max(0, Math.min(1, fraction));

  const r = 52;          // raggio
  const c = 60;          // centro

  arcElement.setAttribute('stroke', '#ff582d');
  arcElement.setAttribute('stroke-width', '0.5');

  /* cerchio pieno */
  if (fraction >= 0.999) {
    const eps = 0.01;
    arcElement.setAttribute(
      'd',
      `M ${c} ${c - r} A ${r} ${r} 0 1 1 ${c} ${c + r}
       A ${r} ${r} 0 1 1 ${c + eps} ${c - r} Z`
    );
    return;
  }

  const startAngle = -90;
  const endAngle   = startAngle + fraction * 360;
  const largeArc   = endAngle - startAngle > 180 ? 1 : 0;

  const toXY = ang => [
    c + r * Math.cos(ang * Math.PI / 180),
    c + r * Math.sin(ang * Math.PI / 180)
  ];

  const [sx, sy] = toXY(startAngle);
  const [ex, ey] = toXY(endAngle);

  arcElement.setAttribute(
    'd',
    `M ${c} ${c} L ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey} Z`
  );
}

if (typeof window !== 'undefined') {
    window.updateArc = updateArc;
}
