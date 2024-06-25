// cryptoUtils.js
const CryptoJS = require("crypto-js");

export const generateChallenge = () => {
  return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
};

export const createResponse = (challenge, bit, secretKey) => {
  const hmac = CryptoJS.HmacSHA256(challenge + bit, secretKey);
  return hmac.toString(CryptoJS.enc.Hex);
};

export const verifyResponse = (challenge, bit, response, secretKey) => {
  const expectedResponse = createResponse(challenge, bit, secretKey);
  console.log(expectedResponse);
  return response === expectedResponse;
};
