
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { ref, push, serverTimestamp } from 'firebase/database';
import { rtdb } from './firebase';

export const recordGlobalTransaction = async (
    type: 'PURCHASE' | 'LIQUIDATION',
    userName: string,
    itemName: string,
    itemId: string,
    price: number,
    isBot: boolean = false
) => {
    try {
        const activityRef = ref(rtdb, 'global_activity');
        await push(activityRef, {
            type,
            user: userName,
            item: itemName,
            itemId,
            price,
            timestamp: serverTimestamp(),
            isBot
        });
    } catch (error) {
        console.error("Failed to record global transaction:", error);
    }
};
