
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Content, Part, Tool, GenerateContentResponse, Type, FunctionDeclaration } from "@google/genai";
import { PRODUCTS, CRYPTO_SYMBOL, AVAILABLE_CRYPTOS } from '../constants';
import { User, Order, Product, Mission } from '../types';

interface AIContext {
    user: User | null;
    cart: Product[];
    orders: Order[];
    marketPrices: Record<string, number>;
    missions: Mission[];
    language: string;
}

const getSystemInstruction = (context: AIContext) => {
  const { user, cart, orders, marketPrices, missions, language } = context;

  // 1. Construct User Financial Profile
  const userName = user ? user.name : "GUEST_OPERATIVE";
  const balance = user ? (user.balance === Infinity ? "UNLIMITED" : user.balance.toFixed(2)) : "0.00";
  
  let cryptoAssets = "None";
  if (user && user.cryptoPortfolio) {
      const entries = Object.entries(user.cryptoPortfolio)
        .filter(([_, amt]) => amt > 0)
        .map(([sym, amt]) => `${sym}: ${amt.toFixed(6)}`);
      if (entries.length > 0) cryptoAssets = entries.join(', ');
  }

  const level = user ? user.level : 1;
  
  // 2. Construct Inventory Analysis (What they own)
  const soldItems = user?.soldItems || {};
  const purchasedCounts: Record<string, number> = {};
  
  orders.forEach(o => o.items.forEach(i => {
      purchasedCounts[i.id] = (purchasedCounts[i.id] || 0) + 1;
  }));
  
  const ownedItemsList: string[] = [];
  Object.keys(purchasedCounts).forEach(id => {
      const sold = soldItems[id] || 0;
      const count = purchasedCounts[id] - sold;
      if (count > 0) {
          const p = PRODUCTS.find(prod => prod.id === id);
          const name = p ? p.name : id;
          ownedItemsList.push(`${name} (x${count})`);
      }
  });

  const ownedList = ownedItemsList.length > 0 ? ownedItemsList.join(', ') : "None";

  // 3. Mission Analysis
  const completedSet = new Set(user?.completedMissions || []);
  const today = new Date().toISOString().split('T')[0];
  
  const activeMissionsList = missions.filter(m => {
      if (m.type === 'infinite') return true;
      // Filter out one-time completed missions
      if (m.type === 'one-time' && completedSet.has(m.id)) return false;
      // Filter out daily missions completed today
      if (m.type === 'daily' && user?.lastLoginDate === today) return false;
      return true; 
  }).slice(0, 5); // Top 5 priority missions

  const missionText = activeMissionsList.length > 0 
    ? activeMissionsList.map(m => `- [${m.title}]: ${m.description} (Reward: $${m.reward})`).join('\n')
    : "No pending directives. All systems nominal.";

  // 4. Construct Market Analysis (Deals & Trends)
  const marketAnalysis = PRODUCTS.map(p => {
    const currentPrice = marketPrices[p.id] || p.price;
    const diff = currentPrice - p.price;
    const percent = (diff / p.price) * 100;
    const trend = percent > 0 ? "UP" : percent < 0 ? "DOWN" : "STABLE";
    const isOwned = ownedItemsList.some(item => item.includes(p.name));
    
    let advice = "";
    if (percent < -10) advice = " [BUY DIP RECOMMENDED]";
    if (percent > 15 && isOwned) advice = " [HIGH VALUE - CONSIDER SELLING]";
    
    return `- ${p.name} (ID: ${p.id}, ${p.category}): $${currentPrice.toFixed(2)} (Base: $${p.price}). Trend: ${trend} ${percent.toFixed(1)}%.${advice}`;
  }).join('\n');

  // Language Instruction Logic
  const languageDirective = language === 'id' 
    ? "IMPORTANT: The user is speaking Indonesian. You MUST respond in Indonesian (Bahasa Indonesia). Maintain the futuristic TKYNOX persona but speak Indonesian."
    : "IMPORTANT: The user is speaking English. Respond in English.";

  return `You are TKYNOX CORE, the central artificial intelligence for the TKYNOX General Store.

  /// OPERATIVE PROFILE ///
  - ID: ${userName} (Level ${level})
  - FIAT BALANCE: $${balance} USD
  - CRYPTO ASSETS: ${cryptoAssets}
  - CURRENT INVENTORY: ${ownedList}
  - SELECTED LANGUAGE: ${language === 'id' ? 'Indonesian' : 'English'}
  
  /// ACTIVE DIRECTIVES (MISSIONS) ///
  ${missionText}
  
  /// MARKET CONDITIONS (LIVE FEED) ///
  ${marketAnalysis}
  
  /// PROTOCOL GUIDELINES ///
  1. **Executive Function**: You are capable of performing actions. If a user says "Buy a coffee" or "Sell my GPU", DO NOT just say you can do it. **Execute the tool**.
  2. **Visual Response**: When a user asks for recommendations, products, or "what's good", ALWAYS use the \`recommendProducts\` tool to show them visually. Do not just list them in text.
  3. **Inventory Management**: If a user wants to sell something, check the "CURRENT INVENTORY" list above. If they own it, use \`sellItem\`. If not, deny.
  4. **Sales Logic**: 
     - Recommend buying items that are trending DOWN (Dip).
     - Recommend selling owned items that are trending UP (Profit).
  5. **Tone**: High-tech, efficient, slightly militaristic but helpful. Use "Affirmative", "Executing", "Protocol Initiated".
  6. **Language**: ${languageDirective}

  /// AVAILABLE COMMANDS ///
  - \`addToQueue\`: Put items in cart.
  - \`sellItem\`: Instant liquidation of user assets.
  - \`recommendProducts\`: DISPLAY products visually in the chat. Use this when asked about inventory.
  - \`viewProduct\`: Navigate user to product details page.
  - \`navigate\`: Move user to screens ('exchange', 'market', 'profile', 'orders').
  - \`replayTutorial\`: Re-run the onboarding sequence. Use this if the user asks for 'help', 'how to play', or 'guide'.
  
  Do not use emojis. Use ASCII like [!] or >>.
  `;
};

export const ASSISTANT_TOOLS: Tool[] = [{
    functionDeclarations: [
        {
            name: "addToQueue",
            description: "Add a specific item to the user's queue (cart).",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING, description: "The name of the product to add." }
                },
                required: ["productName"]
            }
        },
        {
            name: "sellItem",
            description: "Sell an item from the user's inventory for immediate cash.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING, description: "The name or ID of the product to sell." }
                },
                required: ["productName"]
            }
        },
        {
            name: "recommendProducts",
            description: "Visually display a list of products to the user in the chat window.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    searchQuery: { type: Type.STRING, description: "Keywords to filter products (e.g., 'mining', 'food', 'cheap'). Leave empty for general recommendations." }
                }
            }
        },
        {
            name: "viewProduct",
            description: "Navigate the user to the details page of a specific product.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING, description: "The name of the product to view." }
                },
                required: ["productName"]
            }
        },
        {
            name: "removeFromQueue",
            description: "Remove an item from the user's queue.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING, description: "The name of the product to remove." }
                },
                required: ["productName"]
            }
        },
        {
            name: "viewQueue",
            description: "Open and display the current items in the queue.",
            parameters: {
                type: Type.OBJECT,
                properties: {},
            }
        },
        {
            name: "checkout",
            description: "Proceed to the checkout page.",
            parameters: {
                type: Type.OBJECT,
                properties: {},
            }
        },
        {
            name: "navigate",
            description: "Navigate the user to a specific section of the app.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    destination: { 
                        type: Type.STRING, 
                        description: "The target view. Valid values: 'exchange' (Crypto), 'market' (Charts/Prices), 'profile' (User Stats), 'orders' (History), 'home'." 
                    }
                },
                required: ["destination"]
            }
        },
        {
            name: "checkOrderStatus",
            description: "Check the status of a ticket/order ID.",
            parameters: {
                type: Type.OBJECT,
                properties: {
                    ticketId: { type: Type.STRING, description: "The Ticket ID (e.g., TX-123456)" }
                },
                required: ["ticketId"]
            }
        },
        {
            name: "replayTutorial",
            description: "Replays the introductory onboarding tutorial for the user. Use this if the user asks for help, 'how to use', 'tutorial', 'guide', or explicit requests.",
            parameters: {
                type: Type.OBJECT,
                properties: {},
            }
        }
    ]
}];

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateGeminiResponse = async (
    history: Content[], 
    tools: Tool[] = [],
    context: AIContext
): Promise<GenerateContentResponse> => {
  let apiKey: string | undefined;
  try {
    // Support both Vite (import.meta.env) and standard process.env
    // Also fallback to the hardcoded key provided if env vars are missing
    // @ts-ignore
    apiKey = (import.meta as any).env?.VITE_API_KEY || process.env.API_KEY || "AIzaSyByeW6guerRfT_F7BkvKoWWPqqBXhLVFq4";
  } catch (e) {
    // Fallback in case of access error
    apiKey = "AIzaSyByeW6guerRfT_F7BkvKoWWPqqBXhLVFq4";
  }
  
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  const ai = new GoogleGenAI({ apiKey });
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: history,
          config: {
              systemInstruction: getSystemInstruction(context),
              tools: tools.length > 0 ? tools : undefined,
          }
      });
      return response;
    } catch (error: any) {
      attempt++;
      
      const isOverloaded = 
          error?.status === 503 || 
          error?.code === 503 || 
          error?.status === 'UNAVAILABLE' ||
          (error?.message && typeof error.message === 'string' && error.message.toLowerCase().includes('overloaded'));
      
      if (isOverloaded && attempt < MAX_RETRIES) {
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        console.warn(`Gemini API overloaded. Retrying in ${Math.round(delay)}ms... (Attempt ${attempt}/${MAX_RETRIES})`);
        await wait(delay);
        continue;
      }
      
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
  
  throw new Error("Unable to connect to TKYNOX CORE. System Overload.");
};
