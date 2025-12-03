/**
 * Extracts the video ID from a Vimeo URL
 * @param url - Full Vimeo player URL or video ID
 * @returns The video ID as a string
 * 
 * @example
 * extractVimeoId("https://player.vimeo.com/video/1140981207?background=1&autoplay=1")
 * // Returns: "1140981207"
 * 
 * extractVimeoId("1140981207")
 * // Returns: "1140981207"
 */
export function extractVimeoId(url: string): string {
  // If it's already just a number, return it
  if (/^\d+$/.test(url)) {
    return url;
  }

  // Extract from full URL
  const match = url.match(/vimeo\.com\/video\/(\d+)/);
  return match ? match[1] : url;
}
