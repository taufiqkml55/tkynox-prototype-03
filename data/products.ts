/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Product } from '../types';
import { MINING_PRODUCTS } from './products/mining';
import { PHYSICAL_PRODUCTS } from './products/physical';
import { LIFESTYLE_PRODUCTS } from './products/lifestyle';
import { DIGITAL_PRODUCTS } from './products/digital';
import { AUTOMATION_PRODUCTS } from './products/automation';

export const PRODUCTS: Product[] = [
    ...MINING_PRODUCTS,
    ...PHYSICAL_PRODUCTS,
    ...LIFESTYLE_PRODUCTS,
    ...DIGITAL_PRODUCTS,
    ...AUTOMATION_PRODUCTS
];