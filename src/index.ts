import {entities} from "./entities";
import {revEntities} from "./revEntities";
import {ucs2decode, ucs2encode} from "./ucs2";


export function decode(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }

    return str.replace(/&(#?[^;\W]+;?)/g, function (_, match) {
        let m;
        if (m = /^#(\d+);?$/.exec(match)) {
            return ucs2encode([parseInt(m[1], 10)]);
        } else if (m = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match)) {
            return ucs2encode([parseInt(m[1], 16)]);
        } else {
            // named entity
            let hasSemi = /;$/.test(match);
            let withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
            let target = entities[withoutSemi] || (hasSemi && entities[match]);

            if (typeof target === 'number') {
                return ucs2encode([target]);
            } else if (typeof target === 'string') {
                return target;
            } else {
                return '&' + match;
            }
        }
    });
}

export function encode(str, opts?) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }
    if (!opts) opts = {};

    let numeric = true;
    if (opts.named) numeric = false;
    if (opts.numeric !== undefined) numeric = opts.numeric;

    let special = opts.special || {
        '"': true, "'": true,
        '<': true, '>': true,
        '&': true
    };

    let codePoints = ucs2decode(str);
    let chars = [];
    for (let i = 0; i < codePoints.length; i++) {
        let cc = codePoints[i];
        let c = ucs2encode([cc]);
        let e = revEntities[cc];
        if (e && (cc >= 127 || special[c]) && !numeric) {
            chars.push('&' + (/;$/.test(e) ? e : e + ';'));
        } else if (cc < 32 || cc >= 127 || special[c]) {
            chars.push('&#' + cc + ';');
        } else {
            chars.push(c);
        }
    }
    return chars.join('');
}
