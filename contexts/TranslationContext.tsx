
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { createContext } from 'react';
import { TRANSLATIONS } from '../translations';

export type TranslationType = typeof TRANSLATIONS.en;

export const TranslationContext = createContext<TranslationType>(TRANSLATIONS.en);
