// javascript 中 正则表达式 的基础知识



// 表达式
const expression = / pattern / flags;

// 正则表达式匹配模式支持的标志
// 1. g，表示全局匹配，在匹配到一个子字符串后继续匹配剩余字符串
// 2. i，表示忽略大小写
// 3. m，表示多行匹配，每一行都会匹配
const regexp = /^aa./mg;
regexp.exec(`aaa\naab`); // ["aaa", index: 0, input: "aaa↵aab", groups: undefined]
regexp.exec(`aaa\naab`); // ["aab", index: 4, input: "aaa↵aab", groups: undefined]
regexp.exec(`aaa\naab`); // null



// RegExp 类型
// 1. 字面量
const regexp = /aaa/g;

// 2. 构造函数
const regexp = new RegExp('aaa', 'g');

// 构造函数的匹配模式需要进行双重转义
const regexp = /\.js/;
const regexp = new RegExp('\\.js');



// RegExp 实例属性
const regexp = /aaa/gim;

regexp.global; // 是否设置了 全局匹配 标志，true
regexp.ignoreCase; // 是否设置了 忽略大小写 标志，true
regexp.multiline; // 是否设置了 多行匹配 标志，true
regexp.lastIndex; // 从源字符串的哪个位置开始匹配，默认为0
regexp.source; // 字面量正则表达式中的模式部分，/aaa/



// Regexp 实例方法


// exec 专门为捕获组而设计的
// 可以匹配字符串 ? resultArray : null
const matches = /(hello) (world)/.exec('This is a hello world!');
matches.input; // 正则表达式要匹配的源字符串，This is a hello world!
matches.index; // 匹配的子字符串在源字符串中的位置，This is a hello world!
matches[0]; // 匹配数组中第一项是与整个正则匹配的子字符串，hello world
matches[1]; // 匹配数组中剩余项是和正则表达式中捕获组匹配的子字符串，hello
matches[2]; // 匹配数组中剩余项是和正则表达式中捕获组匹配的子字符串，world

// 查找源字符串中，所有可以匹配正则表达式的子字符串
const regexp = /aaa./g;
const text = 'aaabbbcccaaad';
let matches = null;

do {
    matches = regexp.exec(text);
    if ( matches ) {
        console.log(regexp.lastIndex, matches.index, matches[0]);
    }
} while( matches )
// 下次正则匹配源字符串的开始位置, 子字符串在源字符串的位置, 子字符串
// 4, 0, aaab
// 13, 9, aaad


// test，判断正则表达式是否与字符串匹配，若匹配返回true，否则返回false
const regexp = /^\d{3}-\d{4}-\d{4}$/;
regexp.test('184-0176-3607'); // true

// toString，返回正则表达式的字面量形式的字符串
const regexp1 = /^\d{3}-\d{4}-\d{4}$/gi;
const regexp2 = new RegExp('^\\d{3}-\\d{4}-\\d{4}$', 'gi');

regexp1.toString() === regexp2.toString();
// /^\d{3}-\d{4}-\d{4}$/gi, /^\d{3}-\d{4}-\d{4}$/gi true



// RegExp构造函数 的属性
// input         最后一次匹配的源字符串
// lastMatch     最后一次匹配到的子字符串
// lastParen     最后一次匹配的捕获组
// leftContext   在input中，lastMath左边的文字
// rightContext  在input中，lastMath右边的文字

const text = 'this has been ashort summer';
const regexp = /(.)hort/g;

if (regexp.test(text)) {
    RegExp.input;        // this has been ashort summer
    RegExp.lastMatch;    // short
    RegExp.lastParen;    // s
    RegExp.leftContext;  // this has been a
    RegExp.rightContext; //  summer
}
