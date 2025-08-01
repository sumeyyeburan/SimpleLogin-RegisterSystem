export function decodeBase64(base64String: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = '';
  let bc = 0, bs = 0, buffer: number | undefined, idx = 0;

  base64String = base64String.replace(/=+$/, '');
  if (base64String.length % 4 === 1) {
    throw new Error('Invalid base64 string');
  }

  while (idx < base64String.length) {
    buffer = chars.indexOf(base64String.charAt(idx++));
    if (buffer === -1) continue;
    bs = bc % 4 ? bs * 64 + buffer : buffer;
    if (bc++ % 4) {
      str += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)));
    }
  }

  return str;
}
