"use strict";

export function replaceEmoticons(text) {
    return text.replace(/:\)|:\(|:D|:S|B\)|:P|:p|;\)|:-\)|:-\(|:-D|:-S|:-P|:-p|:-O|:-o|:-\*|:\*|:\||:-\||:O|:o|:\]|:\[|:@|:X|:x|:-X|:-x|:Z|:z|:-Z|:-z|:\$|:-\$|;P|;p|:\/|:-\/|:\\|:-\\|>:\(|>:-\(|:3|:>|>:D|>:-D|>:o|>:-o|O:\)|O:-\)|o:\)|o:-\)|:C|:-C|:c|:-c|X\(|X-\(|x\(|x-\(|:,|D:|8\)|8-\)|B-\)|B\)|B-D|BD|:L|:-L|:l|:-l|B-\(|:\?|:-\?|:B|:b|:\^\)|<3|<\/3/g, match => {
        const emojiCode = state.emoticons[match];
        if (emojiCode) {
            return `<img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${emojiCode}.png" alt="emoji" class="emoji">`;
        }
        return match;
    });
}

// opzionale: esposizione globale sicura (se ti serve in HTML)
if (typeof window !== 'undefined') {
  window.replaceEmoticons = (text, opts = {}) => replaceEmoticons(text, opts);
}
