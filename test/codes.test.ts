import {expect, test} from 'vitest'
import * as ent from '../src';
import {ucs2encode} from "../src/ucs2";

test('amp', function (t) {
    var a = 'a & b & c';
    var b = 'a &#38; b &#38; c';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);
});

test('html', function (t) {
    var a = '<html> © π " \'';
    var b = '&#60;html&#62; &#169; &#960; &#34; &#39;';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);
});

test('html named', function (t) {
    var a = '<html> © π " \' ∴ Β β';
    var b = '&lt;html&gt; &copy; &pi; &quot; &apos; &therefore; &Beta; &beta;';
    expect(ent.encode(a, {named: true})).equal(b);
    expect(ent.decode(b)).equal(a);
});

test('ambiguous ampersands', function (t) {
    var a = '• &bullet';
    var b = '&bullet; &bullet';
    var c = '&bullet; &amp;bullet';
    expect(ent.encode(a, {named: true}), c);
    expect(ent.decode(b)).equal(a);
    expect(ent.decode(c)).equal(a);
});

test('entities', function (t) {
    var a = '\u2124';
    var b = '&#8484;';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);
});

test('entities named', function (t) {
    var a = '\u2124';
    var b = '&Zopf;';
    expect(ent.encode(a, {named: true})).equal(b);
    expect(ent.decode(b)).equal(a);
});

test('num', function (t) {
    var a = String.fromCharCode(1337);
    var b = '&#1337;';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);

    expect(ent.encode(a + a), b + b);
    expect(ent.decode(b + b), a + a);
});

test('astral num', function (t) {
    var a = ucs2encode([0x1d306]);
    var b = '&#119558;';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);

    expect(ent.encode(a + a), b + b);
    expect(ent.decode(b + b), a + a);
});

test('nested escapes', function (t) {
    var a = '&amp;';
    var b = '&#38;amp;';
    expect(ent.encode(a)).equal(b);
    expect(ent.decode(b)).equal(a);

    expect(ent.encode(a + a), b + b);
    expect(ent.decode(b + b), a + a);
});

test('encode `special` option', function (t) {
    var a = '<>\'"&';
    var b = '&lt;&gt;\'"&amp;';
    expect(ent.encode(a, {
        named: true,
        special: {
            '<': true,
            '>': true,
            '&': true
        }
    })).equal(b);
});
