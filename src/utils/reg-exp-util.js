/**
 * 电话号码校验
 *
 * @param {string} telephone 电话号码
 * @returns {boolean} 电话号码格式正确返回true，否则返回false
 */
import fa from 'element-ui/src/locale/lang/fa';

const isTelephone = function (telephone) {
  if (_isString(telephone)) {
    // 电话号码的正则表达式
    const telephoneRegExp = /^(0\d{2,3}-?)?(\d{7,8})(-\d{3,})?$/;
    return telephoneRegExp.test(telephone);
  } else {
    throw new Error('电话号码需为字符串！');
  }
};

/**
 * 手机号码校验
 *
 * @param {string} mobilePhone 手机号码
 * @returns {boolean} 手机号码格式正确返回true，否则返回false
 */
const isMobilePhone = function (mobilePhone) {
  if (_isString(mobilePhone)) {
    // 手机号码正则表达式
    const mobilePhoneRegExp = /^1\d{10}$/;
    return mobilePhoneRegExp.test(mobilePhone);
  } else {
    throw new Error('手机号码需为字符串！');
  }
};

/**
 * 邮箱校验
 *
 * @param {string} email 邮箱
 * @returns {boolean} 邮箱格式正确返回true，否则返回false
 */
const isEmail = function (email) {
  if (_isString(email)) {
    // 邮箱正则表达式
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegExp.test(email);
  } else {
    throw new Error('邮箱需为字符串！');
  }
};

/**
 * 身份证号码校验
 *
 * @param {string} idCardNumber 身份证号码
 * @returns {boolean} 身份证号码格式正确返回true，否则返回false
 */
const isIdCardNumber = function (idCardNumber) {
  if (_isString(idCardNumber)) {
    // 身份证号正则表达式
    const idCardNumberRegExp = /^\d{17}([0-9]|X|x)$/;
    return idCardNumberRegExp.test(idCardNumber);
  } else {
    throw new Error('身份证号码需为字符串！');
  }
};

/**
 * 汉字校验
 *
 * @param {string} chineseCharacter 汉字
 * @returns {boolean} 合法汉字返回true，否则返回false
 */
const isChineseCharacter = function (chineseCharacter) {
  if (_isString(chineseCharacter)) {
    // 汉字正则表达式
    const chineseCharacterRegExp = /^([\u4e00-\u9fa5]|||\（|\）){1,}$/;
    return chineseCharacterRegExp.test(chineseCharacter);
  } else {
    throw new Error('汉字需为字符串！');
  }
};

/**
 * 数字校验
 *
 * @param {string} number 数字
 * @returns {boolean} 合法数字返回true，否则返回false
 */
const isNumber = function (number) {
  if (_isString(number)) {
    // 数字正则表达式
    const numberRegExp = /^[+-]?\d+(\.\d+)?$/;
    return numberRegExp.test(number);
  } else {
    throw new Error('数字格式需为字符串！');
  }
};

/**
 * 整数校验
 *
 * @param {string} integer 整数
 * @returns {boolean} 合法整数返回true，否则返回false
 */
const isInteger = function (integer) {
  if (_isString(integer)) {
    // 整数正则表达式
    const integerRegExp = /^[+-]?[1-9]\d*$/;
    return integerRegExp.test(String(integer));
  } else {
    throw new Error('整数格式需为字符串！');
  }
};

/**
 * 正整数校验
 *
 * @param {string} positiveInteger 正整数
 * @returns {boolean} 合法正整数返回true，否则返回false
 */
const isPositiveInteger = function (positiveInteger) {
  if (_isString(positiveInteger)) {
    // 正整数正则表达式
    const positiveIntegerRegExp = /^\+?[1-9]\d*$/;
    return positiveIntegerRegExp.test(positiveInteger);
  } else {
    throw new Error('正整数格式需为字符串！');
  }
};

/**
 * 负整数校验
 *
 * @param {string} negativeInteger 负整数
 * @returns {boolean} 合法负整数返回true，否则返回false
 */
const isNegativeInteger = function (negativeInteger) {
  if (_isString(negativeInteger)) {
    // 负整数正则表达式
    const negativeIntegerRegExp = /^-[1-9]\d*$/;
    return negativeIntegerRegExp.test(negativeInteger);
  } else {
    throw new Error('负整数格式需为字符串！');
  }
};

/**
 * 小数校验
 *
 * @param {string} decimal 小数
 * @param {number} minDecimalDigits 小数位最少位数，默认为1
 * @param {number} maxDecimalDigits 小数位最多位数，默认不限制
 * @returns {boolean} 小数格式正确返回true，否则返回false
 */
const isDecimal = function (decimal, minDecimalDigits = 1, maxDecimalDigits= undefined) {
  if (!_isString(decimal)) {
    throw new Error('小数格式需为字符串！');
  } else if (minDecimalDigits < 1) {
    throw new Error('小数点后保留的位数不能小于1！');
  } else {
    // 小数正则表达式
    const decimalRegExp =
      new RegExp(`^[+-]?\\d+(\\.\\d{${minDecimalDigits},${maxDecimalDigits === undefined ? '' : maxDecimalDigits}})+$`);
    // const decimalRegExp = /^[+-]?\d+(\.\d+)+$/;
    return decimalRegExp.test(decimal);
  }
};

/**
 * 正小数校验
 *
 * @param {string} positiveDecimal 正小数
 * @param {number} minDecimalDigits 小数位最少位数，默认为1
 * @param {number} maxDecimalDigits 小数位最多位数，默认不限制
 * @returns {boolean} 正小数格式正确返回true，否则返回false
 */
const isPositiveDecimal = function (positiveDecimal, minDecimalDigits = 1, maxDecimalDigits) {
  if (!_isString(positiveDecimal)) {
    throw new Error('正小数格式需为字符串！');
  } else if (minDecimalDigits < 1) {
    throw new Error('正小数点后保留的位数不能小于1！');
  } else if (/^\+?0*\.0*$/.test(positiveDecimal)) { // 排除类似0.0和+0.0
    return false;
  } else {
    // 正小数正则表达式
    const positiveDecimalRegExp =
      new RegExp(`^\\+?\\d+(\\.\\d{${minDecimalDigits},${maxDecimalDigits === undefined ? '' : maxDecimalDigits}})+$`);
    return positiveDecimalRegExp.test(positiveDecimal);
  }
};

/**
 * 负小数校验
 *
 * @param {string} negativeDecimal 负小数
 * @param {number} minDecimalDigits 小数位最少位数，默认为1
 * @param {number} maxDecimalDigits 小数位最多位数，默认不限制
 * @returns {boolean} 负小数格式正确返回true，否则返回false
 */
const isNegativeDecimal = function (negativeDecimal, minDecimalDigits = 1, maxDecimalDigits) {
  if (!_isString(negativeDecimal)) {
    throw new Error('负小数格式需为字符串！');
  } else if (minDecimalDigits < 1) {
    throw new Error('负小数点后保留的位数不能小于1！');
  } else if (/^-0*\.0*$/.test(negativeDecimal)) { // 排除类似-0.0
    return false;
  } else {
    // 负小数正则表达式
    const positiveDecimalRegExp =
      new RegExp(`^-\\d+(\\.\\d{${minDecimalDigits},${maxDecimalDigits === undefined ? '' : maxDecimalDigits}})+$`);
    return positiveDecimalRegExp.test(negativeDecimal);
  }
};


const _isString = function (str) {
  return Object.prototype.toString.call(str) === '[object String]';
};

// 导出模块
export default {
  isTelephone,
  isMobilePhone,
  isEmail,
  isIdCardNumber,
  isChineseCharacter,
  isNumber,
  isInteger,
  isPositiveInteger,
  isNegativeInteger,
  isDecimal,
  isPositiveDecimal,
  isNegativeDecimal
};
