
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface MarketAnalysisData {
    sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL' | 'VOLATILE';
    volatility: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
    volume: string;
    analystNote: string;
    news: string[];
    regulatoryStatus: string;
}

export const MARKET_ANALYSIS: Record<string, MarketAnalysisData> = {
    'Mining': {
        sentiment: 'BULLISH',
        volatility: 'HIGH',
        volume: '45.2M USD',
        analystNote: "Hashrate difficulty has increased by 12% following the Sector 4 energy stabilization. Demand for ASIC units is outstripping supply due to new 'Deep-Web' protocols requiring localized validation.",
        news: [
            "Silicon shortage reported in Neo-Shenzhen manufacturing hubs.",
            "New regulatory tax proposed on residential fusion reactors.",
            "TKNX network congestion drives hardware demand."
        ],
        regulatoryStatus: "GRAY ZONE"
    },
    'Physical': {
        sentiment: 'NEUTRAL',
        volatility: 'LOW',
        volume: '12.8M USD',
        analystNote: "Standard hardware supplies remain stable. A slight dip in cyberdeck prices is expected next quarter as the ONYX MK.V rumors begin to circulate on underground forums.",
        news: [
            "Shipping lane disruptions in the Pacific sector resolved.",
            "Recall issued for generic haptic feedback servos.",
            "Surplus military-grade optics flooding the black market."
        ],
        regulatoryStatus: "COMPLIANT"
    },
    'Sustenance': {
        sentiment: 'VOLATILE',
        volatility: 'MODERATE',
        volume: '89.5M USD',
        analystNote: "Algae bloom failures in the Atlantic hydroponic belt are driving up the cost of raw nutrient paste. Synthetic caffeine futures remain the most traded commodity by volume.",
        news: [
            "Atlantic Algae Bloom collapse affects 30% of global paste supply.",
            "FDA approves new Nootropic-Laced hydration formulas.",
            "Street price of real coffee beans hits all-time high."
        ],
        regulatoryStatus: "STRICT"
    },
    'Digital': {
        sentiment: 'BULLISH',
        volatility: 'EXTREME',
        volume: '105.2M USD',
        analystNote: "The market for untraceable digital assets is exploding. Pitch decks and whitepapers are trading at a premium as the VC sector pivots back to privacy-focused tech.",
        news: [
            "Corporate espionage spike drives demand for crisis management decks.",
            "Encryption ban rumors fuel panic buying of security templates.",
            "NFT legacy protocols officially deprecated."
        ],
        regulatoryStatus: "UNREGULATED"
    },
    'Security': {
        sentiment: 'BULLISH',
        volatility: 'MODERATE',
        volume: '67.1M USD',
        analystNote: "With urban unrest rising in the lower sectors, personal security hardware is seeing a 40% quarter-over-quarter growth. EMP devices are currently the hottest asset class.",
        news: [
            "Riot control measures intensified in Sector 9.",
            "Biometric spoofing tools found in wild; retinal scanner sales up.",
            "Faraday cage materials shortage expected."
        ],
        regulatoryStatus: "RESTRICTED"
    },
    'Apparel': {
        sentiment: 'BEARISH',
        volatility: 'LOW',
        volume: '8.4M USD',
        analystNote: "Oversaturation of 'tech-wear' aesthetics has led to a price correction. However, functional garments with anti-surveillance properties (RF shielding) retain high value.",
        news: [
            "Vantablack fabric patent expires; generic alternatives flooding market.",
            "New facial recognition cameras deployed, boosting scarf sales.",
            "Weather patterns stabilize, reducing demand for heavy acid-rain gear."
        ],
        regulatoryStatus: "COMPLIANT"
    },
    'Automation': {
        sentiment: 'VOLATILE',
        volatility: 'HIGH',
        volume: '92.3M USD',
        analystNote: "The release of HomeOS 12 has rendered many legacy bots obsolete, crashing their resale value. Conversely, jailbroken AI units are trading at 300% MSRP.",
        news: [
            "HomeOS 12 update bricks unauthorized sentry turrets.",
            "Right-to-Repair riots break out at drone manufacturing plant.",
            "Autonomous swarm logic algorithms leaked to public."
        ],
        regulatoryStatus: "PENDING"
    },
    'Wellness': {
        sentiment: 'NEUTRAL',
        volatility: 'LOW',
        volume: '15.6M USD',
        analystNote: "Bio-hacking is transitioning from niche to mainstream. Sleep optimization tech is seeing steady growth as the average worker's shift extends to 14 hours.",
        news: [
            "Circadian rhythm disruption declared public health crisis.",
            "Nanobot immunity boosters gain FDA fast-track status.",
            "Recall on first-gen neural sleep pods due to nightmare loops."
        ],
        regulatoryStatus: "MEDICAL"
    },
    'EdTech': {
        sentiment: 'BULLISH',
        volatility: 'LOW',
        volume: '22.1M USD',
        analystNote: "Traditional education collapse continues. Direct-to-cortex skill shards are the only viable path for rapid upskilling. Demand for cybersecurity training is at an all-time high.",
        news: [
            "University accreditation system hacked; degrees worthless.",
            "Corporate hiring shifts to skill-shard verification.",
            "VR History simulations used for political propaganda."
        ],
        regulatoryStatus: "OPEN"
    },
    'Fintech': {
        sentiment: 'BEARISH',
        volatility: 'EXTREME',
        volume: '200.5M USD',
        analystNote: "Regulatory crackdowns on offshore DAOs have caused panic selling in compliance tools. However, privacy-centric hardware wallets are seeing a flight-to-safety pump.",
        news: [
            "Global tax treaty closes the 'Panama Loophole'.",
            "Quantum decryption fear spreads; legacy ledgers dumped.",
            "Flash loan exploits drain 3 major liquidity pools."
        ],
        regulatoryStatus: "HOSTILE"
    },
    'Templates': {
        sentiment: 'NEUTRAL',
        volatility: 'LOW',
        volume: '5.2M USD',
        analystNote: "A stable utility market. As the gig economy expands, the need for standardized operational templates provides a consistent, low-volatility asset class.",
        news: [
            "Notion API update breaks 50% of custom dashboards.",
            "Design standardization act proposed by UI guild.",
            "AI-generated templates causing quality control issues."
        ],
        regulatoryStatus: "COMPLIANT"
    }
};
