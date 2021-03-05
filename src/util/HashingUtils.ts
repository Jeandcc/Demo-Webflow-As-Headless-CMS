export default class HashingUtils {
  static async hashUserName(name: string): Promise<string> {
    const lowercaseUsername = name.toLowerCase();
    const buffer = new TextEncoder().encode(lowercaseUsername);
    const digest = await crypto.subtle.digest('SHA-1', buffer);

    // Convert digest to hex string
    const hash = Array.from(new Uint8Array(digest))
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');

    return hash;
  }
}
