
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const PRODUCT_DATA = {
    'mining-tier-1': { 
        name: "Nano-Ledger USB", 
        tagline: "Entry level hashing.", 
        description: "Compact USB stick miner. Slow but efficient.", 
        longDescription: "Utilizing a 7nm low-voltage ASIC chip, the Nano-Ledger is a discreet entry point into the TKYNOX network. Designed for stealth deployment, it operates silently within any standard USB 3.0 port, leeching minimal power while contributing to the distributed ledger. Ideal for office environments or low-profile setups.", 
        features: ['2 TH/s Hashrate', 'USB 3.0 Interface', 'Passive Thermal Dissipation', 'Stealth Form Factor'] 
    },
    'mining-tier-2': { 
        name: "GX-5000 Compute Unit", 
        tagline: "Dedicated processing.", 
        description: "Mid-range GPU repurposed for blockchain calculations.", 
        longDescription: "A repurposed graphical processing unit with video output logic surgically removed. The GX-5000 dedicates 100% of its CUDA cores to solving blockchain algorithms. Features a custom vapor-chamber cooling solution to maintain peak hashrates during prolonged crunch periods.", 
        features: ['8 TH/s Hashrate', 'Vapor-Chamber Cooling', 'Headless PCIe', 'Overclock Ready'] 
    },
    'mining-rig-01': { 
        name: "Quant-X Miner", 
        tagline: "Passive Income Generator.", 
        description: "Automated crypto-mining rig. Generates revenue while you sleep.", 
        longDescription: "The Quant-X represents the standard in semi-professional crypto-mining. Housed in a sound-dampened chassis, it employs an array of 4 specialized ASIC boards running in parallel. Acquiring this unit authorizes your node on the mainnet, unlocking the dedicated Mining Command dashboard for real-time analytics.", 
        features: ['20 TH/s Hashrate', 'Unlock Mining Dashboard', 'Passive Credits', 'Liquid Cooling Loop'] 
    },
    'mining-tier-4': { 
        name: "Isotope Rack Server", 
        tagline: "Industrial scale.", 
        description: "High-density server blade powered by nuclear-decay batteries.", 
        longDescription: "An industrial-grade server blade utilizing beta-voltaic tritium power cells. This self-sustaining energy source allows for 99.999% uptime independent of the local grid. Its reinforced chassis shields against electromagnetic interference, making it the backbone of any serious mining operation.", 
        features: ['60 TH/s Hashrate', 'Self-Powered (Tritium)', 'EM-Shielded Chassis', 'Server Grade Reliability'] 
    },
    'mining-tier-5': { 
        name: "Singularity Core", 
        tagline: "The event horizon.", 
        description: "Experimental quantum core. Breaks encryption instantly.", 
        longDescription: "A theoretical computation engine stabilized in a magnetic field. The Singularity Core utilizes closed timelike curves to compute hashes microseconds before the block is broadcast. Illegal in most jurisdictions due to its reality-destabilizing potential. Use with extreme caution.", 
        features: ['200 TH/s Hashrate', 'Reality Bending', 'Zero Latency', 'Magnetic Containment'] 
    },
    'mining-tier-6': {
        name: 'Dyson Link',
        tagline: 'Solar harvesting.',
        description: 'Fractional share of a dyson swarm node orbiting the sun.',
        longDescription: 'Harness the power of the star. The Dyson Link provides a fractional ownership of a remote energy collection satellite. Beaming microwave energy back to Earth-based receivers to power high-yield hashing operations.',
        features: ['500 TH/s Hashrate', 'Solar Powered', 'Orbital Uplink', 'Zero Maintenance']
    },
    'mining-tier-7': {
        name: 'Geothermal Node',
        tagline: 'Earth power.',
        description: 'Deep crust thermal generator for sustainable hashing.',
        longDescription: 'Tap into the planet. This self-contained mining unit bores 2km into the crust to utilize geothermal gradients for power and cooling. Extremely reliable and eco-neutral.',
        features: ['85 TH/s Hashrate', 'Geothermal Power', 'Liquid Cooling', 'Subterranean']
    },
    'mining-tier-8': {
        name: 'Neural Hash Cluster',
        tagline: 'Biological computing.',
        description: 'Brain-computer interface mining rig. Uses unused neural cycles.',
        longDescription: 'Monetize your subconscious. The Neural Hash Cluster connects to a BCI implant to utilize unused neural pathways during sleep for blockchain validation. Warning: vivid dreams of geometric shapes may occur.',
        features: ['40 TH/s Hashrate', 'BCI Compatible', 'Sleep Mining', 'Silent Operation']
    },
    'mining-tier-9': {
        name: 'Orbital Relay',
        tagline: 'Space-based node.',
        description: 'Low-orbit satellite node for censorship-resistant validation.',
        longDescription: 'Mining beyond the reach of governments. This fractional share of a CubeSat miner ensures 100% uptime and censorship resistance. Solar powered and radiatiion hardened.',
        features: ['120 TH/s Hashrate', 'Censorship Resistant', 'Solar Powered', 'Global Coverage']
    },
    'phys-01': { 
        name: "Cyberdeck: ONYX MK.IV", 
        tagline: "Field-ready computing.", 
        description: "Mechanical 40% keyboard with integrated Raspberry Pi 5 compute module.", 
        longDescription: "The ONYX MK.IV is a field-operable cyberdeck designed for physical intrusion. Its unibody aluminum chassis houses a Raspberry Pi 5 compute module, a mechanical 40% ortholinear keyboard, and a dedicated SDR (Software Defined Radio) receiver. Features a heads-up 7-inch ultrawide display and shielded GPIO ports for direct hardware hacking.", 
        features: ['Raspberry Pi 5 Module', 'Ortholinear 40% Layout', 'SDR Receiver', 'Ruggedized Aluminum'] 
    },
    'phys-02': { 
        name: "Neural Headset: VISR", 
        tagline: "Augment your vision.", 
        description: "Lightweight AR glasses with heads-up notifications and navigation overlays.", 
        longDescription: "Augmented Reality eyewear for the always-on operative. VISR employs retinal laser projection to overlay wireframe schematics, navigation paths, and encrypted messages directly into your field of view. Includes lidar mapping for low-light environments and integrates seamlessly with the ONYX cyberdeck.", 
        features: ['Retinal Projection', 'Lidar Mapping', 'Gesture Interface', 'Stealth Coating'] 
    },
    'phys-03': { 
        name: "Haptic Gloves: GRIP", 
        tagline: "Feel the grid.", 
        description: "Feedback gloves for VR interfaces and drone piloting.", 
        longDescription: "Advanced telepresence interface gloves. GRIP uses electro-active polymers to simulate texture, weight, and resistance, allowing for precise control of remote drones or immersion in virtual workspaces. Reinforced knuckles and conductive fingertips ensure utility in both digital and physical combat scenarios.", 
        features: ['Electro-Active Haptics', 'Finger Tracking', 'Combat Reinforced', 'Zero-Latency Link'] 
    },
    'phys-04': {
        name: 'Exo-Arm: STRIKE',
        tagline: 'Enhanced strength.',
        description: 'Hydraulic arm brace for industrial or tactical augmentation.',
        longDescription: 'A lightweight hydraulic exoskeleton for the upper arm. Increases lifting capacity by 40kg and stabilizes aim for precision tasks. Powered by a swappable Li-Ion battery pack located on the tricep.',
        features: ['Hydraulic Assist', '+40kg Lift', 'Aim Stabilization', 'Quick-Release']
    },
    'phys-05': {
        name: 'Lens: OCULUS',
        tagline: 'HUD overlay.',
        description: 'Smart contact lens with biometric monitoring.',
        longDescription: 'The ultimate discreet interface. This smart contact lens projects a minimal HUD directly onto your retina, displaying notifications, navigation, and vitals. Powered wirelessly by a wearable neck loop.',
        features: ['Retinal Display', 'Biometrics', 'Wireless Power', 'Invisible']
    },
    'phys-06': {
        name: 'Drone: SPARROW',
        tagline: 'Personal recon.',
        description: 'Wrist-mounted micro drone for rapid reconnaissance.',
        longDescription: 'Deploy eyes in the sky instantly. The SPARROW is a collapsible micro-drone stored in a wrist-gauntlet. Features quiet rotors and a 4K camera link for checking corners or scouting rooftops.',
        features: ['Wrist Launch', 'Silent Flight', '4K Video Link', 'Auto-Return']
    },
    'phys-07': {
        name: 'Mask: ONI',
        tagline: 'Street samurai.',
        description: 'Ballistic face mask with integrated AR glass and air filtration.',
        longDescription: 'Intimidation meets protection. The ONI mask offers Level IIIA ballistic protection for the face, combined with a HEPA filtration system and a heads-up display compatible with most tactical software suites.',
        features: ['Ballistic Protection', 'AR Visor', 'HEPA Filter', 'Voice Amp']
    },
    'app-01': { 
        name: "Stealth Hoodie: VANTABLACK", 
        tagline: "Avoid detection.", 
        description: "Anti-flash photography material with signal-blocking pockets.", 
        longDescription: "Constructed from a proprietary light-absorbing meta-material, the VANTABLACK hoodie renders the wearer a silhouette in low light. Embedded retro-reflective threads overload camera sensors, ensuring anonymity against facial recognition and flash photography. Includes an RF-shielded Faraday pocket to take your devices off the grid instantly.", 
        features: ['RF-Shielded Pocket', 'Anti-Flash Fabric', 'Thermal Regulation', 'Oversized Hood'] 
    },
    'app-02': { 
        name: "Cargo Pants: OPERATIVE", 
        tagline: "Carry everything.", 
        description: "Tactical trousers with magnetic closures and reinforced knee pads.", 
        longDescription: "Tactical wear for the modern grey man. The OPERATIVE cargo pants are cut from Dyneema-threaded ripstop fabric, offering slash protection and waterproofing. Features 12 discrete pockets with magnetic Fidlock closures, articulated knees for unrestricted movement, and a hidden tourniquet loop.", 
        features: ['12 Discrete Pockets', 'Dyneema Ripstop', 'Fidlock Magnetics', 'Articulated Knees'] 
    },
    'app-03': {
        name: 'Boots: KINETIC',
        tagline: 'Walk to charge.',
        description: 'Urban combat boots with piezoelectric charging soles.',
        longDescription: 'Never run out of power. These rugged tactical boots harvest kinetic energy from your footsteps, storing it in a heel-mounted battery. Includes a USB-C port for emergency device charging.',
        features: ['Piezoelectric Gen', 'Waterproof', 'Steel Toe', 'Power Bank']
    },
    'app-04': {
        name: 'Scarf: GLITCH',
        tagline: 'Face obfuscation.',
        description: 'Pattern dazzle knit to confuse facial recognition algorithms.',
        longDescription: 'Low-tech invisibility. The high-contrast geometric patterns on this scarf are designed to confuse CV (Computer Vision) algorithms, preventing facial mapping and automated tracking in public spaces.',
        features: ['Anti-CV Pattern', 'Thermal Weave', 'Modular Fit', 'Reflective']
    },
    'app-05': {
        name: 'Jacket: FARADAY',
        tagline: 'Signal proof.',
        description: 'Bomber jacket lined with full-body EMI shielding mesh.',
        longDescription: 'Become a ghost. The FARADAY jacket is lined with silver-nickel mesh, creating a wearable Faraday cage. Blocks 99% of RF signals, protecting your internal devices and vitals from electromagnetic interference and tracking.',
        features: ['Full EMI Shielding', 'Water Resistant', 'Hidden Pockets', 'Thermal Lining']
    },
    'app-06': {
        name: 'Sneakers: GRAV',
        tagline: 'Walk on air.',
        description: 'High-top sneakers with magnetic repulsion soles.',
        longDescription: 'Defy gravity. These sneakers use opposing magnetic fields in the sole to create a cushioning effect that reduces impact by 60%. Perfect for parkour or urban exploration.',
        features: ['Mag-Lev Soles', 'Impact Reduction', 'Ankle Support', 'Reactive Lace']
    },
    'food-01': { 
        name: "Neon Ramen Kit", 
        tagline: "Fuel for the late night.", 
        description: "Dehydrated spicy miso ramen with bio-luminescent garnish.", 
        longDescription: "High-calorie synthetic sustenance. This ramen kit features a spicy miso concentrate enriched with nootropics for cognitive enhancement. Includes a vial of edible bioluminescent algae that activates upon contact with hot water, providing ambient light during blackout coding sessions.", 
        features: ['Bioluminescent Edibles', '20g Synth-Protein', 'Spicy Miso', 'Nootropic Infused'] 
    },
    'food-02': { 
        name: "Syntax Energy: 12-Pack", 
        tagline: "Compile faster.", 
        description: "Carbonated nootropic energy drink. Sugar-free, crash-free.", 
        longDescription: "A hyper-oxygenated carbonated beverage designed to accelerate neural firing rates. Syntax Energy delivers a precise stack of Caffeine, L-Theanine, and Alpha-GPC, optimizing focus for 4-6 hour deep work sprints. Zero sugar content prevents metabolic crashes.", 
        features: ['Alpha-GPC Stack', 'Zero Sugar', '200mg Caffeine', 'Hyper-Oxygenated'] 
    },
    'food-03': { 
        name: "Void Burger: Freeze Dried", 
        tagline: "Tactical calories.", 
        description: "Plant-based burger patty, shelf-stable for 25 years.", 
        longDescription: "Emergency ration protein disc. The Void Burger utilizes textured vegetable protein and lab-grown myoglobin to mimic the texture and flavor of beef. Freeze-dried and vacuum sealed in military-grade mylar, it boasts a 25-year shelf life. Rehydrates in 10 minutes with cold water.", 
        features: ['25 Year Shelf Life', 'Lab-Grown Protein', 'Mylar Sealed', 'Cold Water Prep'] 
    },
    'food-04': {
        name: 'Spray: WAKE',
        tagline: 'Instant alert.',
        description: 'Sublingual caffeine spray for immediate absorption.',
        longDescription: 'No time to brew coffee. WAKE delivers 50mg of caffeine per spray directly under the tongue, bypassing digestion for near-instant alertness. Tastes like mint and ozone.',
        features: ['Instant Absorb', '50mg/Spray', 'Pocket Size', 'Zero Calorie']
    },
    'food-05': {
        name: 'Paste: RATION',
        tagline: 'Survival fuel.',
        description: 'All-in-one nutrient paste tube. 2000 calories.',
        longDescription: 'Complete nutrition in a tube. RATION paste contains 100% of your daily vitamins, minerals, and calories. Designed for long-duration missions where stopping to eat is not an option. Flavor: Neutral Grey.',
        features: ['2000 Calories', 'Complete Nutrition', 'Compact', 'Shelf Stable']
    },
    'food-06': {
        name: 'Gum: FOCUS',
        tagline: 'Chew to concentrate.',
        description: 'Nootropic chewing gum with sustained release caffeine.',
        longDescription: 'Cognitive enhancement in a chewable format. Each piece releases 40mg of caffeine and 60mg of L-Theanine over 30 minutes, providing a smooth, jitter-free boost to concentration. Mint flavor.',
        features: ['Fast Acting', 'L-Theanine', 'Sugar Free', 'Pocket Pack']
    },
    'food-07': {
        name: 'Hydra-Flask',
        tagline: 'Smart hydration.',
        description: 'Self-cleaning water bottle with intake tracking and UV purification.',
        longDescription: 'Drink safer. The Hydra-Flask uses UV-C light in the cap to neutralize 99.9% of bacteria and viruses every 2 hours. Integrated sensors track your water intake and sync to your health dashboard.',
        features: ['UV-C Purification', 'Intake Tracking', 'Temp Control', 'Self-Cleaning']
    },
    'edu-01': { 
        name: "Course: Netrunner 101", 
        tagline: "Digital self-defense.", 
        description: "Video series on cybersecurity basics, encryption, and footprint removal.", 
        longDescription: "A comprehensive curriculum on digital hygiene and offensive security. Netrunner 101 covers advanced encryption standards, traffic obfuscation via onion routing, and social engineering defense. Includes a virtual lab environment for practicing penetration testing safely.", 
        features: ['10 Hours Content', 'Virtual Pentest Lab', 'Certification', 'Dark Web Safety'] 
    },
    'edu-02': { 
        name: "Course: AI Prompt Engineering", 
        tagline: "Speak to the machine.", 
        description: "Advanced techniques for controlling LLMs and generators.", 
        longDescription: "Master the language of the machine. This course deconstructs the architecture of Large Language Models, teaching you how to craft high-fidelity prompts using chain-of-thought reasoning, few-shot learning, and parameter tuning. Essential for maximizing output from generative AI systems.", 
        features: ['Prompt Pattern Library', 'LLM Architecture', 'Advanced Logic', 'Discord Community'] 
    },
    'edu-03': {
        name: 'Course: Social Eng',
        tagline: 'Human hacking.',
        description: 'Psychological manipulation tactics for physical penetration testers.',
        longDescription: 'The weakest link is always human. Learn the art of pretexting, tailgating, and elicitation. This course covers behavioral psychology and non-verbal cues to bypass human firewalls.',
        features: ['Psychology', 'Pretexting', 'Body Language', 'Live Drills']
    },
    'edu-04': {
        name: 'Course: Quant-Crypto',
        tagline: 'Post-quantum.',
        description: 'Preparing your encryption standards for the quantum era.',
        longDescription: 'RSA is dead. Long live Lattice-based cryptography. Prepare your systems for the inevitable quantum decryption event (Q-Day). Learn to implement CRYSTALS-Kyber and Dilithium standards.',
        features: ['Lattice Crypto', 'Q-Day Prep', 'Algorithm Swap', 'Future Proofing']
    },
    'edu-05': {
        name: 'Course: Bio-Hacking',
        tagline: 'Upgrade your hardware.',
        description: 'Introduction to DIY biology, CRISPR basics, and implant safety.',
        longDescription: 'Take control of your own evolution. This course covers the basics of safe self-experimentation, from nutritional optimization to the theoretical application of CRISPR kits. Disclaimer: For educational purposes only.',
        features: ['CRISPR Basics', 'Implant Safety', 'Nutrigenomics', 'Lab Setup']
    },
    'edu-06': {
        name: 'Course: Off-Grid',
        tagline: 'Disappear completely.',
        description: 'Digital and physical evasion tactics for the modern era.',
        longDescription: 'How to vanish in a surveillance state. Learn to scrub your digital footprint, create aliases, and survive outside the grid. Includes modules on urban evasion and wilderness survival.',
        features: ['Digital Scrubbing', 'Alias Creation', 'Evasion Tactics', 'Survival Skills']
    },
    'deck-01': { 
        name: "Pitch Deck: OMEGA", 
        tagline: "For the unicorn startup.", 
        description: "High-contrast, data-dense investor deck. 50+ master slides.", 
        longDescription: "A pitch deck designed for high-velocity startups. OMEGA features a stark, high-contrast aesthetic with data-dense layouts ideal for fintech and cyber-security ventures. Includes 50+ master slides with automated financial charting linked to Excel.", 
        features: ['50+ Master Slides', 'Dark Mode Layout', 'Excel Data Link', 'Vector Assets'] 
    },
    'deck-02': { 
        name: "Quarterly Report: NEO", 
        tagline: "Data viz for the boardroom.", 
        description: "Clean, sterile Keynote template for complex metrics.", 
        longDescription: "Minimalist reporting suite for quarterly reviews. NEO focuses on clarity and sterility, stripping away unnecessary ornamentation to highlight KPIs. Features vector-based iconography and smooth 'Magic Move' transitions.", 
        features: ['16:9 Cinematic Ratio', 'Magic Move Ready', 'KPI Focus', 'Keynote Native'] 
    },
    'deck-04': { 
        name: "Venture Capital Protocol", 
        tagline: "The complete funding suite.", 
        description: "Bundle: Pitch Deck, One-Pager, and Financial Model.", 
        longDescription: "The all-in-one fundraising toolkit. Includes a persuasion-optimized Pitch Deck, a condensed One-Pager for initial outreach, and a robust Financial Model (XLS) with adjustable growth drivers. Formatted for easy export to PDF.", 
        features: ['Deck + One-Pager', 'XLS Financial Model', 'Investor Email Scripts', 'Icon Pack'] 
    },
    'deck-12': { 
        name: "Esports Tournament Pack", 
        tagline: "Game on.", 
        description: "High-energy overlays, sponsorship decks, and brackets.", 
        longDescription: "Broadcast-ready graphics package for competitive gaming events. Includes animated stream overlays, team roster intro slides, and dynamic tournament brackets. Optimized for OBS and XSplit integration.", 
        features: ['Stream Overlays', 'Bracket Logic', 'OBS Optimized', 'Multi-Format Export'] 
    },
    'deck-15': { 
        name: "Architectural: PLANS", 
        tagline: "Construct your vision.", 
        description: "Blueprint aesthetic for architects and engineers.", 
        longDescription: "Presentation framework inspired by technical blueprints. PLANS uses monospaced typography and grid-based layouts to convey precision and structural integrity. Ideal for architectural proposals and engineering project updates.", 
        features: ['CAD Grid Aesthetic', 'Scale Rule Elements', 'Timeline Charts', 'PowerPoint Native'] 
    },
    'deck-06': {
        name: 'Asset: Influencer',
        tagline: 'Social growth.',
        description: 'Media kit templates and sponsor rate sheets.',
        longDescription: 'Monetize your following. This pack includes professional media kits, rate cards, and email outreach templates designed to secure brand deals. Clean, modern aesthetics to showcase your metrics.',
        features: ['Media Kit', 'Rate Card', 'Email Scripts', 'Canva Ready']
    },
    'deck-07': {
        name: 'Deck: Crisis',
        tagline: 'PR disaster.',
        description: 'Emergency response communication templates.',
        longDescription: 'When things go wrong, control the narrative. This crisis management deck provides pre-written press releases, internal memos, and public apology structures to mitigate reputation damage swiftly.',
        features: ['Press Releases', 'Internal Memos', 'Apology Framework', 'Timeline Charts']
    },
    'deck-08': {
        name: 'Icon Pack: NEON',
        tagline: 'Glow up.',
        description: '5000+ holographic style icons for UI/UX projects.',
        longDescription: 'Add a futuristic glow to your interfaces. This pack contains over 5000 vector icons with a neon-glassmorphism style. Fully editable strokes and colors. Compatible with Figma, Sketch, and Adobe XD.',
        features: ['5000+ Vectors', 'Figma Component', 'Editable Stroke', 'SVG/PNG']
    },
    'deck-09': {
        name: 'Shader Pack: CYBER',
        tagline: 'Realistic materials.',
        description: 'Procedural shaders for Blender and Unity. Carbon, Neon, Metal.',
        longDescription: 'Texture your world. A library of 100+ procedural shaders designed for cyberpunk environments. Includes wet asphalt, brushed titanium, dirty glass, and flickering neon. Optimized for Cycles and Eevee.',
        features: ['100+ Materials', 'Procedural', '4K Maps', 'Blender/Unity']
    },
    'edtech-01': {
        name: 'Holo-Tutor Node',
        tagline: 'The classroom is everywhere.',
        description: 'Portable holographic projector with built-in AI curriculum modules.',
        longDescription: 'A compact, high-lumen holographic projector capable of rendering 3D interactive lessons in any environment. The Holo-Tutor connects to the TKYNOX educational grid, offering immersive modules on astrophysics, quantum computing, and synthetic biology. Voice-activated and gesture-controlled.',
        features: ['Holographic Projection', 'AI Curriculum', 'Gesture Control', 'Cloud Sync']
    },
    'edtech-02': {
        name: 'Memory Implant: BASICS',
        tagline: 'Learn instantly.',
        description: 'Neural chip for passive knowledge absorption during REM cycles.',
        longDescription: 'Bypass the learning curve. This neural lace implant passively stimulates the hippocampus during sleep, encoding foundational knowledge sets directly into long-term memory. This "BASICS" pack includes general relativity, conversational Mandarin, and Python syntax.',
        features: ['Instant Skill Load', 'Neural Interface', 'Language Pack', 'History DB']
    },
    'edtech-03': {
        name: 'Skillshard: CQC',
        tagline: 'Physical proficiency.',
        description: 'Neural download for Close Quarters Combat muscle memory.',
        longDescription: 'Why train when you can download? This shard uploads 10 years of Krav Maga and Jiu-Jitsu reflex data directly to your motor cortex. Warning: May cause temporary migraines and phantom limb sensations during integration.',
        features: ['Krav Maga Mastery', 'Jiu-Jitsu Reflexes', 'Instant Integration', 'Motor Cortex Sync']
    },
    'edtech-04': {
        name: 'VR Lab: CHEM-SIM',
        tagline: 'Safe experimentation.',
        description: 'Hazard-free virtual chemistry laboratory with realistic physics.',
        longDescription: 'Conduct volatile experiments without the risk of explosion. The CHEM-SIM VR environment accurately models molecular interactions and thermodynamic reactions, allowing students and professionals to prototype synthetic compounds in a zero-risk digital sandbox.',
        features: ['Molecular Physics', 'Infinite Reagents', 'Hazard Free', 'Export Data']
    },
    'edtech-05': {
        name: "Neural Language Pak",
        tagline: "Tower of Babel solved.",
        description: "Instant fluency in 50 major languages via cochlear implant.",
        longDescription: "Bypass years of study. This firmware update for standard cochlear implants translates incoming audio in real-time and modulates vocal chord vibrations to simulate fluency. Includes dialect sub-routines.",
        features: ['50 Languages', 'Real-time Translation', 'Vocal Modulation', 'Offline Mode']
    },
    'edtech-06': {
        name: "AR Workbench",
        tagline: "Engineering reality.",
        description: "Project blueprints onto physical objects for precise fabrication.",
        longDescription: "Augmented Reality for the workshop. This projector system overlays CAD files, cut lines, and assembly instructions directly onto your workbench. Calibrates to millimeter precision for rapid prototyping.",
        features: ['CAD Overlay', 'Millimeter Precision', 'Gesture Controls', 'Cloud Library']
    },
    'edtech-07': {
        name: 'Sim: HISTORY',
        tagline: 'Relive the past.',
        description: 'Full sensory VR history lessons. Witness events as they happened.',
        longDescription: 'History is no longer just text. Step into the shoes of historical figures with high-fidelity VR simulations. Witness the fall of Rome, the signing of the Magna Carta, or the first moon landing with total sensory immersion.',
        features: ['Sensory Immersion', 'Accurate Reconstructions', 'Interactive NPCs', 'Education Mode']
    },
    'edtech-08': {
        name: 'Link: MATH',
        tagline: 'Calculate instantly.',
        description: 'Neural coprocessor for arithmetic and complex calculus.',
        longDescription: 'Turn your brain into a supercomputer. This neural link applet offloads mathematical processing to a sub-cranial chip, allowing you to perform complex calculus and statistical analysis instantly. No more calculators.',
        features: ['Instant Calculus', 'Statistical Analysis', 'Encryption Breaking', 'HUD Overlay']
    },
    'edtech-09': {
        name: 'AI Tutor: SOCRATES',
        tagline: 'Philosophical debate.',
        description: 'AI debate partner trained on classical philosophy and logic.',
        longDescription: 'Sharpen your mind against the ancients. SOCRATES is a specialized LLM trained on the Socratic method. It doesn\'t give answers; it asks questions to guide you to the truth. Perfect for developing critical thinking.',
        features: ['Socratic Method', 'Logic Training', 'Debate Mode', 'Voice Interface']
    },
    'edtech-10': {
        name: 'VR Field Trip: MARS',
        tagline: 'Walk the red planet.',
        description: 'Photorealistic VR tour of Martian colonies and landscapes.',
        longDescription: 'Visit the frontier without leaving your pod. This VR experience uses rover data to reconstruct the surface of Mars with millimeter accuracy. Explore the Valles Marineris or tour the proposed SpaceX colony sites.',
        features: ['Photorealism', 'Rover Data', 'Guided Tours', 'Physics Sim']
    },
    'fintech-01': {
        name: 'Algo-Bot: ARBITRAGE',
        tagline: 'Market efficiency automated.',
        description: 'High-frequency trading algorithm for cross-exchange arbitrage.',
        longDescription: 'Dominate the spread. The ARBITRAGE bot monitors price discrepancies across 50+ decentralized exchanges, executing flash-loan backed trades in milliseconds to capture profit from inefficiencies. Comes with a risk-management dashboard and stop-loss protocols.',
        features: ['High Freq Trading', 'Multi-Exchange', 'Zero Latency', 'Risk Mgmt AI']
    },
    'fintech-02': {
        name: 'DeFi Dashboard PRO',
        tagline: 'Your wealth, visualized.',
        description: 'Comprehensive portfolio tracker for all EVM chains.',
        longDescription: 'Stop tracking your net worth in spreadsheets. This SaaS dashboard aggregates wallet data from Ethereum, Solana, and L2s into a single command center. Features automated tax harvesting suggestions, yield farming ROI calculators, and gas fee optimization.',
        features: ['Cross-Chain Tracking', 'Gas Optimization', 'Yield Farming', 'Tax Export']
    },
    'fintech-03': {
        name: 'Ledger Plate: TITANIUM',
        tagline: 'Indestructible seed.',
        description: 'Fireproof, acid-proof titanium plate for cold storage seed phrases.',
        longDescription: 'Paper burns. Electronics fail. Titanium endures. This laser-etched recovery plate allows you to punch your 24-word mnemonic seed phrase into solid aerospace-grade titanium. Resistant to temperatures up to 3000°F and complete corrosion immunity.',
        features: ['Fireproof 3000°F', 'Acid Resistant', 'Tamper Evident', 'Laser Etched']
    },
    'fintech-04': {
        name: 'Ghost Wallet',
        tagline: 'Invisible assets.',
        description: 'Hardware wallet with plausible deniability and obfuscated routing.',
        longDescription: 'A hardware wallet that looks like a standard credit card calculator. The Ghost Wallet features a hidden partition accessed only by a specific PIN sequence, allowing you to surrender a "decoy" wallet under duress while your main assets remain cryptographically invisible.',
        features: ['Decoy Partition', 'Air-Gapped', 'Calculator Camouflage', 'Self-Destruct']
    },
    'fintech-05': {
        name: "Compliance AI",
        tagline: "Audit proof.",
        description: "Real-time tax and regulatory compliance for DAO structures.",
        longDescription: "Navigate the regulatory minefield. This AI agent monitors DAO treasury transactions in real-time, automatically flagging potential securities violations and generating tax reports for 50+ jurisdictions.",
        features: ['DAO Auditing', 'Tax Generation', 'Regulatory Shield', 'Jurisdiction Map']
    },
    'fintech-06': {
        name: "Maritime Node",
        tagline: "Sovereign hosting.",
        description: "1/1000th share of a server rack located in international waters.",
        longDescription: "True decentralization requires physical sovereignty. Rent fractional ownership of a server node located on an autonomous barge in international waters. Immune to terrestrial seizure and jurisdictional firewalls.",
        features: ['International Waters', 'Satellite Uplink', 'Physical Sovereignty', 'Immune Hosting']
    },
    'fintech-07': {
        name: 'DAO: OFFSHORE',
        tagline: 'Jurisdiction hop.',
        description: 'Automated legal entity setup in crypto-friendly zones.',
        longDescription: 'Spin up a legal wrapper for your DAO in minutes. This service automatically registers an LLC in Panama, Nevis, or Wyoming, providing your decentralized organization with real-world legal standing and banking access.',
        features: ['Instant LLC', 'Bank Accounts', 'Legal Wrapper', 'Privacy Shield']
    },
    'fintech-08': {
        name: 'Service: WIPE',
        tagline: 'Fresh start.',
        description: 'Credit history obfuscation and digital identity reset.',
        longDescription: 'Erase the past. This service uses legal loopholes and data-poisoning techniques to obfuscate your credit history and remove compromising data from data-broker databases. A fresh financial start.',
        features: ['Credit Repair', 'Data Removal', 'Identity Reset', 'Legal Loophole']
    },
    'fintech-09': {
        name: 'Tax-Haven AI',
        tagline: 'Optimize liability.',
        description: 'AI agent that routes profits through international treaties.',
        longDescription: 'Keep what you earn. This AI analyzes international tax treaties in real-time to suggest the optimal flow of funds for digital assets. Automatically generates documentation for compliance in selected jurisdictions.',
        features: ['Treaty Analysis', 'Profit Routing', 'Auto-Compliance', 'Multi-Jurisdiction']
    },
    'fintech-10': {
        name: 'Flash-Loan Bot',
        tagline: 'Arbitrage execute.',
        description: 'Pre-configured script for executing millions in flash loans.',
        longDescription: 'Play with the whales. This bot script allows you to borrow millions in crypto assets for a single transaction block to execute arbitrage opportunities. No collateral required, just gas fees.',
        features: ['Zero Collateral', 'Aave/dYdX Ready', 'Strategy Library', 'Gas Optimization']
    },
    'well-01': {
        name: 'Sleep Pod: STASIS',
        tagline: 'Perfect rest.',
        description: 'Cryo-cooling sleep chamber with sensory isolation.',
        longDescription: 'Recover like a professional athlete. The STASIS pod utilizes mild cryotherapy and total sensory deprivation to accelerate muscle repair and optimize REM cycles. Bio-sensors adjust temperature and oxygen levels in real-time to maintain the deepest possible sleep state.',
        features: ['Cryo-Cooling', 'Sound Isolation', 'Bio-Monitoring', 'REM Optimization']
    },
    'well-02': {
        name: 'Bio-Feedback Ring',
        tagline: 'Know your body.',
        description: 'Discreet titanium ring for tracking HRV, stress, and sleep.',
        longDescription: 'A minimalist health tracker encased in aerospace-grade titanium. Measures Heart Rate Variability (HRV), skin temperature, and blood oxygen levels to provide a daily "Readiness Score." Waterproof up to 100m and boasts a 7-day battery life.',
        features: ['HRV Tracking', 'Stress Analysis', 'Sleep Stage Data', 'Waterproof']
    },
    'well-03': {
        name: 'Circadian Lamp: HELIOS',
        tagline: 'Artificial sunlight.',
        description: 'Full-spectrum smart light that syncs with natural solar cycles.',
        longDescription: 'Combat the gloom of the under-city. The HELIOS lamp replicates the exact spectral composition of natural sunlight, dynamically adjusting throughout the day to regulate your cortisol and melatonin levels. Essential for windowless hab-blocks.',
        features: ['10k Lux Output', 'Solar Sync', 'UV-Free', 'Mood Regulation']
    },
    'well-04': {
        name: 'Stim-Patch: FOCUS',
        tagline: 'Dermal delivery.',
        description: 'Transdermal patch delivering timed-release caffeine and B12.',
        longDescription: 'Bypass the digestive system. The FOCUS patch delivers a steady stream of Caffeine, Vitamin B12, and L-Tyrosine directly into the bloodstream over 8 hours. Provides sustained energy without the jitters or crash associated with oral stimulants.',
        features: ['8 Hour Release', 'Transdermal', 'Zero Calorie', 'No Jitters']
    },
    'well-05': {
        name: "Algae Scrubber",
        tagline: "Breath deep.",
        description: "Bioluminescent algae reactor that scrubs CO2 and releases pure O2.",
        longDescription: "Industrial air purification for the home. This reactor uses genetically modified bioluminescent algae to consume CO2 and pollutants at 10x the rate of houseplants. Emits a soft green glow and pure, filtered oxygen.",
        features: ['CO2 Reduction', 'O2 Generation', 'Bioluminescent', 'Self-Sustaining']
    },
    'well-06': {
        name: "Dermal Shield",
        tagline: "Skin 2.0.",
        description: "Spray-on polymer coating. UV blocking, pollution resistant, hydrophobic.",
        longDescription: "Armor for your epidermis. This nanotech polymer spray creates an invisible, breathable second skin that blocks 100% of UV rays and urban pollutants. Hydrophobic properties mean you never get wet in the acid rain.",
        features: ['UV Block', 'Pollution Shield', 'Hydrophobic', 'Invisible']
    },
    'well-07': {
        name: 'Bots: IMMUNE',
        tagline: 'Internal defense.',
        description: 'Bloodstream nanobots that hunt pathogens and repair tissue.',
        longDescription: 'The ultimate vaccine. A colony of 10,000 programmable nanobots injected into the bloodstream. They hunt viral loads, repair minor tissue damage, and accelerate clotting in case of injury. Requires annual firmware update.',
        features: ['Viral Defense', 'Tissue Repair', 'Clotting Agent', 'Self-Replicating']
    },
    'well-08': {
        name: 'Blanket: GRAVITY',
        tagline: 'Deep pressure.',
        description: 'Variable weight blanket with haptic soothing.',
        longDescription: 'Sleep deeper. The GRAVITY blanket uses fluid-filled chambers to adjust its weight distribution in real-time, providing optimal deep pressure stimulation to reduce anxiety and lower cortisol levels. Haptic motors provide gentle massage.',
        features: ['Adjustable Weight', 'Haptic Massage', 'Temp Control', 'Anxiety Reduction']
    },
    'well-09': {
        name: 'Gravity Boots',
        tagline: 'Decompress.',
        description: 'Inversion therapy boots for spinal health.',
        longDescription: 'Counteract the compression of gravity. These inversion boots allow you to hang safely upside down, decompressing the spine and increasing blood flow to the brain. Essential for anyone spending 12+ hours in a chair.',
        features: ['Spinal Decompression', 'Secure Lock', 'High Comfort', 'Circulation Boost']
    },
    'well-10': {
        name: 'Smart Pillow',
        tagline: 'Active cooling.',
        description: 'Temperature regulating pillow with sleep cycle tracking.',
        longDescription: 'The cool side of the pillow, always. This memory foam smart pillow uses a liquid cooling layer to maintain optimal head temperature. Integrated sensors track movement and sleep cycles, waking you gently during light sleep.',
        features: ['Active Cooling', 'Sleep Tracking', 'Smart Alarm', 'Memory Foam']
    },
    'auto-01': {
        name: 'Smart Drone: OBSERVER',
        tagline: 'Eyes in the sky.',
        description: 'Autonomous security drone with facial recognition and patrol paths.',
        longDescription: 'Secure your perimeter. The OBSERVER drone autonomously patrols designated waypoints, using thermal imaging and AI facial recognition to detect intruders. Returns to its solar-charging dock automatically when battery levels are critical.',
        features: ['Autonomous Patrol', '4K Night Vision', 'Facial Recog', 'Solar Charging']
    },
    'auto-02': {
        name: 'Script Pack: OMNI',
        tagline: 'Control your castle.',
        description: 'Universal automation scripts for HomeOS and IoT devices.',
        longDescription: 'One language to rule them all. The OMNI script pack unifies fragmented smart home ecosystems (Zigbee, Z-Wave, WiFi) into a single logic layer. Includes pre-written subroutines for energy management, security lockdown, and ambient lighting themes.',
        features: ['HomeOS Integration', 'Voice Control', 'Energy Mgmt', 'Security Protocols']
    },
    'auto-03': {
        name: 'Hydro-Controller: VERDANT',
        tagline: 'Automated botany.',
        description: 'AI-driven nutrient and water management for hydroponic setups.',
        longDescription: 'Grow food in the void. The VERDANT controller manages pH, EC, and water levels for home hydroponic systems. Its AI analyzes plant growth patterns via camera feed to optimize nutrient delivery schedules, ensuring maximum yield with zero effort.',
        features: ['pH/EC Balancing', 'Growth AI', 'Leak Detection', 'Remote Monitoring']
    },
    'auto-04': {
        name: 'Servo Arm: ASSIST',
        tagline: 'Third hand.',
        description: 'Desktop robotic arm for soldering, holding, and precision tasks.',
        longDescription: 'The ultimate workbench companion. This 6-axis robotic arm features sub-millimeter precision, ideal for holding circuit boards during soldering or performing repetitive assembly tasks. Voice controlled via local API.',
        features: ['6-Axis Motion', 'Voice Control', 'Precision Grip', 'Open Source API']
    },
    'auto-05': {
        name: "Unit: KAI",
        tagline: "Domestic assistant.",
        description: "Bipedal robotics platform for household chores. 4hr battery life.",
        longDescription: "The future of domestic servitude. KAI is a 4ft tall bipedal robot capable of performing complex household tasks such as laundry, dishwashing, and basic cleaning. Features obstacle avoidance and a friendly LED faceplate.",
        features: ['Bipedal Motion', 'Task Learning', '4hr Battery', 'Auto-Docking']
    },
    'auto-06': {
        name: "Nutri-Printer",
        tagline: "Cook from code.",
        description: "3D food printer using cartridge pastes. Prints meals in 5 minutes.",
        longDescription: "The microwave of the 22nd century. This additive manufacturing unit prints edible meals from nutrient paste cartridges. Download recipes from the cloud and print intricate, nutritious meals in minutes. Requires subscription for paste refills.",
        features: ['Additive Cooking', 'Cloud Recipes', 'Paste Cartridges', 'Precise Calorie Count']
    },
    'auto-07': {
        name: 'Swarm: CLEAN',
        tagline: 'Dust destroyers.',
        description: '100 mini-drones for cleaning hard-to-reach areas.',
        longDescription: 'Unleash the swarm. A hive of 100 walnut-sized drones that map your home and scrub every surface. They communicate via a local mesh network to coordinate cleaning patterns and return to the hive for charging.',
        features: ['Swarm AI', 'Mesh Network', 'HEPA Filtration', 'Silent Operation']
    },
    'auto-08': {
        name: 'Turret: SENTRY',
        tagline: 'Active denial.',
        description: 'Automated paintball/pepper spray tracking turret.',
        longDescription: 'Home defense automated. This tracking turret uses motion sensors and thermal imaging to identify intruders. Can be loaded with pepper balls or marking paint. Remote override via app. Warning: Check local laws.',
        features: ['Motion Tracking', 'Thermal Imaging', 'Remote Fire', 'Deterrent Mode']
    },
    'auto-09': {
        name: 'Gardener Bot',
        tagline: 'Green thumb.',
        description: 'Small rover for indoor plant care and monitoring.',
        longDescription: 'Keep your jungle alive. This small rover navigates your home, checking soil moisture and light levels for all your plants. Can water them autonomously via a built-in tank. Cute and functional.',
        features: ['Soil Sensing', 'Auto-Watering', 'Plant Database', 'Obstacle Avoidance']
    },
    'auto-10': {
        name: 'Smart Lock: RETINA',
        tagline: 'Access control.',
        description: 'Biometric door lock with iris scanning.',
        longDescription: 'Keys are obsolete. This retrofit smart lock scans your iris to unlock your door in under 0.5 seconds. Logs all entries and alerts your phone to unauthorized attempts. Battery lasts 2 years.',
        features: ['Iris Scan', 'Entry Logs', 'Remote Lock', 'Battery Powered']
    },
    'temp-01': {
        name: 'Notion: LIFE_OS',
        tagline: 'Organize the chaos.',
        description: 'Complete operating system for personal productivity in Notion.',
        longDescription: 'Get your life in order. LIFE_OS is a comprehensive Notion workspace featuring interconnected databases for Project Management, Habit Tracking, Financial Planning, and Knowledge Management. Designed with a dark-mode-first aesthetic.',
        features: ['Project Mgmt', 'Habit Tracking', 'Finance Tracker', 'Dark Mode']
    },
    'temp-02': {
        name: 'UI Kit: NEON_GRID',
        tagline: 'Design the future.',
        description: 'Cyberpunk UI component library for Figma and React.',
        longDescription: 'Build interfaces that look like they belong in 2077. The NEON_GRID UI kit provides hundreds of pre-built components (buttons, inputs, graphs) with a glowing, futuristic aesthetic. Includes React implementation code for rapid deployment.',
        features: ['Figma Components', 'React Code', 'Cyberpunk Styles', 'Icon Set']
    },
    'temp-03': {
        name: '3D Kitbash: SLUMS',
        tagline: 'Build the underworld.',
        description: 'High-fidelity 3D asset pack for Blender and Unreal Engine.',
        longDescription: 'Create dystopian environments in minutes. This kitbash set includes over 200 modular assets: AC units, cables, neon signs, and modular concrete walls. Textures included at 4K resolution. Optimized for real-time rendering.',
        features: ['200+ Models', '4K Textures', 'Blender/UE5', 'Modular Design']
    },
    'temp-04': {
        name: 'Font Pack: GLYPHS',
        tagline: 'Language of the machine.',
        description: 'Set of 5 futuristic display fonts with alternate glyphs.',
        longDescription: 'Typography for the post-human era. Includes 5 distinct font families ranging from brutalist block type to glitch-heavy display faces. Comes with a full set of alphanumeric characters and abstract UI glyphs.',
        features: ['5 Font Families', 'OTF/TTF/WOFF', 'UI Glyphs', 'Commercial License']
    },
    'temp-05': {
        name: "Legal OS",
        tagline: "Automated counsel.",
        description: "Contract templates and case management system for cyber-law.",
        longDescription: "Turnkey legal infrastructure for the digital age. Includes smart contract auditing templates, NDA generators, and IP assignment agreements tailored for software and crypto entities.",
        features: ['Smart Contract Audits', 'NDA Generator', 'IP Assignment', 'Case Management']
    },
    'temp-06': {
        name: "Stream Pack: VOID",
        tagline: "Broadcast yourself.",
        description: "Minimalist, high-performance OBS overlays for coding streamers.",
        longDescription: "A streaming package designed for developers. Low-CPU overhead overlays that integrate with your IDE theme. Includes starting screens, transitions, and alert boxes that don't distract from the code.",
        features: ['OBS Ready', 'IDE Integration', 'Low CPU Usage', 'Minimalist Design']
    },
    'temp-07': {
        name: 'Doc: MANIFESTO',
        tagline: 'Start a cult.',
        description: 'Persuasive writing structures for manifestos and whitepapers.',
        longDescription: 'Words move worlds. This template pack provides the structural skeleton for high-impact manifestos. Based on analysis of historical revolutionary texts. Fill in the blanks to start your movement.',
        features: ['Rhetorical Structure', 'Persuasion AI', 'Typography Guide', 'PDF Export']
    },
    'temp-08': {
        name: 'Gen: WHITEPAPER',
        tagline: 'Instant credibility.',
        description: 'Technical document generator for crypto projects.',
        longDescription: 'Look the part. This generator creates professional-grade whitepapers with academic formatting, LaTeX support, and auto-generated citations. Perfect for launching your next token.',
        features: ['LaTeX Support', 'Academic Format', 'Chart Integration', 'Citation Manager']
    },
    'temp-09': {
        name: 'Dashboard: ADMIN',
        tagline: 'Control panel.',
        description: 'React/Tailwind admin dashboard template.',
        longDescription: 'A comprehensive admin dashboard template built with React and Tailwind CSS. Features include data tables, charts, user management, and a fully responsive layout. Dark mode enabled by default.',
        features: ['React + Tailwind', 'Responsive', 'Charts', 'Dark Mode']
    },
    'temp-10': {
        name: 'App: FINTECH',
        tagline: 'Mobile banking.',
        description: 'UI/UX kit for a mobile finance application.',
        longDescription: 'Launch your fintech app faster. This UI kit contains over 100 screens for a mobile banking application, including onboarding, transfers, crypto wallets, and settings. Clean, modern, and secure aesthetic.',
        features: ['100+ Screens', 'Figma File', 'iOS/Android', 'Prototyped']
    },
    'sec-01': {
        name: 'RF Jammer: SILENCE',
        tagline: 'Go dark.',
        description: 'Portable signal blocker for local RF, WiFi, and Cellular frequencies.',
        longDescription: 'Create a digital dead zone. The SILENCE unit creates a 20-meter bubble where no wireless signals can enter or exit. Ideal for sensitive meetings or preventing remote detonation of devices. Operates on a discrete wideband frequency hopping spectrum.',
        features: ['Wideband Blocking', 'Portable Battery', 'Directional Antenna', 'Stealth Mode']
    },
    'sec-02': {
        name: 'Retinal Scanner',
        tagline: 'Biometric fortress.',
        description: 'Military-grade iris recognition lock for physical access control.',
        longDescription: 'Keys can be stolen; your eyes cannot. This flush-mount retinal scanner uses infrared mapping to authenticate identity with 99.999% accuracy. Features liveness detection to prevent spoofing via high-res photography or prosthetics. Logs all entry attempts to the local server.',
        features: ['Iris Recognition', 'Spoof Detection', 'Networked Log', 'Fail-Secure']
    },
    'sec-03': {
        name: 'Acoustic Dampener',
        tagline: 'Silence the room.',
        description: 'Active noise cancellation emitter for secure conversations.',
        longDescription: 'Prevent laser microphones and eavesdropping. This tabletop device emits ultrasonic white noise that vibrates nearby surfaces (windows, walls), rendering remote listening devices useless. Portable and rechargeable.',
        features: ['Ultrasonic Shield', 'Vibration Transducer', 'Portable', 'Anti-Laser Mic']
    },
    'sec-04': {
        name: 'Data Shredder: THERMITE',
        tagline: 'Physical deletion.',
        description: 'Compact thermite charge for instant hard drive destruction.',
        longDescription: 'When wiping the drive isn\'t enough. The THERMITE pouch mounts directly onto a standard HDD or SSD. Upon remote activation, it burns at 4000°F, physically melting the platters and chips into slag. Irrecoverable. Guaranteed.',
        features: ['4000°F Burn', 'Remote Trigger', 'Instant slag', 'Forensic Proof']
    },
    'sec-05': {
        name: "EMP Pen",
        tagline: "Kill switch.",
        description: "Single-use directed electromagnetic pulse generator.",
        longDescription: "A discrete tactical pen capable of emitting a focused electromagnetic pulse. Instantly fries unshielded electronics within a 1-meter radius. Ideal for disabling cameras, smart locks, or compromising data storage devices in emergencies.",
        features: ['Directed EMP', '1m Effective Range', 'Single Use', 'Discreet Form Factor']
    },
    'sec-06': {
        name: "Faraday Tent",
        tagline: "Zero signal.",
        description: "Portable sleeping enclosure blocking all RF, GPS, and Cellular signals.",
        longDescription: "Go completely off-grid while you sleep. This pop-up shelter is lined with copper-nickel fabric that blocks 100% of wireless signals (WiFi, Bluetooth, 5G, GPS). Ensures zero digital tracking and protection from directed energy interference.",
        features: ['100dB Attenuation', 'Pop-Up Setup', 'Thermal Lining', 'Portable']
    },
    'sec-07': {
        name: 'Mask: VOX',
        tagline: 'Voice change.',
        description: 'Real-time formant shifting voice changer mask.',
        longDescription: 'Anonymize your audio signature. The VOX mask processes your voice in real-time, shifting pitch and formants to make voiceprint identification impossible. Looks like a standard respirator.',
        features: ['Formant Shifting', 'Zero Latency', 'Respirator Style', 'Battery Powered']
    },
    'sec-08': {
        name: 'Key: QUANTUM',
        tagline: 'Unbreakable.',
        description: 'Quantum entangled pair key fob for absolute secure entry.',
        longDescription: 'The ultimate lockpick-proof key. This fob contains a particle entangled with its matching lock. Any attempt to intercept or duplicate the signal destroys the quantum state, alerting the owner instantly.',
        features: ['Entangled Pair', 'Tamper Proof', 'Instant Alert', 'Physics Based']
    },
    'sec-09': {
        name: 'Drone Jammer',
        tagline: 'No fly zone.',
        description: 'Handheld device to safely land unauthorized drones.',
        longDescription: 'Take control of your airspace. This handheld device disrupts the control frequencies of commercial drones, forcing them to land safely or return to home. Range: 1km.',
        features: ['1km Range', 'Safe Landing', 'Handheld', 'Rechargeable']
    },
    'sec-10': {
        name: 'Bio-Safe',
        tagline: 'Secure storage.',
        description: 'Portable safe with fingerprint and DNA verification.',
        longDescription: 'For your most sensitive items. This portable safe uses a dual-layer biometric lock: fingerprint scan and a rapid DNA sequencer. Indestructible carbon-fiber shell.',
        features: ['DNA Verification', 'Fingerprint Scan', 'Carbon Fiber', 'GPS Tracking']
    }
};
