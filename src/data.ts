import { Service, Product, Project, NewsItem } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'greenhouse',
    title: 'Turnkey Greenhouse Solutions',
    shortDesc: 'State-of-the-art agricultural enclosures designed and engineered for optimal crop yields, climate resilience, and remote operability.',
    fullDesc: 'AiGROW provides comprehensive greenhouse engineering from concept to harvest. Our structures are tailormade to withstand Sri Lankan weather conditions while maximizing sunlight transmission and cooling efficiency.',
    iconName: 'Home',
    features: [
      'Tailormade structural design and engineering',
      'Automated ventilation and thermal screen control',
      'Fully integrated fertigation & micro-irrigation systems',
      'Remote monitoring and cloud-based climate control panels'
    ],
    subCategories: [
      {
        name: 'Commercial Tiers',
        description: 'Industrial-grade structures designed for maximum commercial productivity, high density, and long life cycles.',
        details: [
          'Fully Enclosed Greenhouses: Complete environmental control, insect-proof, double-layer polycarbonate, automated heat extraction, designed for sensitive high-value crops.',
          'Naturally Ventilated Greenhouses: Passive ventilation layouts optimized for cost efficiency, utilizing smart windbreak designs, specialized UV-stabilized polythene, and insect netting.',
          'Sawtooth Greenhouses: Standard multi-span designs optimized for humid climates, featuring top-vent structures that permit continuous hot air discharge.',
          'Solar Dryer Tunnel: Specialized high-efficiency solar drying structures utilizing custom ventilation and convective heat retention to dehydrate fresh produce and herbs cleanly.'
        ]
      },
      {
        name: 'Individual / Domestic Tiers',
        description: 'Micro-farming structures adapted for residential spaces, urban rooftops, and smallholder farming operations.',
        details: [
          'Rooftop Greenhouses: Lightweight, highly secure frame structures designed to optimize flat roof areas in urban centers like Colombo and Rajagiriya.',
          'Home Garden Greenhouses: Compact, aesthetic layouts designed for organic family-scale cultivation of premium vegetables and fresh kitchen herbs.',
          'Garden Hobby Greenhouses: Micro-scale garden hobby houses designed for organic growing enthusiasts, providing entry-level pest and rain shielding for backyard plant collections.'
        ]
      }
    ],
    process: [
      { step: '01', title: 'Consultation & Design', description: 'Assessing your site, soil profiles, water quality, micro-climatic patterns, and economic targets to engineer the perfect layout.' },
      { step: '02', title: 'Precision Engineering & Construction', description: 'Fabrication of hot-dip galvanized structural elements and careful installation of heavy-duty specialized poly-films and net materials.' },
      { step: '03', title: 'Automation System Integration', description: 'Installing our custom sensor pods, climate controller panels, motorized valves, and connecting them to the central cloud server.' },
      { step: '04', title: 'Operation & Support Maintain', description: 'Providing continuous agronomic mentoring, real-time data auditing, preventive technical inspections, and equipment upgrades.' }
    ]
  },
  {
    id: 'indoor-farming',
    title: 'Indoor Farming Solutions',
    shortDesc: 'Hyper-controlled vertical farming systems bypassing seasonal variations, optimizing space, and ensuring 100% pesticide-free produce.',
    fullDesc: 'Maximize output per square foot with advanced vertical farming technology. Designed for high density, urban locations, and extreme resource efficiency, our indoor farms eliminate weather risks entirely.',
    iconName: 'Layers',
    features: [
      'Multi-tier space-saving vertical racks',
      'Tailored LED grow light spectrum controls',
      'Precision temperature and humidity fogging systems',
      'Zero soil requirement - pure clean growth mediums'
    ],
    subCategories: [
      {
        name: 'Mushroom Farming Solutions',
        description: 'Highly specialized, automated growth chambers designed for commercial oyster, button, and milky mushroom cultivation.',
        details: [
          'Fully automated misting & ventilation cycles to maintain constant humidity levels above 85%.',
          'Integrated CO2 sensors with automatic exhaust fans to optimize fresh air circulation and enhance flush sizes.',
          'Specialized growing rack configurations designed to accommodate standardized bag sizes and simplify harvesting.'
        ]
      },
      {
        name: 'Container Farming Solutions',
        description: 'Upcycled 44-foot shipping containers fitted out with fully integrated vertical hydroponic systems for commercial lettuce, greens, and herb production.',
        details: [
          'Modular and plug-and-play installation, suitable for rapid deployment in urban settings.',
          'Climate-resilient thermal insulation, minimizing HVAC power draw even in high coastal temperatures.',
          'Hyper-water efficiency - reusing over 95% of moisture via custom condensate reclamation.'
        ]
      }
    ]
  },
  {
    id: 'home-gardening',
    title: 'Home Gardening & Landscaping',
    shortDesc: 'Aesthetic, tech-enabled gardening and landscape designs for eco-conscious households and forward-thinking corporate spaces.',
    fullDesc: 'We merge visual beauty with functional intelligence. From smart vertical gardens on office walls to self-watering edible home gardens, we deploy automated irrigation and fertilizing technology directly to your home.',
    iconName: 'Leaf',
    features: [
      'Self-watering automated container gardens',
      'Indoor vertical living green walls for corporate spaces',
      'Aesthetic timber and steel-framed raised beds for home growing',
      'Low-maintenance app-connected drip irrigation systems'
    ],
    subCategories: [
      {
        name: 'Residential Smart Gardens',
        description: 'Micro-fertigation systems and beautiful organic garden beds that let you grow crisp greens on your patio or lawn.',
        details: [
          'App-connected controllers that auto-adjust watering based on local weather reports.',
          'Organically pre-conditioned soil mixes and organic pest deterrence kits.'
        ]
      },
      {
        name: 'Commercial Landscaping',
        description: 'Lush living walls and structural landscapes that lower building temperatures, improve indoor air quality, and showcase green technology.',
        details: [
          'Pre-grown modular green panels integrated with sub-surface non-drip irrigation.',
          'Automated central monitoring of plant health indicators and automated nutrient dosing.'
        ]
      }
    ]
  },
  {
    id: 'fresh-produce',
    title: 'Premium Fresh Produce',
    shortDesc: 'Locally grown, 100% pesticide-free, nutrient-dense fresh food varieties fully traceable back to their seedling origin.',
    fullDesc: 'Harvested at peak ripeness and delivered fresh, AiGROW produce represents the gold standard of modern food safety and sustainable local agriculture.',
    iconName: 'Sparkles',
    features: [
      '100% Pesticide-free growth certified by advanced labs',
      'Grown using premium organic nutrients and mineral-rich pure water',
      'Traceable QR codes on every package showing harvest date and grower logs',
      'Cold-chain managed logistics to prevent nutrient degradation'
    ],
    subCategories: [
      {
        name: 'Our Fresh Selection',
        description: 'Premium greenhouse and vertical farm varieties cultivated with continuous care.',
        details: [
          'Hydroponic Lettuce: Crisp Butterhead, Romaine, and Oakleaf varieties grown to perfect weight and crunch.',
          'Sweet Bell Peppers: Rich red, yellow, and orange bell peppers, boasting thick skins and high sugar content.',
          'Beef Tomatoes: Extra-large, fleshy, and highly flavorful tomatoes grown with precision fertigation.',
          'Fresh Herbs: Italian Basil, Mint, Coriander, and Rosemary harvested daily and packaged with living root plugs.'
        ]
      }
    ]
  }
];

export const PRODUCTS_DATA: Product[] = [
  // Environmental Monitoring & Control
  {
    id: 'smart-climate',
    name: 'Smart Climate Control Unit',
    category: 'environmental',
    categoryLabel: 'Environmental Monitoring & Control',
    catchphrase: 'Automated microclimate management for commercial growers.',
    description: 'An industrial-grade, cloud-connected climate controller that automatically operates ventilation fans, exhaust systems, thermal screens, and fogging pads based on real-time sensory data and custom crop profiles.',
    features: [
      'Up to 16 configurable relay outputs for motor and fan controls',
      'Real-time cloud logging via Wi-Fi, Ethernet, or cellular connection',
      'Custom scheduling and automated sunrise/sunset curve adjustments',
      'Immediate alert system via SMS, email, and mobile push notification'
    ],
    specs: [
      { label: 'Input Voltage', value: '220V AC / 50Hz' },
      { label: 'Control Capacity', value: '16 Channels (expandable)' },
      { label: 'Communication', value: 'Wi-Fi 802.11 b/g/n, LoRaWAN, Cellular' },
      { label: 'Enclosure Rating', value: 'IP65 Dust & Waterproof, UV Resistant' },
      { label: 'Working Temp', value: '0°C to 65°C' }
    ],
    price: 'LKR 185,000'
  },
  {
    id: 'grow-light',
    name: 'AiGROW Smart LED Light',
    category: 'environmental',
    categoryLabel: 'Environmental Monitoring & Control',
    catchphrase: 'Tailormade photosynthetically active radiation (PAR) spectra.',
    description: 'A high-PAR professional vertical farming LED light fixture designed to optimize chlorophyll absorption, reducing vegetative cycles while saving up to 45% electricity compared to traditional lights.',
    features: [
      'Spectrum control tuned specifically for leafy greens, microgreens, and medicinal herbs',
      '0-10V Dimming control with programmable ramp-up and ramp-down curves',
      'Passive cooling heat sink structure prevents heat stress without noisy fans',
      'Daisy-chain layout supporting up to 24 fixtures per single power point'
    ],
    specs: [
      { label: 'Power Consumption', value: '150 Watts' },
      { label: 'PPF Output', value: '380 µmol/s' },
      { label: 'CRI', value: '> 92' },
      { label: 'Lifespan', value: '50,000 Hours (L90 rating)' },
      { label: 'Dimensions', value: '1200 x 60 x 40 mm' }
    ],
    price: 'LKR 38,500'
  },
  {
    id: 'humidifier',
    name: 'Automated Misting & Humidifier System',
    category: 'environmental',
    categoryLabel: 'Environmental Monitoring & Control',
    catchphrase: 'Maintain perfect relative humidity without wetting crop leaves.',
    description: 'A micro-droplet ultrasonic humidifier with fully integrated smart controls. Emits fine mist droplets (<5 microns) that evaporate instantly in the air, maintaining a humid atmosphere ideal for mushroom production and seed propagation.',
    features: [
      'Super-fine mist droplets prevent water-pooling on plant leaves and root rot',
      'Integrated water level sensor with automatic safety shut-off',
      'Direct connection to standard municipal water lines with built-in sediment filtration',
      'Proportional humidity control matching ambient VPD goals'
    ],
    specs: [
      { label: 'Mist Output', value: '6 Liters / Hour' },
      { label: 'Droplet Size', value: '3 to 5 Microns' },
      { label: 'Water Pressure', value: '0.1 - 0.4 MPa' },
      { label: 'Power Draw', value: '240 Watts' },
      { label: 'Tank Connection', value: '1/2" Threaded BSP' }
    ],
    price: 'LKR 64,000'
  },

  // Resource Monitoring Systems
  {
    id: 'soil-moisture',
    name: 'Soil Moisture & Temp Sensor Unit',
    category: 'resource',
    categoryLabel: 'Resource Monitoring Systems',
    catchphrase: 'Understand your soil and grow medium in real-time.',
    description: 'A professional-grade, FDR-based capacitive soil moisture probe that measures volumetric water content, soil temperature, and soil electrical conductivity simultaneously. Highly resistant to chemical fertilizer corrosion.',
    features: [
      'Simultaneous measuring of water content, temperature, and bulk soil EC',
      'Low power draw - battery operated via standard AA batteries (3-year life)',
      'High-grade stainless steel probes with robust weatherproof casing',
      'LoRa connectivity enabling transmitting over distances up to 3km'
    ],
    specs: [
      { label: 'VWC Range', value: '0% to 100% (Acc: ±2%)' },
      { label: 'EC Range', value: '0 to 20 mS/cm' },
      { label: 'Wireless range', value: 'LoRaWAN up to 3 km, Wi-Fi 50m' },
      { label: 'Battery Type', value: '4 x AA Alkaline (Included)' },
      { label: 'Probe Material', value: '316L Stainless Steel' }
    ],
    price: 'LKR 28,000'
  },
  {
    id: 'ec-ph-meter',
    name: 'In-Line EC/pH Metering Hub',
    category: 'resource',
    categoryLabel: 'Resource Monitoring Systems',
    catchphrase: 'Continuous chemical monitoring of nutrient solutions.',
    description: 'A dual-probe industrial testing hub designed to monitor the pH level and Electrical Conductivity (EC) of your recirculating irrigation system. Provides crucial live feed updates directly to your fertigation controller.',
    features: [
      'Double junction pH electrode for extended lifespans in rich organic fluids',
      'Automatic temperature compensation (ATC) ensuring reading accuracy',
      'Easy push-button digital calibration wizard',
      'RS485 Modbus interface supporting seamless industrial PLC integrations'
    ],
    specs: [
      { label: 'pH Range', value: '0.00 to 14.00 pH (Acc: ±0.02)' },
      { label: 'EC Range', value: '0.0 to 10.0 mS/cm (Acc: ±0.1)' },
      { label: 'Output Interface', value: 'RS485 / Modbus-RTU' },
      { label: 'Calibration', value: 'Digital, 2-point or 3-point' },
      { label: 'Cable Length', value: '5 Meters' }
    ],
    price: 'LKR 49,500'
  },
  {
    id: 'energy-meter',
    name: 'Smart Energy Monitor',
    category: 'resource',
    categoryLabel: 'Resource Monitoring Systems',
    catchphrase: 'Track farm electric footprint down to the watt.',
    description: 'A three-phase smart electricity analyzer that clamps onto major power lines to identify energy wastage, record peak demand cycles, and calculate real-time carbon footprints of greenhouse cooling fans, pumps, and light fixtures.',
    features: [
      'Non-invasive split-core Current Transformers (CT) make installations simple',
      'Measures active power, reactive power, voltage, current, and power factor',
      'Tracks total power consumed in kWh with daily, weekly, and monthly trendlines',
      'Alerts for phase failure or voltage surges to protect expensive machinery'
    ],
    specs: [
      { label: 'Phase Support', value: 'Single Phase / Three Phase' },
      { label: 'Current Capacity', value: 'Up to 100A per clamp (CT)' },
      { label: 'Accuracy Class', value: 'Class 1.0 (IEC 62053-21)' },
      { label: 'Mounting', value: 'DIN Rail 35mm / Wall Mount' },
      { label: 'Wireless Protocol', value: 'Wi-Fi 2.4GHz' }
    ],
    price: 'LKR 34,000'
  },
  {
    id: 'water-meter',
    name: 'Smart Water Flow Meter',
    category: 'resource',
    categoryLabel: 'Resource Monitoring Systems',
    catchphrase: 'Save every drop by monitoring flow rates and spotting leaks.',
    description: 'A pulse-output mechanical flow meter coupled with a digital LoRa pulse transmitter. Measures instantaneous water volume pumped into the irrigation lines and triggers automated emergency shut-offs if anomalous leaks are detected.',
    features: [
      'Digital pulse counter reads precise volume with minimal water pressure drop',
      'Constructed with lead-free corrosion-resistant brass elements',
      'Detects micro-leaks or pipe bursts instantly, shutting down pumps wirelessly',
      'Long-term volume tracking for crop-specific consumption analytics'
    ],
    specs: [
      { label: 'Pipe Diameter', value: '1" BSP Threaded (options for 2")' },
      { label: 'Flow Rate Range', value: '0.03 to 10 m³/Hour' },
      { label: 'Max Pressure', value: '1.6 MPa' },
      { label: 'Transmission Rate', value: 'Every 15 minutes (configurable)' },
      { label: 'Protection Rating', value: 'IP68 Submersible' }
    ],
    price: 'LKR 42,500'
  },

  // Irrigation Optimisation
  {
    id: 'fertigation-system',
    name: 'AiGROW Precision Fertigation System',
    category: 'irrigation',
    categoryLabel: 'Irrigation Optimisation',
    catchphrase: 'Automated multi-channel nutrient dosing with surgical accuracy.',
    description: 'Our flagship commercial fertigation system. Safely coordinates the dosage of multiple liquid fertilizers and acid injections directly into your irrigation water stream based on real-time pH and EC feedback loops.',
    features: [
      'Up to 4 high-accuracy dosing channels (A, B, C, Acid) up to 300 L/h each',
      'Automated recipe management based on crop growth phase and sunlight indices',
      'Built-in safety limits prevent chemical over-concentration and leaf-scorch',
      'Compatible with both drip loops, nutrient film techniques, and sprayers'
    ],
    specs: [
      { label: 'Dosing Channels', value: '3 to 5 channels (Configurable)' },
      { label: 'Max Flow Capacity', value: '12 m³/Hour' },
      { label: 'Mixing Chamber', value: '316 Stainless Steel, 30L capacity' },
      { label: 'Pump Drive', value: 'Centrifugal, multi-stage, 1.5 HP' },
      { label: 'System Dimensions', value: '1400 x 750 x 1600 mm' }
    ],
    price: 'LKR 840,000'
  },
  {
    id: 'plant-feeder',
    name: 'Smart Automated Plant Feeder',
    category: 'irrigation',
    categoryLabel: 'Irrigation Optimisation',
    catchphrase: 'Perfect nutrition for medium-scale greenhouses and urban hubs.',
    description: 'A compact, wall-mounted single-channel nutrient dosing system. Easily connects to domestic water pressure to mix basic soluble nutrients or organic fertilizers on a strict timer or soil moisture trigger.',
    features: [
      'Simple user-friendly interface with dual knob dials and digital LCD display',
      'Built-in venturi injector operates entirely on municipal water pressure',
      'Includes fine-particle mesh filter preventing micro-dripper blockages',
      'Durable polypropylene frame resistant to chemicals'
    ],
    specs: [
      { label: 'Feed Rate Range', value: '0.2% to 2% (adjustable ratio)' },
      { label: 'Operating Pressure', value: '0.15 - 0.45 MPa' },
      { label: 'Inlet/Outlet Size', value: '3/4" Male NPT' },
      { label: 'Max Flow Rate', value: '2.5 m³/Hour' },
      { label: 'Power', value: 'No electricity needed (Venturi-driven)' }
    ],
    price: 'LKR 31,500'
  },
  {
    id: 'smart-dripper',
    name: 'AiGROW Smart Dripper Pack (50-Pack)',
    category: 'irrigation',
    categoryLabel: 'Irrigation Optimisation',
    catchphrase: 'Pressure-compensating and self-cleaning micro-drip emitters.',
    description: 'Premium quality pressure-compensating (PC) drippers that deliver a steady, uniform flow rate of 2.0 Liters per Hour, regardless of elevation changes or line pressure variations. Features a self-flushing design to bypass dirt particles.',
    features: [
      'Uniform flow distribution eliminates uneven plant sizes across sloped fields',
      'Built-in anti-siphon mechanism prevents soil suction when pressure drops',
      'Silicon diaphragm ensures durable flow accuracy for over 5 seasons',
      'Standard 4mm barb connection plugs directly into 16mm LDPE mains'
    ],
    specs: [
      { label: 'Flow Rate', value: '2.0 Liters / Hour' },
      { label: 'Pressure Range', value: '0.08 - 0.35 MPa' },
      { label: 'Filtration Req.', value: '130 Micron / 120 Mesh minimum' },
      { label: 'Material', value: 'UV Stabilized engineering plastics' },
      { label: 'Quantity', value: '50 Emitters per Pack' }
    ],
    price: 'LKR 9,500'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'kegalle',
    title: 'Kegalle Greenhouse Project',
    location: 'Kegalle, Sri Lanka',
    type: 'Commercial Turnkey Greenhouse',
    summary: 'A multi-span sawtooth greenhouse facility deployed to cultivate premium bell peppers and tomatoes, integrated with advanced micro-climate controls and drip irrigation.',
    fullDescription: 'Completed in partnership with a leading local exporter, this 20,000 sq ft sawtooth greenhouse facility was designed to withstand high rainfall and heavy wind speeds of the Kegalle hills. Deployed with premium heavy-duty plastic cladding and specialized insect-proof netting, the project incorporates automated shade screens and a high-accuracy fertigation system, allowing the grower to manage nutrient formulations remotely from Colombo.',
    image: '/kegalle%20green%20house.jpg',
    stats: [
      { label: 'Yield Increase', value: '180%' },
      { label: 'Water Conserved', value: '45%' },
      { label: 'Project Area', value: '20,000 sq ft' },
      { label: 'Pesticide Usage', value: '0%' }
    ],
    outcomes: [
      'Introduced climate-proof structures that completely neutralized the heavy monsoonal rains.',
      'Transitioned the farm from traditional soil cultivation to clean coco-peat bag media, eradicating soil-borne wilt.',
      'Achieved export-quality pesticide-free certifications, unlocking access to retail markets in Singapore.'
    ]
  },
  {
    id: 'rise-bellwood',
    title: 'Rise Bellwood Greenhouse Project',
    location: 'Galaha, Kandy District, Sri Lanka',
    type: 'Naturally Ventilated Multi-Span Greenhouse',
    summary: 'An eco-farming community initiative optimized to cultivate gourmet greens, herbs, and leafy greens for premium culinary establishments.',
    fullDescription: 'Nestled in the Galaha hills of Kandy, the Rise Bellwood project is a community-centric agritech initiative. AiGROW fabricated a custom naturally ventilated multi-span structure utilizing natural thermal buoyancy currents. Integrated with soil moisture monitoring arrays and local weather sensors, the farm delivers high-end greens directly to boutique hotels and organic supermarkets, increasing farmers income tenfold.',
    image: '/bellwood.jpg',
    stats: [
      { label: 'Water Savings', value: '55%' },
      { label: 'Income Growth', value: '3x' },
      { label: 'Active Farmers', value: '45+' },
      { label: 'Crop Rotations', value: '12 / Year' }
    ],
    outcomes: [
      'Empowered over 45 youth farming families with high-tech organic agronomy training.',
      'Established a zero-pesticide closed-loop growing standard that meets global GAP criteria.',
      'Installed modular rain-shelter systems that extended crop lifespans into the wet monsoons.'
    ]
  },
  {
    id: 'rajagiriya',
    title: 'Rajagiriya Mushroom Farm Project',
    location: 'Rajagiriya, Colombo, Sri Lanka',
    type: 'High-Tech Urban Indoor Vertical Farming',
    summary: 'An automated high-yield indoor oyster mushroom grow facility using advanced ultrasonic humidification, automatic fresh-air exchanges, and CO2 sensor monitoring.',
    fullDescription: 'Demonstrating urban agriculture, this specialized mushroom cultivation facility was converted from a vacant ground-floor warehouse in Rajagiriya. AiGROW installed high-efficiency vertical grow racks paired with digital sensor hubs monitoring temperature, relative humidity, and CO2 concentration. Automated climate sequences trigger high-pressure mist systems and air intake fans to maintain flawless ambient flush parameters, harvesting hundreds of kilos of fresh mushrooms every single week.',
    image: '/rajagiriya.jpeg',
    stats: [
      { label: 'Monthly Output', value: '1,200 Kg' },
      { label: 'Humidity Rate', value: '92% (Avg)' },
      { label: 'Floor Footprint', value: '800 sq ft' },
      { label: 'Energy Saved', value: '35%' }
    ],
    outcomes: [
      'Pioneered commercial-scale vertical farming inside Colombo city limits, minimizing transport carbon footprint.',
      'Automated CO2 exhaust triggers, resulting in zero-loss mushroom flushes and heavy cluster sizes.',
      'Established full direct-to-consumer delivery routes, providing fresh oyster mushrooms within 4 hours of harvest.'
    ]
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'eswabhimani',
    title: 'AiGROW Sustainable Agritech Wins E-Swabhimani Award for Innovation',
    category: 'Award',
    date: 'Oct 14, 2018',
    summary: 'We are proud to announce that AiGROW has received the prestigious E-Swabhimani National Best Tech Product Award, celebrating our contributions to local organic agriculture.',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'slasscom-2024',
    title: 'CodeGen Subsidiary Showcases AI-Powered Precision Dosing at SLASSCOM Innovation Summit',
    category: 'Innovation',
    date: 'Feb 10, 2024',
    summary: 'At the annual SLASSCOM Tech Summit, Dr. Harsha Subasinghe presented AiGROWs upcoming AI precision dosing recipes, showcasing the integration of remote IoT networks in tea and export vegetable crops.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'climate-farming',
    title: 'Addressing the Water Crisis: Smart Drippers and LoRa Sensors in Dry-Zone Districts',
    category: 'Sustainability',
    date: 'Jun 22, 2026',
    summary: 'AiGROW has initiated field tests in Vavuniya and Hambantota, partnering with local agrarian societies to install solar-powered LoRa soil moisture nodes that reduce agricultural water consumption by 65%.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'
  }
];

/* ================================================================== */
/* PRICE CALCULATOR — dynamic equipment configuration options         */
/* ================================================================== */
export interface CalcOption {
  id: string;
  label: string;
  sublabel?: string;
  price: number; // LKR (pre-VAT base price)
}

// Precision Fertigation models (base price, LKR)
export const FERTIGATION_MODELS: CalcOption[] = [
  { id: 'MFG-8CH500-SLSD', label: 'MFG-8CH500-SLSD', sublabel: 'Single line · Single dosing · ½ HP · 8 ch · 350–700 plants', price: 264500 },
  { id: 'MFG-8CH1000-SLSD', label: 'MFG-8CH1000-SLSD', sublabel: 'Single line · Single dosing · 1 HP · 8 ch · 650–1350 plants', price: 269900 },
  { id: 'MFG-8CH500-DLSD', label: 'MFG-8CH500-DLSD', sublabel: 'Dual line · Single dosing · ½ HP · 8 ch · 350–700 plants', price: 274500 },
  { id: 'MFG-8CH1000-DLSD', label: 'MFG-8CH1000-DLSD', sublabel: 'Dual line · Single dosing · 1 HP · 8 ch · 1000–2500 plants', price: 279900 },
  { id: 'MFG-8CH1000-DLDD', label: 'MFG-8CH1000-DLDD', sublabel: 'Dual line · Dual dosing · 1 HP · 8 ch · 1000–2500 plants', price: 319900 }
];

// Smart Climate Unit channel configurations (LKR)
export const CLIMATE_MODELS: CalcOption[] = [
  { id: 'mini-2', label: 'Mini Climate 2 Channel', sublabel: 'Humidity & Temp included · plug and play', price: 87000 },
  { id: 'mini-4', label: 'Mini Climate 4 Channel', sublabel: 'Humidity & Temp included · plug and play', price: 119000 },
  { id: 'mini-8', label: 'Mini Climate 8 Channel', sublabel: 'Humidity & Temp included · plug and play', price: 179000 },
  { id: 'smart-12', label: 'Smart Climate Controllers', sublabel: '12 channels · display', price: 299000 }
];

/* ================================================================== */
/* GREENHOUSE STRUCTURE PACKAGES — itemised BOM per solution size     */
/* Shown when the sq-ft slider is exactly 1000/2000/2500/4000/5000    */
/* ================================================================== */
export interface PackageLine { label: string; detail: string; cost: number; }
export interface PackageGroup { group: string; items: PackageLine[]; }

export const GREENHOUSE_PACKAGES: Record<number, PackageGroup[]> = {
  1000: [
    { group: 'Greenhouse Structure', items: [
      { label: '“Saw tooth” Poly Tunnel structure with roof', detail: '1000 sqft × 850', cost: 850000 }
    ]},
    { group: 'Floor Preparation', items: [
      { label: 'Weed mat', detail: '1000 sqft × 40', cost: 40000 },
      { label: 'Weed mat installation', detail: '1000 sqft × 20', cost: 20000 }
    ]},
    { group: 'Irrigation & Trellising', items: [
      { label: 'Drip Irrigation System', detail: '2 × 100,000', cost: 200000 },
      { label: 'Drip Irrigation wiring & installation', detail: '1 × 100,000', cost: 100000 },
      { label: 'Trellis', detail: '1000 × 85', cost: 85000 }
    ]},
    { group: 'Growing Medium', items: [
      { label: 'Grow bags', detail: '240 × 350', cost: 84000 }
    ]},
    { group: 'Cooling System', items: [
      { label: 'Automated Side Curtains', detail: '2 × 100,000', cost: 200000 },
      { label: 'Rollup Motor & Climber', detail: '2 × 48,000', cost: 96000 },
      { label: 'Shade net', detail: '5 × 16,900', cost: 84500 },
      { label: 'Manual Shade Net System & installation', detail: '1 × 100,000', cost: 100000 },
      { label: 'Roof ventilation fan', detail: '2 × 120,000', cost: 240000 },
      { label: 'Installation of fans', detail: '2 × 20,000', cost: 40000 },
      { label: 'Circulation fans', detail: '4 × 60,000', cost: 240000 },
      { label: 'Circulation fans installation', detail: '4 × 4,000', cost: 16000 },
      { label: 'Wiring & installation', detail: '1 × 150,000', cost: 150000 }
    ]},
    { group: 'Automation Devices', items: [
      { label: 'Mini Climate 8-Channel', detail: '1 × 210,000', cost: 210000 },
      { label: 'Switch gear', detail: '1 × 180,000', cost: 180000 }
    ]}
  ],
  2000: [
    { group: 'Greenhouse Structure', items: [
      { label: 'Tunnel structure with roof', detail: '2000 sqft × 750', cost: 1500000 }
    ]},
    { group: 'Floor Preparation', items: [
      { label: 'Weed mat', detail: '2000 sqft × 35', cost: 70000 },
      { label: 'Weed mat installation', detail: '2000 sqft × 10', cost: 20000 }
    ]},
    { group: 'Irrigation & Trellising', items: [
      { label: 'Drip Irrigation System', detail: '2 × 100,000', cost: 200000 },
      { label: 'Drip Irrigation installation', detail: '1 × 100,000', cost: 100000 },
      { label: 'Trellis', detail: '2000 × 80', cost: 160000 }
    ]},
    { group: 'Growing Medium', items: [
      { label: 'Grow bags', detail: '450 × 350', cost: 157500 }
    ]},
    { group: 'Cooling System', items: [
      { label: 'Misting System', detail: '1 × 250,000', cost: 250000 },
      { label: 'Automated Side Curtain system', detail: '2 × 150,000', cost: 300000 },
      { label: 'Rollup motor & Climber', detail: '2 × 48,000', cost: 96000 },
      { label: 'Shade net', detail: '8 × 16,900', cost: 135200 },
      { label: 'Manual Shade Net System & installation', detail: '1 × 200,000', cost: 200000 },
      { label: 'Roof ventilation fan', detail: '2 × 100,000', cost: 200000 },
      { label: 'Installation of fans', detail: '2 × 20,000', cost: 40000 },
      { label: 'Circulation fans', detail: '4 × 60,000', cost: 240000 },
      { label: 'Circulation fans installation', detail: '4 × 4,000', cost: 16000 },
      { label: 'Wiring & installation', detail: '1 × 192,000', cost: 192000 }
    ]},
    { group: 'Automation Devices', items: [
      { label: 'Climate & Fertilizer automatic controller with installation', detail: '1 × 280,000', cost: 280000 }
    ]}
  ],
  2500: [
    { group: 'Greenhouse Structure', items: [
      { label: 'Tunnel structure with roof', detail: '2500 sqft × 720', cost: 1800000 }
    ]},
    { group: 'Floor Preparation', items: [
      { label: 'Weed mat', detail: '2500 sqft × 30', cost: 75000 },
      { label: 'Weed mat installation', detail: '2500 sqft × 10', cost: 25000 }
    ]},
    { group: 'Irrigation & Trellising', items: [
      { label: 'Drip Irrigation System & installation', detail: '2500 sqft × 80', cost: 200000 },
      { label: 'Trellis', detail: '2500 sqft × 60', cost: 150000 }
    ]},
    { group: 'Growing Medium', items: [
      { label: 'Grow bags', detail: '500 × 320', cost: 160000 }
    ]},
    { group: 'Cooling System', items: [
      { label: 'Weather Station', detail: '1 × 180,000', cost: 180000 },
      { label: 'Automated Side Curtains', detail: '2 × 110,000', cost: 220000 },
      { label: 'Rollup Motor & Climber', detail: '2 × 48,000', cost: 96000 },
      { label: 'Shade net', detail: '7 × 16,900', cost: 118300 },
      { label: 'Manual Shade Net System & installation', detail: '1 × 200,000', cost: 200000 },
      { label: 'Roof ventilation fan', detail: '2 × 110,000', cost: 220000 },
      { label: 'Installation of fans', detail: '2 × 10,000', cost: 20000 },
      { label: 'Circulation fans', detail: '4 × 55,000', cost: 220000 },
      { label: 'Circulation fans installation', detail: '4 × 2,500', cost: 10000 },
      { label: 'Wiring & installation', detail: '1 × 200,000', cost: 200000 }
    ]},
    { group: 'Automation Devices', items: [
      { label: 'Switch Gear Box', detail: '1 × 198,000', cost: 198000 },
      { label: 'Climate & Fertilizer automatic controller with installation', detail: '1 × 280,000', cost: 280000 }
    ]}
  ],
  4000: [
    { group: 'Greenhouse Structure', items: [
      { label: 'Poly Tunnel structure with roof', detail: '4000 sqft × 750', cost: 3000000 }
    ]},
    { group: 'Floor Preparation', items: [
      { label: 'Weed mat', detail: '4000 sqft × 35', cost: 140000 },
      { label: 'Weed mat installation', detail: '4000 sqft × 10', cost: 40000 }
    ]},
    { group: 'Irrigation & Trellising', items: [
      { label: 'Drip Irrigation System & installation', detail: '4000 sqft × 75', cost: 300000 },
      { label: 'Trellis', detail: '4000 sqft × 80', cost: 320000 }
    ]},
    { group: 'Growing Medium', items: [
      { label: 'Grow bags', detail: '350 × 930', cost: 325500 }
    ]},
    { group: 'Cooling System', items: [
      { label: 'Weather Station', detail: '1 × 180,000', cost: 180000 },
      { label: 'Automated Side Curtains', detail: '2 × 160,000', cost: 320000 },
      { label: 'Rollup Motor & Climber', detail: '2 × 48,000', cost: 96000 },
      { label: 'Shade net', detail: '14 × 16,900', cost: 236600 },
      { label: 'Manual Shade Net System & installation', detail: '1 × 250,000', cost: 250000 },
      { label: 'Roof ventilation fan', detail: '2 × 140,000', cost: 280000 },
      { label: 'Installation of fans', detail: '2 × 10,000', cost: 20000 },
      { label: 'Circulation fans', detail: '8 × 55,000', cost: 440000 },
      { label: 'Circulation fans installation', detail: '8 × 2,000', cost: 16000 },
      { label: 'Wiring & installation', detail: '1 × 300,000', cost: 300000 }
    ]},
    { group: 'Automation Devices', items: [
      { label: 'Switch Gear Box', detail: '1 × 198,000', cost: 198000 },
      { label: 'Climate & Fertilizer automatic controller with installation', detail: '1 × 300,000', cost: 300000 }
    ]}
  ],
  5000: [
    { group: 'Greenhouse Structure', items: [
      { label: 'Tunnel structure with roof', detail: '5000 sqft × 700', cost: 3500000 }
    ]},
    { group: 'Floor Preparation', items: [
      { label: 'Weed mat', detail: '5000 sqft × 25', cost: 125000 },
      { label: 'Weed mat installation', detail: '5000 sqft × 50', cost: 250000 }
    ]},
    { group: 'Irrigation & Trellising', items: [
      { label: 'Drip Irrigation System', detail: '5000 sqft × 60', cost: 300000 },
      { label: 'Drip Irrigation installation', detail: '1 × 40,000', cost: 40000 },
      { label: 'Trellis', detail: '5000 × 40', cost: 200000 }
    ]},
    { group: 'Growing Medium', items: [
      { label: 'Grow bags', detail: '1150 × 320', cost: 368000 }
    ]},
    { group: 'Cooling System', items: [
      { label: 'Weather Station', detail: '1 × 180,000', cost: 180000 },
      { label: 'Automated Side Curtain system', detail: '2 × 150,000', cost: 300000 },
      { label: 'Rollup motor & Climber', detail: '2 × 48,000', cost: 96000 },
      { label: 'Shade net', detail: '14 × 16,900', cost: 236600 },
      { label: 'Manual Shade Net System & installation', detail: '1 × 250,000', cost: 250000 },
      { label: 'Roof ventilation fan', detail: '2 × 140,000', cost: 280000 },
      { label: 'Installation of fans', detail: '2 × 10,000', cost: 20000 },
      { label: 'Circulation fans', detail: '8 × 55,000', cost: 440000 },
      { label: 'Circulation fans installation', detail: '8 × 2,000', cost: 16000 },
      { label: 'Wiring & installation', detail: '1 × 350,000', cost: 350000 }
    ]},
    { group: 'Automation Devices', items: [
      { label: 'Climate & Fertilizer automatic controller with installation', detail: '1 × 280,000', cost: 280000 },
      { label: 'Switch Gear', detail: '1 × 180,000', cost: 180000 }
    ]}
  ]
};

/* ================================================================== */
/* PRODUCT DATABASE — new catalog sections (simple image/name/price)  */
/* Demo subset; the live list syncs automatically from the AiGROW DB. */
/* ================================================================== */
export interface CatalogVariant {
  label: string;
  price: string;
  note?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  price: string;          // headline price ("from" price when the item has variants)
  group: string;          // filter bucket within its section
  image?: string;         // omitted items fall back to a lettered tile
  spec?: string;          // technical description shown on the card
  unitRate?: string;      // e.g. "LKR 380 / sqm" or "per kg"
  variants?: CatalogVariant[];
}

/* Verified catalog imagery. Every URL below returned HTTP 200 at time of writing.
   Most resolve to Wikimedia Commons files (CC BY-SA / public domain — see the credit
   line rendered under the Fresh Produce grid); a handful are curated Unsplash shots.
   All of this is placeholder photography: once the catalog syncs from the AiGROW
   database its own product images should take over. */
const CATALOG_IMAGES: Record<string, string> = {
  Abalone:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pleurotus_cystidiosus_144580000.jpg/960px-Pleurotus_cystidiosus_144580000.jpg',
  'Abalone Mushroom':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pleurotus_cystidiosus_144580000.jpg/960px-Pleurotus_cystidiosus_144580000.jpg',
  'African Eggplant':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solanum_aethiopicum.jpg/960px-Solanum_aethiopicum.jpg',
  Ambarella:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Starr_980529-4218_Spondias_dulcis.jpg/960px-Starr_980529-4218_Spondias_dulcis.jpg',
  'American Oyster':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pleurotus_ostreatus_JPG7.jpg/960px-Pleurotus_ostreatus_JPG7.jpg',
  'American Oyster - Fresh':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pleurotus_ostreatus_JPG7.jpg/960px-Pleurotus_ostreatus_JPG7.jpg',
  'American Oyster - Fresh (Budget)':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pleurotus_ostreatus_JPG7.jpg/960px-Pleurotus_ostreatus_JPG7.jpg',
  Basil:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Ocimum_basilicum_8zz.jpg/960px-Ocimum_basilicum_8zz.jpg',
  Beans:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Heaps_of_beans.jpg/960px-Heaps_of_beans.jpg',
  'Beef Tomato':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Diversit%C3%A9_taille_tomates.jpg/960px-Diversit%C3%A9_taille_tomates.jpg',
  'Beet Root':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Detroitdarkredbeets.png/960px-Detroitdarkredbeets.png',
  'Bell Pepper':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
  'Bell Pepper - Orange':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
  'Bell Pepper - Yellow':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
  'Bell Pepper Yellow':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
  'Bhutan Oyster':
    'https://upload.wikimedia.org/wikipedia/commons/9/94/Oyster_mushoom_fells.jpg',
  'Bitter Gourd':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Momordica_charantia_fruit%2C_cultivated.jpg/960px-Momordica_charantia_fruit%2C_cultivated.jpg',
  Breadfruit:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Artocarpus_altilis_%28fruit%29.jpg/960px-Artocarpus_altilis_%28fruit%29.jpg',
  Bringal:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/960px-Solanum_melongena_24_08_2012_%281%29.JPG',
  'Butter Head':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg/960px-Lettuce_Mini_Heads_%287331119710%29.jpg',
  'Cabbage Leaves':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/960px-Cabbage_and_cross_section_on_white.jpg',
  Capsicum:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Red_capsicum_and_cross_section.jpg/960px-Red_capsicum_and_cross_section.jpg',
  Cardamom:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Cardamom_pods_-_Green_BNC.jpg/960px-Cardamom_pods_-_Green_BNC.jpg',
  Cauliflower:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Chou-fleur_02.jpg/960px-Chou-fleur_02.jpg',
  Chilli:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Madame_Jeanette_and_other_chillies.jpg/960px-Madame_Jeanette_and_other_chillies.jpg',
  'Chinese Kale':
    'https://upload.wikimedia.org/wikipedia/commons/9/90/Gailan.jpg',
  Chives:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Allium_schoenoprasum_-_Bombus_lapidarius_-_Tootsi.jpg/960px-Allium_schoenoprasum_-_Bombus_lapidarius_-_Tootsi.jpg',
  'Cone (Corn)':
    'https://upload.wikimedia.org/wikipedia/commons/7/79/VegCorn.jpg',
  Crystal:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg/960px-Lettuce_Mini_Heads_%287331119710%29.jpg',
  'Dehydrated Oyster':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pleurotus_ostreatus_JPG7.jpg/960px-Pleurotus_ostreatus_JPG7.jpg',
  'Drumstick Leaves':
    'https://upload.wikimedia.org/wikipedia/commons/a/a8/Sonjna_%28Moringa_oleifera%29_leaves_with_flowers_at_Kolkata_W_IMG_2125.jpg',
  Eggplant:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/960px-Solanum_melongena_24_08_2012_%281%29.JPG',
  Frillice:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg/960px-Lettuce_Mini_Heads_%287331119710%29.jpg',
  Ginger:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Zingiber_officinale_fresh_rhizome.JPG/960px-Zingiber_officinale_fresh_rhizome.JPG',
  Gotukola:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Centella_asiatica_%28%E0%A6%A5%E0%A6%BE%E0%A6%A8%E0%A6%95%E0%A7%81%E0%A6%A8%E0%A6%BF%29_%283%29.jpg/960px-Centella_asiatica_%28%E0%A6%A5%E0%A6%BE%E0%A6%A8%E0%A6%95%E0%A7%81%E0%A6%A8%E0%A6%BF%29_%283%29.jpg',
  'Green Beans':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Heaps_of_beans.jpg/960px-Heaps_of_beans.jpg',
  'Green Bell Pepper':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green-Yellow-Red-Pepper-2009.jpg/960px-Green-Yellow-Red-Pepper-2009.jpg',
  'Green Chilli':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Madame_Jeanette_and_other_chillies.jpg/960px-Madame_Jeanette_and_other_chillies.jpg',
  'Green Oak':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Green_Oak_Leaf_lettuce_J1.jpg/960px-Green_Oak_Leaf_lettuce_J1.jpg',
  'Honeydew Melon':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Honeydew.jpg/960px-Honeydew.jpg',
  Iceberg:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Iceberg_lettuce_%28IJssla_krop%29.jpg/960px-Iceberg_lettuce_%28IJssla_krop%29.jpg',
  Kale:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Boerenkool.jpg/960px-Boerenkool.jpg',
  'Kan Kung':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/N_Ipoa_D1600.JPG/960px-N_Ipoa_D1600.JPG',
  'Kathuru Murunga':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Starr_050518-1632_Sesbania_grandiflora.jpg/960px-Starr_050518-1632_Sesbania_grandiflora.jpg',
  'Kathuru Murunga Flowers':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Starr_050518-1632_Sesbania_grandiflora.jpg/960px-Starr_050518-1632_Sesbania_grandiflora.jpg',
  'Kno Khol':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Brassica_oleracea_var._gongylodes_%28kohlrabi%29.jpg/960px-Brassica_oleracea_var._gongylodes_%28kohlrabi%29.jpg',
  Kochchi:
    'https://upload.wikimedia.org/wikipedia/commons/6/62/Tabasco_peppers.JPG',
  'Kol Khol':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Brassica_oleracea_var._gongylodes_%28kohlrabi%29.jpg/960px-Brassica_oleracea_var._gongylodes_%28kohlrabi%29.jpg',
  'Ladies Finger':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_25_2012.JPG/960px-Hong_Kong_Okra_Aug_25_2012.JPG',
  'Lady Finger':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_25_2012.JPG/960px-Hong_Kong_Okra_Aug_25_2012.JPG',
  'Leafy Cabbage':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/960px-Cabbage_and_cross_section_on_white.jpg',
  Leeks:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Leek_on_white_background_-_0947.jpg/960px-Leek_on_white_background_-_0947.jpg',
  Lemon:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030323.JPG/960px-P1030323.JPG',
  'Lemon Grass':
    'https://upload.wikimedia.org/wikipedia/commons/b/bd/YosriNov04Pokok_Serai.JPG',
  Lettuce:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg/960px-Lettuce_Mini_Heads_%287331119710%29.jpg',
  'Lollo Bionda':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Lollo_Bionda_lettuce_J1.jpg/960px-Lollo_Bionda_lettuce_J1.jpg',
  'Lollo Rosso':
    'https://upload.wikimedia.org/wikipedia/commons/b/b2/Lollo_Rosso_Lollo_Bianco_4880.jpg',
  'Long Beans':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Yardlong_bean_and_Carrot.jpg/960px-Yardlong_bean_and_Carrot.jpg',
  Loofa:
    'https://upload.wikimedia.org/wikipedia/commons/7/7d/Luffa_aegyptica.jpg',
  Mint:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Mentha_spicata-IMG_6186.jpg/960px-Mentha_spicata-IMG_6186.jpg',
  'Mulch Film':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/20110829-FSA-XX-0029_-_Flickr_-_USDAgov.jpg/960px-20110829-FSA-XX-0029_-_Flickr_-_USDAgov.jpg',
  Okra:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Hong_Kong_Okra_Aug_25_2012.JPG/960px-Hong_Kong_Okra_Aug_25_2012.JPG',
  Packchoi:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bok_Choy_%2849553125456%29.jpg/960px-Bok_Choy_%2849553125456%29.jpg',
  'Pak Choy':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Bok_Choy_%2849553125456%29.jpg/960px-Bok_Choy_%2849553125456%29.jpg',
  Paneer:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Panir_Paneer_Indian_cheese_fresh.jpg/960px-Panir_Paneer_Indian_cheese_fresh.jpg',
  Parsley:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Petroselinum.jpg/960px-Petroselinum.jpg',
  'Pheromone Trap Box & Tablet':
    'https://upload.wikimedia.org/wikipedia/commons/b/b0/K7779-1.jpg',
  'Pink Oyster':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pleurotus_djamor_crop.jpg/960px-Pleurotus_djamor_crop.jpg',
  Radish:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Radish_3371103037_4ab07db0bf_o.jpg/960px-Radish_3371103037_4ab07db0bf_o.jpg',
  'Red Oak':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Starr-081031-0390-Lactuca_sativa-red_oak_leaf_lettuce-Makawao-Maui_%2824631209520%29.jpg/960px-Starr-081031-0390-Lactuca_sativa-red_oak_leaf_lettuce-Makawao-Maui_%2824631209520%29.jpg',
  'Red Onion':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Red_onions_11.jpg/960px-Red_onions_11.jpg',
  Romaine:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Starr_070730-7911_Lactuca_sativa.jpg/960px-Starr_070730-7911_Lactuca_sativa.jpg',
  Rosemary:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Rosemary_in_bloom.JPG/960px-Rosemary_in_bloom.JPG',
  'Salad Cucumber':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/ARS_cucumber.jpg/960px-ARS_cucumber.jpg',
  'Scotch Bonnet':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Scotch_bonnet_chili_pepper.jpg/960px-Scotch_bonnet_chili_pepper.jpg',
  'Seeni Banana':
    'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
  'Shitaki Mushroom':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Shiitakegrowing.jpg/960px-Shiitakegrowing.jpg',
  Spinach:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Fresh_Spinach_leaves.jpg/960px-Fresh_Spinach_leaves.jpg',
  'Sweet Potato':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ipomoea_batatas_006.JPG/960px-Ipomoea_batatas_006.JPG',
  'Thampola (Green)':
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Amaranthus_tricolor0.jpg',
  'Thampola (Red)':
    'https://upload.wikimedia.org/wikipedia/commons/0/05/Amaranthus_cruentus1.jpg',
  Thibatu:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Solanum_violaceum_02.JPG/960px-Solanum_violaceum_02.JPG',
  Tomato:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/960px-Tomato_je.jpg',
  Turmeric:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Turmeric_rhizome.jpg/960px-Turmeric_rhizome.jpg',
  Turnip:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Turnip_2622027.jpg/960px-Turnip_2622027.jpg',
  'Bell Pepper Red':
    'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=600',
  Broccoli:
    'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=600',
  'Cherry Tomato':
    'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=600',
  Cucumber:
    'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=600',
  'Shiitake Mushroom':
    'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&q=80&w=600',
  Carrot:
    'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600',
  Cabbage:
    'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=600',
  Zucchini:
    'https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&q=80&w=600',
};

export const GREENHOUSE_PART_GROUPS = [
  'Covering Films',
  'Netting & Shade',
  'Ground Cover',
  'Ventilation & Cooling',
  'Rollup Systems',
  'Fixings & Accessories',
  'Pest Management'
] as const;

export const GREENHOUSE_PARTS: CatalogItem[] = [
  /* ---- Covering Films ---- */
  {
    id: 'polythene-ginegar',
    name: 'Polythene (Ginegar)',
    group: 'Covering Films',
    price: 'From LKR 110,000',
    unitRate: 'LKR 380 / sqm',
    spec: 'UV treated, 200 micron, drip lock diffused greenhouse film.',
    image: 'https://images.unsplash.com/photo-1620200423727-8127f75d7f53?auto=format&fit=crop&q=80&w=600',
    variants: [
      { label: '6m × 50m', price: 'LKR 110,000' },
      { label: '8m × 50m', price: 'LKR 145,000' },
      { label: '10m × 50m', price: 'LKR 185,000' }
    ]
  },
  {
    id: 'mulch-film',
    name: 'Mulch Film',
    group: 'Covering Films',
    price: 'LKR 9,250',
    unitRate: 'LKR 38.54 / sqm',
    spec: 'Ground mulch film for weed suppression and moisture retention.',
    image: CATALOG_IMAGES['Mulch Film'],
    variants: [{ label: '1.2m × 200m', price: 'LKR 9,250' }]
  },
  {
    id: 'polythene-repair-tape',
    name: 'Polythene Repair Tape',
    group: 'Covering Films',
    price: 'LKR 2,500',
    spec: '10cm × 10m, 200 microns — patches tears without re-skinning the tunnel.'
  },

  /* ---- Netting & Shade ---- */
  {
    id: 'insect-net-40x25',
    name: 'Insect Proof Net (40 × 25 Mesh)',
    group: 'Netting & Shade',
    price: 'LKR 75,000',
    unitRate: 'LKR 240 / sqm',
    spec: '40 × 25 mesh screening for side walls and vents.',
    variants: [{ label: '3.2m × 100m', price: 'LKR 75,000' }]
  },
  {
    id: 'insect-net-40x40',
    name: 'Insect Proof Net (40 × 40 Mesh)',
    group: 'Netting & Shade',
    price: 'LKR 80,000',
    unitRate: 'LKR 250 / sqm',
    spec: 'Finer 40 × 40 mesh for whitefly and thrips exclusion.',
    variants: [{ label: '3.5m × 100m', price: 'LKR 80,000' }]
  },
  {
    id: 'shade-net-aluminum',
    name: 'Shade Net (Aluminum, Outside)',
    group: 'Netting & Shade',
    price: 'LKR 136,000',
    unitRate: 'LKR 340 / sqm',
    spec: '50% shade, 70 GSM — external reflective shading.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=600',
    variants: [{ label: '4.0m × 100m', price: 'LKR 136,000' }]
  },
  {
    id: 'thermal-shade-net',
    name: 'Thermal Shade Net (Aluminet, Inside)',
    group: 'Netting & Shade',
    price: 'LKR 124,700',
    unitRate: 'LKR 290 / sqm',
    spec: '65% shade — internal thermal screen for day cooling and night heat retention.',
    variants: [{ label: '4.3m × 100m', price: 'LKR 124,700' }]
  },

  /* ---- Ground Cover ---- */
  {
    id: 'weed-mat',
    name: 'Weed Mat (Ground Cover)',
    group: 'Ground Cover',
    price: 'LKR 45,000',
    unitRate: 'LKR 150 / sqm',
    spec: 'Woven black ground cover for floor preparation.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=600',
    variants: [{ label: '3.0m × 100m', price: 'LKR 45,000' }]
  },
  {
    id: 'white-weed-mat',
    name: 'White Weed Mat (Ground Cover)',
    group: 'Ground Cover',
    price: 'LKR 49,000',
    unitRate: 'LKR 163.33 / sqm',
    spec: 'Light-reflective white ground cover — lifts canopy light levels.',
    variants: [{ label: '3.0m × 100m', price: 'LKR 49,000' }]
  },

  /* ---- Ventilation & Cooling ---- */
  {
    id: 'exhaust-fan',
    name: 'Exhaust Fan (Hammer Type)',
    group: 'Ventilation & Cooling',
    price: 'From LKR 80,000',
    spec: 'Stainless steel blades with aluminum frame. Five airflow ratings.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    variants: [
      { label: '4.5"', price: 'LKR 140,000', note: '1380×1380×400mm · 44,000 m³/h · 1.1kW · 220V 3-Phase' },
      { label: '3.6"', price: 'LKR 110,000', note: '1100×1100×400mm · 36,000 m³/h · 0.75kW · 220V 1-Phase' },
      { label: '3.2"', price: 'LKR 100,000', note: '1000×1000×400mm · 30,000 m³/h · 0.55kW · 220V 1-Phase' },
      { label: '2.6"', price: 'LKR 90,000', note: '800×800×400mm · 22,000 m³/h · 0.37kW · 220V 1-Phase' },
      { label: '2"', price: 'LKR 80,000', note: '600×600×400mm · 6,000 m³/h · 0.37kW · 220V 1-Phase' }
    ]
  },
  {
    id: 'circulation-fan',
    name: 'Circulation Fan',
    group: 'Ventilation & Cooling',
    price: 'LKR 60,000',
    spec: '500mm diameter · 6,000 CMH · 0.18kW 1-Phase.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'cooling-pad-set',
    name: 'Cooling Pad Set',
    group: 'Ventilation & Cooling',
    price: 'LKR 110,000',
    spec: '1800×3000×150mm. Includes frames, pipe and gutters.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600'
  },

  /* ---- Rollup Systems ---- */
  {
    id: 'manual-handle-rollup',
    name: 'Manual Handle Rollup',
    group: 'Rollup Systems',
    price: 'LKR 17,000',
    spec: '3m cable · 100m winding.'
  },
  {
    id: 'manual-chain-rollup',
    name: 'Manual Chain Rollup',
    group: 'Rollup Systems',
    price: 'LKR 19,500',
    spec: '3m chain · 100m winding.'
  },
  {
    id: 'rollup-motor',
    name: 'Roll-Up Motor & Climber',
    group: 'Rollup Systems',
    price: 'LKR 48,000',
    spec: '220V · 1-Phase · 100m winding.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600'
  },

  /* ---- Fixings & Accessories ---- */
  {
    id: 'film-lock-aluminum',
    name: 'Film Lock Channel (Aluminum)',
    group: 'Fixings & Accessories',
    price: 'LKR 1,550',
    spec: '4m channel with wriggle wire (2m × 2pc).'
  },
  {
    id: 'film-lock-steel',
    name: 'Film Lock Channel (Galvanized Steel)',
    group: 'Fixings & Accessories',
    price: 'LKR 1,100',
    spec: '4m channel with wriggle wire (2m × 2pc).'
  },
  {
    id: 'wind-belt-roll',
    name: 'Wind Belt Roll (100m)',
    group: 'Fixings & Accessories',
    price: 'From LKR 3,000',
    spec: 'Volume pricing per piece — the rate drops as the order size rises.',
    variants: [
      { label: '1 pc', price: 'LKR 4,500', note: 'per pc' },
      { label: '5 pc', price: 'LKR 3,500', note: 'per pc' },
      { label: '10 pc', price: 'LKR 3,000', note: 'per pc' }
    ]
  },
  {
    id: 'film-clip-25mm',
    name: 'Film Clip 25mm (3/4 inch)',
    group: 'Fixings & Accessories',
    price: 'LKR 60'
  },
  {
    id: 'film-clip-32mm',
    name: 'Film Clip 32mm (1 inch)',
    group: 'Fixings & Accessories',
    price: 'LKR 80'
  },
  {
    id: 'trellis-clip',
    name: 'Trellis Clip',
    group: 'Fixings & Accessories',
    price: 'From LKR 800',
    spec: 'Sold in packs — larger packs carry a lower unit rate.',
    variants: [
      { label: '100 pc', price: 'LKR 800' },
      { label: '500 pc', price: 'LKR 3,200' },
      { label: '1000 pc', price: 'LKR 4,900' }
    ]
  },
  {
    id: 'trellis-hook',
    name: 'Trellis Hook',
    group: 'Fixings & Accessories',
    price: 'LKR 95'
  },
  {
    id: 'roller-hook',
    name: 'Roller Hook',
    group: 'Fixings & Accessories',
    price: 'LKR 380'
  },

  /* ---- Pest Management ---- */
  {
    id: 'yellow-sticky-cards',
    name: 'Yellow Sticky Cards',
    group: 'Pest Management',
    price: 'From LKR 800',
    spec: '20 × 25cm monitoring traps for flying pests.',
    variants: [
      { label: '10 pcs', price: 'LKR 800' },
      { label: '100 pcs', price: 'LKR 6,500' }
    ]
  },
  {
    id: 'yellow-sticky-rolls',
    name: 'Yellow Sticky Rolls',
    group: 'Pest Management',
    price: 'LKR 17,500',
    spec: '15cm × 50m continuous roll for row-length coverage.'
  },
  {
    id: 'pheromone-trap',
    name: 'Pheromone Trap Box & Tablet',
    group: 'Pest Management',
    price: 'LKR 2,900',
    spec: 'Trap box supplied with pheromone tablet.',
    image: CATALOG_IMAGES['Pheromone Trap Box & Tablet']
  }
];

/* ---- Fresh Produce — live prices per kilo ---- */
export const FRESH_PRODUCE_GROUPS = [
  'Leafy Greens',
  'Peppers & Chillies',
  'Tomatoes',
  'Mushrooms',
  'Roots & Bulbs',
  'Beans & Pods',
  'Fruits & Gourds',
  'Herbs & Spices',
  'Other'
] as const;



/* [name, price (LKR/kg), group] — synced from the AiGROW produce database. */
const PRODUCE_ROWS: [string, string, string][] = [
  ['Abalone', '975.00', 'Mushrooms'],
  ['Abalone Mushroom', '683.06', 'Mushrooms'],
  ['African Eggplant', '600.00', 'Fruits & Gourds'],
  ['Ambarella', '250.00', 'Fruits & Gourds'],
  ['American Oyster', '140.00', 'Mushrooms'],
  ['American Oyster - Fresh', '447.82', 'Mushrooms'],
  ['American Oyster - Fresh (Budget)', '54.00', 'Mushrooms'],
  ['Basil', '542.45', 'Herbs & Spices'],
  ['Beans', '365.38', 'Beans & Pods'],
  ['Beef Tomato', '480.34', 'Tomatoes'],
  ['Beet Root', '265.00', 'Roots & Bulbs'],
  ['Bell Pepper Red', '1,944.19', 'Peppers & Chillies'],
  ['Bell Pepper Yellow', '1,893.75', 'Peppers & Chillies'],
  ['Bell Pepper', '1,355.14', 'Peppers & Chillies'],
  ['Bell Pepper', '558.33', 'Peppers & Chillies'],
  ['Bell Pepper - Orange', '1,300.00', 'Peppers & Chillies'],
  ['Bell Pepper - Yellow', '1,350.00', 'Peppers & Chillies'],
  ['Bhutan Oyster', '857.14', 'Mushrooms'],
  ['Bitter Gourd', '250.00', 'Fruits & Gourds'],
  ['Breadfruit', '150.00', 'Fruits & Gourds'],
  ['Bringal', '200.00', 'Fruits & Gourds'],
  ['Broccoli', '1,281.29', 'Leafy Greens'],
  ['Butter Head', '396.41', 'Leafy Greens'],
  ['Cabbage', '199.69', 'Leafy Greens'],
  ['Cabbage Leaves', '215.83', 'Leafy Greens'],
  ['Capsicum', '527.84', 'Peppers & Chillies'],
  ['Cardamom', '16,000.00', 'Herbs & Spices'],
  ['Carrot', '289.23', 'Roots & Bulbs'],
  ['Cauliflower', '455.72', 'Leafy Greens'],
  ['Cherry Tomato', '1,284.75', 'Tomatoes'],
  ['Chilli', '900.00', 'Peppers & Chillies'],
  ['Chinese Kale', '450.00', 'Leafy Greens'],
  ['Chives', '160.00', 'Herbs & Spices'],
  ['Cone (Corn)', '800.00', 'Other'],
  ['Crystal', '668.57', 'Leafy Greens'],
  ['Cucumber', '290.30', 'Fruits & Gourds'],
  ['Dehydrated Oyster', '385.00', 'Mushrooms'],
  ['Drumstick Leaves', '400.00', 'Leafy Greens'],
  ['Eggplant', '400.00', 'Fruits & Gourds'],
  ['Frillice', '1,168.18', 'Leafy Greens'],
  ['Ginger', '1,500.00', 'Roots & Bulbs'],
  ['Gotukola', '125.63', 'Leafy Greens'],
  ['Green Beans', '600.00', 'Beans & Pods'],
  ['Green Bell Pepper', '750.00', 'Peppers & Chillies'],
  ['Green Chilli', '519.22', 'Peppers & Chillies'],
  ['Green Oak', '375.01', 'Leafy Greens'],
  ['Honeydew Melon', '123.33', 'Fruits & Gourds'],
  ['Iceberg', '300.00', 'Leafy Greens'],
  ['Kale', '747.14', 'Leafy Greens'],
  ['Kan Kung', '229.58', 'Leafy Greens'],
  ['Kathuru Murunga', '190.00', 'Leafy Greens'],
  ['Kathuru Murunga Flowers', '100.00', 'Leafy Greens'],
  ['Kno Khol', '150.00', 'Roots & Bulbs'],
  ['Kochchi', '1,200.00', 'Peppers & Chillies'],
  ['Kohila', '300.00', 'Roots & Bulbs'],
  ['Kol Khol', '80.00', 'Roots & Bulbs'],
  ['Ladies Finger', '272.00', 'Beans & Pods'],
  ['Lady Finger', '550.00', 'Beans & Pods'],
  ['Leafy Cabbage', '210.00', 'Leafy Greens'],
  ['Leeks', '119.00', 'Roots & Bulbs'],
  ['Lemon', '532.69', 'Fruits & Gourds'],
  ['Lemon Grass', '558.33', 'Herbs & Spices'],
  ['Lettuce', '1,574.55', 'Leafy Greens'],
  ['Lollo Bionda', '503.31', 'Leafy Greens'],
  ['Lollo Rosso', '639.03', 'Leafy Greens'],
  ['Long Beans', '268.75', 'Beans & Pods'],
  ['Loofa', '300.00', 'Fruits & Gourds'],
  ['Mint', '399.68', 'Herbs & Spices'],
  ['Okra', '245.94', 'Beans & Pods'],
  ['Packchoi', '496.38', 'Leafy Greens'],
  ['Pak Choy', '250.00', 'Leafy Greens'],
  ['Paneer', '2,590.91', 'Other'],
  ['Parsley', '136.50', 'Herbs & Spices'],
  ['Pink Oyster', '1,000.00', 'Mushrooms'],
  ['Radish', '112.70', 'Roots & Bulbs'],
  ['Red Oak', '523.51', 'Leafy Greens'],
  ['Red Onion', '500.00', 'Roots & Bulbs'],
  ['Romaine', '436.59', 'Leafy Greens'],
  ['Rosemary', '1,030.67', 'Herbs & Spices'],
  ['Salad Cucumber', '390.75', 'Fruits & Gourds'],
  ['Scotch Bonnet', '1,155.81', 'Peppers & Chillies'],
  ['Seeni Banana', '90.00', 'Fruits & Gourds'],
  ['Shiitake Mushroom', '1,657.14', 'Mushrooms'],
  ['Shitaki Mushroom', '2,175.00', 'Mushrooms'],
  ['Spinach', '129.34', 'Leafy Greens'],
  ['Sweet Potato', '80.00', 'Roots & Bulbs'],
  ['Thampola (Green)', '200.00', 'Fruits & Gourds'],
  ['Thampola (Red)', '200.00', 'Fruits & Gourds'],
  ['Thibatu', '300.00', 'Fruits & Gourds'],
  ['Tomato', '314.25', 'Tomatoes'],
  ['Turmeric', '1,452.00', 'Herbs & Spices'],
  ['Turnip', '225.00', 'Roots & Bulbs'],
  ['Zucchini', '250.00', 'Fruits & Gourds']
];

export const FRESH_PRODUCE: CatalogItem[] = PRODUCE_ROWS.map(([name, price, group], idx) => ({
  id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${idx}`,
  name,
  price: `LKR ${price}`,
  unitRate: 'per kg',
  group,
  image: CATALOG_IMAGES[name]
}));
