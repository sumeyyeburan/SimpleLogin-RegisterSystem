/*
  Decodes a Base64-encoded string into its original UTF-8 string.

  @param base64String - The Base64 encoded input string
 
  @returns The decoded string
 
  @throws Error if the input is not a valid Base64 string
 
  How it works:
  - Removes trailing '=' padding characters.
  - Validates input length (Base64 strings should be multiples of 4).
  - Iterates over each character, converts Base64 chars to their 6-bit values.
  - Reconstructs original bytes by shifting bits accordingly.
  - Converts bytes to characters and appends to output string.
 */

export function decodeBase64(base64String: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = '';
  let bc = 0, bs = 0, buffer: number | undefined, idx = 0;

  base64String = base64String.replace(/=+$/, ''); // Remove trailing '=' padding
  if (base64String.length % 4 === 1) {
    throw new Error('Invalid base64 string'); // Input length validation
  }

  while (idx < base64String.length) {
    buffer = chars.indexOf(base64String.charAt(idx++));
    if (buffer === -1) continue; // Skip invalid chars
    bs = bc % 4 ? bs * 64 + buffer : buffer; // Accumulate bits in groups of 4
    if (bc++ % 4) {
      // Extract original 8-bit byte from accumulated bits and append as char
      str += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)));
    }
  }

  return str;
}
