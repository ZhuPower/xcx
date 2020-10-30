const md5 = require('./md5')

var host = '1717.ntryjd.net';
var domain = '1717.ntryjd.net';

function getJosn(time) {
    var token = lca(lcb(lcd(lco(md5(host + time + domain).toLowerCase()))));
    var keep = lca(lcb(lcd(lco(md5(domain + time).toLowerCase()))));

    return {
        token: token,
        keep: keep
    }
}

function lcl(x, y) {
    var a = (x & 0xFFFF) + (y & 0xFFFF);
    var b = (x >> 16) + (y >> 16) + (a >> 16);
    return (b << 16) | (a & 0xFFFF)
};

function lcc(a, b) {
    return (a << b) | (a >>> (32 - b))
};

function lca(t) {
    var a = "0123456789abcdef";
    var b = "";
    for (var i = 0; i < t.length * 4; i++) {
        b += a.charAt((t[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + a.charAt((t[i >> 2] >> ((i % 4) * 8)) & 0xF)
    };
    return b
};

function lco(t) {
    var a = lcb(1) + t;
    return a.replace(/[\-|\,]/g, '')
};

function lcd(t) {
    var a = ((t.length + 8) >> 6) + 1;
    var b = new Array(a * 16);
    for (var i = 0; i < a * 16; i++) b[i] = 0;
    for (var i = 0; i < t.length; i++) b[i >> 2] |= (t.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
    b[i >> 2] |= 0x80 << ((i % 4) * 8);
    b[a * 16 - 2] = t.length * 8;
    return b
}

function lcf(n1, n2, n3, n4, n5, n6, n7) {
    return lce(((n2 & n3) | (~n2 & n4)), n1, n2, n5, n6, n7);
};

function lcg(n1, n2, n3, n4, n5, n6, n7) {
    return lce(((n2 & n4) | (n3 & ~n4)), n1, n2, n5, n6, n7);
};

function lce(n1, n2, n3, n4, n5, n6) {
    return lcl(lcc(lcl(lcl(n2, n1), lcl(n4, n6)), n5), n3);
};

function lch(n1, n2, n3, n4, n5, n6, n7) {
    return lce(((n2 ^ n3) ^ n4), n1, n2, n5, n6, n7);
};

function lci(n1, n2, n3, n4, n5, n6, n7) {
    return lce((n3 ^ (n2 | ~n4)), n1, n2, n5, n6, n7);
};


function lcb(arr) {
    var num1 = 1732584193;
    var num2 = -271733879;
    var num3 = -1732584194;
    var num4 = 271733878;

    if (arr !== '1') {
        for (var y = 0; y < arr.length; y += 16) {
            var num_1 = num1;
            var num_2 = num2;
            var num_3 = num3;
            var num_4 = num4;
            num1 = lcf(num1, num2, num3, num4, arr[y + 0x0], 0x7, -0x28955b88);
            num4 = lcf(num4, num1, num2, num3, arr[y + 0x1], 0xc, -0x173848aa);
            num3 = lcf(num3, num4, num1, num2, arr[y + 0x2], 0x11, 0x242070db);
            num2 = lcf(num2, num3, num4, num1, arr[y + 0x3], 0x16, -0x3e423112);
            num1 = lcf(num1, num2, num3, num4, arr[y + 0x4], 0x7, -0xa83f051);
            num4 = lcf(num4, num1, num2, num3, arr[y + 0x5], 0xc, 0x4787c62a);
            num3 = lcf(num3, num4, num1, num2, arr[y + 0x6], 0x11, -0x57cfb9ed);
            num2 = lcf(num2, num3, num4, num1, arr[y + 0x7], 0x16, -0x2b96aff);
            num1 = lcf(num1, num2, num3, num4, arr[y + 0x8], 0x7, 0x698098d8);
            num4 = lcf(num4, num1, num2, num3, arr[y + 0x9], 0xc, -0x74bb0851);
            num3 = lcf(num3, num4, num1, num2, arr[y + 0xa], 0x11, -0xa44f);
            num2 = lcf(num2, num3, num4, num1, arr[y + 0xb], 0x16, -0x76a32842);
            num1 = lcf(num1, num2, num3, num4, arr[y + 0xc], 0x7, 0x6b901122);
            num4 = lcf(num4, num1, num2, num3, arr[y + 0xd], 0xc, -0x2678e6d);
            num3 = lcf(num3, num4, num1, num2, arr[y + 0xe], 0x11, -0x5986bc72);
            num2 = lcf(num2, num3, num4, num1, arr[y + 0xf], 0x16, 0x49b40821);
            num1 = lcg(num1, num2, num3, num4, arr[y + 0x1], 0x5, -0x9e1da9e);
            num4 = lcg(num4, num1, num2, num3, arr[y + 0x6], 0x9, -0x3fbf4cc0);
            num3 = lcg(num3, num4, num1, num2, arr[y + 0xb], 0xe, 0x265e5a51);
            num2 = lcg(num2, num3, num4, num1, arr[y + 0x0], 0x14, -0x16493856);
            num1 = lcg(num1, num2, num3, num4, arr[y + 0x5], 0x5, -0x29d0efa3);
            num4 = lcg(num4, num1, num2, num3, arr[y + 0xa], 0x9, 0x2441453);
            num3 = lcg(num3, num4, num1, num2, arr[y + 0xf], 0xe, -0x275e197f);
            num2 = lcg(num2, num3, num4, num1, arr[y + 0x4], 0x14, -0x182c0438);
            num1 = lcg(num1, num2, num3, num4, arr[y + 0x9], 0x5, 0x21e1cde6);
            num4 = lcg(num4, num1, num2, num3, arr[y + 0xe], 0x9, -0x3cc8f82a);
            num3 = lcg(num3, num4, num1, num2, arr[y + 0x3], 0xe, -0xb2af279);
            num2 = lcg(num2, num3, num4, num1, arr[y + 0x8], 0x14, 0x455a14ed);
            num1 = lcg(num1, num2, num3, num4, arr[y + 0xd], 0x5, -0x561c16fb);
            num4 = lcg(num4, num1, num2, num3, arr[y + 0x2], 0x9, -0x3105c08);
            num3 = lcg(num3, num4, num1, num2, arr[y + 0x7], 0xe, 0x676f02d9);
            num2 = lcg(num2, num3, num4, num1, arr[y + 0xc], 0x14, -0x72d5b376);
            num1 = lch(num1, num2, num3, num4, arr[y + 0x5], 0x4, -0x5c6be);
            num4 = lch(num4, num1, num2, num3, arr[y + 0x8], 0xb, -0x788e097f);
            num3 = lch(num3, num4, num1, num2, arr[y + 0xb], 0x10, 0x6d9d6122);
            num2 = lch(num2, num3, num4, num1, arr[y + 0xe], 0x17, -0x21ac7f4);
            num1 = lch(num1, num2, num3, num4, arr[y + 0x1], 0x4, -0x5b4115bc);
            num4 = lch(num4, num1, num2, num3, arr[y + 0x4], 0xb, 0x4bdecfa9);
            num3 = lch(num3, num4, num1, num2, arr[y + 0x7], 0x10, -0x944b4a0);
            num2 = lch(num2, num3, num4, num1, arr[y + 0xa], 0x17, -0x41404390);
            num1 = lch(num1, num2, num3, num4, arr[y + 0xd], 0x4, 0x289b7ec6);
            num4 = lch(num4, num1, num2, num3, arr[y + 0x0], 0xb, -0x155ed806);
            num3 = lch(num3, num4, num1, num2, arr[y + 0x3], 0x10, -0x2b10cf7b);
            num2 = lch(num2, num3, num4, num1, arr[y + 0x6], 0x17, 0x4881d05);
            num1 = lch(num1, num2, num3, num4, arr[y + 0x9], 0x4, -0x262b2fc7);
            num4 = lch(num4, num1, num2, num3, arr[y + 0xc], 0xb, -0x1924661b);
            num3 = lch(num3, num4, num1, num2, arr[y + 0xf], 0x10, 0x1fa27cf8);
            num2 = lch(num2, num3, num4, num1, arr[y + 0x2], 0x17, -0x3b53a99b);
            num1 = lci(num1, num2, num3, num4, arr[y + 0x0], 0x6, -0xbd6ddbc);
            num4 = lci(num4, num1, num2, num3, arr[y + 0x7], 0xa, 0x432aff97);
            num3 = lci(num3, num4, num1, num2, arr[y + 0xe], 0xf, -0x546bdc59);
            num2 = lci(num2, num3, num4, num1, arr[y + 0x5], 0x15, -0x36c5fc7);
            num1 = lci(num1, num2, num3, num4, arr[y + 0xc], 0x6, 0x655b59c3);
            num4 = lci(num4, num1, num2, num3, arr[y + 0x3], 0xa, -0x70f3336e);
            num3 = lci(num3, num4, num1, num2, arr[y + 0xa], 0xf, -0x100b83);
            num2 = lci(num2, num3, num4, num1, arr[y + 0x1], 0x15, -0x7a7ba22f);
            num1 = lci(num1, num2, num3, num4, arr[y + 0x8], 0x6, 0x6fa87e4f);
            num4 = lci(num4, num1, num2, num3, arr[y + 0xf], 0xa, -0x1d31920);
            num3 = lci(num3, num4, num1, num2, arr[y + 0x6], 0xf, -0x5cfebcec);
            num2 = lci(num2, num3, num4, num1, arr[y + 0xd], 0x15, 0x4e0811a1);
            num1 = lci(num1, num2, num3, num4, arr[y + 0x4], 0x6, -0x8ac817e);
            num4 = lci(num4, num1, num2, num3, arr[y + 0xb], 0xa, -0x42c50dcb);
            num3 = lci(num3, num4, num1, num2, arr[y + 0x2], 0xf, 0x2ad7d2bb);
            num2 = lci(num2, num3, num4, num1, arr[y + 0x9], 0x15, -0x14792c6f);
            num1 = lcl(num1, num_1);
            num2 = lcl(num2, num_2);
            num3 = lcl(num3, num_3);
            num4 = lcl(num4, num_4);

        }
        return [num1, num2, num3, num4];
    } else {
        return [num1, num4, num3, num2];
    }

}


module.exports = getJosn