# Image Generation Prompts — Innovation Lab: Mission Control

> **61 images total.** 5 stock photos + 56 AI-generated. All output as PNG except banners (JPG).
> Save to `public/images/<category>/<filename>`.
> The app works without images (emoji/CSS fallback via GameImage component) — images are progressive enhancement.

## Global Style Guide

**UI context:** Dark-themed mission control interface. Background is near-black (#0c0d1e), accent purple (#7B2D8E), secondary blue (#4472C4). All images must read well at small sizes against dark backgrounds.

**AI art style (unless noted otherwise):** Semi-stylised digital illustration. Clean linework, rich but muted tones, subtle glow/light effects. NOT photorealistic — think editorial illustration meets game UI. Transparent or dark backgrounds where possible.

---

## 1. Scenario Banners (3 images — stock photos)

**Size:** 1200×400px, JPG, landscape
**Style:** High-quality stock photography with cinematic color grading. Dark/moody tone.

### `banners/scenario-1.jpg` — The Silent Epidemic
> Misty highland landscape in East/Central Africa at dawn. Rolling green hills, a winding dirt road disappearing into fog. A small rural health clinic or dispensary visible in the distance. Cinematic, slightly desaturated warm tones. Sense of isolation and quiet urgency.

### `banners/scenario-2.jpg` — The Invisible Threat
> Dense urban skyline of a Sub-Saharan African city at twilight. Mix of modern high-rises and informal settlements. Hazy air quality, warm amber streetlights. A busy market or street scene in the foreground. Sense of scale, density, and hidden danger.

### `banners/scenario-3.jpg` — The Long Game
> Lakeside scene in a displacement/refugee camp setting. Rows of white UNHCR-style tents near a large lake at golden hour. People moving between structures. Distant mountains. Mood of resilience and uncertainty.

---

## 2. Role Portraits (6 images)

**Size:** 256×256px, PNG, transparent background
**Style:** Stylised digital portrait illustration. Warm, expressive, diverse. Semi-realistic with clean edges. Each character should feel like a distinct personality. Dark clothing/backgrounds to suit the dark UI. Shoulders-up framing.

### `portraits/minister.png` — Minister of Health
> African woman in her 50s, wearing a tailored dark blazer with a small national flag pin. Confident, authoritative expression. Short natural hair. Reading glasses pushed up on her head. Subtle purple accent lighting.

### `portraits/ngo-director.png` — NGO Director
> South Asian man in his 40s, wearing a weathered field vest over a collared shirt. Warm, determined expression. Slight stubble. Lanyard with ID badge visible. Outdoor lighting feel, warm tones.

### `portraits/chw.png` — Community Health Worker
> Young East African woman in her late 20s, wearing a bright medical smock/tabard. Wide genuine smile. Stethoscope around neck. Hair tied back practically. Warm community setting implied. Empathetic, approachable.

### `portraits/tech-entrepreneur.png` — Tech Entrepreneur
> Mixed-race man in his 30s, wearing a dark tech-company hoodie. Alert, creative expression. Modern glasses. Laptop or tablet partially visible. Cool blue accent lighting. Silicon Valley meets global health.

### `portraits/who-advisor.png` — WHO Regional Advisor
> South American woman in her 50s, wearing a white lab coat over smart-casual attire. Analytical, calm expression. Silver-streaked hair in a bun. WHO logo subtly visible. Neutral, clinical lighting.

### `portraits/patient-advocate.png` — Patient Advocate
> Young West African man in his 20s, wearing a simple t-shirt. Earnest, passionate expression. A community meeting setting implied in body language. Raw, authentic feel. Warm orange-amber tones.

---

## 3. Achievement Badges (20 images)

**Size:** 128×128px, PNG, transparent background
**Style:** Circular medal/shield/emblem design. Bold, iconic, readable at 36px. Each badge has a distinct color accent matching its category:
- Role Mastery: Purple (#7B2D8E)
- Innovation Strategy: Blue (#4472C4)
- Decision Making: Green (#10b981)
- Engagement: Amber (#f59e0b)
- Hidden/Rare: Red (#dc2626)

Metallic rim/border. Central icon should be simple and symbolic. Think game achievement badges — clean, recognizable at a glance.

### Role Mastery (Purple)

#### `achievements/against-the-grain.png`
> Circular badge, purple metallic rim. Central icon: an arrow pointing against a stream of other arrows — going the opposite direction. Symbolises defying expectations. Slightly rebellious energy.

#### `achievements/true-to-form.png`
> Circular badge, purple metallic rim. Central icon: a bullseye/target with an arrow dead center. Precision and mastery. Clean geometric design.

#### `achievements/perspective-shift.png`
> Circular badge, purple metallic rim. Central icon: two overlapping speech bubbles or two faces looking at each other — representing different viewpoints merging. Rotation/swap motif.

#### `achievements/the-diplomat.png`
> Circular badge, purple metallic rim. Central icon: a handshake or olive branch. Balance and negotiation. Elegant, dignified feel.

### Innovation Strategy (Blue)

#### `achievements/frugal-champion.png`
> Circular badge, blue metallic rim. Central icon: a lightbulb made from recycled/simple materials — paper, wire. Resourcefulness and ingenuity. Warm glow emanating from the bulb.

#### `achievements/full-spectrum.png`
> Circular badge, blue metallic rim. Central icon: a prism splitting white light into a rainbow spectrum. Diversity of approaches. Vibrant but controlled.

#### `achievements/budget-hawk.png`
> Circular badge, blue metallic rim. Central icon: an eagle/hawk in flight with a coin or dollar symbol in its talons. Sharp, efficient predator energy. Precision spending.

#### `achievements/all-in.png`
> Circular badge, blue metallic rim. Central icon: a stack of poker chips being pushed forward, or a hand pushing all chips to the center. Bold, high-stakes gamble.

### Decision Making (Green)

#### `achievements/community-first-x3.png`
> Circular badge, green metallic rim. Central icon: three people/figures standing together with a heart or shield above them. Community protection. Warm, human.

#### `achievements/balanced-leader.png`
> Circular badge, green metallic rim. Central icon: a perfectly balanced scale/seesaw. Equilibrium. Clean, symmetrical, harmonious.

#### `achievements/bold-move.png`
> Circular badge, green metallic rim. Central icon: a lightning bolt or chess knight making a dramatic move. Courage under pressure. Dynamic, angular.

#### `achievements/evidence-based.png`
> Circular badge, green metallic rim. Central icon: a magnifying glass over a data chart/graph. Scientific rigor. Sharp, analytical.

### Engagement & Reflection (Amber)

#### `achievements/deep-thinker.png`
> Circular badge, amber metallic rim. Central icon: a glowing brain or head silhouette with visible thought patterns/neural connections. Introspection. Warm, cerebral glow.

#### `achievements/completionist.png`
> Circular badge, amber metallic rim. Central icon: a checklist with all items ticked, or a filled progress circle at 100%. Thoroughness and dedication.

#### `achievements/explorer.png`
> Circular badge, amber metallic rim. Central icon: a compass rose or telescope. Discovery and curiosity. Adventurous feel.

#### `achievements/mission-veteran.png`
> Circular badge, amber metallic rim. Central icon: a military-style service medal or campaign ribbon with three stars (one per scenario). Honour and completion.

### Hidden / Rare (Red)

#### `achievements/crisis-commander.png`
> Circular badge, red metallic rim. Central icon: a shield with a red cross/medical symbol, surrounded by radiating alert lines. Emergency leadership. Intense, commanding.

#### `achievements/secret-objective-complete.png`
> Circular badge, red metallic rim. Central icon: an opened padlock with a glowing keyhole, or a sealed envelope being opened revealing a star. Hidden mission accomplished.

#### `achievements/the-outlier.png`
> Circular badge, red metallic rim. Central icon: a graph line that spikes dramatically upward or downward, breaking through the chart boundary. Statistical anomaly. Dynamic, disruptive.

#### `achievements/global-health-leader.png`
> Circular badge, red metallic rim. Central icon: a globe wrapped in a laurel wreath with a medical caduceus. The ultimate achievement. Grand, prestigious. Gold accents on the red.

---

## 4. Crisis Event Art (6 images)

**Size:** 256×256px, PNG
**Style:** Dramatic, high-contrast editorial illustration. Red/orange/amber danger tones. Slightly desaturated to feel urgent and serious. Each should immediately convey the nature of the crisis. Dark background to suit UI.

### `crisis/landslide.png` — Landslide Blocks Highland Road
> A dramatic mountain road severed by a massive landslide. Boulders and mud covering the path. Misty highland backdrop. A small health clinic visible on the other side of the blockage. Red-amber danger palette.

### `crisis/tba-backlash.png` — Traditional Birth Attendant Backlash
> A group of elder women (traditional birth attendants) standing firm with crossed arms, faces showing disapproval. A modern health worker in the background looking concerned. Tension between tradition and modernity. Warm amber tones.

### `crisis/counterfeit-drugs.png` — Counterfeit Antimalarials Detected
> A broken blister pack of pills spilling out, with some pills visibly different/fake. A microscope or lab setting in the background. Warning/danger red accent. Forensic, investigative feel.

### `crisis/power-failure.png` — Hospital Power Grid Failure
> A hospital corridor plunged into darkness, lit only by emergency red lights and a single torch/flashlight beam. Medical equipment silhouettes visible. Urgent, claustrophobic.

### `crisis/refugee-influx.png` — Sudden Refugee Influx
> A long line of people arriving at a lakeside border crossing/camp entrance. Carried belongings, children, exhaustion visible. UNHCR-style registration tent. Golden hour light creating long shadows. Human scale of displacement.

### `crisis/funding-freeze.png` — International Funding Freeze
> A symbolic image: a large padlock or ice block encasing a stack of currency/aid packages. Government buildings or UN flags in the background. Cold blue tones contrasting with the warm needs of the setting. Bureaucratic frustration.

---

## 5. Innovation Icons (20 images)

**Size:** 128×128px, PNG, transparent background
**Style:** Isometric or flat-style illustration. Clean, modern, slightly stylised. Each icon should represent the innovation in use — not just the object, but its context. Consistent style across all 20. Muted colour palette with one accent colour per category:
- Frugal: Warm orange (#f97316)
- Social/Big Data: Teal (#14b8a6)
- Patient-Centric: Rose (#f43f5e)
- Digital Health/AI: Blue (#3b82f6)
- GenAI: Purple (#a855f7)

### Frugal Innovations (Orange accent)

#### `innovations/pph-drape.png` — PPH Calibrated Drape
> A simple medical drape with measurement markings, shown being used during childbirth. A midwife's hands visible. Focus on the low-cost, life-saving simplicity.

#### `innovations/dual-bednets.png` — Dual-Ingredient Bed Nets
> A bed net draped over a sleeping figure, with a subtle glow indicating the dual chemical barrier. A mosquito bouncing off the net. Night-time scene.

#### `innovations/foldscope.png` — Foldscope Paper Microscope
> An origami-like paper microscope being held up to the eye by a field worker. Magnified parasites visible in a circular inset. Playful, ingenious design.

#### `innovations/solar-cold-chain.png` — Solar Direct Drive Cold Chain
> A solar panel connected to a vaccine refrigerator in a rural clinic. Sun beating down. Vials of vaccine visible inside the fridge. Clean energy meets healthcare.

#### `innovations/ovision.png` — OVision Pi Diagnostic
> A small Raspberry Pi-based device with a screen showing diagnostic results. A lab technician looking at results in a basic clinic setting. Compact, affordable technology.

### Social/Big Data (Teal accent)

#### `innovations/wastewater-surveillance.png` — Wastewater Epidemiology
> A sewage sampling station with ML algorithms visualised as data flowing from the water sample. A city map in the background with outbreak hotspots highlighted.

#### `innovations/ml-food-security.png` — ML Food Insecurity Early Warning
> A dashboard showing nutritional data overlaid on a map of agricultural regions. Satellite imagery and market price graphs feeding into a central prediction model.

#### `innovations/climate-ml-forecast.png` — Climate ML Forecast
> Weather satellite data merging with health data streams. A weather map transitioning into a disease risk map. Split-screen feel showing the connection between climate and health.

### Patient-Centric (Rose accent)

#### `innovations/wolbachia.png` — Wolbachia Mosquito Program
> Stylised mosquitoes with a glowing Wolbachia symbol, being released from a container. A protected community visible in the background. Biological innovation feel.

#### `innovations/lenacapavir.png` — Lenacapavir Injectable
> A single injection syringe with a 6-month calendar icon, showing the long-acting nature. A patient's arm receiving the injection. Simple, liberating.

#### `innovations/md-rutfs.png` — Microbiome-Directed RUTFs
> Sachets of therapeutic food with gut microbiome visualisation. A malnourished child being fed. Science meets nutrition.

#### `innovations/chw-digital.png` — CHW Digital Toolkit
> A community health worker holding a smartphone showing a diagnostic app, with a patient in a home visit setting. Bridge between technology and community.

#### `innovations/mrna-platform.png` — mRNA Vaccine Platform
> An mRNA strand being loaded into a modular vaccine production unit. Multiple disease targets shown as labels. Flexibility and rapid response.

### Digital Health / AI (Blue accent)

#### `innovations/ai-pathology.png` — AI Pathology
> A microscope view with AI annotations identifying cancer cells. Digital overlay on biological tissue. Precision and augmented intelligence.

#### `innovations/99dots.png` — 99DOTS Adherence
> A blister pack of TB pills revealing hidden phone numbers. A patient's phone showing a confirmation call. Simple but clever compliance system.

#### `innovations/esanjeevani.png` — eSanjeevani Telemedicine
> A split screen: rural patient on one side, urban specialist on the other, connected by a video call. Distance collapsed by technology.

#### `innovations/drone-delivery.png` — Medical Drone Delivery
> A drone carrying a medical supply box flying over rugged terrain toward a remote clinic. Speed and access.

### GenAI (Purple accent)

#### `innovations/llm-clinical-support.png` — LLM Clinical Decision Support
> A clinician consulting a screen where an LLM is generating differential diagnoses. Medical records feeding into the AI. Augmented clinical reasoning.

#### `innovations/ai-antibiotic-discovery.png` — AI Antibiotic Discovery
> A molecular structure being assembled/optimised by AI algorithms. Bacteria being targeted by the new molecule. Drug discovery acceleration.

#### `innovations/genai-health-education.png` — GenAI Health Education
> A community health session where educational materials are being generated in local language on a tablet. Villagers gathered around. Cultural adaptation meets AI.

---

## 6. Rank Insignia (4 images)

**Size:** 128×128px, PNG, transparent background
**Style:** Military/space rank insignia. Progressive complexity from Level 1 to Level 4. Dark background, metallic sheen. Purple (#7B2D8E) as accent. Each should feel like a clear step up from the previous.

### `ranks/field-observer.png` — Level 1: Field Observer
> Simple binoculars or single chevron. Clean, understated. Entry-level badge. Bronze metallic finish.

### `ranks/health-strategist.png` — Level 2: Health Strategist
> A chess knight piece or strategic planning icon with two chevrons. Silver metallic finish. More detail than Level 1.

### `ranks/policy-architect.png` — Level 3: Policy Architect
> A blueprint/architectural compass with three chevrons. Gold metallic finish. Precision and authority.

### `ranks/global-health-leader.png` — Level 4: Global Health Leader
> A globe wrapped in a laurel wreath with four chevrons and a star. Platinum/diamond metallic finish with purple glow. The ultimate rank. Prestigious and rare.

---

## 7. Map & Miscellaneous (2 images)

### `map/asante-illustrated.png` — Country Map
**Size:** 800×600px, PNG
> Illustrated map of the fictional country "Asante" (inspired by East African geography). Four distinct regions marked: Kibo Highlands (mountainous northwest), Lumasa Metro (dense urban east), Lake Amara Basin (lakeside south), Central Plateau. Hand-drawn/illustrated style with topographic textures. Dark background. Region labels in clean sans-serif. Key landmarks: mountains, city, lake, roads. Matches the game's dark UI aesthetic.

### `share-bg.png` — Share Card Background Texture
**Size:** 1200×630px, PNG
> Subtle dark texture for the share card. Near-black (#0c0d1e) base with a faint grid pattern and subtle purple (#7B2D8E) corner glow/vignette. No text or icons — just an atmospheric background. Should complement white/purple text overlaid on top.

---

## Summary

| Category | Count | Size | Format | Style |
|----------|-------|------|--------|-------|
| Scenario Banners | 3 | 1200×400 | JPG | Stock photography |
| Role Portraits | 6 | 256×256 | PNG | Stylised portrait illustration |
| Achievement Badges | 20 | 128×128 | PNG | Circular medal/emblem |
| Crisis Event Art | 6 | 256×256 | PNG | Dramatic editorial illustration |
| Innovation Icons | 20 | 128×128 | PNG | Isometric/flat illustration |
| Rank Insignia | 4 | 128×128 | PNG | Military insignia, metallic |
| Country Map | 1 | 800×600 | PNG | Illustrated map |
| Share BG Texture | 1 | 1200×630 | PNG | Dark atmospheric texture |
| **Total** | **61** | | | |
