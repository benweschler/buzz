import jsSHA from "jssha";

export function generateUserOTP(secret) {
  // Code comes from a section of this website: https://smarx.com/posts/2020/08/totp-how-most-2fa-apps-work/
  // Get current time in seconds
  // Date.now() returns milliseconds
  const currentTime = Date.now() / 1000;

  // Our WINDOW_TIME is 60 seconds
  const sequenceValue = Math.floor(currentTime)

  // Do HMAC-SHA1 with the secret
  /* eslint-disable */
  const hmac = new jsSHA("SHA-1", "HEX");
  /* eslint-enable */
  hmac.setHMACKey(secret, "UINT8ARRAY");
  hmac.update(sequenceValue.toString(16));

  return hmac.getHMAC('HEX');
}
