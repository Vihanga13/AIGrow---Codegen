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
    image: '/src/assets/images/greenhouse_hero_1782916632662.jpg',
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
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
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
    image: '/src/assets/images/mushroom_farm_1782916652005.jpg',
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
