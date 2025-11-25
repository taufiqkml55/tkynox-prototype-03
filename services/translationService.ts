
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * DEPRECATED: API-based translation service is no longer used.
 * The app now uses local static translation files located in `translations/`.
 */

export async function translateText(texts: string[], targetLang: string): Promise<string[]> {
  console.warn("translateText is deprecated. Use local translations instead.");
  return texts;
}

export async function translateObject(obj: any, targetLang: string): Promise<any> {
    console.warn("translateObject is deprecated. Use local translations instead.");
    return obj;
}
