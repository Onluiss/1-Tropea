"use strict";

export const cardScale = 0.2114; // stessa scala usata nel CSS

export const cardImages = [
  '1-c.png', '2-c.png', '3-c.png', '4-c.png', '5-c.png', '6-c.png', '7-c.png', '8-c.png', '9-c.png', '10-c.png',
  '1-o.png', '2-o.png', '3-o.png', '4-o.png', '5-o.png', '6-o.png', '7-o.png', '8-o.png', '9-o.png', '10-o.png',
  '1-s.png', '2-s.png', '3-s.png', '4-s.png', '5-s.png', '6-s.png', '7-s.png', '8-s.png', '9-s.png', '10-s.png',
  '1-m.png', '2-m.png', '3-m.png', '4-m.png', '5-m.png', '6-m.png', '7-m.png', '8-m.png', '9-m.png', '10-m.png'
];

export const cardValues = {
  '1-c.png': 10, '2-c.png': 1, '3-c.png': 9, '4-c.png': 2, '5-c.png': 3,
  '6-c.png': 4, '7-c.png': 5, '8-c.png': 6, '9-c.png': 7, '10-c.png': 8,
  '1-o.png': 10, '2-o.png': 1, '3-o.png': 9, '4-o.png': 2, '5-o.png': 3,
  '6-o.png': 4, '7-o.png': 5, '8-o.png': 6, '9-o.png': 7, '10-o.png': 8,
  '1-s.png': 10, '2-s.png': 1, '3-s.png': 9, '4-s.png': 2, '5-s.png': 3,
  '6-s.png': 4, '7-s.png': 5, '8-s.png': 6, '9-s.png': 7, '10-s.png': 8,
  '1-m.png': 10, '2-m.png': 1, '3-m.png': 9, '4-m.png': 2, '5-m.png': 3,
  '6-m.png': 4, '7-m.png': 5, '8-m.png': 6, '9-m.png': 7, '10-m.png': 8
};

export const emoticons = {
  ':)': '1f642', ':(': '1f641', ':D': '1f603', ':S': '1f615',
  'B)': '1f60e', ':P': '1f61b', ':p': '1f61b', ';)': '1f609',
  ':-)': '1f642', ':-(': '1f641', ':-D': '1f603', ':-S': '1f615',
  ':-P': '1f61b', ':-p': '1f61b', ':-O': '1f62e', ':-o': '1f62e',
  ':-*': '1f618', ':*': '1f618', ':|': '1f610', ':-|': '1f610',
  ':O': '1f62e', ':o': '1f62e', ':]': '1f604', ':[': '1f621',
  ':@': '1f620', ':X': '1f636', ':x': '1f636', ':-X': '1f636',
  ':-x': '1f636', ':Z': '1f634', ':z': '1f634', ':-Z': '1f634',
  ':-z': '1f634', ':$': '1f633', ':-$': '1f633', ';P': '1f61c',
  ';p': '1f61c', ':\\/': '1f615', ':-\\/': '1f615', ':\\\\': '1f615',
  ':-\\\\': '1f615', '>(': '1f621', '>:-(': '1f621', ':3': '1f60a',
  ':>': '1f60f', '>:D': '1f606', '>:-D': '1f606', '>:o': '1f62c',
  '>:-o': '1f62c', 'O:)': '1f607', 'O:-)': '1f607', 'o:)': '1f607',
  'o:-)': '1f607', ':C': '1f626', ':-C': '1f626', ':c': '1f626',
  ':-c': '1f626', 'X(': '1f623', 'X-(': '1f623', 'x(': '1f623',
  'x-(': '1f623', ':,': '1f622', 'D:': '1f62d', '8)': '1f60e',
  '8-)': '1f60e', 'B-)': '1f60e', 'B-D': '1f60e', 'BD': '1f60e', 
  ':L': '1f61f', ':-L': '1f61f', ':l': '1f61f', ':-l': '1f61f',
  'B-(': '1f61e', ':?': '1f615', ':-?': '1f615', ':B': '1f61b',
  ':b': '1f61b', ':^)': '1f60a', '<3': '2764', '</3': '1f494'
};

export const animationAudio = new Audio('/audio/Briscola_Giochi_STARS__17_.mp3');
export const audio = new Audio('/audio/Briscola_Giochi_STARS__11_.mp3');
export const cardPlayAudio = new Audio('/audio/Briscola_Giochi_STARS__6_.mp3');
export const cardWinAudio = new Audio('/audio/Briscola_Giochi_STARS__5_.mp3');
export const myTurnAudio = new Audio('/audio/Briscola_Giochi_STARS__14_.mp3');
export const countdownSound = new Audio('/audio/Briscola_Giochi_STARS__12_.mp3');
export const finalSound = new Audio('/audio/Briscola_Giochi_STARS__13_.mp3');
