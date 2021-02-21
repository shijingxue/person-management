import crypto from 'crypto-js';

const secretKey = '666666xgzg666666';

/**
 * 加密
 *
 * @param originalText 原始文本
 * @returns {string} 加密后的文本
 */
export const encrypt = (originalText) => {

  const key = crypto.enc.Utf8.parse(secretKey);
  const encrypted = crypto.AES.encrypt(originalText, key, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
};

/**
 * 解密
 *
 * @param cipherText 密文
 * @returns {string} 解密后的文本
 */
export const decrypt = (cipherText) => {
  const ckey = crypto.enc.Utf8.parse(secretKey);
  const ciphertext = crypto.enc.Hex.parse(cipherText);
  const srcs = crypto.enc.Base64.stringify(ciphertext);
  const decrypt = crypto.AES.decrypt(srcs, ckey, {
    mode: crypto.mode.ECB,
    padding: crypto.pad.Pkcs7
  });
  const decrypted = decrypt.toString(crypto.enc.Utf8);
  return decrypted.toString(crypto.enc.Utf8);
};
