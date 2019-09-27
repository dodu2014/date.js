/**
* 格式化时间字符串
* @param {String} formatStr 格式化输出的字符串格式
* @returns {String} 格式化的字符串
*/
Date.prototype.format = function (formatStr) {
    let str = formatStr;
    let Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, this.getMonth() + 1);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());

    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    str = str.replace(/w|W/g, Week[this.getDay()]);
    return str;
};

/**
* 增加日期或时间
* @param {String} type 字符串表达式，表示要添加的时间间隔. 可用值: yyyy||yy||YYYY||YY,MM||M,dd||DD||d||D,HH||hh||H||h,mm||m,ss||s||SS||S
* @param {Number} value 数值表达式，表示要添加的时间间隔的值.
* @returns {Date} 新的时间对象
*/
Date.prototype.add = function (type, value) {
    let _date = this;
    switch (type.toString()) {
        case 'yyyy':
        case 'yy':
        case 'YYYY':
        case 'YY':
            _date.setFullYear(_date.getFullYear() + value);
            break;
        case 'MM':
        case 'M':
            _date.setMonth(_date.getMonth() + value);
            break;
        case 'dd':
        case 'DD':
        case 'd':
        case 'D':
            _date.setDate(_date.getDate() + value);
            break;
        case 'HH':
        case 'hh':
        case 'H':
        case 'h':
            _date.setHours(_date.getHours() + value);
            break;
        case 'mm':
        case 'm':
            _date.setMinutes(_date.getMinutes() + value);
            break;
        case 'ss':
        case 's':
        case 'SS':
        case 'S':
            _date.setSeconds(_date.getSeconds() + value);
            break;
    }
    return _date;
};

/**
 * 赋予人性的语言: 显示一个日期相对于当前时间为 多少年前, 多少月前, 多少天天, 多少小时前, 多少分钟前, 多少秒前.
* @param {String} maxUnit 显示人类语言的单位上限(包含此上限), 可用值有: 年,月,天,小时,分钟,秒. 超过这个单位后, 按日期显示,不再显示赋予人性的语言.
* @param {String} formatStr 格式化输出的字符串格式
* @returns {String} 新的时间对象
 */
Date.prototype.humanize = function (maxUnit, formatStr) {
    let UNITS = {
        '年': 31557600000,
        '月': 2629800000,
        '天': 86400000,
        '小时': 3600000,
        '分钟': 60000,
        '秒': 1000
    };
    formatStr = formatStr || 'yyyy-MM-dd';
    let milliseconds = new Date() - this;
    if (milliseconds < 0) {
        return this.format(formatStr);
    }
    let maxMilliSeconds = UNITS[maxUnit] || 99999999999;
    let result = '';
    for (var key in UNITS) {
        if (milliseconds >= UNITS[key]) {
            if (UNITS[key] <= maxMilliSeconds) {
                result = Math.floor(milliseconds / UNITS[key]) + key + '前';
            } else {
                result = this.format(formatStr);
            }
            break;
        }
    }
    return result || '刚刚';
}

/**
 * 获取当前日期是周几
 */
Date.prototype.getWeek = function () {
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weeks[this.getDay()];
}