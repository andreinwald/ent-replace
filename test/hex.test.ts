import {expect, test} from 'vitest'
import * as ent from '../src';

test('hex', function (t) {
    for (let i = 0; i < 32; i++) {
        let a = String.fromCharCode(i);
        if (a.match(/\s/)) {
            expect(ent.decode(a)).equal(a);
        } else {
            let b = '&#x' + i.toString(16) + ';';
            expect(ent.decode(b)).equal(a);
            expect(ent.encode(a)).equal('&#' + i + ';');
        }
    }

    for (let i = 127; i < 2000; i++) {
        let a = String.fromCharCode(i);
        let b = '&#x' + i.toString(16) + ';';
        let c = '&#X' + i.toString(16) + ';';

        expect(ent.decode(b)).equal(a);
        expect(ent.decode(c)).equal(a);

        let encoded = ent.encode(a);
        let encoded2 = ent.encode(a + a);
        if (!encoded.match(/^&\w+;/)) {
            expect(encoded).equal('&#' + i + ';');
            expect(encoded2).equal('&#' + i + ';&#' + i + ';');
        }
    }
});

