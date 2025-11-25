
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { UI } from './translations/en/ui';
import { PRODUCT_DATA } from './translations/en/productData';
import { MISSION_DATA } from './translations/en/missionData';
import { JOURNAL_DATA } from './translations/en/journalData';

// Indonesian Imports
import { UI_ID } from './translations/id/ui';
import { PRODUCT_DATA_ID } from './translations/id/productData';
import { MISSION_DATA_ID } from './translations/id/missionData';
import { JOURNAL_DATA_ID } from './translations/id/journalData';

export const TRANSLATIONS = {
    en: {
        ...UI,
        mission_data: MISSION_DATA,
        product_data: PRODUCT_DATA,
        journal_data: JOURNAL_DATA
    },
    id: {
        ...UI_ID,
        mission_data: MISSION_DATA_ID,
        product_data: PRODUCT_DATA_ID,
        journal_data: JOURNAL_DATA_ID
    }
};
