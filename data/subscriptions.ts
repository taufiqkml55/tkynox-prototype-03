
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { SubscriptionPlan } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
    {
        id: 'sub-monthly',
        name: 'NEURAL LINK // MONTHLY',
        price: 19,
        interval: 'monthly',
        features: ['20% Off All Physical Goods', 'Free Digital Downloads', 'Priority Shipping', 'Secret Menu Access', 'Cancel Anytime']
    },
    {
        id: 'sub-yearly',
        name: 'NEURAL LINK // YEARLY',
        price: 99, 
        interval: 'yearly',
        features: ['20% Off All Physical Goods', 'Free Digital Downloads', 'Priority Shipping', 'Secret Menu Access', '2 Months Free', 'Quarterly Mystery Box']
    }
];
