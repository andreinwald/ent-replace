import {expect, test} from 'vitest'
import * as ent from '../src';

test('opts.numeric', function () {
    expect(ent.encode('a & b & c')).equal('a &#38; b &#38; c');
    expect(ent.encode('<html> © π " \'')).equal('&#60;html&#62; &#169; &#960; &#34; &#39;');
});
