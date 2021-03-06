// 基本元字符

// . 匹配任意单个字符(除换行符外!!)
/./.test('1'); // true

// \ 可以对元字符进行转义(包括自己)
/\./.test('.'); // true
/\\/.test('\\'); // true；在字符串里，\用于转义特殊字符，所以 字符串'\\' 等于 字符串'\'

// [] 定义一个字符集合
/[ab]/.test('a'); // 字符集合为(a, b)，true

// - 定义字符集合的区间， 连接符(-) 只能作用于 字符区间([]) 内，在 字符区间([]) 外 连接符(-) 只是普通的字符，无需转义
/[a-c]/.test('b'); // 字符集合为(a, b, c)，true

// [^] 对字符集合内所有集合求非
/[^a-bd-e]/.test('a'); // 字符集合中不包含(a, b, d, e)，false
/[^a-bd-e]/.test('c'); // 字符集合中不包含(a, b, d, e)，true



// 空白字符

// \n 换行符
/\n/.test(`1
2`);            // true

// 空格和换行符的精确匹配
let text = `\n `;
const regexp1 = / /g; // 匹配空格
const regexp2 = /\n/g; // 匹配换行符
text = text.replace(regexp1, '&nbsp\;');
text = text.replace(regexp2, '↵');
// ↵&nbsp;



// 特殊元字符

// \d 匹配任何一个 数字字符，等价于[0-9]
// \D 对 \d 取非
/\d/.test(1); // true
/\D/.test('one'); // true

// \w 匹配任何一个 数字字符 、 英文字母字符 和 下划线字符(_) ，等价于[0-9a-zA-Z_]
// \W 对 \w 取非
/\w/.test('a'); // true
/\W/.test('@'); // true

// \s 匹配任何一个 空白字符
// \S 对 \s 取非
/1\s2/.test('1 2'); // true
/\S/.test('@'); // true



// 数量元字符

// + 匹配前一个字符或者字符集合的一次或者多次重复，懒惰型的版本为 +?，转义版本为 \+
/a+/.test('aaa'); // true

// * 匹配前一个字符或者字符集合的零次或者多次重复，懒惰型的版本为 *?，转义版本为 \*
/a*/.test(''); // true

// ? 匹配前一个字符或者字符集合的零次或者一次重复，转义版本为 \?
/a?/.test(''); // true
/\?a/.test('?a'); // true

// {} 匹配重复次数，{n}精确匹配n次，{n, m}最少匹配n次最多匹配m次，{n,}最少匹配n最多匹配次数不限
/a{3}/.test('aaa'); // true
/a{3,5}/.test('aaaaa'); // true
/a{3,}/.test('aaaaaaaaa'); // true

// 数量元字符的懒惰型
/<a>.*<\/a>/.exec('<a>111</a><a>222</a>')[0]; //  数量元字符的贪婪型   <a>111</a><a>222</a>
/<a>.*?<\/a>/.exec('<a>111</a><a>222</a>')[0]; // 数量元字符的懒惰型  <a>111</a>



// 位置匹配

// \b 匹配一个单词的边界，开头或者结尾
/\baaa\b/.test('aaa'); // true
/\baaa\b/.test('baaac'); // false
/\baaa/.test('aaac'); // true
/aaa\b/.test('baaa'); // true

// \B 对 \b 取非
/\Baaa\B/.test('baaac'); // true
/\Baaa\B/.test('aaa'); // false

// ^ 匹配字符串边界的开头(字符集合[^]表示取非)，$ 匹配字符串边界的结尾
/^1.*1$/.test('123454321'); // true

// 多行匹配的实例
const text = `function handler() {
    // 这是一个处理函数
    // n1变量
    const n1 = arguments[0] || 1;
    // n2变量
    const n2 = arguments[2] || 2;
    // 返回计算结果
    return n1 + n2;
}`;
const regexp = /^\s*\/\/.*$/gm;
let matches = null

do {
    matches = regexp.exec(text);
    if (matches) {
        console.log(matches[0]);
    }
} while (matches)
    // 这是一个处理函数
    // n1变量
    // n2变量
    // 返回计算结果



// 使用子表达式，正则表达式的一部分

// 子表达式，正则表达式的一部分，使用 元字符 ( ) 来包裹 子表达式
/(abc){4}/.test('abcabcabcabc'); // true

// | 逻辑或操作符
/(19|20)\d{2}/.test('1987'); // true
/(19|20)\d{2}/.test('1887'); // false

// 子表达式嵌套应该按照先内后外的顺序来分析正则表达式
// 子表达式嵌套实例 匹配IP地址
// 一个合法IP地址的各组数字的匹配规则
// 任何一个1位或2位的数字
// 任何一个以1开头的3位数字
// 任何一个以2开头、第2位数字在0～4之间的3位数字
// 任何一个以25开头、第3位数字在0～5之间的3位数字
/(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])).){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))/;



// 回溯引用，引用前面子表达式匹配的结果
// 正则表达式里的 \1 引用 (h[1-6]) 匹配的结果
/<(h[1-6])>.*?<\/\1>/.test('<h1>24234</h1>'); // true，正则表达式相当于 /<h1>.*?<\/h1>/
/<(h[1-6])>.*?<\/\1>/.test('<h2>23423</h2>'); // true，正则表达式相当于 /<h2>.*?<\/h2>/
/<(h[1-6])>.*?<\/\1>/.test('<h2>77997</h3>'); // false



// 向前查找，指定了一个必须匹配但不在结果中返回的模式，从语法上看，就是一个以 ?= 开头的子表达式
const text = `picture1.jpeg; picture2.jpg; picture3.gif`;
const regexp = /\w+(?=\.(jpeg|jpg))/g;
let matches = null

do {
    matches = regexp.exec(text);
    if (matches) {
        console.log(matches[0]);
    }
} while (matches)

// picture1
// picture2
