// /utils/getTransformSet.js
"use strict";

export function getTransformSet(role, position, count) {
  const sets = {
    creator: {
      top: {
        3: [
          'translate(-150%, -45%) translate3d(427px, -25px, 0px) rotate(189.649deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(489.863px, -15px, 0px) rotate(173.631deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(555px, -25px, 0px) rotate(172.018deg) scale(0.2114)'
        ],
        2: [
          'translate(-150%, -45%) translate3d(460px, -25px, 0px) rotate(189deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(520px, -15px, 0px) rotate(175deg) scale(0.2114)'
        ],
        1: ['translate(-150%, -45%) translate3d(490px, -15px, 0px) rotate(179deg) scale(0.2114)']
      },
      bottom: {
        3: [
          'translate(-150%, -60%) translate3d(427px, 510px, 0px) rotate(-4.7deg) scale(0.2114)',
          'translate(-150%, -60%) translate3d(489px, 505px, 0px) rotate(0.26deg) scale(0.2114)',
          'translate(-150%, -60%) translate3d(555px, 510px, 0px) rotate(3.39deg) scale(0.2114)'
        ],
        2: [
          'translate(-140%, -60%) translate3d(427px, 510px, 0px) rotate(-1.7deg) scale(0.2114)',
          'translate(-140%, -60%) translate3d(489px, 505px, 0px) rotate(5.39deg) scale(0.2114)'
        ],
        1: ['translate(-150%, -60%) translate3d(489px, 505px, 0px) rotate(0.26deg) scale(0.2114)']
      }
    },
    player: {
      top: {
        3: [
          'translate(-150%, -45%) translate3d(427px, -25px, 0px) rotate(189.649deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(489.863px, -15px, 0px) rotate(173.631deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(555px, -25px, 0px) rotate(172.018deg) scale(0.2114)'
        ],
        2: [
          'translate(-150%, -45%) translate3d(460px, -25px, 0px) rotate(189deg) scale(0.2114)',
          'translate(-150%, -45%) translate3d(520px, -15px, 0px) rotate(175deg) scale(0.2114)'
        ],
        1: ['translate(-150%, -45%) translate3d(490px, -15px, 0px) rotate(179deg) scale(0.2114)']
      },
      bottom: {
        3: [
          'translate(-150%, -60%) translate3d(427px, 510px, 0px) rotate(-4.7deg) scale(0.2114)',
          'translate(-150%, -60%) translate3d(489px, 505px, 0px) rotate(0.26deg) scale(0.2114)',
          'translate(-150%, -60%) translate3d(555px, 510px, 0px) rotate(3.39deg) scale(0.2114)'
        ],
        2: [
          'translate(-140%, -60%) translate3d(427px, 510px, 0px) rotate(-1.7deg) scale(0.2114)',
          'translate(-140%, -60%) translate3d(489px, 505px, 0px) rotate(5.39deg) scale(0.2114)'
        ],
        1: ['translate(-150%, -60%) translate3d(489px, 505px, 0px) rotate(0.26deg) scale(0.2114)']
      }
    }
  };
  return sets[role]?.[position]?.[count] || [];
}

if (typeof window !== "undefined") {
  window.getTransformSet = getTransformSet;
}
