"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = void 0;
const entities = require('./entities.json');
const revEntities = require('./reversed.json');
const ucs2_1 = require("./ucs2");
function decode(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }
    return str.replace(/&(#?[^;\W]+;?)/g, function (_, match) {
        let m;
        if (m = /^#(\d+);?$/.exec(match)) {
            return (0, ucs2_1.ucs2encode)([parseInt(m[1], 10)]);
        }
        else if (m = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match)) {
            return (0, ucs2_1.ucs2encode)([parseInt(m[1], 16)]);
        }
        else {
            // named entity
            let hasSemi = /;$/.test(match);
            let withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
            let target = entities[withoutSemi] || (hasSemi && entities[match]);
            if (typeof target === 'number') {
                return (0, ucs2_1.ucs2encode)([target]);
            }
            else if (typeof target === 'string') {
                return target;
            }
            else {
                return '&' + match;
            }
        }
    });
}
exports.decode = decode;
function encode(str, opts) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a String');
    }
    if (!opts)
        opts = {};
    let numeric = true;
    if (opts.named)
        numeric = false;
    if (opts.numeric !== undefined)
        numeric = opts.numeric;
    let special = opts.special || {
        '"': true, "'": true,
        '<': true, '>': true,
        '&': true
    };
    let codePoints = (0, ucs2_1.ucs2decode)(str);
    let chars = [];
    for (let i = 0; i < codePoints.length; i++) {
        let cc = codePoints[i];
        let c = (0, ucs2_1.ucs2encode)([cc]);
        let e = revEntities[cc];
        if (e && (cc >= 127 || special[c]) && !numeric) {
            chars.push('&' + (/;$/.test(e) ? e : e + ';'));
        }
        else if (cc < 32 || cc >= 127 || special[c]) {
            chars.push('&#' + cc + ';');
        }
        else {
            chars.push(c);
        }
    }
    return chars.join('');
}
exports.encode = encode;
