/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import type { PromptTemplate } from './types';

const promptTemplates: PromptTemplate[] = [
  {
    title: 'Jewelry Store',
    description: 'High-end e-commerce for jewelry with filtering and 3D views.',
    category: 'E-commerce & Shopping',
    tags: ['jewelry', 'luxury', 'ecommerce', '3d'],
    content:
      'Design a luxurious Jewelry Store platform focused on high-end retail experiences. Implement advanced filtering for materials (Gold, Silver, Platinum), carat weights, and gemstone types. Integrate a 3D model viewer (using {{3dLib}}) allowing users to rotate rings and necklaces. Include an interactive ring size guide with a physical measurement tool and a gift packaging selection flow during checkout. Ensure the UI supports high-resolution imagery and smooth animations to emphasize product quality.',
    variables: [
      {
        name: 'techStack',
        description: 'Core e-commerce technology stack',
        type: 'select',
        options: ['Shopify', 'WooCommerce', 'MERN'],
        required: true,
      },
      {
        name: '3dLib',
        description: 'Library for rendering 3D models',
        type: 'select',
        options: ['Three.js', 'ModelViewer', 'Spline'],
        required: false,
      },
    ],
  },
  {
    title: 'Car Parts Finder',
    description: 'Catalog for auto parts with compatibility search.',
    category: 'E-commerce & Shopping',
    tags: ['automotive', 'parts', 'ecommerce', 'search'],
    content:
      'Develop a comprehensive Car Parts Finder e-commerce solution. The core feature is a robust vehicle selector (Year, Make, Model, Trim) that filters the entire inventory. Implement part categorization (Engine, Brakes, Body, Suspension) and clearly distinguish between universal parts and vehicle-specific fitments. Enhance the user experience with interactive part diagrams featuring clickable hotspots that link directly to the SKU. Include an advanced search with auto-suggestion and compatibility check warnings.',
    variables: [
      {
        name: 'techStack',
        description: 'Backend framework for the catalog',
        type: 'select',
        options: ['Magento', 'PHP', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Digital Goods Store',
    description: 'Selling software keys, e-books, and assets.',
    category: 'E-commerce & Shopping',
    tags: ['digital', 'software', 'ecommerce', 'download'],
    content:
      'Build a secure Digital Goods Store specialized in selling intangible products like software keys, e-books, and digital assets. Implement an automated system to generate unique license keys upon purchase using the {{algo}} method. Create a robust version update logic that allows old buyers to download new file versions seamlessly. The product page must support rich previews, including screenshots for software and PDF previews for e-books. Ensure secure download links that expire after a set time.',
    variables: [
      {
        name: 'algo',
        description: 'Algorithm for generating license keys',
        type: 'select',
        options: ['UUID', 'Random String', 'Hashed'],
        required: true,
      },
      {
        name: 'techStack',
        description: 'Web framework for the store',
        type: 'select',
        options: ['Laravel', 'Node.js', 'WordPress'],
        required: true,
      },
    ],
  },
  {
    title: 'Dropshipping Dashboard',
    description: 'Tool to manage suppliers and sync inventory.',
    category: 'E-commerce & Shopping',
    tags: ['dropshipping', 'inventory', 'ecommerce', 'automation'],
    content:
      'Create a comprehensive Dropshipping Management Dashboard to streamline supplier relationships. The system must support bulk importing of supplier feeds in CSV or XML formats. Implement a visual product mapping interface to align internal SKUs with supplier SKUs. Include flexible auto-pricing rules (e.g., Supplier Price * 1.5 + Margin) and automated order routing that sends purchase details directly to the supplier via email or API. Track sync status and log errors for inventory updates.',
    variables: [
      {
        name: 'techStack',
        description: 'Server-side technology',
        type: 'select',
        options: ['Node.js', 'Python', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Print-on-Demand Store',
    description: 'Merch store with design preview and ordering.',
    category: 'E-commerce & Shopping',
    tags: ['merch', 'print-on-demand', 'ecommerce', 'design'],
    content:
      'Build a Print-on-Demand Storefront that integrates custom design tools. Provide a product catalog covering T-shirts, Mugs, and Hoodies with dynamic size and color matrices. The core feature is a real-time design preview tool ({{mockupLib}}) that overlays user uploads onto product images. Include a mockup generator for marketing materials that applies the design to lifestyle photos automatically. Handle order processing by sending print-ready files to the fulfillment partner API.',
    variables: [
      {
        name: 'mockupLib',
        description: 'Library for design visualization',
        type: 'select',
        options: ['Printful API', 'Custom HTML5 Canvas', 'Placeit API'],
        required: true,
      },
    ],
  },
  {
    title: 'Gym Membership App',
    description: 'Manage gym members and class schedules.',
    category: 'Mobile App Specific',
    tags: ['fitness', 'gym', 'membership', 'mobile'],
    content:
      'Develop a cross-platform Gym Membership App for both staff and members. Members can manage profiles (Photo, Bio, Plan details), view class schedules, and book spots for Yoga or Spin classes. Implement a unique QR code check-in system for entry at the turnstile. The app should also feature trainer profiles with specialties and availability for private booking. Push notifications for class reminders and membership renewals are essential.',
    variables: [
      {
        name: 'platform',
        description: 'Mobile development framework',
        type: 'select',
        options: ['React Native', 'Flutter', 'Ionic'],
        required: true,
      },
    ],
  },
  {
    title: 'Spa Booking',
    description: 'Service booking for massages and facials.',
    category: 'Business & Corporate',
    tags: ['spa', 'booking', 'wellness', 'appointment'],
    content:
      'Create a serene and user-friendly Spa Booking System. Display a detailed service menu with duration, pricing, and descriptions for treatments like massages and facials. Implement a staff selection interface showing real-time availability. Allow customers to select add-ons like aromatherapy or hot stones during the booking flow. Include a gift card purchase module where users can buy and send digital gift cards instantly.',
    variables: [
      {
        name: 'techStack',
        description: 'Booking platform framework',
        type: 'select',
        options: ['WordPress (Bookly)', 'Django', 'Ruby on Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'Hair Salon Booking',
    description: 'Stylist profiles and appointment calendar.',
    category: 'Business & Corporate',
    tags: ['salon', 'hair', 'booking', 'calendar'],
    content:
      'Build a dynamic Hair Salon App focused on stylist-client matching. Feature stylist portfolios with photos of previous work to help customers choose. Implement a service selection system for cuts, colors, and styling. The booking engine must support recurring appointments (e.g., every 4 weeks). Integrate an SMS notification system to send reminders 24 hours before the appointment and confirmations upon booking.',
    variables: [
      {
        name: 'techStack',
        description: 'Web development stack',
        type: 'select',
        options: ['Next.js', 'Vue', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Dog Walking App',
    description: 'Connect pet owners with walkers and track GPS.',
    category: 'Mobile App Specific',
    tags: ['pets', 'walking', 'tracker', 'mobile'],
    content:
      'Create a Dog Walking App that connects owners with verified walkers. Display detailed walker profiles including reviews, certifications, and background checks. The core functionality is live GPS tracking during the walk, plotting the route on a map for the owner to see. Include a "Potty/Photo Log" feature where walkers can mark bathroom breaks and upload cute photos. Process payments securely within the app via Stripe or PayPal.',
    variables: [
      {
        name: 'platform',
        description: 'Mobile app platform',
        type: 'select',
        options: ['React Native', 'Flutter', 'Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Pet Grooming',
    description: 'Booking and profile management for pets.',
    category: 'Business & Corporate',
    tags: ['pets', 'grooming', 'booking', 'crm'],
    content:
      'Develop a specialized Pet Grooming CRM for managing appointments and pet history. Create comprehensive pet profiles including breed, age, allergies, and vet information. Offer predefined grooming packages (e.g., Bath, Full Groom, Nail Trim). The system should track vaccination records and send automated reminders when shots are due. Maintain a gallery of before/after photos for marketing and owner approval.',
    variables: [
      {
        name: 'techStack',
        description: 'CRM backend technology',
        type: 'select',
        options: ['Django', 'Rails', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Tutoring Platform',
    description: 'One-on-one video tutoring with whiteboard.',
    category: 'Educational & Academic',
    tags: ['tutoring', 'video', 'whiteboard', 'education'],
    content:
      'Build a high-performance Tutoring Platform facilitating real-time learning. Integrate video conferencing using {{videoSdk}} for low-latency one-on-one sessions. Include a collaborative whiteboard ({{wbLib}}) where tutors can draw math problems or diagrams. Allow users to search for tutors by subject and rate, with a booking system for lesson scheduling. For Computer Science tutors, embed a live code editor. Implement a billing system charged per minute of session time.',
    variables: [
      {
        name: 'videoSdk',
        description: 'Video conferencing SDK provider',
        type: 'select',
        options: ['Agora', 'Twilio', 'Daily'],
        required: true,
      },
      {
        name: 'wbLib',
        description: 'Whiteboard library',
        type: 'select',
        options: ['Fabric.js', 'Konva', 'Awwapp API'],
        required: true,
      },
    ],
  },
  {
    title: 'Music Lessons',
    description: 'Platform for music teachers and students.',
    category: 'Educational & Academic',
    tags: ['music', 'lessons', 'booking', 'audio'],
    content:
      'Create a Music Lesson Portal for instructors and students. Categorize teachers by instrument (Guitar, Piano, Drums, Violin). Implement a file exchange system for audio recordings and MIDI files. Include a built-in sheet music viewer that supports formats like PDF or MusicXML. The platform should feature a lesson notes logging tool where students can write down key takeaways and practice assignments after each session.',
    variables: [
      {
        name: 'techStack',
        description: 'Web framework',
        type: 'select',
        options: ['WordPress', 'Django', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Language Exchange',
    description: 'Community for practicing languages via chat.',
    category: 'Educational & Academic',
    tags: ['language', 'chat', 'exchange', 'learning'],
    content:
      'Build a Language Exchange App to connect learners globally. Users create profiles specifying their native language and the language they are learning. Implement a matching algorithm to suggest "Language Swap" partners. The chat interface should support text and video, with an integrated translation hint feature using {{translateApi}} to help users understand difficult words. Add a correction system where users can highlight and suggest fixes for errors in their partner\'s messages.',
    variables: [
      {
        name: 'translateApi',
        description: 'Translation service provider',
        type: 'select',
        options: ['Google Translate', 'DeepL', 'LibreTranslate'],
        required: true,
      },
    ],
  },
  {
    title: 'Wine Subscription',
    description: 'Monthly wine delivery with taste quiz.',
    category: 'E-commerce & Shopping',
    tags: ['wine', 'subscription', 'alcohol', 'delivery'],
    content:
      'Create a sophisticated Wine Subscription site. Start new users with an interactive taste preference quiz to determine their palate (Red, White, Dry, Sweet). Allow users to select monthly plans (3 bottles, 6 bottles, 12 bottles). Provide a personal history dashboard of delivered wines with tasting notes and user ratings. Include a "Skip Shipment" feature for months when the user is away or overstocked. Age verification is mandatory at checkout.',
    variables: [
      {
        name: 'techStack',
        description: 'E-commerce platform',
        type: 'select',
        options: ['Shopify (Subscription App)', 'WooCommerce', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Coffee Subscription',
    description: 'Recurring coffee bean delivery with roasts.',
    category: 'E-commerce & Shopping',
    tags: ['coffee', 'subscription', 'food', 'delivery'],
    content:
      'Develop a Coffee Subscription Service focused on freshness. Offer customization for grind size (Whole bean, Espresso, French Press) and roast preference (Light, Medium, Dark). Users can set their delivery frequency (Weekly, Bi-weekly). Add a fun "Surprise Me" option where the roaster selects a single-origin bean of the month. Include a brew guide section based on the user\'s selected grind and roast.',
    variables: [
      {
        name: 'techStack',
        description: 'Web framework',
        type: 'select',
        options: ['Django', 'Rails', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Meal Kit Delivery',
    description: 'Recipe ingredients delivery service.',
    category: 'E-commerce & Shopping',
    tags: ['food', 'meal-kit', 'delivery', 'recipes'],
    content:
      'Build a Meal Kit Platform like HelloFresh or Blue Apron. Display a rotating weekly menu where customers can select 2, 3, or 4 meals. Implement robust dietary filtering options (Vegetarian, Vegan, Keto, Gluten-Free). Allow users to select specific delivery windows. The system must generate printable recipe cards with step-by-step instructions and photos for each meal in the box.',
    variables: [
      {
        name: 'techStack',
        description: 'Fullstack framework',
        type: 'select',
        options: ['MERN', 'Django', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Laundry Service',
    description: 'Pickup and delivery scheduling for laundry.',
    category: 'Business & Corporate',
    tags: ['laundry', 'delivery', 'booking', 'logistics'],
    content:
      'Create a Laundry Service App for on-demand cleaning. Users enter pickup and delivery addresses via a map interface. They select services (Wash & Fold, Dry Cleaning, Ironing) and provide an estimated weight for the load. The app features a visual order status tracker showing progress through stages: Pending -> Picked up -> Cleaning -> Delivered. Route optimization for drivers should be included.',
    variables: [
      {
        name: 'platform',
        description: 'Application type',
        type: 'select',
        options: ['Mobile App', 'Web App'],
        required: true,
      },
    ],
  },
  {
    title: 'House Cleaning',
    description: 'Marketplace for booking home cleaners.',
    category: 'Business & Corporate',
    tags: ['cleaning', 'marketplace', 'booking', 'services'],
    content:
      'Develop a House Cleaning Marketplace connecting customers with vetted cleaners. Display detailed cleaner profiles including verification badges, user reviews, and years of experience. Allow customers to book specific add-ons like deep cleaning the fridge, oven, or interior windows. Utilize an hourly pricing model. Implement an escrow-style payment system where funds are held securely until the cleaning is marked complete.',
    variables: [
      {
        name: 'techStack',
        description: 'Marketplace framework',
        type: 'select',
        options: ['MERN', 'Ruby on Rails', 'Go'],
        required: true,
      },
    ],
  },
  {
    title: 'Lawn Care',
    description: 'Scheduling and management for lawn mowing.',
    category: 'Business & Corporate',
    tags: ['lawn', 'gardening', 'scheduling', 'field-service'],
    content:
      'Build a Lawn Care Management App for landscaping companies. Implement geofenced route planning to optimize mower travel between client properties. Allow field workers to upload photos of the property before and after service. Maintain a digital service history for each client. Support recurring schedules (Weekly, Bi-weekly) and allow for seasonal pauses (e.g., winterizing).',
    variables: [
      {
        name: 'platform',
        description: 'Target platform',
        type: 'select',
        options: ['Mobile App', 'Web Dashboard'],
        required: true,
      },
    ],
  },
  {
    title: 'Pool Maintenance',
    description: 'Tracking chemicals and service visits for pools.',
    category: 'Business & Corporate',
    tags: ['pool', 'maintenance', 'chemicals', 'service'],
    content:
      'Create a Pool Maintenance Tracker for technicians. Features a detailed chemical log for tracking Chlorine, pH, and Alkalinity levels over time. Includes digital service visit forms for technicians to fill out on-site. Maintain a database of client equipment (Pump models, Filter types). Implement automated alerts via email or SMS when chemical readings fall below safe thresholds.',
    variables: [
      {
        name: 'techStack',
        description: 'Backend framework',
        type: 'select',
        options: ['Django', 'Rails', 'Laravel'],
        required: true,
      },
    ],
  },
  {
    title: 'Event Catering',
    description: 'Ordering and menu builder for events.',
    category: 'Business & Corporate',
    tags: ['catering', 'events', 'food', 'orders'],
    content:
      'Build a Catering Ordering System for event planners. Include an interactive menu builder where users can select items from Appetizers, Mains, and Desserts. Implement a guest count calculator that automatically adjusts food quantities based on the number of attendees. Allow users to rent equipment (Chairs, Tables, Linens) through the same system. Display warnings for common dietary restrictions (e.g., nuts, gluten) in selected items.',
    variables: [
      {
        name: 'techStack',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Party Rental',
    description: 'Inventory management for party supplies.',
    category: 'Business & Corporate',
    tags: ['rental', 'inventory', 'party', 'events'],
    content:
      'Create a Party Rental System. Maintain a visual inventory catalog including Tents, Bounce houses, Tables, and Chairs. Implement a real-time availability calendar to prevent double bookings. Handle damage waivers by allowing customers to add insurance options during checkout. Include a quote generator that estimates total cost including delivery fees and taxes.',
    variables: [
      {
        name: 'techStack',
        description: 'Backend technology',
        type: 'select',
        options: ['PHP', 'Python', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Equipment Rental',
    description: 'Construction or AV equipment rental.',
    category: 'Business & Corporate',
    tags: ['rental', 'equipment', 'construction', 'inventory'],
    content:
      'Develop an Equipment Rental Portal for heavy machinery or AV gear. Categorize equipment clearly (Power tools, Lighting, Audio). Implement a flexible rate calculator that supports Daily, Weekly, and Monthly pricing tiers with discounts for longer durations. Track maintenance logs for each piece of equipment. Automatically calculate and display late fees if items are returned past the due date.',
    variables: [
      {
        name: 'techStack',
        description: 'Enterprise framework',
        type: 'select',
        options: ['C# .NET', 'Java', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Bike Rental',
    description: 'Rent bikes by the hour or day.',
    category: 'Real Estate & Travel',
    tags: ['bike', 'rental', 'travel', 'mobile'],
    content:
      'Build a Bike Rental App. Users scan a QR code on the bike to unlock it via Bluetooth. Display a map of all bike stations and battery levels (for e-bikes). Implement a rental timer with live cost estimation. Include a remote lock/unlock feature for pausing the ride during a break.',
    variables: [
      {
        name: 'platform',
        description: 'Hardware interface type',
        type: 'select',
        options: ['Mobile App', 'Kiosk'],
        required: true,
      },
    ],
  },
  {
    title: 'Kayak Rental',
    description: 'Watercraft rental scheduling.',
    category: 'Real Estate & Travel',
    tags: ['kayak', 'rental', 'water', 'scheduling'],
    content:
      'Create a Kayak Rental System. Integrate a weather API to flag high wind conditions and restrict bookings for safety. Collect digital signatures for liability waivers directly on the device before launch. Track the assignment and return of life jackets for every rental. Implement a return time tracker that alerts staff if a kayak is overdue.',
    variables: [
      {
        name: 'techStack',
        description: 'Web stack',
        type: 'select',
        options: ['React', 'Vue', 'Django'],
        required: true,
      },
    ],
  },
  {
    title: 'Helicopter Tours',
    description: 'Scenic flight booking and weight management.',
    category: 'Real Estate & Travel',
    tags: ['helicopter', 'tour', 'booking', 'aviation'],
    content:
      'Build a Helicopter Booking System. Allow customers to select specific flight routes (e.g., City Skyline, Coastline). Critical feature: accurate passenger weight input for every passenger to ensure aircraft balance. Display an interactive seat map so users can choose their view. Enforce a strict weather cancellation policy with automated refunds if the pilot scrubs the flight due to conditions.',
    variables: [
      {
        name: 'techStack',
        description: 'Booking engine framework',
        type: 'select',
        options: ['PHP', 'Rails', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Glamping Site',
    description: 'Luxury camping site booking.',
    category: 'Real Estate & Travel',
    tags: ['glamping', 'camping', 'travel', 'booking'],
    content:
      'Develop a Glamping Site booking engine. List unique tent types like Yurts, Bell Tents, and A-Frame cabins. Use icons to clearly display amenities (Air Conditioning, Private Bath, Heating). Feature a high-resolution photo gallery for each unit. Implement a smooth check-in/check-out flow that generates access codes for the digital locks on the tents.',
    variables: [
      {
        name: 'techStack',
        description: 'CMS or Framework',
        type: 'select',
        options: ['Wix', 'Squarespace', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Treehouse Rental',
    description: 'Unique stays in trees.',
    category: 'Real Estate & Travel',
    tags: ['treehouse', 'unique-stay', 'booking', 'travel'],
    content:
      'Create a Treehouse Rental Site. Describe the unique height and structural details of each treehouse. Prominently display safety information regarding stairs and railings. Show a real-time calendar for availability. Collect and display guest reviews focusing on the unique experience of staying in a tree.',
    variables: [
      {
        name: 'techStack',
        description: 'Platform choice',
        type: 'select',
        options: ['WordPress', 'React', 'Airbnb Clone'],
        required: true,
      },
    ],
  },
  {
    title: 'Lighthouse Stay',
    description: 'Renting rooms in historic lighthouses.',
    category: 'Real Estate & Travel',
    tags: ['lighthouse', 'historic', 'stay', 'booking'],
    content:
      'Build a Lighthouse Booking Portal. Provide rich content about the history and tours available at the lighthouse. Highlight the specific views from rooms (Ocean view, Light room view). Inform guests about climbing restrictions or physical fitness requirements. Display policies specifically regarding storm seasons and cancellation.',
    variables: [
      {
        name: 'techStack',
        description: 'Development stack',
        type: 'select',
        options: ['Django', 'Rails', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'Cave Stay',
    description: 'Underground accommodation.',
    category: 'Real Estate & Travel',
    tags: ['cave', 'underground', 'stay', 'booking'],
    content:
      'Create a Cave Stay Site. Display info on the constant temperature and humidity levels of the cave. Include accessibility warnings for steep stairs or narrow paths. Allow hosts to set themes like "Spooky" or "Romantic". Feature a booking calendar with blackout dates for maintenance.',
    variables: [
      {
        name: 'techStack',
        description: 'Framework',
        type: 'select',
        options: ['Next.js', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Ice Hotel',
    description: 'Seasonal booking for ice rooms.',
    category: 'Real Estate & Travel',
    tags: ['ice', 'hotel', 'seasonal', 'booking'],
    content:
      'Develop an Ice Hotel Site. Showcase the temperature (usually -5°C) prominently. Provide a "What to Pack" guide emphasizing thermal gear. Include a gallery of the ice art and sculptures found in the hotel. Clearly state that bookings are only available during the winter season and handle opening date logic.',
    variables: [
      {
        name: 'techStack',
        description: 'Server-side language/framework',
        type: 'select',
        options: ['PHP', 'Python', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Underwater Hotel',
    description: 'Aquarium style accommodation.',
    category: 'Real Estate & Travel',
    tags: ['underwater', 'aquarium', 'hotel', 'luxury'],
    content:
      'Build an Underwater Hotel Site. List the marine life and fish species visible from specific rooms. Display technical info like water pressure and depth. Embed a mandatory safety briefing video before booking confirmation. Offer a 360-degree interactive viewer of the room interior so guests can see the panoramic views.',
    variables: [
      {
        name: 'techStack',
        description: 'Graphics heavy framework',
        type: 'select',
        options: ['WebGL', 'React', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Mars Colony Simulator',
    description: 'Gamified simulation of life on Mars.',
    category: 'Technology & SaaS',
    tags: ['simulation', 'game', 'mars', 'education'],
    content:
      'Create a Mars Colony Simulator game. Players manage critical resources: Oxygen, Water, and Power. Implement a grid-based system for building habitats (Greenhouses, Living Quarters). Track colonist mood and health stats. Introduce random events like dust storms or meteorite strikes that require player intervention. The goal is to survive as long as possible.',
    variables: [
      {
        name: 'platform',
        description: 'Game platform',
        type: 'select',
        options: ['Web Game', 'Mobile Game', 'Unity'],
        required: true,
      },
    ],
  },
  {
    title: 'Zombie Survival Forum',
    description: 'Community for zombie apocalypse planning.',
    category: 'Forums & Communities',
    tags: ['zombie', 'survival', 'forum', 'niche'],
    content:
      'Build a Zombie Survival Forum. Organize categories into Bug Out Bags, Safe House Locations, Weaponry, and First Aid. Implement a "Live Map" feature (Satire/Roleplay) showing user-reported zombie sightings. Allow users to post detailed survival guides and rate them based on utility.',
    variables: [
      {
        name: 'forumSoftware',
        description: 'Forum engine',
        type: 'select',
        options: ['Discourse', 'XenForo', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Alien Hunter',
    description: 'Platform for UFO sightings and abductions.',
    category: 'Forums & Communities',
    tags: ['aliens', 'ufo', 'sightings', 'forum'],
    content:
      'Create an Alien Hunter Site. Users can report sightings with Date, GPS Location, and detailed descriptions. Support uploads of photos and video evidence. Plot all sightings on a global heatmap. Have a dedicated section for "Abduction Survivor Stories" allowing anonymous posting.',
    variables: [
      {
        name: 'techStack',
        description: 'Web stack',
        type: 'select',
        options: ['WordPress', 'Django', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Conspiracy Theory Forum',
    description: 'Discussion board for alternative theories.',
    category: 'Forums & Communities',
    tags: ['conspiracy', 'theory', 'forum', 'debate'],
    content:
      'Develop a Conspiracy Forum. Enable threaded discussions for deep diving into theories. Allow users to upload "Evidence" via links to external articles or images. Implement a voting system on the plausibility of theories. Strict moderation rules are needed to prevent harassment while allowing open debate.',
    variables: [
      {
        name: 'techStack',
        description: 'Community platform',
        type: 'select',
        options: ['Discourse', 'Flarum', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Flat Earth Society',
    description: 'Community for flat earth believers.',
    category: 'Forums & Communities',
    tags: ['flat-earth', 'science', 'forum', 'debate'],
    content:
      'Build a Flat Earth Forum. Create forum topics discussing "The Horizon" and "The Antarctic Wall". Host a gallery of user-created flat earth maps. Allow users to post logs of "Experiments" they have conducted. Award member badges like "Certified Flat Earther" based on post count or contributions.',
    variables: [
      {
        name: 'techStack',
        description: 'Backend language',
        type: 'select',
        options: ['PHP', 'Node.js', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Time Travelers',
    description: 'Forum for discussing time travel theories.',
    category: 'Forums & Communities',
    tags: ['time-travel', 'sci-fi', 'forum', 'theory'],
    content:
      'Create a Time Travelers Forum. Dedicate a section to "I am from the future" threads (Roleplay). Host discussions on famous paradoxes (Grandfather, Bootstrap). Include a "Paradox Solver" tool or thread type. Allow users to create and share timeline diagrams of alternate histories.',
    variables: [
      {
        name: 'techStack',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Discourse'],
        required: true,
      },
    ],
  },
  {
    title: 'Parallel Universe',
    description: 'Speculation on alternate realities.',
    category: 'Forums & Communities',
    tags: ['multiverse', 'science', 'forum', 'fiction'],
    content:
      'Build a Parallel Universe Forum. Users can describe their own invented universes. Have a "What if..." section for discussing historical turning points. Include a space for serious Quantum mechanics discussions alongside a creative Roleplay section.',
    variables: [
      {
        name: 'techStack',
        description: 'Framework',
        type: 'select',
        options: ['Django', 'Rails', 'PHP'],
        required: true,
      },
    ],
  },
  {
    title: 'AI Art Gallery',
    description: 'Showcase for Midjourney/Stable Diffusion art.',
    category: 'Portfolio & Creative',
    tags: ['ai', 'art', 'gallery', 'midjourney'],
    content:
      'Create an AI Art Gallery. Use a masonry layout to display images of varying aspect ratios. Display the exact prompt used to generate the image on hover or click. Tag images with the model used (v1, v2, v3, XL) and settings. Include a "Copy Prompt to Clipboard" button. Implement a Like/Upvote system to curate the best art.',
    variables: [
      {
        name: 'techStack',
        description: 'Frontend framework',
        type: 'select',
        options: ['Next.js', 'React', 'Vue'],
        required: true,
      },
    ],
  },
  {
    title: 'Prompt Marketplace',
    description: 'Buy and sell effective AI prompts.',
    category: 'Technology & SaaS',
    tags: ['prompts', 'ai', 'marketplace', 'selling'],
    content:
      'Build a Prompt Marketplace. Sellers can list prompts with a preview, full text (after purchase), and price. Categorize prompts by use case (Art, Coding, Writing). Track version history for prompts if sellers improve them. Provide an earnings dashboard for sellers to track sales and revenue.',
    variables: [
      {
        name: 'techStack',
        description: 'E-commerce framework',
        type: 'select',
        options: ['MERN', 'Django', 'Rails'],
        required: true,
      },
    ],
  },
  {
    title: 'AI Model Zoo',
    description: 'Directory of open source models.',
    category: 'Technology & SaaS',
    tags: ['models', 'huggingface', 'directory', 'ai'],
    content:
      'Create an AI Model Zoo directory. Each model gets a "Model Card" detailing Architecture, Dataset used, and Size. Provide direct download links for weights. Display benchmarks comparing Accuracy and Inference Speed. List hardware requirements (VRAM needed). Allow users to submit new models via a pull request or form.',
    variables: [
      {
        name: 'techStack',
        description: 'Web framework',
        type: 'select',
        options: ['Django', 'FastAPI', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Hugging Face Clone',
    description: 'Platform for hosting datasets and models.',
    category: 'Technology & SaaS',
    tags: ['huggingface', 'ml', 'models', 'datasets'],
    content:
      'Build an ML Model/Dataset Hub. Use FastAPI for the backend and {{db}} for storage. Support Git LFS for storing large model weights and datasets. Create repositories for both Models and Datasets. Enable community discussions via issues/forums on each model page.',
    variables: [
      {
        name: 'db',
        description: 'Database for metadata',
        type: 'select',
        options: ['PostgreSQL', 'MongoDB'],
        required: true,
      },
    ],
  },
  {
    title: 'Kaggle Clone',
    description: 'Platform for data science competitions.',
    category: 'Technology & SaaS',
    tags: ['kaggle', 'data-science', 'competition', 'jupyter'],
    content:
      'Develop a Data Science Competition Site. List competitions with Prize money and Deadlines. Host the dataset files for download. Provide a Jupyter Notebook environment ({{docker}}) where users can write code and submit results. Maintain a live Leaderboard. Offer a Submission API for programmatic entries.',
    variables: [
      {
        name: 'docker',
        description: 'Containerization strategy',
        type: 'select',
        options: ['Docker/Kubernetes', 'Bare metal'],
        required: true,
      },
    ],
  },
  {
    title: 'Google Colab Clone',
    description: 'Free Jupyter notebook environment.',
    category: 'Technology & SaaS',
    tags: ['colab', 'jupyter', 'python', 'cloud'],
    content:
      'Build a Cloud Notebook Environment. Based on JupyterHub. Allow users to create and run Notebooks in Python or R. Save notebooks to {{cloud}} storage (e.g., S3) or Google Drive. Provide a toggle to allocate GPU or TPU resources. Display a timer for cell execution to monitor performance.',
    variables: [
      {
        name: 'cloud',
        description: 'Cloud storage provider',
        type: 'select',
        options: ['S3', 'Azure Blob', 'Local'],
        required: true,
      },
    ],
  },
  {
    title: 'Jupyter Notebook Manager',
    description: 'Organize and share notebooks.',
    category: 'Technology & SaaS',
    tags: ['jupyter', 'notebooks', 'management', 'sharing'],
    content:
      'Create a Notebook Manager. Organize .ipynb files in a folder structure. Provide a live preview pane showing the rendered notebook. Support converting notebooks to HTML, Python scripts, or Slides. Track version history to allow reverting to previous checkpoints.',
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'JupyterLab Extension'],
        required: true,
      },
    ],
  },
  {
    title: 'Python REPL',
    description: 'Online Python code executor.',
    category: 'Technology & SaaS',
    tags: ['python', 'repl', 'code', 'learning'],
    content:
      'Build an Online Python REPL. Use Pyodide (WASM) or a backend API for execution. Embed a Monaco code editor. Display an output console for print statements and errors. Support importing popular data science libraries ({{libs}}). Allow users to save their code as a Gist or share via URL.',
    variables: [
      {
        name: 'libs',
        description: 'Supported libraries',
        type: 'multiselect',
        options: ['Numpy', 'Pandas', 'Matplotlib', 'Requests'],
        required: false,
      },
    ],
  },
  {
    title: 'Rust Playground',
    description: 'Online Rust compiler.',
    category: 'Technology & SaaS',
    tags: ['rust', 'repl', 'compiler', 'web'],
    content:
      'Create a Rust Playground. Compile Rust to WASM using rustc in the browser. Provide an editor with Rust-specific syntax highlighting. Show compilation output and errors. Include a "Format" button using Rustfmt. Generate a shareable URL for the code snippet.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Yew'],
        required: true,
      },
    ],
  },
  {
    title: 'Go Playground',
    description: 'Online Go code executor.',
    category: 'Technology & SaaS',
    tags: ['go', 'repl', 'compiler', 'web'],
    content:
      'Build a Go Playground. Accept code input and execute it. Display the program output. Support standard library imports. Provide a share button that encodes the code in the URL. Use either the official Go Playground API or a Docker container for execution.',
    variables: [
      {
        name: 'backend',
        description: 'Execution backend',
        type: 'select',
        options: ['Go (Playground API)', 'Docker Container'],
        required: true,
      },
    ],
  },
  {
    title: 'Java Playground',
    description: 'Online Java compiler.',
    category: 'Technology & SaaS',
    tags: ['java', 'repl', 'compiler', 'web'],
    content:
      'Create a Java Playground. Start users with a standard "Main" class template. Provide "Compile" and "Run" buttons. Highlight errors in the editor. Allow customizing the Classpath if users need to import external JARs (restricted).',
    variables: [
      {
        name: 'backend',
        description: 'Execution environment',
        type: 'select',
        options: ['Docker', 'JVM on Server'],
        required: true,
      },
    ],
  },
  {
    title: 'C++ Playground',
    description: 'Online C++ compiler.',
    category: 'Technology & SaaS',
    tags: ['cpp', 'repl', 'compiler', 'web'],
    content:
      'Build a C++ Playground. Allow users to select the compiler (GCC, Clang). Provide an input field for compiler flags (e.g., -O2, -std=c++17). Run the code and show output. Support stdin input for competitive programming practice.',
    variables: [
      {
        name: 'backend',
        description: 'Compilation backend',
        type: 'select',
        options: ['Docker', 'WASM'],
        required: true,
      },
    ],
  },
  {
    title: 'Swift Playground',
    description: 'Online Swift code executor.',
    category: 'Technology & SaaS',
    tags: ['swift', 'repl', 'compiler', 'apple'],
    content:
      'Create a Swift Playground. Embed a Swift code editor. Display the run output. Allow users to select the target platform simulation (iOS, OSX). Note: Full compilation support usually requires server-side Swift or SwiftWASM.',
    variables: [
      {
        name: 'backend',
        description: 'Swift engine',
        type: 'select',
        options: ['SwiftWASM', 'Server-side Swift'],
        required: true,
      },
    ],
  },
  {
    title: 'Kotlin Playground',
    description: 'Online Kotlin executor.',
    category: 'Technology & SaaS',
    tags: ['kotlin', 'repl', 'compiler', 'jvm'],
    content:
      'Build a Kotlin Playground. Support both Script mode (top-level code) and Class mode. Allow targeting JVM, JS, or Native. Show the output of the execution.',
    variables: [
      {
        name: 'backend',
        description: 'Runtime environment',
        type: 'select',
        options: ['Docker', 'JS Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Scala Playground',
    description: 'Online Scala compiler.',
    category: 'Technology & SaaS',
    tags: ['scala', 'repl', 'compiler', 'jvm'],
    content:
      'Develop a Scala Playground. Support both Scala 2 and Scala 3 syntax. Include a "Worksheet" mode where code is executed line-by-line and results are shown inline. Display the console output.',
    variables: [
      {
        name: 'backend',
        description: 'Scala runtime',
        type: 'select',
        options: ['Docker', 'Scala.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Haskell Playground',
    description: 'Online Haskell interpreter.',
    category: 'Technology & SaaS',
    tags: ['haskell', 'repl', 'functional', 'web'],
    content:
      'Create a Haskell Playground. Integrate GHCi (Glasgow Haskell Compiler interactive). Display the inferred types for functions. Show descriptive error messages. Run expressions and see results.',
    variables: [
      {
        name: 'backend',
        description: 'Haskell interpreter',
        type: 'select',
        options: ['Docker', 'Haste'],
        required: true,
      },
    ],
  },
  {
    title: 'Erlang Playground',
    description: 'Online Erlang shell.',
    category: 'Technology & SaaS',
    tags: ['erlang', 'repl', 'functional', 'telecom'],
    content:
      'Build an Erlang Playground. Provide an interactive shell interface. Allow compiling modules. Include examples of spawning processes and sending messages (the actor model).',
    variables: [
      {
        name: 'backend',
        description: 'Erlang VM',
        type: 'select',
        options: ['Docker', 'LFE'],
        required: true,
      },
    ],
  },
  {
    title: 'Lisp Playground',
    description: 'Common Lisp interpreter.',
    category: 'Technology & SaaS',
    tags: ['lisp', 'repl', 'functional', 'legacy'],
    content:
      'Create a Lisp Playground. Provide a helper to balance parentheses. Implement an Eval loop. Show a view of Macro expansion to help learners understand how code transforms.',
    variables: [
      {
        name: 'backend',
        description: 'Lisp implementation',
        type: 'select',
        options: ['Docker (SBCL)', 'JSCL'],
        required: true,
      },
    ],
  },
  {
    title: 'Fortran Playground',
    description: 'Online Fortran compiler.',
    category: 'Technology & SaaS',
    tags: ['fortran', 'repl', 'scientific', 'legacy'],
    content:
      'Build a Fortran Playground. Support both Fixed-form and Free-form source code. Compile and run the executable. Visualize 1D or 2D arrays from the output.',
    variables: [
      {
        name: 'backend',
        description: 'Fortran compiler',
        type: 'select',
        options: ['Docker (GFortran)'],
        required: true,
      },
    ],
  },
  {
    title: 'COBOL Playground',
    description: 'Online COBOL compiler.',
    category: 'Technology & SaaS',
    tags: ['cobol', 'repl', 'legacy', 'mainframe'],
    content:
      'Create a COBOL Playground. Provide templates for DIVISION, SECTION, and PERFORM structures. Compile and Execute the program. Handle Terminal I/O for user interaction.',
    variables: [
      {
        name: 'backend',
        description: 'COBOL compiler',
        type: 'select',
        options: ['Docker (GnuCOBOL)'],
        required: true,
      },
    ],
  },
  {
    title: 'Assembly Playground',
    description: 'Online Assembly (NASM/MASM) executor.',
    category: 'Technology & SaaS',
    tags: ['assembly', 'asm', 'low-level', 'repl'],
    content:
      'Build an Assembly Playground. Support architectures like x86, ARM, and MIPS. Provide a code editor. Visualize the CPU Registers (EAX, EBX, etc.) during execution. Show a memory dump view.',
    variables: [
      {
        name: 'backend',
        description: 'Assembler/Emulator',
        type: 'select',
        options: ['Docker (NASM)', 'WASM'],
        required: true,
      },
    ],
  },
  {
    title: 'SQL Playground',
    description: 'Online SQL query executor.',
    category: 'Technology & SaaS',
    tags: ['sql', 'database', 'repl', 'query'],
    content:
      'Create a SQL Playground. Support multiple dialects ({{dialect}}). Provide a schema visualizer to show tables and relationships. Include a query editor with auto-complete for table/column names. Display results in a table. Show the EXPLAIN plan for query optimization analysis.',
    variables: [
      {
        name: 'dialect',
        description: 'SQL database flavor',
        type: 'select',
        options: ['PostgreSQL', 'MySQL', 'SQLite', 'SQL Server'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL Playground',
    description: 'IDE for GraphQL queries.',
    category: 'Technology & SaaS',
    tags: ['graphql', 'ide', 'api', 'repl'],
    content:
      'Build a GraphQL IDE. Allow input of the Endpoint URL. Provide separate editors for Query and Mutation operations. Include a Variables pane for JSON input. Feature a Docs/Schema explorer sidebar for browsing types.',
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Monaco'],
        required: true,
      },
    ],
  },
  {
    title: 'WebSocket Tester',
    description: 'Tool to test WebSocket connections.',
    category: 'Technology & SaaS',
    tags: ['websocket', 'test', 'debugging', 'network'],
    content:
      'Create a WebSocket Tester. Input a wss:// URL to connect. Send payloads in JSON or Text format. Log all incoming messages with timestamps. Implement filters to search logs by message content or type.',
    variables: [
      {
        name: 'framework',
        description: 'Client-side framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla JS'],
        required: true,
      },
    ],
  },
  {
    title: 'TCP Sender',
    description: 'Send raw TCP packets to a server.',
    category: 'Technology & SaaS',
    tags: ['tcp', 'network', 'packet', 'tool'],
    content:
      "Build a TCP Sender. Input Hostname/IP and Port. Switch between Hex or Text mode for the payload. Log the server's response. Maintain an open connection for multiple sends or reconnect per packet.",
    variables: [
      {
        name: 'backend',
        description: 'Socket handling library',
        type: 'select',
        options: ['Node.js (Net)', 'Python (Socket)'],
        required: true,
      },
    ],
  },
  {
    title: 'Port Scanner',
    description: 'Check open ports on a server.',
    category: 'Technology & SaaS',
    tags: ['security', 'network', 'scanner', 'tool'],
    content:
      'Create a Port Scanner. Input an IP address or Domain. Define a port range (Common 1-1024 or Custom). Display results as Open, Closed, or Filtered. Attempt to grab the service banner (e.g., "Apache/2.4") for open ports.',
    variables: [
      {
        name: 'backend',
        description: 'Scanning engine',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Subnet Calculator',
    description: 'Calculate network ranges from CIDR.',
    category: 'Technology & SaaS',
    tags: ['network', 'subnet', 'calculator', 'tool'],
    content:
      'Build a Subnet Calculator. Input CIDR notation (e.g., 192.168.1.0/24). Calculate and display the Netmask, Network Address, and Broadcast Address. List all usable host IPs. Provide a visual pie chart or bar breakdown of the subnet size.',
    variables: [
      {
        name: 'framework',
        description: 'UI library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'IP Calculator',
    description: 'Detailed IP info calculator.',
    category: 'Technology & SaaS',
    tags: ['ip', 'calculator', 'network', 'tool'],
    content:
      'Create an IP Calculator. Accept IPv4 or IPv6 input. Show the binary representation of the address. Determine the IP Class (A, B, C). Perform a Reverse DNS lookup. Calculate the total number of addresses in the subnet.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'MAC Address Lookup',
    description: 'Find vendor from MAC address.',
    category: 'Technology & SaaS',
    tags: ['mac', 'vendor', 'network', 'lookup'],
    content:
      'Build a MAC Lookup Tool. Input a MAC address (OUI). Query the IEEE OUI database. Return the Vendor Name (e.g., Apple, Intel). Indicate if the MAC is Locally Administered (Private) or Universally Administered (Public).',
    variables: [
      {
        name: 'framework',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'API Wrapper'],
        required: true,
      },
    ],
  },
  {
    title: 'IPv6 Converter',
    description: 'Compress/Expand IPv6 addresses.',
    category: 'Technology & SaaS',
    tags: ['ipv6', 'converter', 'network', 'tool'],
    content:
      'Create an IPv6 Tool. Input a full or compressed IPv6 address. Provide a function to compress it to the shortest valid form (::). Provide a function to expand it to the full 8 groups of 4 hex digits. Validate the syntax and check for reserved ranges.',
    variables: [
      {
        name: 'framework',
        description: 'UI technology',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'ASCII to Hex',
    description: 'Convert text to hexadecimal.',
    category: 'Technology & SaaS',
    tags: ['converter', 'text', 'hex', 'tool'],
    content:
      'Create an ASCII/Hex Converter. Input text and get the Hexadecimal equivalent (e.g., "A" -> "41"). Support reverse conversion (Hex to Text). Option to add "0x" prefix to every byte. Allow user-defined space delimiters.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Hex to ASCII',
    description: 'Convert hex back to string.',
    category: 'Technology & SaaS',
    tags: ['converter', 'hex', 'text', 'tool'],
    content:
      'Build a Hex to Text Converter. Input a string of Hexadecimal characters. Automatically handle whitespace removal. Output the decoded ASCII/UTF-8 string. Show clear error messages if the input contains non-hex characters.',
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Binary to Text',
    description: 'Convert binary (0/1) to readable text.',
    category: 'Technology & SaaS',
    tags: ['binary', 'converter', 'text', 'tool'],
    content:
      'Create a Binary/Text Converter. Input a stream of 0s and 1s. Automatically separate by 8-bit bytes. Convert to ASCII/UTF-8 readable text. Also support the reverse: Text to Binary.',
    variables: [
      {
        name: 'framework',
        description: 'JS framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Text to Binary',
    description: 'Convert string to binary string.',
    category: 'Technology & SaaS',
    tags: ['binary', 'converter', 'text', 'tool'],
    content:
      'Build a Text to Binary Converter. Input standard text string. Output the 8-bit binary sequence for each character. Add a space every 8 bits for readability. Include a "Copy to Clipboard" button.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend stack',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Morse Code',
    description: 'Translate text to Morse code and vice versa.',
    category: 'Technology & SaaS',
    tags: ['morse', 'converter', 'audio', 'tool'],
    content:
      'Create a Morse Code Tool. Translate Text to Dots and Dashes. Translate Dots and Dashes back to Text. Implement audio playback of the Morse code (Beep, Dot, Dash timing). Add a visual light signal (flash on/off) synchronized with the audio.',
    variables: [
      {
        name: 'framework',
        description: 'Audio/Web framework',
        type: 'select',
        options: ['React', 'Vue', 'Web Audio API'],
        required: true,
      },
    ],
  },
  {
    title: 'Pig Latin',
    description: 'Fun text converter to Pig Latin.',
    category: 'Technology & SaaS',
    tags: ['pig-latin', 'fun', 'text', 'tool'],
    content:
      "Build a Pig Latin Converter. Input English text. Convert words starting with consonants by moving the consonant cluster to the end and adding 'ay'. Convert words starting with vowels by adding 'way' or 'yay' to the end.",
    variables: [
      {
        name: 'framework',
        description: 'JS framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Leet Speak',
    description: 'Convert text to 1337 speak.',
    category: 'Technology & SaaS',
    tags: ['leet', '1337', 'text', 'fun'],
    content:
      "Create a Leet Speak Converter. Substitute letters for numbers/symbols (e.g., E -> 3, A -> 4, O -> 0, T -> 7). Use an extensible dictionary for replacements. Include a 'Hardcore' mode that applies more aggressive substitutions (ph -> f, etc.).",
    variables: [
      {
        name: 'framework',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Upside Down Text',
    description: 'Flip text upside down using unicode.',
    category: 'Technology & SaaS',
    tags: ['upside-down', 'unicode', 'text', 'fun'],
    content:
      'Build an Upside Down Text Generator. Map standard characters to their inverted Unicode equivalents (e.g., "u" -> "n"). Input normal text -> Output flipped text. Ensure compatibility with social media platforms.',
    variables: [
      {
        name: 'framework',
        description: 'UI library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Zalgo Text',
    description: 'Generate glitchy/heavy text.',
    category: 'Technology & SaaS',
    tags: ['zalgo', 'glitch', 'text', 'fun'],
    content:
      "Create a Zalgo Text Generator. Add combining diacritics (marks) above and below characters to make them look 'glitchy'. Offer levels of intensity: Mini, Normal, Maximum. Include a 'He comes' meme mode button for maximum chaos.",
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Bubble Text',
    description: 'Text inside circles.',
    category: 'Technology & SaaS',
    tags: ['bubble', 'unicode', 'text', 'fun'],
    content:
      'Create a Bubble Text Generator. Map A-Z and 0-9 to their circled Unicode equivalents. Input text -> Output bubbled text. Include a Copy to Clipboard button for easy sharing.',
    variables: [
      {
        name: 'framework',
        description: 'JS Library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Small Text',
    description: 'Generate superscript/subscript text.',
    category: 'Technology & SaaS',
    tags: ['small', 'superscript', 'subscript', 'text'],
    content:
      'Build a Small Text Generator. Convert text to Small Caps. Convert to Superscript. Convert to Subscript. Include an Inverted text generator (flipped) as a bonus feature.',
    variables: [
      {
        name: 'framework',
        description: 'UI tech',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Strike Through',
    description: 'Generate strikethrough text.',
    category: 'Technology & SaaS',
    tags: ['strikethrough', 'text', 'formatting'],
    content:
      'Create a Strikethrough Generator. Use combining characters to add a long stroke overlay through the text. Works on all characters. Copy result to clipboard.',
    variables: [
      {
        name: 'framework',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Bold Text',
    description: 'Generate mathematical bold text.',
    category: 'Technology & SaaS',
    tags: ['bold', 'text', 'unicode', 'social'],
    content:
      'Build a Bold Text Generator. Convert text to Serif Bold (Mathematical Bold). Convert to Sans-Serif Bold. Convert to Fraktur Bold. Convert to Monospace Bold.',
    variables: [
      {
        name: 'framework',
        description: 'JS framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Italic Text',
    description: 'Generate italic unicode text.',
    category: 'Technology & SaaS',
    tags: ['italic', 'text', 'unicode', 'social'],
    content:
      'Create an Italic Text Generator. Convert text to Serif Italic. Convert to Sans-Serif Italic. Convert to Script Italic. Convert to Fraktur Italic.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend stack',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Case Converter',
    description: 'Convert text to UPPER, lower, Title Case.',
    category: 'Technology & SaaS',
    tags: ['case', 'converter', 'text', 'tool'],
    content:
      'Build a Case Converter. Convert to Sentence case. Convert to lower case. Convert to UPPER CASE. Convert to Title Case. Convert to aLtErNaTe cAsE.',
    variables: [
      {
        name: 'framework',
        description: 'JS library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Sentence Case',
    description: 'Capitalize first letter of sentences.',
    category: 'Technology & SaaS',
    tags: ['sentence', 'case', 'text', 'formatter'],
    content:
      'Create a Sentence Case Converter. Detect sentence endings (periods, exclamation marks, question marks). Capitalize the first letter of the sentence. Lowercase the rest of the sentence. Logic to ignore common abbreviations (Dr., Mr., Ms.).',
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Word Counter',
    description: 'Count words, characters, and paragraphs.',
    category: 'Technology & SaaS',
    tags: ['word-count', 'stats', 'text', 'tool'],
    content:
      'Build a Word Counter. Count the total words. Count characters (with and without spaces). Count paragraphs. Estimate Speaking time (based on avg 130 wpm). Estimate Reading time (based on avg 200 wpm).',
    variables: [
      {
        name: 'framework',
        description: 'Frontend tech',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Character Counter',
    description: 'Detailed character statistics.',
    category: 'Technology & SaaS',
    tags: ['char-count', 'stats', 'text', 'tool'],
    content:
      'Create a Character Counter. Count total characters. Count characters without spaces. Display letter frequency distribution. Count digits. Count punctuation marks.',
    variables: [
      {
        name: 'framework',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Reading Time',
    description: 'Calculate how long text takes to read.',
    category: 'Technology & SaaS',
    tags: ['reading', 'time', 'estimation', 'text'],
    content:
      'Build a Reading Time Estimator. Input the text. Allow adjustment of Words Per Minute (Default 200). Output format: X min Y sec. Display a visual progress bar comparing reading speed (Slow vs Fast).',
    variables: [
      {
        name: 'framework',
        description: 'UI library',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Speaking Time',
    description: 'Calculate speech duration.',
    category: 'Technology & SaaS',
    tags: ['speaking', 'time', 'speech', 'text'],
    content:
      'Create a Speaking Time Calculator. Input the speech text. Provide a speech speed slider (Slow, Normal, Fast). Implement logic to add pauses for punctuation (comma, period). Display total duration.',
    variables: [
      {
        name: 'framework',
        description: 'JS framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Text Diff',
    description: 'Compare two texts and highlight differences.',
    category: 'Technology & SaaS',
    tags: ['diff', 'compare', 'text', 'tool'],
    content:
      "Build a Text Diff Tool. Use {{diffLib}} for the algorithm. Input 'Original' and 'Modified' text blocks. Highlight additions in Green. Highlight deletions in Red. Switch between Side-by-side and Unified views.",
    variables: [
      {
        name: 'diffLib',
        description: 'Diff algorithm library',
        type: 'select',
        options: ['diff', 'jsdiff', 'googlediff'],
        required: true,
      },
    ],
  },
  {
    title: 'Patch Generator',
    description: 'Create unified diff patches.',
    category: 'Technology & SaaS',
    tags: ['patch', 'diff', 'git', 'tool'],
    content:
      'Create a Patch Generator. Input two text blocks (Old, New). Generate a Unified Diff (.patch) file format. Include line numbers in the output. Provide a button to Copy the patch to clipboard.',
    variables: [
      {
        name: 'framework',
        description: 'Node/UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Diff Viewer',
    description: 'Visual diff viewer for files.',
    category: 'Technology & SaaS',
    tags: ['diff', 'viewer', 'code', 'tool'],
    content:
      'Build a Diff Viewer. Use {{diffLib}} + Monaco Editor. Display Side-by-side code comparison. Apply Syntax Highlighting. Link lines between left and right views. Synchronize scrolling.',
    variables: [
      {
        name: 'diffLib',
        description: 'Diff viewer component',
        type: 'select',
        options: ['Monaco DiffEditor', 'CodeMirror Diff', 'React Diff Viewer'],
        required: true,
      },
    ],
  },
  {
    title: 'Merge Tool',
    description: '3-way merge conflict resolver.',
    category: 'Technology & SaaS',
    tags: ['merge', 'git', 'conflict', 'tool'],
    content:
      "Create a Merge Tool. Display Base, Yours, and Theirs versions. Show a Result editor for the final output. Provide buttons to 'Accept Yours', 'Accept Theirs', or 'Accept Base'. Highlight lines with conflicts distinctly.",
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON Patch',
    description: 'Apply RFC6902 JSON Patch to JSON.',
    category: 'Technology & SaaS',
    tags: ['json', 'patch', 'rfc6902', 'tool'],
    content:
      'Build a JSON Patcher. Input the Target JSON object. Input the Patch JSON (array of RFC6902 operations). Apply the patch logic. Output the Resulting JSON object. Handle errors gracefully if paths are invalid.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend stack',
        type: 'select',
        options: ['React', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'XML Diff',
    description: 'Compare two XML files.',
    category: 'Technology & SaaS',
    tags: ['xml', 'diff', 'compare', 'tool'],
    content:
      'Create an XML Diff Tool. Input XML 1 and XML 2. Parse both and compare the DOM structure. Highlight changes in tags and attributes. Render a visual Diff view.',
    variables: [
      {
        name: 'parser',
        description: 'XML comparison library',
        type: 'select',
        options: ['xmldiff', 'diff-xml-patch', 'DOM'],
        required: true,
      },
    ],
  },
  {
    title: 'CSV Diff',
    description: 'Compare CSV spreadsheets.',
    category: 'Technology & SaaS',
    tags: ['csv', 'diff', 'spreadsheet', 'tool'],
    content:
      'Build a CSV Diff Tool. Upload or input CSV 1 & 2. Compare by row order or by a specific Key column (e.g., ID). Highlight added and removed rows. Export the diff result as a new CSV file.',
    variables: [
      {
        name: 'library',
        description: 'CSV parsing library',
        type: 'select',
        options: ['PapaParse', 'csv-parser', 'D3-dsv'],
        required: true,
      },
    ],
  },
  {
    title: 'Excel Diff',
    description: 'Compare Excel files (.xlsx).',
    category: 'Technology & SaaS',
    tags: ['excel', 'diff', 'office', 'tool'],
    content:
      'Create an Excel Diff Tool. Use SheetJS to read files. Upload Excel 1 & 2. Allow user to select which Sheet to compare. Perform cell-level difference highlighting. Display the output in a Visual Grid.',
    variables: [
      {
        name: 'framework',
        description: 'Web framework',
        type: 'select',
        options: ['React', 'Vue', 'Node.js'],
        required: true,
      },
    ],
  },
  {
    title: 'PDF Diff',
    description: 'Visually compare two PDFs.',
    category: 'Technology & SaaS',
    tags: ['pdf', 'diff', 'document', 'tool'],
    content:
      'Build a PDF Diff Tool. Use PDF.js for rendering. Upload PDF 1 & 2. Render pages side-by-side. Implement a difference mode using visual subtraction (highlight pixels that changed). Navigate page by page.',
    variables: [
      {
        name: 'framework',
        description: 'UI framework',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON Formatter',
    description: 'Validate and beautify JSON.',
    category: 'Technology & SaaS',
    tags: ['json', 'formatter', 'beautify', 'tool'],
    content:
      'Create a JSON Formatter. Input raw/minified JSON. Prettify the JSON with configurable indentation (2 or 4 spaces). Validate the syntax and show specific error messages if invalid. Provide a Copy Result button.',
    variables: [
      {
        name: 'framework',
        description: 'JS framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'XML Formatter',
    description: 'Validate and beautify XML.',
    category: 'Technology & SaaS',
    tags: ['xml', 'formatter', 'beautify', 'tool'],
    content:
      'Create an XML Formatter. Input raw XML. Prettify with aligned attributes for readability. Validate well-formedness (check closing tags, nesting). Allow users to Collapse/Expand nodes in the view.',
    variables: [
      {
        name: 'framework',
        description: 'UI tech',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'CSS Minifier',
    description:
      'Tool to compress CSS files by removing whitespace and comments.',
    category: 'Technology & SaaS',
    tags: ['css', 'minifier', 'optimization', 'tool'],
    content:
      'Create a CSS Minifier.\n\n**Core:** {{engine}}.\n**Features:**\n1. Input CSS code.\n2. Output minified CSS.\n3. Show compression ratio (Bytes saved).\n4. Copy to clipboard button.',
    variables: [
      {
        name: 'engine',
        description: 'Minification library to use',
        type: 'select',
        options: ['cssnano', 'clean-css', 'csso'],
        required: true,
      },
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'JavaScript Obfuscator',
    description: 'Tool to make JavaScript code unreadable to protect source.',
    category: 'Technology & SaaS',
    tags: ['javascript', 'obfuscator', 'security', 'code'],
    content:
      "Build a JavaScript Obfuscator.\n\n**Core:** {{engine}}.\n**Features:**\n1. Input JS source.\n2. Configure obfuscation level (Low, High).\n3. Output obfuscated code.\n4. 'Test code' button to ensure it still runs.",
    variables: [
      {
        name: 'engine',
        description: 'Obfuscation library',
        type: 'select',
        options: ['javascript-obfuscator', 'obfuscator-io'],
        required: true,
      },
    ],
  },
  {
    title: 'HTML to PDF',
    description: 'Convert HTML templates or URLs to PDF documents.',
    category: 'Technology & SaaS',
    tags: ['pdf', 'html', 'converter', 'tool'],
    content:
      'Create an HTML to PDF Converter.\n\n**Tech:** {{engine}}.\n**Features:**\n1. Input HTML string or URL.\n2. Options: Page Size (A4, Letter), Orientation, Margin.\n3. Generate PDF and Download.\n4. Header/Footer support.',
    variables: [
      {
        name: 'engine',
        description: 'PDF generation engine',
        type: 'select',
        options: ['Puppeteer', 'WKHTMLtoPDF', 'Playwright'],
        required: true,
      },
    ],
  },
  {
    title: 'Bulk Image Resizer',
    description: 'Resize multiple images at once for the web.',
    category: 'Technology & SaaS',
    tags: ['image', 'resize', 'bulk', 'tool'],
    content:
      'Build a Bulk Image Resizer.\n\n**Tech:** {{sharpLib}}.\n**Features:**\n1. Drag and drop multiple images.\n2. Set target dimensions (Width x Height).\n3. Set quality (1-100).\n4. Download all as ZIP.',
    variables: [
      {
        name: 'sharpLib',
        description: 'Image processing library',
        type: 'select',
        options: ['Sharp (Node)', 'Jimp', 'Canvas API'],
        required: true,
      },
    ],
  },
  {
    title: 'Color Palette Generator',
    description: 'Generate color palettes from an uploaded image.',
    category: 'Design & Creative',
    tags: ['color', 'palette', 'generator', 'design'],
    content:
      'Create a Palette Generator.\n\n**Algorithm:** {{algo}}.\n**Features:**\n1. Upload image.\n2. Extract dominant colors.\n3. Display palette (Hex codes).\n4. Copy Hex to clipboard.',
    variables: [
      {
        name: 'algo',
        description: 'Clustering algorithm',
        type: 'select',
        options: ['K-Means', 'Median Cut', 'Quantization'],
        required: true,
      },
      {
        name: 'colorCount',
        description: 'Number of colors to extract',
        type: 'number',
        defaultValue: 5,
        required: false,
      },
    ],
  },
  {
    title: 'Regex Tester',
    description: 'Test regular expressions against text in real-time.',
    category: 'Technology & SaaS',
    tags: ['regex', 'testing', 'developer', 'tool'],
    content:
      'Build a Regex Tester.\n\n**Core:** {{regexEngine}}.\n**Features:**\n1. Input Regex pattern.\n2. Input test string.\n3. Highlight matches.\n4. List capturing groups.\n5. Explain regex (cheat sheet).',
    variables: [
      {
        name: 'regexEngine',
        description: 'Regex library',
        type: 'select',
        options: ['JavaScript RegExp', 'XRegExp', 'RE2'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON to CSV Converter',
    description: 'Convert JSON array data to CSV format.',
    category: 'Technology & SaaS',
    tags: ['json', 'csv', 'converter', 'data'],
    content:
      'Create a JSON to CSV Converter.\n\n**Tech:** {{parser}}.\n**Features:**\n1. Input JSON (Array of Objects).\n2. Flatten nested objects (Toggle).\n3. Output CSV table.\n4. Download CSV file.',
    variables: [
      {
        name: 'parser',
        description: 'Parsing library',
        type: 'select',
        options: ['PapaParse', 'json2csv', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'XML to JSON',
    description: 'Convert XML data into JSON format.',
    category: 'Technology & SaaS',
    tags: ['xml', 'json', 'converter', 'data'],
    content:
      'Build an XML to JSON Converter.\n\n**Tech:** {{parser}}.\n**Features:**\n1. Paste XML code.\n2. Convert to JSON.\n3. Pretty print JSON output.\n4. Error handling for bad XML.',
    variables: [
      {
        name: 'parser',
        description: 'XML Parser',
        type: 'select',
        options: ['xml2js', 'fast-xml-parser', 'DOMParser'],
        required: true,
      },
    ],
  },
  {
    title: 'SQL Formatter',
    description: 'Beautify and format unformatted SQL queries.',
    category: 'Technology & SaaS',
    tags: ['sql', 'formatter', 'beautify', 'developer'],
    content:
      'Create a SQL Formatter.\n\n**Core:** {{formatterLib}}.\n**Features:**\n1. Input minified SQL.\n2. Select SQL dialect (MySQL, Postgres, SQL Server).\n3. Output formatted SQL (Indentation, Keywords Uppercase).',
    variables: [
      {
        name: 'formatterLib',
        description: 'Formatting library',
        type: 'select',
        options: ['sql-formatter', 'prettier-plugin-sql'],
        required: true,
      },
    ],
  },
  {
    title: 'Cron Job Generator',
    description: 'Visual tool to generate cron expressions.',
    category: 'Technology & SaaS',
    tags: ['cron', 'scheduler', 'linux', 'tool'],
    content:
      "Build a Cron Job Generator.\n\n**UI:** Checkboxes/Selects for * * * * *.\n**Features:**\n1. Select Minute, Hour, Day of Month, Month, Day of Week.\n2. Live update of Cron Expression string.\n3. 'Next run times' preview.\n4. Explain syntax.",
    variables: [
      {
        name: 'uiLib',
        description: 'UI Component Library',
        type: 'select',
        options: ['React', 'Vue', 'Ant Design'],
        required: true,
      },
    ],
  },
  {
    title: 'UUID Generator',
    description: 'Generate UUIDs/GUIDs in various formats.',
    category: 'Technology & SaaS',
    tags: ['uuid', 'guid', 'generator', 'tool'],
    content:
      'Create a UUID Generator.\n\n**Features:**\n1. Generate UUID v4 (Random).\n2. Generate UUID v1 (Time-based).\n3. Generate bulk ({{count}} at once).\n4. Copy button.\n5. Uppercase/Lowercase toggle.',
    variables: [
      {
        name: 'count',
        description: 'Number of UUIDs to generate',
        type: 'number',
        defaultValue: 10,
        required: false,
      },
    ],
  },
  {
    title: 'Hash Generator',
    description: 'Calculate MD5, SHA-1, SHA-256 hashes of text.',
    category: 'Technology & SaaS',
    tags: ['hash', 'md5', 'sha256', 'security'],
    content:
      'Build a Hash Generator.\n\n**Tech:** {{cryptoLib}}.\n**Features:**\n1. Input text or upload file.\n2. Select Algorithm (MD5, SHA-1, SHA-256, SHA-512).\n3. Display Hash string.\n4. Compare hashes.',
    variables: [
      {
        name: 'cryptoLib',
        description: 'Cryptography library',
        type: 'select',
        options: ['Node Crypto', 'CryptoJS', 'Web Crypto API'],
        required: true,
      },
    ],
  },
  {
    title: 'Base64 Encoder/Decoder',
    description: 'Encode text or images to Base64 and back.',
    category: 'Technology & SaaS',
    tags: ['base64', 'encoder', 'decoder', 'tool'],
    content:
      'Create a Base64 Tool.\n\n**Features:**\n1. Encode Text -> Base64.\n2. Decode Base64 -> Text.\n3. Upload Image -> Get Base64 string.\n4. Paste Base64 -> Preview Image.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'JWT Decoder',
    description: 'Decode JSON Web Tokens to view header and payload.',
    category: 'Technology & SaaS',
    tags: ['jwt', 'decoder', 'debug', 'auth'],
    content:
      'Build a JWT Debugger.\n\n**Features:**\n1. Input encoded JWT string.\n2. Decode Header (Algorithm, Type).\n3. Decode Payload (Data).\n4. Verify Signature (Optional, if secret provided).',
    variables: [
      {
        name: 'lib',
        description: 'JWT Library',
        type: 'select',
        options: ['jsonwebtoken', 'jose'],
        required: true,
      },
    ],
  },
  {
    title: 'Curl to Code',
    description: 'Convert cURL command into code snippets.',
    category: 'Technology & SaaS',
    tags: ['curl', 'converter', 'snippet', 'http'],
    content:
      'Create a Curl Converter.\n\n**Core:** {{parserLib}}.\n**Features:**\n1. Input cURL command.\n2. Output to: Python (Requests), JavaScript (Fetch/Axios), PHP.\n3. Pretty print JSON body.',
    variables: [
      {
        name: 'parserLib',
        description: 'Parsing Library',
        type: 'select',
        options: ['curl-to-go', 'httpsnippet', 'Postman SDK'],
        required: true,
      },
    ],
  },
  {
    title: 'QR Code with Logo',
    description: 'Generate QR codes with a centered logo.',
    category: 'Mobile App Specific',
    tags: ['qr', 'logo', 'generator', 'marketing'],
    content:
      'Build a QR Code Generator with Logo.\n\n**Tech:** {{qrLib}} + Canvas.\n**Features:**\n1. Input URL/Text.\n2. Upload Logo image.\n3. Adjust Logo size and Error Correction Level.\n4. Customize foreground/background colors.\n5. Download PNG/SVG.',
    variables: [
      {
        name: 'qrLib',
        description: 'QR Code Library',
        type: 'select',
        options: ['qrcode', 'qrcode.react', 'kjua'],
        required: true,
      },
    ],
  },
  {
    title: 'Barcode Generator (EAN13)',
    description: 'Generate retail standard barcodes.',
    category: 'Technology & SaaS',
    tags: ['barcode', 'ean13', 'retail', 'generator'],
    content:
      'Create a Barcode Generator.\n\n**Format:** {{format}}.\n**Features:**\n1. Input numeric code.\n2. Validate checksum.\n3. Render barcode image.\n4. Print layout (A4 sheet of labels).',
    variables: [
      {
        name: 'format',
        description: 'Barcode Standard',
        type: 'select',
        options: ['EAN13', 'UPC', 'Code128', 'QR'],
        required: true,
      },
    ],
  },
  {
    title: 'Sprite Sheet Packer',
    description: 'Combine multiple images into a single sprite sheet.',
    category: 'Game Development',
    tags: ['sprite', 'game-dev', 'image', 'tool'],
    content:
      'Build a Sprite Sheet Packer.\n\n**Core:** {{packerLib}}.\n**Features:**\n1. Upload multiple frames.\n2. Pack into square or power-of-two texture.\n3. Generate JSON coordinates file.\n4. Download Image + JSON.',
    variables: [
      {
        name: 'packerLib',
        description: 'Packing algorithm',
        type: 'select',
        options: ['bin-packing', 'maxrects', 'shelf'],
        required: true,
      },
    ],
  },
  {
    title: 'Tile Map Editor',
    description: '2D grid editor for game levels.',
    category: 'Game Development',
    tags: ['tilemap', 'editor', 'game', '2d'],
    content:
      'Create a Tile Map Editor.\n\n**Tech:** Canvas.\n**Features:**\n1. Grid size input.\n2. Tile palette (Upload tileset image).\n3. Paint tiles on grid.\n4. Export to JSON (Map data).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Dialogue Tree Editor',
    description: 'Visual node editor for game dialogue.',
    category: 'Game Development',
    tags: ['dialogue', 'node-editor', 'game', 'writing'],
    content:
      "Build a Dialogue Tree Editor.\n\n**Tech:** {{nodeLib}}.\n**Features:**\n1. Create Nodes (Character, Text).\n2. Connect Nodes (Choices).\n3. Variables/Conditions (If 'HasItem', Show Node).\n4. Export to JSON/XML.",
    variables: [
      {
        name: 'nodeLib',
        description: 'Flow/Diagram Library',
        type: 'select',
        options: ['React Flow', 'Rete.js', 'LiteGraph.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Blueprint Viewer',
    description: 'View CAD/DXF files in browser.',
    category: 'Construction & Engineering',
    tags: ['blueprint', 'cad', 'viewer', 'engineering'],
    content:
      'Create a Blueprint Viewer.\n\n**Tech:** Three.js + {{loader}}.\n**Features:**\n1. Upload DXF/DWG.\n2. Pan and Zoom.\n3. Layer visibility toggle.\n4. Measure distance tool.',
    variables: [
      {
        name: 'loader',
        description: 'CAD File Loader',
        type: 'select',
        options: ['Three.js Loaders', 'dxf-parser', 'opencascade'],
        required: true,
      },
    ],
  },
  {
    title: 'Construction Punch List',
    description: 'App for tracking issues at construction sites.',
    category: 'Construction & Engineering',
    tags: ['construction', 'punchlist', 'issues', 'mobile'],
    content:
      'Build a Punch List App.\n\n**Features:**\n1. Add issue (Title, Photo, Location, Priority).\n2. Assign to subcontractor.\n3. Status (Open, In Progress, Done).\n4. Offline support.',
    variables: [
      {
        name: 'platform',
        description: 'Target Platform',
        type: 'select',
        options: ['React Native', 'Flutter', 'Web App'],
        required: true,
      },
    ],
  },
  {
    title: 'Route Optimizer',
    description: 'Solve Travelling Salesman Problem for delivery.',
    category: 'Logistics & Transport',
    tags: ['routing', 'logistics', 'optimization', 'maps'],
    content:
      'Create a Route Optimizer.\n\n**Algo:** {{algo}}.\n**Features:**\n1. Input list of addresses (Lat/Lon).\n2. Calculate optimal path.\n3. Display route on map ({{mapProvider}}).\n4. Export to GPX.',
    variables: [
      {
        name: 'algo',
        description: 'Optimization Algorithm',
        type: 'select',
        options: ['Google OR-Tools', 'Nearest Neighbor', 'Genetic'],
        required: true,
      },
      {
        name: 'mapProvider',
        description: 'Mapping Provider',
        type: 'select',
        options: ['Google Maps', 'Mapbox', 'Leaflet'],
        required: true,
      },
    ],
  },
  {
    title: 'Benefits Enrollment',
    description: 'HR portal for employees to select insurance/401k.',
    category: 'Business & Corporate',
    tags: ['hr', 'benefits', 'enrollment', 'forms'],
    content:
      'Build a Benefits Enrollment System.\n\n**Features:**\n1. List available plans (Medical, Dental, Vision).\n2. Compare plans side-by-side.\n3. Select Dependents.\n4. Submit election.\n5. PDF summary generation.',
    variables: [
      {
        name: 'techStack',
        description: 'Backend Framework',
        type: 'select',
        options: ['Django', 'Rails', '.NET'],
        required: true,
      },
    ],
  },
  {
    title: 'Employee Handbook',
    description: 'Searchable wiki for company policies.',
    category: 'Business & Corporate',
    tags: ['wiki', 'handbook', 'hr', 'policy'],
    content:
      "Create an Employee Handbook Wiki.\n\n**Tech:** {{wiki}}.\n**Features:**\n1. Search by keyword.\n2. Category tree (Policies, Tech, Culture).\n3. 'I Acknowledge' button for specific policies.\n4. Version history.",
    variables: [
      {
        name: 'wiki',
        description: 'Wiki Software',
        type: 'select',
        options: ['GitBook', 'Notion API', 'Custom Wiki.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Hurricane Tracker',
    description: 'Map tracking active tropical storms.',
    category: 'News & Media Publishers',
    tags: ['weather', 'hurricane', 'map', 'news'],
    content:
      'Build a Hurricane Tracker.\n\n**Data:** NOAA/NHC API.\n**Features:**\n1. Map with storm cones and paths.\n2. List active storms.\n3. Wind speed and pressure data.\n4. Forecast models spaghetti plot.',
    variables: [
      {
        name: 'mapProvider',
        description: 'Map Provider',
        type: 'select',
        options: ['Mapbox', 'Leaflet', 'Google Maps'],
        required: true,
      },
    ],
  },
  {
    title: 'Flashcard Maker',
    description: 'Tool to create digital flashcards for study.',
    category: 'Educational & Academic',
    tags: ['flashcards', 'study', 'education', 'tools'],
    content:
      'Create a Flashcard Maker.\n\n**Features:**\n1. Create Deck.\n2. Add Card (Front text/image, Back text/image).\n3. Shuffle and Study mode.\n4. Spaced repetition algorithm ({{srs}}).',
    variables: [
      {
        name: 'srs',
        description: 'Repetition Algorithm',
        type: 'select',
        options: ['Leitner', 'SuperMemo 2', 'Simple'],
        required: true,
      },
    ],
  },
  {
    title: 'Symptom Checker',
    description: 'Decision tree tool for basic health triage.',
    category: 'Health & Telemedicine',
    tags: ['health', 'triage', 'symptom', 'ai'],
    content:
      'Build a Symptom Checker.\n\n**Logic:** {{engine}}.\n**Features:**\n1. Select Body Part/Category.\n2. Answer questions (Yes/No/Maybe).\n3. Potential conditions list.\n4. Disclaimer (Not a doctor).',
    variables: [
      {
        name: 'engine',
        description: 'Logic Engine',
        type: 'select',
        options: ['Decision Tree JSON', 'Infermedica API', 'Custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Expense Splitter',
    description: 'Split bills among friends/groups (Splitwise clone).',
    category: 'Mobile App Specific',
    tags: ['finance', 'splitwise', 'money', 'social'],
    content:
      "Create an Expense Splitter.\n\n**Features:**\n1. Create Group.\n2. Add Expense (Amount, Paid by, Split between whom).\n3. 'Simplify Debts' feature (Who pays whom).\n4. Settlement records.",
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['React Native', 'Flutter', 'PWA'],
        required: true,
      },
    ],
  },
  {
    title: 'Tip Calculator',
    description: 'Calculate tip amount and split bill.',
    category: 'Technology & SaaS',
    tags: ['calculator', 'tip', 'finance', 'tool'],
    content:
      'Build a Tip Calculator.\n\n**Features:**\n1. Input Bill Amount.\n2. Select Tip % (Buttons).\n3. Select Split (1-20 people).\n4. Show Total per person.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Loan Calculator',
    description: 'Mortgage, car, or personal loan calculator.',
    category: 'Technology & SaaS',
    tags: ['calculator', 'loan', 'finance', 'tool'],
    content:
      'Create a Loan Calculator.\n\n**Features:**\n1. Input Principal, Interest Rate, Term (Years).\n2. Calculate Monthly Payment.\n3. Amortization Schedule table.\n4. Total Interest Paid chart.',
    variables: [
      {
        name: 'chartLib',
        description: 'Chart Library',
        type: 'select',
        options: ['Chart.js', 'Recharts', 'D3'],
        required: true,
      },
    ],
  },
  {
    title: 'Currency Converter',
    description: 'Real-time currency exchange rates.',
    category: 'Technology & SaaS',
    tags: ['currency', 'finance', 'api', 'tool'],
    content:
      'Build a Currency Converter.\n\n**API:** {{api}}.\n**Features:**\n1. Select From/To currencies.\n2. Enter amount.\n3. Invert conversion.\n4. Historical rate chart (7 days).',
    variables: [
      {
        name: 'api',
        description: 'Exchange Rate API',
        type: 'select',
        options: ['Frankfurter', 'Fixer', 'Open Exchange Rates'],
        required: true,
      },
    ],
  },
  {
    title: 'Unit Converter',
    description: 'Convert Length, Weight, Temperature, etc.',
    category: 'Technology & SaaS',
    tags: ['converter', 'unit', 'tool', 'utility'],
    content:
      'Create a Unit Converter.\n\n**Categories:** Length, Weight, Temp, Speed, Area.\n**Features:**\n1. Select Category.\n2. Input Unit / Output Unit selectors.\n3. Real-time conversion.\n4. Add custom conversions.',
    variables: [
      {
        name: 'framework',
        description: 'Frontend framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Time Zone Converter',
    description: 'Compare time across multiple cities.',
    category: 'Technology & SaaS',
    tags: ['time', 'zone', 'converter', 'world'],
    content:
      "Build a Time Zone Converter.\n\n**Features:**\n1. Select 'Base Time'.\n2. Add multiple cities to compare.\n3. Visual overlap (Working hours).\n4. Daylight Saving Time awareness.",
    variables: [
      {
        name: 'tzLib',
        description: 'Timezone Library',
        type: 'select',
        options: ['Luxon', 'Moment Timezone', 'Day.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Date Calculator',
    description: 'Add days to date or calculate duration.',
    category: 'Technology & SaaS',
    tags: ['date', 'calculator', 'time', 'tool'],
    content:
      'Create a Date Calculator.\n\n**Modes:**\n1. Add/Subtract Days/Months/Years.\n2. Difference between two dates (Days, Weeks, Working Days).\n3. Business day calculation (Exclude weekends).',
    variables: [
      {
        name: 'dateLib',
        description: 'Date Library',
        type: 'select',
        options: ['Day.js', 'date-fns', 'Luxon'],
        required: true,
      },
    ],
  },
  {
    title: 'Age Calculator',
    description: 'Calculate age in years, months, and days.',
    category: 'Technology & SaaS',
    tags: ['age', 'calculator', 'date', 'fun'],
    content:
      'Build an Age Calculator.\n\n**Features:**\n1. Input Date of Birth.\n2. Show Age (Years, Months, Days).\n3. Show Age in Days, Hours, Minutes total.\n4. Next Birthday countdown.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Countdown Timer',
    description: 'Countdown to a specific date/time.',
    category: 'Technology & SaaS',
    tags: ['countdown', 'timer', 'event', 'fun'],
    content:
      'Create a Countdown Timer.\n\n**Features:**\n1. Select Target Date/Time.\n2. Display Days, Hours, Minutes, Seconds.\n3. Circular progress animation.\n4. Full screen mode.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'World Clock',
    description: 'Digital clocks for multiple time zones.',
    category: 'Technology & SaaS',
    tags: ['clock', 'world', 'time', 'dashboard'],
    content:
      'Build a World Clock Dashboard.\n\n**Features:**\n1. Add City (Search by name).\n2. Digital and Analog clock faces.\n3. Day/Night indicator.\n4. Reorder widgets.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'Color Picker',
    description: 'Select colors and get HEX, RGB, HSL values.',
    category: 'Design & Creative',
    tags: ['color', 'picker', 'hex', 'design'],
    content:
      'Create a Color Picker.\n\n**Tech:** {{pickerLib}}.\n**Features:**\n1. Visual palette and gradient slider.\n2. Eye dropper tool (Pipette).\n3. Output: HEX, RGB, HSL.\n4. Contrast check against white/black.',
    variables: [
      {
        name: 'pickerLib',
        description: 'Color Picker Library',
        type: 'select',
        options: ['React Color', 'TinyColor', 'Chrome Color Picker'],
        required: true,
      },
    ],
  },
  {
    title: 'Gradient Generator',
    description: 'Generate CSS linear and radial gradients.',
    category: 'Design & Creative',
    tags: ['gradient', 'css', 'generator', 'design'],
    content:
      'Build a CSS Gradient Generator.\n\n**Features:**\n1. Add/Remove color stops.\n2. Linear or Radial type.\n3. Angle slider.\n4. Live CSS preview.\n5. Copy CSS code.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Box Shadow Generator',
    description: 'Visual tool to design CSS box-shadows.',
    category: 'Design & Creative',
    tags: ['box-shadow', 'css', 'generator', 'design'],
    content:
      'Create a Box Shadow Generator.\n\n**Controls:** Offset X/Y, Blur, Spread, Color, Inset.\n**Features:**\n1. Visual preview of element.\n2. Multiple layers support.\n3. Copy CSS code.\n4. Preset library.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Border Radius Generator',
    description: 'Design rounded corners visually.',
    category: 'Design & Creative',
    tags: ['border-radius', 'css', 'generator', 'design'],
    content:
      'Build a Border Radius Generator.\n\n**Controls:** Top-Left, Top-Right, Bottom-Right, Bottom-Left.\n**Features:**\n1. Visual box preview.\n2. Copy CSS code.\n3. Presets (Pill, Circle, Leaf).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Clip Path Generator',
    description: 'Visual tool for CSS clip-path shapes.',
    category: 'Design & Creative',
    tags: ['clip-path', 'css', 'generator', 'shapes'],
    content:
      'Create a Clip Path Generator.\n\n**Tech:** {{clipperLib}}.\n**Features:**\n1. Select Shape (Polygon, Circle, Inset).\n2. Drag handles on polygon to customize.\n3. Copy CSS `clip-path` code.',
    variables: [
      {
        name: 'clipperLib',
        description: 'SVG Manipulation Lib',
        type: 'select',
        options: ['Snap.svg', 'D3', 'Native SVG'],
        required: true,
      },
    ],
  },
  {
    title: 'Text Shadow Generator',
    description: 'Create layered CSS text shadows.',
    category: 'Design & Creative',
    tags: ['text-shadow', 'css', 'generator', 'typography'],
    content:
      'Build a Text Shadow Generator.\n\n**Controls:** X, Y, Blur, Color.\n**Features:**\n1. Preview text.\n2. Multiple shadow layers.\n3. Copy CSS.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Transform Generator',
    description: 'Visual CSS Transform (Rotate, Scale, Skew).',
    category: 'Design & Creative',
    tags: ['transform', 'css', 'generator', '3d'],
    content:
      'Create a Transform Generator.\n\n**Controls:** Rotate X/Y, Scale, Translate, Skew.\n**Features:**\n1. Preview 3D cube.\n2. Copy CSS `transform` property.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Flexbox Playground',
    description: 'Interactive CSS Flexbox learning tool.',
    category: 'Design & Creative',
    tags: ['flexbox', 'css', 'playground', 'learning'],
    content:
      'Build a Flexbox Playground.\n\n**Features:**\n1. Control: Flex-direction, Justify-content, Align-items.\n2. Visual boxes with numbering.\n3. Parent container preview.\n4. Real-time code generation.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'CSS Grid Playground',
    description: 'Interactive CSS Grid learning tool.',
    category: 'Design & Creative',
    tags: ['grid', 'css', 'playground', 'layout'],
    content:
      'Create a CSS Grid Playground.\n\n**Features:**\n1. Define Grid Columns/Rows.\n2. Drag items into cells.\n3. Adjust gap, align, justify.\n4. Copy CSS `grid` code.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'SVG Builder',
    description: 'Create simple SVG shapes visually.',
    category: 'Design & Creative',
    tags: ['svg', 'builder', 'vector', 'graphics'],
    content:
      'Build an SVG Builder.\n\n**Features:**\n1. Toolbar: Rect, Circle, Line, Path.\n2. Canvas area.\n3. Property inspector (Fill, Stroke, Opacity).\n4. Download SVG file.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Fabric.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Chart Builder',
    description: 'Visual tool to generate charts from CSV.',
    category: 'Technology & SaaS',
    tags: ['charts', 'data', 'visualization', 'builder'],
    content:
      'Create a Chart Builder.\n\n**Tech:** {{chartLib}}.\n**Features:**\n1. Upload CSV data.\n2. Select Chart Type (Bar, Line, Pie).\n3. Map columns to X/Y axes.\n4. Custom colors.\n5. Download Chart Image.',
    variables: [
      {
        name: 'chartLib',
        description: 'Charting Library',
        type: 'select',
        options: ['Chart.js', 'Highcharts', 'ECharts'],
        required: true,
      },
    ],
  },
  {
    title: 'HTML Table Builder',
    description: 'Generate HTML tables visually.',
    category: 'Technology & SaaS',
    tags: ['html', 'table', 'generator', 'tool'],
    content:
      'Build a Table Builder.\n\n**Features:**\n1. Add/Remove Rows & Columns.\n2. Merge cells.\n3. Style panel (Border, Padding, Color).\n4. Export HTML code.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'jQuery Handsontable'],
        required: true,
      },
    ],
  },
  {
    title: 'Drag & Drop Form Builder',
    description: 'Create web forms by dragging fields.',
    category: 'Technology & SaaS',
    tags: ['forms', 'builder', 'drag-drop', 'saas'],
    content:
      'Build a Form Builder.\n\n**Tech:** {{dndLib}}.\n**Features:**\n1. Palette of fields (Input, Select, Checkbox).\n2. Canvas to drop and arrange.\n3. Edit field properties (Label, Placeholder, Required).\n4. Export JSON/HTML.',
    variables: [
      {
        name: 'dndLib',
        description: 'Drag and Drop Library',
        type: 'select',
        options: ['dnd-kit', 'react-beautiful-dnd', 'react-grid-layout'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON Schema Builder',
    description: 'Visually construct JSON schemas.',
    category: 'Technology & SaaS',
    tags: ['json', 'schema', 'validation', 'builder'],
    content:
      'Create a JSON Schema Builder.\n\n**Features:**\n1. Tree view of object properties.\n2. Define Type (String, Number, Object, Array).\n3. Set Constraints (Min/Max, Regex).\n4. Live JSON preview.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'OpenAPI (Swagger) Editor',
    description: 'Visual editor for API specs.',
    category: 'Technology & SaaS',
    tags: ['openapi', 'swagger', 'api', 'editor'],
    content:
      'Build an OpenAPI Editor.\n\n**Tech:** {{editorLib}}.\n**Features:**\n1. Define Paths, Operations (GET/POST).\n2. Define Components (Schemas).\n3. Visual Request/Response body builder.\n4. Validate spec.\n5. Export YAML/JSON.',
    variables: [
      {
        name: 'editorLib',
        description: 'API Editor Library',
        type: 'select',
        options: ['Swagger Editor', 'Stoplight Studio', 'OpenAPI Guesser'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL Schema Builder',
    description: 'Visual SDL editor for GraphQL.',
    category: 'Technology & SaaS',
    tags: ['graphql', 'schema', 'builder', 'ide'],
    content:
      'Create a GraphQL Schema Builder.\n\n**Features:**\n1. Create Types.\n2. Add Fields with Return Types.\n3. Set Relationships (One-to-One, One-to-Many).\n4. Export SDL.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'GraphiQL'],
        required: true,
      },
    ],
  },
  {
    title: 'Environment Variable Manager',
    description: 'Securely manage .env files for projects.',
    category: 'Technology & SaaS',
    tags: ['env', 'security', 'config', 'Dev Ops'],
    content:
      'Create an Env Manager.\n\n**Features:**\n1. List projects.\n2. Edit Key-Value pairs.\n3. Encrypt values in DB.\n4. Copy to clipboard (.env format).\n5. Share with team (Permissions).',
    variables: [
      {
        name: 'techStack',
        description: 'Backend Framework',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'SSH Key Generator',
    description: 'Generate RSA/ED25519 SSH key pairs.',
    category: 'Technology & SaaS',
    tags: ['ssh', 'keys', 'security', 'generator'],
    content:
      'Build an SSH Key Generator.\n\n**Tech:** {{cryptoLib}}.\n**Features:**\n1. Select Algorithm (RSA 4096, ED25519).\n2. Enter Email/Comment.\n3. Generate Private/Public keys.\n4. Download PEM files.',
    variables: [
      {
        name: 'cryptoLib',
        description: 'Cryptography Library',
        type: 'select',
        options: ['ssh2', 'node-ssh', 'OpenSSH (Wrapper)'],
        required: true,
      },
    ],
  },
  {
    title: 'SSL CSR Generator',
    description: 'Generate Certificate Signing Requests.',
    category: 'Technology & SaaS',
    tags: ['ssl', 'csr', 'security', 'certificate'],
    content:
      'Create a CSR Generator.\n\n**Tech:** Node Crypto.\n**Features:**\n1. Input Common Name (Domain).\n2. Input Organization, Country, etc.\n3. Generate Private Key.\n4. Generate CSR file.\n5. Copy CSR to clipboard.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'JWT Debugger',
    description: 'Debug and verify JWT tokens.',
    category: 'Web Filtering / Security',
    tags: ['jwt', 'debug', 'token', 'auth'],
    content:
      'Build a JWT Debugger.\n\n**Features:**\n1. Input Encoded Token.\n2. Show Header, Payload, Signature.\n3. Verify Signature (Input Secret/Public Key).\n4. Highlight Expiration time.',
    variables: [
      {
        name: 'lib',
        description: 'JWT Library',
        type: 'select',
        options: ['jsonwebtoken', 'jose'],
        required: true,
      },
    ],
  },
  {
    title: 'SAML Decoder',
    description: 'Decode SAML Responses.',
    category: 'Web Filtering / Security',
    tags: ['saml', 'sso', 'security', 'decoder'],
    content:
      'Create a SAML Decoder.\n\n**Tech:** {{xmlLib}}.\n**Features:**\n1. Paste Base64 SAML Response.\n2. Decode to XML.\n3. Pretty print XML.\n4. Highlight Attributes section.',
    variables: [
      {
        name: 'xmlLib',
        description: 'XML Parser',
        type: 'select',
        options: ['xml2js', 'fast-xml-parser'],
        required: true,
      },
    ],
  },
  {
    title: 'OAuth Playground',
    description: 'Test OAuth 2.0 flows manually.',
    category: 'Web Filtering / Security',
    tags: ['oauth', 'testing', 'auth', 'tool'],
    content:
      'Build an OAuth Playground.\n\n**Features:**\n1. Configure Client ID/Secret.\n2. Select Grant Type (Authorization Code, PKCE).\n3. Step-by-step flow execution.\n4. Display Access Token response.',
    variables: [
      {
        name: 'provider',
        description: 'Supported Provider',
        type: 'select',
        options: ['Google', 'GitHub', 'Generic'],
        required: true,
      },
    ],
  },
  {
    title: 'REST Mock Server',
    description: 'Spin up a fake API from a spec.',
    category: 'Technology & SaaS',
    tags: ['mock', 'api', 'rest', 'testing'],
    content:
      'Create a Mock Server UI.\n\n**Tech:** {{mockLib}}.\n**Features:**\n1. Define Endpoint (Path, Method).\n2. Define Response (Status Code, JSON Body).\n3. Enable CORS.\n4. Generate Host URL.',
    variables: [
      {
        name: 'mockLib',
        description: 'Mocking Library',
        type: 'select',
        options: ['MSW (Mock Service Worker)', 'JSON Server', 'MirageJS'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL Mock Server',
    description: 'Mock a GraphQL schema and resolvers.',
    category: 'Technology & SaaS',
    tags: ['graphql', 'mock', 'testing', 'api'],
    content:
      'Build a GraphQL Mock Server.\n\n**Tech:** {{gqlMockLib}}.\n**Features:**\n1. Paste Schema (SDL).\n2. Define mock data for Types.\n3. Run interactive Playground.\n4. Persist data in memory.',
    variables: [
      {
        name: 'gqlMockLib',
        description: 'GraphQL Mock Library',
        type: 'select',
        options: ['graphql-tools', 'msw (GraphQL)', 'graphql-mock-server'],
        required: true,
      },
    ],
  },
  {
    title: 'Ping Tool',
    description: 'Network ping utility from browser.',
    category: 'Technology & SaaS',
    tags: ['ping', 'network', 'tool', 'diagnostic'],
    content:
      "Create a Ping Tool.\n\n**Note:** Browsers can't ICMP Ping; use HTTP Head or WebSocket Echo.\n**Features:**\n1. Input Hostname.\n2. Show RTT (Round Trip Time).\n3. Packet loss calculation.\n4. Graph of latency.",
    variables: [
      {
        name: 'method',
        description: 'Ping Method',
        type: 'select',
        options: ['HTTP Head', 'WebSocket Echo', 'Server-side Proxy'],
        required: true,
      },
    ],
  },
  {
    title: 'Trace Route',
    description: 'Visualize network hops.',
    category: 'Technology & SaaS',
    tags: ['traceroute', 'network', 'tool', 'diagnostic'],
    content:
      'Build a Trace Route Tool.\n\n**Tech:** Server-side script.\n**Features:**\n1. Input Target IP/Domain.\n2. List Hops (IP, Hostname, RTT).\n3. Map visualization ({{mapLib}}) of IPs.',
    variables: [
      {
        name: 'mapLib',
        description: 'Map Library',
        type: 'select',
        options: ['Leaflet', 'D3 Globe', 'Mapbox'],
        required: true,
      },
    ],
  },
  {
    title: 'DNS Lookup',
    description: 'Perform DNS queries (A, AAAA, MX, TXT).',
    category: 'Technology & SaaS',
    tags: ['dns', 'lookup', 'network', 'tool'],
    content:
      'Create a DNS Lookup Tool.\n\n**Tech:** {{dnsLib}}.\n**Features:**\n1. Input Domain.\n2. Select Record Type (A, AAAA, MX, TXT, CNAME).\n3. Display Results.\n4. Show Response Time.',
    variables: [
      {
        name: 'dnsLib',
        description: 'DNS Resolution Library',
        type: 'select',
        options: ['dns-over-https', 'Google DoH API', 'Cloudflare API'],
        required: true,
      },
    ],
  },
  {
    title: 'Whois Lookup',
    description: 'Find domain registration info.',
    category: 'Technology & SaaS',
    tags: ['whois', 'domain', 'lookup', 'tool'],
    content:
      'Build a Whois Lookup.\n\n**Tech:** {{whoisLib}}.\n**Features:**\n1. Input Domain.\n2. Parse Registrar, Created Date, Expiry Date.\n3. Display Raw Output.\n4. Calendar reminder for Expiry.',
    variables: [
      {
        name: 'whoisLib',
        description: 'Whois Library',
        type: 'select',
        options: ['whois-json', 'node-whois', 'External API'],
        required: true,
      },
    ],
  },
  {
    title: 'HTTP Headers Viewer',
    description: 'Inspect request/response headers.',
    category: 'Technology & SaaS',
    tags: ['http', 'headers', 'debug', 'tool'],
    content:
      'Create an HTTP Headers Viewer.\n\n**Tech:** Fetch current page or Input URL.\n**Features:**\n1. List Response Headers (Cache, Content-Type, Server).\n2. List Request Headers.\n3. Detect security headers (HSTS, CSP).\n4. Header Grading.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'User Agent Parser',
    description: 'Parse Browser/OS from UA string.',
    category: 'Technology & SaaS',
    tags: ['ua', 'parser', 'device', 'tool'],
    content:
      'Create a UA Parser.\n\n**Tech:** {{parserLib}}.\n**Features:**\n1. Input UA String.\n2. Show: Browser Name/Version, OS, Device Type.\n3. Visual Icons for OS/Browser.',
    variables: [
      {
        name: 'parserLib',
        description: 'UA Parser Library',
        type: 'select',
        options: ['UAParser.js', 'Bowser', 'DetectRTC'],
        required: true,
      },
    ],
  },
  {
    title: 'Device Detection',
    description: 'Detect if user is on Mobile/Tablet/Desktop.',
    category: 'Technology & SaaS',
    tags: ['device', 'detection', 'mobile', 'tool'],
    content:
      'Build a Device Detector.\n\n**Tech:** {{detectionLib}}.\n**Features:**\n1. Display current device type.\n2. Show Screen resolution, Pixel Ratio.\n3. Show Touch support.\n4. Mock Device Emulator.',
    variables: [
      {
        name: 'detectionLib',
        description: 'Detection Library',
        type: 'select',
        options: ['React Device Detect', 'Mobile Detect', 'MatchMedia'],
        required: true,
      },
    ],
  },
  {
    title: 'Browser Info',
    description: 'Show detailed browser capabilities.',
    category: 'Technology & SaaS',
    tags: ['browser', 'info', 'support', 'tool'],
    content:
      'Create a Browser Info Tool.\n\n**Features:**\n1. Cookies Enabled?\n2. Do Not Track status.\n3. Language.\n4. Online/Offline status.\n5. Storage quotas (LocalStorage/SessionStorage usage).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Screen Resolution',
    description: 'Display screen stats and emulate others.',
    category: 'Technology & SaaS',
    tags: ['screen', 'resolution', 'display', 'tool'],
    content:
      'Build a Resolution Tool.\n\n**Features:**\n1. Show current Width/Height.\n2. Show Available Width/Height.\n3. Dropdown to resize window to presets (iPhone, iPad, Desktop).\n4. Orientation toggle.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Geolocation API',
    description: 'Get user lat/lon and map it.',
    category: 'Technology & SaaS',
    tags: ['geolocation', 'map', 'gps', 'tool'],
    content:
      "Create a Geolocation Demo.\n\n**Tech:** Navigator API + {{mapProvider}}.\n**Features:**\n1. 'Get Location' button.\n2. Show Lat/Lon, Accuracy.\n3. Plot on Map.\n4. Watch Position (Move with user).",
    variables: [
      {
        name: 'mapProvider',
        description: 'Map Provider',
        type: 'select',
        options: ['Leaflet', 'Mapbox', 'Google Maps'],
        required: true,
      },
    ],
  },
  {
    title: 'Camera Access',
    description: 'Display webcam stream and capture photo.',
    category: 'Technology & SaaS',
    tags: ['camera', 'media', 'webcam', 'tool'],
    content:
      'Create a Camera App.\n\n**Tech:** getUserMedia.\n**Features:**\n1. Select Camera (Front/Back).\n2. Show Live Feed.\n3. Take Snapshot (Canvas).\n4. Filter overlay (Grayscale, Sepia).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Microphone Visualizer',
    description: 'Visualize audio input from mic.',
    category: 'Technology & SaaS',
    tags: ['audio', 'microphone', 'visualizer', 'tool'],
    content:
      'Create a Mic Visualizer.\n\n**Tech:** Web Audio API.\n**Features:**\n1. Select Microphone.\n2. Visual types: Waveform, Frequency Bar.\n3. Adjust Sensitivity.\n4. Toggle recording.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Canvas API'],
        required: true,
      },
    ],
  },
  {
    title: 'Speech to Text',
    description: 'Web Speech API to convert speech to text.',
    category: 'Technology & SaaS',
    tags: ['speech', 'recognition', 'api', 'tool'],
    content:
      'Build a Speech-to-Text App.\n\n**Tech:** Web Speech API.\n**Features:**\n1. Select Language (en-US, es-ES).\n2. Start/Stop Listening.\n3. Display transcript.\n4. Copy text to clipboard.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Face Detection',
    description: 'Detect faces in an image.',
    category: 'Technology & SaaS',
    tags: ['face', 'detection', 'ai', 'vision'],
    content:
      'Build a Face Detection Tool.\n\n**Tech:** {{visionLib}}.\n**Features:**\n1. Upload Image.\n2. Draw box around faces.\n3. Show Confidence score.\n4. Count faces.',
    variables: [
      {
        name: 'visionLib',
        description: 'Vision Library',
        type: 'select',
        options: ['Face-api.js', 'MediaPipe', 'Google Vision API'],
        required: true,
      },
    ],
  },
  {
    title: 'Object Detection',
    description: 'Detect objects (car, person, dog) in image.',
    category: 'Technology & SaaS',
    tags: ['object', 'detection', 'ai', 'vision'],
    content:
      'Create an Object Detection Tool.\n\n**Tech:** {{visionLib}}.\n**Features:**\n1. Upload Image.\n2. Detect objects (COCO Classes).\n3. Label and score.\n4. Download annotated image.',
    variables: [
      {
        name: 'visionLib',
        description: 'Vision Library',
        type: 'select',
        options: ['Coco-ssd (TF.js)', 'YOLO (TensorFlow)', 'Cloud Vision'],
        required: true,
      },
    ],
  },
  {
    title: 'Text Recognition (OCR)',
    description: 'Read text from images.',
    category: 'Technology & SaaS',
    tags: ['ocr', 'text', 'vision', 'tool'],
    content:
      'Build an OCR Tool.\n\n**Tech:** Tesseract.js.\n**Features:**\n1. Upload Image.\n2. Extract Text.\n3. Highlight text on image (Bounding boxes).\n4. Copy text.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Barcode Detection',
    description: 'Scan barcodes/QR codes with camera.',
    category: 'Technology & SaaS',
    tags: ['barcode', 'scanner', 'camera', 'tool'],
    content:
      'Create a Barcode Scanner.\n\n**Tech:** {{scannerLib}}.\n**Features:**\n1. Open Camera.\n2. Detect Barcode/QR.\n3. Play Beep sound on scan.\n4. Display Result.',
    variables: [
      {
        name: 'scannerLib',
        description: 'Scanner Library',
        type: 'select',
        options: ['QuaggaJS', 'Html5-Qrcode', 'Zxing'],
        required: true,
      },
    ],
  },
  {
    title: 'Color Extraction',
    description: 'Get dominant colors from an image.',
    category: 'Design & Creative',
    tags: ['color', 'extraction', 'image', 'design'],
    content:
      'Create a Color Extractor.\n\n**Algo:** {{algo}}.\n**Features:**\n1. Upload Image.\n2. Show color palette.\n3. Show % distribution.\n4. Click color to Copy Hex.',
    variables: [
      {
        name: 'algo',
        description: 'Quantization Algorithm',
        type: 'select',
        options: ['K-Means', 'Median Cut', 'Color Quantization'],
        required: true,
      },
    ],
  },
  {
    title: 'Image Metadata (EXIF)',
    description: 'View hidden metadata in photos.',
    category: 'Technology & SaaS',
    tags: ['exif', 'metadata', 'image', 'privacy'],
    content:
      'Build an EXIF Viewer.\n\n**Tech:** {{exifLib}}.\n**Features:**\n1. Upload Image.\n2. Display Camera Model, GPS, Date.\n3. Remove EXIF button (Strip metadata).\n4. Download cleaned image.',
    variables: [
      {
        name: 'exifLib',
        description: 'EXIF Library',
        type: 'select',
        options: ['exif-js', 'piexifjs'],
        required: true,
      },
    ],
  },
  {
    title: 'Video Metadata',
    description: 'Inspect video codec/resolution.',
    category: 'Technology & SaaS',
    tags: ['video', 'metadata', 'codec', 'info'],
    content:
      'Create a Video Inspector.\n\n**Tech:** FFmpeg.wasm.\n**Features:**\n1. Upload Video.\n2. Show Codec (H.264, VP9), Duration, Resolution.\n3. Show Bitrate/Framerate.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Audio Metadata (ID3)',
    description: 'View/Edit MP3 tags.',
    category: 'Technology & SaaS',
    tags: ['audio', 'id3', 'metadata', 'mp3'],
    content:
      'Build an ID3 Editor.\n\n**Tech:** {{id3Lib}}.\n**Features:**\n1. Upload MP3.\n2. View Title, Artist, Album, Cover Art.\n3. Edit fields.\n4. Save tags.',
    variables: [
      {
        name: 'id3Lib',
        description: 'ID3 Library',
        type: 'select',
        options: ['jsmediatags', 'browser-id3-writer'],
        required: true,
      },
    ],
  },
  {
    title: 'File Hasher',
    description: 'Calculate MD5/SHA of a file.',
    category: 'Technology & SaaS',
    tags: ['hash', 'file', 'security', 'integrity'],
    content:
      'Create a File Hasher.\n\n**Tech:** FileReader + Crypto.\n**Features:**\n1. Upload File.\n2. Select Algorithm (MD5, SHA-1, SHA-256).\n3. Show Hash string.\n4. Compare two hashes.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Bulk File Renamer',
    description: 'Rename many files at once with patterns.',
    category: 'Desktop App Specific',
    tags: ['rename', 'files', 'utility', 'desktop'],
    content:
      'Create a File Renamer.\n\n**Features:**\n1. Select Folder.\n2. Define Pattern (Name {{index}}.ext).\n3. Replace Text.\n4. Change Case.\n5. Preview before Rename.',
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['Electron', 'Tauri', 'Python CLI'],
        required: true,
      },
    ],
  },
  {
    title: 'Folder Comparator',
    description: 'Compare two folders for differences.',
    category: 'Desktop App Specific',
    tags: ['compare', 'folder', 'diff', 'utility'],
    content:
      'Build a Folder Comparator.\n\n**Features:**\n1. Select Source and Target Folders.\n2. Show Missing files.\n3. Show New files.\n4. Show Modified files (Compare dates or Hashes).',
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['Electron', 'Tauri', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Duplicate File Finder',
    description: 'Find duplicate files using hashes.',
    category: 'Desktop App Specific',
    tags: ['duplicate', 'cleanup', 'files', 'utility'],
    content:
      'Create a Duplicate File Finder.\n\n**Tech:** Hashing.\n**Features:**\n1. Scan Folder.\n2. Group files by Hash.\n3. Display Duplicate Groups.\n4. Select and Delete duplicates.',
    variables: [
      {
        name: 'platform',
        description: 'Platform',
        type: 'select',
        options: ['Electron', 'Tauri', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Disk Usage Visualizer',
    description: 'Treemap or Waffle map of disk usage.',
    category: 'Desktop App Specific',
    tags: ['disk', 'usage', 'visualizer', 'storage'],
    content:
      'Build a Disk Usage Viz.\n\n**Viz:** Treemap.\n**Features:**\n1. Select Drive/Folder.\n2. Box size = File size.\n3. Click box to drill down.\n4. Color code by file type.',
    variables: [
      {
        name: 'vizLib',
        description: 'Visualization Library',
        type: 'select',
        options: ['D3', 'ECharts', 'Custom Canvas'],
        required: true,
      },
    ],
  },
  {
    title: 'Process Manager (Web Top)',
    description: 'View server processes in browser.',
    category: 'Technology & SaaS',
    tags: ['process', 'top', 'server', 'admin'],
    content:
      'Create a Web Process Manager.\n\n**Backend:** {{backend}}.\n**Features:**\n1. List Processes (PID, Name, CPU%, Mem%).\n2. Sort by CPU or Memory.\n3. Kill Process button (SIGTERM/SIGKILL).\n4. Auto-refresh.',
    variables: [
      {
        name: 'backend',
        description: 'Backend Technology',
        type: 'select',
        options: ['Node (systeminformation)', 'Go', 'Python (psutil)'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON-LD Schema Generator',
    description: 'Generate structured data for SEO (Article, Product, Person).',
    category: 'SEO & Marketing',
    tags: ['seo', 'schema', 'json-ld', 'structured-data'],
    content:
      'Create a JSON-LD Schema Generator.\n\n**Features:**\n1. Select Schema Type ({{type}}).\n2. Input fields (Name, Description, Image, Author, DatePublished).\n3. Generate JSON-LD script tag.\n4. Validate syntax.\n5. Copy to clipboard.',
    variables: [
      {
        name: 'type',
        description: 'Schema.org type to generate',
        type: 'select',
        options: ['Article', 'Product', 'Person', 'Organization', 'Event'],
        required: true,
      },
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Open Graph Previewer',
    description: 'Preview how a link looks on Facebook/LinkedIn.',
    category: 'SEO & Marketing',
    tags: ['og', 'preview', 'social', 'meta'],
    content:
      'Build an Open Graph Previewer.\n\n**Features:**\n1. Input URL or Meta tags manually.\n2. Preview Card (Large, Small).\n3. Warnings for missing tags (Title, Image, Description).\n4. Validation.\n5. Debug mode.',
    variables: [
      {
        name: 'platform',
        description: 'Social platform to preview',
        type: 'select',
        options: ['Facebook', 'LinkedIn', 'Twitter', 'Generic'],
        required: true,
      },
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Twitter Card Validator',
    description: 'Validate and preview Twitter Card tags.',
    category: 'SEO & Marketing',
    tags: ['twitter', 'card', 'validator', 'social'],
    content:
      'Create a Twitter Card Validator.\n\n**Features:**\n1. Input URL.\n2. Detect Card Type (Summary, Large Image, App).\n3. Preview exact rendering.\n4. List Missing tags.\n5. Fetch actual tags from site.',
    variables: [
      {
        name: 'fetchLib',
        description: 'HTTP Fetching Library',
        type: 'select',
        options: ['Axios', 'Fetch', 'Cheerio'],
        required: true,
      },
    ],
  },
  {
    title: 'Sitemap Visualizer',
    description: 'Visual tree view of XML sitemap.',
    category: 'SEO & Marketing',
    tags: ['sitemap', 'xml', 'visualizer', 'seo'],
    content:
      'Build a Sitemap Visualizer.\n\n**Tech:** XML Parser + D3/Tree.\n**Features:**\n1. Upload sitemap.xml.\n2. Visual tree hierarchy of URLs.\n3. Filter by status (Last Modified, Priority, ChangeFreq).\n4. Download list of URLs.',
    variables: [
      {
        name: 'vizLib',
        description: 'Visualization Library',
        type: 'select',
        options: ['D3.js', 'Vue.Tree', 'React D3 Tree'],
        required: true,
      },
    ],
  },
  {
    title: 'Robots.txt Generator',
    description: 'Create robots.txt files for bots.',
    category: 'SEO & Marketing',
    tags: ['robots', 'seo', 'crawlers', 'text'],
    content:
      'Create a Robots.txt Generator.\n\n**Features:**\n1. User Agent selector (Googlebot, *, Others).\n2. Allow/Disallow paths.\n3. Crawl-delay setting.\n4. Sitemap URL input.\n5. Generate and Download.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Htaccess Generator',
    description: 'Generate Apache .htaccess for redirects/ssl.',
    category: 'Dev Ops & Infrastructure',
    tags: ['apache', 'htaccess', 'redirects', 'server'],
    content:
      'Build an Htaccess Generator.\n\n**Features:**\n1. Force HTTPS (SSL).\n2. Custom Error Pages (404, 500).\n3. URL Redirects (301, 302).\n4. Block IPs.\n5. Gzip compression toggle.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'PHP', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Nginx Config Generator',
    description: 'Generate Nginx server blocks.',
    category: 'Dev Ops & Infrastructure',
    tags: ['nginx', 'config', 'server', 'proxy'],
    content:
      'Create an Nginx Config Generator.\n\n**Features:**\n1. Server Name/Port.\n2. Root directory.\n3. Reverse Proxy settings (Pass to Node/Python).\n4. SSL Cert paths.\n5. Security headers.',
    variables: [
      {
        name: 'proxyType',
        description: 'Backend type to proxy to',
        type: 'select',
        options: ['Node.js', 'PHP-FPM', 'Python/uWSGI'],
        required: true,
      },
    ],
  },
  {
    title: 'Apache VirtualHost',
    description: 'Generate Apache VirtualHost config.',
    category: 'Dev Ops & Infrastructure',
    tags: ['apache', 'virtualhost', 'server', 'config'],
    content:
      'Create an Apache VirtualHost Generator.\n\n**Features:**\n1. ServerName and ServerAlias.\n2. DocumentRoot.\n3. Directory Permissions (AllowOverride All).\n4. SSL Certificate paths.\n5. Log paths.',
    variables: [
      {
        name: 'version',
        description: 'Apache Version',
        type: 'select',
        options: ['2.4', '2.2'],
        required: false,
      },
    ],
  },
  {
    title: 'Docker Compose Generator',
    description: 'Create docker-compose.yml for services.',
    category: 'Dev Ops & Infrastructure',
    tags: ['docker', 'compose', 'yaml', 'Dev Ops'],
    content:
      'Build a Docker Compose Generator.\n\n**Features:**\n1. Add Services (Web, DB, Redis).\n2. Expose Ports.\n3. Volume Mounts.\n4. Environment Variables.\n5. Network configuration.',
    variables: [
      {
        name: 'version',
        description: 'Docker Compose file version',
        type: 'select',
        options: ['3.8', '3.3'],
        required: true,
      },
    ],
  },
  {
    title: 'Kubernetes Deployment',
    description: 'Generate K8s Deployment and Service yaml.',
    category: 'Dev Ops & Infrastructure',
    tags: ['kubernetes', 'k8s', 'yaml', 'deployment'],
    content:
      'Create a K8s Generator.\n\n**Features:**\n1. Deployment: Image, Replicas, Env Vars.\n2. Service: NodePort, ClusterIP, LoadBalancer.\n3. ConfigMap generator.\n4. Ingress resource.',
    variables: [
      {
        name: 'resource',
        description: 'Type of resource to generate',
        type: 'select',
        options: ['Deployment', 'Service', 'Ingress', 'All'],
        required: true,
      },
    ],
  },
  {
    title: 'Helm Chart Values',
    description: 'Create values.yaml for Helm charts.',
    category: 'Dev Ops & Infrastructure',
    tags: ['helm', 'kubernetes', 'yaml', 'chart'],
    content:
      'Build a Helm Values Generator.\n\n**Features:**\n1. Define Image repository and tag.\n2. Service types.\n3. Ingress hosts.\n4. Resource limits/requests.\n5. HPA (Horizontal Pod Autoscaler) settings.',
    variables: [
      {
        name: 'appName',
        description: 'Name of the application',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Terraform Resource',
    description: 'Generate Terraform HCL for AWS/Azure.',
    category: 'Dev Ops & Infrastructure',
    tags: ['terraform', 'iac', 'aws', 'hcl'],
    content:
      'Create a Terraform Resource Generator.\n\n**Provider:** {{provider}}.\n**Features:**\n1. Resource Type (e.g., EC2 Instance, S3 Bucket).\n2. Variable interpolation.\n3. Output definitions.\n4. Provider configuration.',
    variables: [
      {
        name: 'provider',
        description: 'Cloud Provider',
        type: 'select',
        options: ['AWS', 'Azure', 'Google', 'DigitalOcean'],
        required: true,
      },
      {
        name: 'resource',
        description: 'Resource Type',
        type: 'select',
        options: ['EC2', 'S3', 'SQL Database', 'Storage Account'],
        required: true,
      },
    ],
  },
  {
    title: 'Ansible Playbook',
    description: 'Generate YAML for server automation.',
    category: 'Dev Ops & Infrastructure',
    tags: ['ansible', 'automation', 'yaml', 'server'],
    content:
      'Create an Ansible Playbook Generator.\n\n**Features:**\n1. Define Target Hosts.\n2. Become (Sudo) toggle.\n3. Tasks list (Install package, Copy file, Restart Service).\n4. Variables section.',
    variables: [
      {
        name: 'task',
        description: 'Common task to add',
        type: 'select',
        options: ['Apt (Install)', 'Yum (Install)', 'Copy File', 'Service'],
        required: true,
      },
    ],
  },
  {
    title: 'Jenkinsfile Generator',
    description: 'Create Declarative Pipeline scripts.',
    category: 'Dev Ops & Infrastructure',
    tags: ['jenkins', 'ci-cd', 'groovy', 'pipeline'],
    content:
      'Build a Jenkinsfile Generator.\n\n**Tech:** Pipeline DSL.\n**Features:**\n1. Triggers (Push, PR, PollSCM).\n2. Stages (Build, Test, Deploy).\n3. Agent label.\n4. Post actions (Email notifications).',
    variables: [
      {
        name: 'language',
        description: 'Build tool language',
        type: 'select',
        options: ['Node', 'Java', 'Python', 'Docker'],
        required: true,
      },
    ],
  },
  {
    title: 'GitLab CI YAML',
    description: 'Generate .gitlab-ci.yml for pipelines.',
    category: 'Dev Ops & Infrastructure',
    tags: ['gitlab', 'ci-cd', 'yaml', 'pipeline'],
    content:
      'Create a GitLab CI Generator.\n\n**Features:**\n1. Stages (Build, Test, Deploy).\n2. Before/After scripts.\n3. Artifacts definition.\n4. Rules (Only on master, tags).\n5. Cache configuration.',
    variables: [
      {
        name: 'image',
        description: 'Docker image for runner',
        type: 'string',
        required: true,
        defaultValue: 'node:latest',
      },
    ],
  },
  {
    title: 'GitHub Actions Workflow',
    description: 'Generate workflow YAML for GitHub.',
    category: 'Dev Ops & Infrastructure',
    tags: ['github', 'actions', 'yaml', 'ci-cd'],
    content:
      'Create a GitHub Actions Generator.\n\n**Features:**\n1. Triggers (Push, Pull Request, Schedule).\n2. Jobs (Build/Test/Deploy).\n3. Runs-on (Ubuntu, Mac, Windows).\n4. Secrets usage logic.',
    variables: [
      {
        name: 'os',
        description: 'Runner OS',
        type: 'select',
        options: ['ubuntu-latest', 'macos-latest', 'windows-latest'],
        required: true,
      },
    ],
  },
  {
    title: 'Gitignore Generator',
    description: 'Generate .gitignore based on OS/Lang.',
    category: 'Git & Version Control',
    tags: ['git', 'gitignore', 'generator', 'tool'],
    content:
      'Build a .gitignore Generator.\n\n**Features:**\n1. Select OS (Windows, Linux, macOS).\n2. Select Languages (Node, Python, Go, etc.).\n3. Select IDE (VS Code, JetBrains, Vim).\n4. Merge and Download file.',
    variables: [
      {
        name: 'lang',
        description: 'Programming Language',
        type: 'multiselect',
        options: ['Node', 'Python', 'Java', 'Go', 'Rust', 'C++'],
        required: true,
      },
    ],
  },
  {
    title: 'LICENSE Generator',
    description: 'Choose a license and generate text.',
    category: 'Git & Version Control',
    tags: ['license', 'open-source', 'legal', 'text'],
    content:
      'Create a LICENSE Generator.\n\n**Features:**\n1. Select License ({{licenseType}}).\n2. Input Year and Organization Name.\n3. Generate full legal text.\n4. Download LICENSE file.',
    variables: [
      {
        name: 'licenseType',
        description: 'Type of License',
        type: 'select',
        options: ['MIT', 'Apache 2.0', 'GPL v3', 'BSD 3-Clause', 'Unlicense'],
        required: true,
      },
    ],
  },
  {
    title: 'Contributing Guide',
    description: 'Generate CONTRIBUTING.md template.',
    category: 'Git & Version Control',
    tags: ['docs', 'contributing', 'template', 'markdown'],
    content:
      'Create a Contributing Guide.\n\n**Features:**\n1. Prerequisites (Node version, etc.).\n2. Install steps.\n3. Test run instructions.\n4. Commit message guidelines (Conventional Commits).\n5. Pull Request process.',
    variables: [
      {
        name: 'manager',
        description: 'Package Manager',
        type: 'select',
        options: ['npm', 'yarn', 'pnpm', 'make'],
        required: true,
      },
    ],
  },
  {
    title: 'Changelog Generator',
    description: 'Generate Keep a Changelog format.',
    category: 'Git & Version Control',
    tags: ['changelog', 'release', 'markdown', 'format'],
    content:
      'Build a Changelog Generator.\n\n**Format:** {{format}}.\n**Features:**\n1. Input Version Number.\n2. Categorize changes: Added, Changed, Deprecated, Removed, Fixed, Security.\n3. Link to diffs.\n4. Auto-format Markdown.',
    variables: [
      {
        name: 'format',
        description: 'Changelog Style',
        type: 'select',
        options: ['Keep a Changelog', 'Standard', 'Simple'],
        required: true,
      },
    ],
  },
  {
    title: 'README Generator',
    description: 'Create a README.md with badges.',
    category: 'Git & Version Control',
    tags: ['readme', 'markdown', 'docs', 'generator'],
    content:
      'Create a README Generator.\n\n**Features:**\n1. Title and Description.\n2. Badges (Build, License, Coverage).\n3. Installation instructions.\n4. Usage examples.\n5. Contributing link.',
    variables: [
      {
        name: 'style',
        description: 'Badges style',
        type: 'select',
        options: ['Flat', 'Flat Square', 'Plastic', 'For the Badge'],
        required: false,
      },
    ],
  },
  {
    title: 'Prettier Config',
    description: 'Generate .prettierrc configuration.',
    category: 'Development Tools',
    tags: ['prettier', 'formatter', 'config', 'code'],
    content:
      'Create a Prettier Config Generator.\n\n**Features:**\n1. Tab Width.\n2. Tabs/Spaces.\n3. Semicolons (Yes/No).\n4. Single Quote vs Double.\n5. Trailing Comma.\n6. Bracket Spacing.',
    variables: [
      {
        name: 'format',
        description: 'Config File Format',
        type: 'select',
        options: ['JSON', 'YAML', 'JS'],
        required: false,
      },
    ],
  },
  {
    title: 'ESLint Config',
    description: 'Generate .eslintrc configuration.',
    category: 'Development Tools',
    tags: ['eslint', 'linter', 'config', 'code'],
    content:
      'Create an ESLint Config Generator.\n\n**Features:**\n1. Environment (Browser, Node, ES2021).\n2. Extends (Airbnb, Standard, Google).\n3. Parser options (Babel, TypeScript).\n4. Custom rules input.',
    variables: [
      {
        name: 'preset',
        description: 'Linting Preset',
        type: 'select',
        options: ['Airbnb', 'Standard', 'Google', 'React'],
        required: true,
      },
    ],
  },
  {
    title: 'Babel Config',
    description: 'Generate babel.config.js / .babelrc.',
    category: 'Development Tools',
    tags: ['babel', 'transpiler', 'config', 'js'],
    content:
      'Create a Babel Config Generator.\n\n**Features:**\n1. Presets (Env, React, TypeScript).\n2. Plugins (Proposal decorators, class properties).\n3. Polyfills targets (Browserlist).\n4. Ignore patterns.',
    variables: [
      {
        name: 'framework',
        description: 'Target Framework',
        type: 'select',
        options: ['React', 'Vue', 'Node', 'Generic'],
        required: true,
      },
    ],
  },
  {
    title: 'Webpack Config',
    description: 'Generate webpack.config.js.',
    category: 'Development Tools',
    tags: ['webpack', 'bundler', 'config', 'js'],
    content:
      'Create a Webpack Config Generator.\n\n**Features:**\n1. Entry point definition.\n2. Output path/filename.\n3. Loaders (Babel, CSS, File).\n4. Plugins (HtmlWebpackPlugin, Clean).\n5. Dev Server setup.',
    variables: [
      {
        name: 'mode',
        description: 'Build Mode',
        type: 'select',
        options: ['Development', 'Production', 'None'],
        required: true,
      },
    ],
  },
  {
    title: 'Vite Config',
    description: 'Generate vite.config.js / ts.',
    category: 'Development Tools',
    tags: ['vite', 'bundler', 'config', 'tooling'],
    content:
      'Create a Vite Config Generator.\n\n**Features:**\n1. Plugins (React, Vue, Markdown).\n2. Alias (@/src).\n3. Proxy setup (API proxy).\n4. Build options (Target, OutDir).\n5. Define global constants.',
    variables: [
      {
        name: 'lang',
        description: 'Language used',
        type: 'select',
        options: ['TypeScript', 'JavaScript'],
        required: false,
      },
    ],
  },
  {
    title: 'Next.js Config',
    description: 'Generate next.config.js.',
    category: 'Development Tools',
    tags: ['nextjs', 'react', 'config', 'framework'],
    content:
      'Create a Next.js Config Generator.\n\n**Features:**\n1. i18n (Locales).\n2. Images domains (Unsplash, etc.).\n3. Webpack override.\n4. Export mode (Static/Server).\n5. React Strict Mode.',
    variables: [
      {
        name: 'exportMode',
        description: 'Build Output Mode',
        type: 'select',
        options: ['SSG', 'SSR', 'Hybrid'],
        required: false,
      },
    ],
  },
  {
    title: 'Tailwind Config',
    description: 'Generate tailwind.config.js.',
    category: 'Development Tools',
    tags: ['tailwind', 'css', 'config', 'design'],
    content:
      'Create a Tailwind Config Generator.\n\n**Features:**\n1. Content paths (Scanning glob).\n2. Theme extension (Colors, Fonts).\n3. Custom plugins.\n4. Dark Mode strategy (Class/Media).\n5. Prefix utility.',
    variables: [
      {
        name: 'darkMode',
        description: 'Dark Mode Strategy',
        type: 'select',
        options: ['media', 'class'],
        required: true,
      },
    ],
  },
  {
    title: 'TypeScript Config',
    description: 'Generate tsconfig.json.',
    category: 'Development Tools',
    tags: ['typescript', 'config', 'tsconfig', 'typing'],
    content:
      'Create a TypeScript Config Generator.\n\n**Features:**\n1. Compiler Options (Strict, Target, Module).\n2. Path aliases (@/src).\n3. Lib (ES2015, ES2020).\n4. Include/Exclude arrays.',
    variables: [
      {
        name: 'target',
        description: 'ECMAScript Target',
        type: 'select',
        options: ['ES3', 'ES5', 'ES6/ES2015', 'ES2020'],
        required: true,
      },
    ],
  },
  {
    title: 'React Component Creator',
    description: 'Generate boilerplate for React components.',
    category: 'Development Tools',
    tags: ['react', 'generator', 'boilerplate', 'snippet'],
    content:
      'Create a React Component Creator.\n\n**Style:** {{style}}.\n**Features:**\n1. Component Name Input.\n2. Props Interface/Type definition.\n3. Import statements.\n4. Default export.\n5. CSS Modules vs Styled Components.',
    variables: [
      {
        name: 'style',
        description: 'CSS-in-JS Method',
        type: 'select',
        options: ['CSS Modules', 'Styled Components', 'Tailwind', 'None'],
        required: true,
      },
    ],
  },
  {
    title: 'Vue Component Creator',
    description: 'Generate boilerplate for Vue components.',
    category: 'Development Tools',
    tags: ['vue', 'generator', 'boilerplate', 'snippet'],
    content:
      'Create a Vue Component Creator.\n\n**Style:** {{style}}.\n**Features:**\n1. Template, Script, Setup.\n2. Props definition.\n3. Emits definition.\n4. Scoped CSS.\n5. Script setup (Composition API) vs Options API.',
    variables: [
      {
        name: 'api',
        description: 'Vue API Version',
        type: 'select',
        options: ['Composition API', 'Options API'],
        required: true,
      },
    ],
  },
  {
    title: 'React Hook Creator',
    description: 'Generate custom React hook boilerplate.',
    category: 'Development Tools',
    tags: ['react', 'hooks', 'generator', 'snippet'],
    content:
      'Create a React Hook Generator.\n\n**Features:**\n1. Hook Name (use...).\n2. State definition (useState/useRef).\n3. Effect logic (useEffect).\n4. Return values.',
    variables: [
      {
        name: 'type',
        description: 'Hook Complexity',
        type: 'select',
        options: ['Basic', 'With Fetch', 'With LocalStorage', 'With WebSocket'],
        required: true,
      },
    ],
  },
  {
    title: 'Python Class Creator',
    description: 'Generate Python class boilerplate.',
    category: 'Development Tools',
    tags: ['python', 'class', 'generator', 'snippet'],
    content:
      'Create a Python Class Generator.\n\n**Features:**\n1. Class Name.\n2. Inheritance (Optional Base Class).\n3. Init method.\n4. String representation (__str__).\n5. Equality method (__eq__).',
    variables: [
      {
        name: 'baseClass',
        description: 'Inherit from (Optional)',
        type: 'string',
        required: false,
      },
    ],
  },
  {
    title: 'Java POJO Generator',
    description: 'Generate Java POJO with Getters/Setters.',
    category: 'Development Tools',
    tags: ['java', 'pojo', 'generator', 'snippet'],
    content:
      'Create a Java Class Generator.\n\n**Features:**\n1. Class Name.\n2. Field names and types (String, int, boolean).\n3. Generate Constructor.\n4. Generate Getters and Setters.\n5. toString/equals/hashCode.',
    variables: [
      {
        name: 'accessor',
        description: 'Getter/Setter style',
        type: 'select',
        options: ['Standard', 'Lombok (annotations)', 'Builder'],
        required: true,
      },
    ],
  },
  {
    title: 'C# Class Generator',
    description: 'Generate C# properties and constructors.',
    category: 'Development Tools',
    tags: ['csharp', 'class', 'generator', 'snippet'],
    content:
      'Create a C# Class Generator.\n\n**Features:**\n1. Namespace.\n2. Class Name.\n3. Auto-properties.\n4. Constructor.\n5. ToString override.',
    variables: [
      {
        name: 'version',
        description: 'Language Version',
        type: 'select',
        options: ['C# 9', 'C# 10', 'C# 11'],
        required: false,
      },
    ],
  },
  {
    title: 'Go Struct Generator',
    description: 'Generate Go struct with JSON tags.',
    category: 'Development Tools',
    tags: ['go', 'struct', 'generator', 'snippet'],
    content:
      'Create a Go Struct Generator.\n\n**Features:**\n1. Struct Name.\n2. Fields (Name, Type, JSON tag).\n3. Methods (Stringer, MarshalJSON).\n4. Validator tags (optional).',
    variables: [
      {
        name: 'tags',
        description: 'Include Tags',
        type: 'boolean',
        defaultValue: true,
        required: false,
      },
    ],
  },
  {
    title: 'SQL Table Creator',
    description: 'Generate CREATE TABLE statements.',
    category: 'Development Tools',
    tags: ['sql', 'table', 'generator', 'database'],
    content:
      'Create a SQL Table Generator.\n\n**Dialect:** {{dialect}}.\n**Features:**\n1. Table Name.\n2. Columns (Name, Type, Not Null, PK, AI).\n3. Constraints (Foreign Key, Unique).\n4. Indexes.',
    variables: [
      {
        name: 'dialect',
        description: 'SQL Dialect',
        type: 'select',
        options: ['MySQL', 'PostgreSQL', 'SQL Server', 'SQLite'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL Schema',
    description: 'Generate GraphQL Schemas and Resolvers.',
    category: 'Development Tools',
    tags: ['graphql', 'schema', 'generator', 'api'],
    content:
      'Create a GraphQL Schema Generator.\n\n**Features:**\n1. Type definitions (User, Post).\n2. Input types.\n3. Query and Mutation types.\n4. Resolver stubs.',
    variables: [
      {
        name: 'language',
        description: 'Implementation Language',
        type: 'select',
        options: ['TypeScript', 'JavaScript', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'Postman Collection',
    description: 'Generate Postman Collection v2.1 JSON.',
    category: 'Development Tools',
    tags: ['postman', 'collection', 'json', 'api'],
    content:
      'Create a Postman Collection Generator.\n\n**Features:**\n1. Folder structure.\n2. Requests (GET, POST, PUT, DELETE).\n3. Headers (Auth).\n4. Body (JSON/Form Data).\n5. Pre-request scripts.',
    variables: [
      {
        name: 'auth',
        description: 'Default Auth Type',
        type: 'select',
        options: ['None', 'API Key', 'Bearer Token'],
        required: false,
      },
    ],
  },
  {
    title: 'CSV to JSON',
    description: 'Convert CSV data to JSON array.',
    category: 'Data & Converters',
    tags: ['csv', 'json', 'converter', 'data'],
    content:
      'Create a CSV to JSON Converter.\n\n**Tech:** {{parser}}.\n**Features:**\n1. Paste CSV text.\n2. Header row detection.\n3. Output JSON array.\n4. Pretty print option.',
    variables: [
      {
        name: 'parser',
        description: 'CSV Library',
        type: 'select',
        options: ['PapaParse', 'csv-parser', 'Baby Parse'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON to YAML',
    description: 'Convert JSON to YAML format.',
    category: 'Data & Converters',
    tags: ['json', 'yaml', 'converter', 'config'],
    content:
      'Create a JSON to YAML Converter.\n\n**Tech:** YAML dump.\n**Features:**\n1. Input JSON.\n2. Output formatted YAML.\n3. Indentation setting (2 or 4 spaces).\n4. Quote style.',
    variables: [
      {
        name: 'indent',
        description: 'Indentation size',
        type: 'number',
        defaultValue: 2,
        required: false,
      },
    ],
  },
  {
    title: 'YAML to JSON',
    description: 'Convert YAML to JSON format.',
    category: 'Data & Converters',
    tags: ['yaml', 'json', 'converter', 'config'],
    content:
      'Create a YAML to JSON Converter.\n\n**Tech:** YAML load.\n**Features:**\n1. Input YAML.\n2. Output JSON.\n3. Error handling for malformed YAML.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'XML to JSON',
    description: 'Convert XML to JSON object.',
    category: 'Data & Converters',
    tags: ['xml', 'json', 'converter', 'data'],
    content:
      'Create an XML to JSON Converter.\n\n**Tech:** {{parser}}.\n**Features:**\n1. Input XML.\n2. Parse Attributes (Toggle).\n3. Output JSON structure.\n4. Minify option.',
    variables: [
      {
        name: 'parser',
        description: 'XML Parser',
        type: 'select',
        options: ['fast-xml-parser', 'xml2js', 'DOMParser'],
        required: true,
      },
    ],
  },
  {
    title: 'HTML Table to CSV',
    description: 'Extract table data from HTML to CSV.',
    category: 'Data & Converters',
    tags: ['html', 'csv', 'scraper', 'table'],
    content:
      'Create an HTML Table Extractor.\n\n**Tech:** Cheerio/JS.\n**Features:**\n1. Input HTML URL or Code.\n2. Select Table Index (if multiple).\n3. Extract Headers.\n4. Output CSV.',
    variables: [
      {
        name: 'fetchLib',
        description: 'Fetch Tool',
        type: 'select',
        options: ['Axios', 'Fetch', 'Cheerio'],
        required: true,
      },
    ],
  },
  {
    title: 'Excel to JSON',
    description: 'Parse .xlsx file to JSON.',
    category: 'Data & Converters',
    tags: ['excel', 'xlsx', 'json', 'office'],
    content:
      'Create an Excel to JSON Converter.\n\n**Tech:** SheetJS.\n**Features:**\n1. Upload .xlsx/.xls.\n2. Select Sheet.\n3. Output JSON array.\n4. First row as Headers toggle.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Angular'],
        required: true,
      },
    ],
  },
  {
    title: 'JSON to HTML Table',
    description: 'Render JSON data as an HTML table.',
    category: 'Data & Converters',
    tags: ['json', 'html', 'table', 'generator'],
    content:
      'Create a JSON to Table Renderer.\n\n**Tech:** {{tableLib}}.\n**Features:**\n1. Input JSON array.\n2. Auto-generate Table Headers.\n3. Sortable columns.\n4. Pagination.',
    variables: [
      {
        name: 'tableLib',
        description: 'Table Component',
        type: 'select',
        options: ['TanStack Table', 'React Table', 'Bootstrap Table'],
        required: true,
      },
    ],
  },
  {
    title: 'CSV to Markdown',
    description: 'Convert CSV to Markdown table.',
    category: 'Data & Converters',
    tags: ['csv', 'markdown', 'table', 'converter'],
    content:
      'Create a CSV to Markdown Converter.\n\n**Features:**\n1. Input CSV.\n2. Generate Pipe table syntax.\n3. Align columns (Left, Right, Center).\n4. Copy MD to clipboard.',
    variables: [
      {
        name: 'align',
        description: 'Default Alignment',
        type: 'select',
        options: ['Left', 'Center', 'Right'],
        required: false,
      },
    ],
  },
  {
    title: 'SQL to CSV',
    description: 'Export SQL Query result to CSV.',
    category: 'Data & Converters',
    tags: ['sql', 'csv', 'export', 'database'],
    content:
      'Create an SQL to CSV Simulator.\n\n**Features:**\n1. Input SQL SELECT Query.\n2. Input Mock Data (JSON) to simulate result.\n3. Process and Output CSV.\n4. Escape handling.',
    variables: [
      {
        name: 'dialect',
        description: 'SQL Flavor',
        type: 'select',
        options: ['MySQL', 'PostgreSQL'],
        required: false,
      },
    ],
  },
  {
    title: 'Mongoose Schema',
    description: 'Generate Mongoose/MongoDB schemas.',
    category: 'Database Tools',
    tags: ['mongodb', 'mongoose', 'schema', 'node'],
    content:
      'Create a Mongoose Schema Generator.\n\n**Features:**\n1. Field Name and Type.\n2. Validators (Required, Unique, Min/Max).\n3. Defaults.\n4. Virtuals.\n5. Pre/Post hooks.',
    variables: [
      {
        name: 'ts',
        description: 'Use TypeScript?',
        type: 'boolean',
        defaultValue: true,
      },
    ],
  },
  {
    title: 'Sequelize Model',
    description: 'Generate Sequelize/Node models.',
    category: 'Database Tools',
    tags: ['sequelize', 'sql', 'node', 'orm'],
    content:
      'Create a Sequelize Model Generator.\n\n**Features:**\n1. Model Name.\n2. Attributes (Type, AllowNull, DefaultValue).\n3. Associations (BelongsTo, HasMany).\n4. Scopes.',
    variables: [
      {
        name: 'lang',
        description: 'JavaScript or TypeScript',
        type: 'select',
        options: ['JS', 'TS'],
        required: true,
      },
    ],
  },
  {
    title: 'Prisma Schema',
    description: 'Generate Prisma schema.prisma.',
    category: 'Database Tools',
    tags: ['prisma', 'orm', 'schema', 'db'],
    content:
      'Create a Prisma Schema Generator.\n\n**Features:**\n1. Model definitions.\n2. Field types (Int, String, DateTime).\n3. Relations (One-to-One, One-to-Many).\n4. Indexes.',
    variables: [
      {
        name: 'dbProvider',
        description: 'Database Provider',
        type: 'select',
        options: ['postgresql', 'mysql', 'sqlite', 'mongodb'],
        required: true,
      },
    ],
  },
  {
    title: 'TypeORM Entity',
    description: 'Generate TypeORM entities.',
    category: 'Database Tools',
    tags: ['typeorm', 'entity', 'ts', 'database'],
    content:
      'Create a TypeORM Entity Generator.\n\n**Features:**\n1. Table Name.\n2. Columns (PrimaryGeneratedColumn, Column).\n3. Relations (ManyToMany, etc.).\n4. Indices.',
    variables: [
      {
        name: 'naming',
        description: 'Naming Strategy',
        type: 'select',
        options: ['Snake_Case', 'CamelCase'],
        required: false,
      },
    ],
  },
  {
    title: 'Django Model',
    description: 'Generate Django Python models.',
    category: 'Database Tools',
    tags: ['django', 'model', 'python', 'orm'],
    content:
      'Create a Django Model Generator.\n\n**Features:**\n1. Model Name.\n2. Fields (CharField, IntegerField, ForeignKey).\n3. Meta class (Ordering, Verbose Name).\n4. __str__ method.',
    variables: [
      {
        name: 'version',
        description: 'Django Version',
        type: 'select',
        options: ['3.x', '4.x'],
        required: false,
      },
    ],
  },
  {
    title: 'Laravel Migration',
    description: 'Generate Laravel PHP migrations.',
    category: 'Database Tools',
    tags: ['laravel', 'migration', 'php', 'artisan'],
    content:
      'Create a Laravel Migration Generator.\n\n**Features:**\n1. Table Name.\n2. Up/Down methods.\n3. Schema Builder (String, Integer, Timestamps).\n4. Indexes.',
    variables: [
      {
        name: 'version',
        description: 'Laravel Version',
        type: 'select',
        options: ['8.x', '9.x', '10.x'],
        required: false,
      },
    ],
  },
  {
    title: 'Rails Migration',
    description: 'Generate Ruby on Rails migrations.',
    category: 'Database Tools',
    tags: ['rails', 'migration', 'ruby', 'activerecord'],
    content:
      'Create a Rails Migration Generator.\n\n**Features:**\n1. Change method.\n2. Create Table / Add Column.\n3. Datatypes (String, Text, References).\n4. Reversible migration logic.',
    variables: [
      {
        name: 'version',
        description: 'Rails Version',
        type: 'select',
        options: ['6', '7'],
        required: false,
      },
    ],
  },
  {
    title: 'Flask Route',
    description: 'Generate Flask @app.route code.',
    category: 'Backend Tools',
    tags: ['flask', 'route', 'python', 'decorator'],
    content:
      'Create a Flask Route Generator.\n\n**Features:**\n1. URL Path (/path).\n2. Methods (GET, POST).\n3. Function signature.\n4. Request object handling (request.args, request.json).\n5. JSON Response.',
    variables: [
      {
        name: 'format',
        description: 'Return Format',
        type: 'select',
        options: ['JSON', 'HTML', 'Redirect'],
        required: true,
      },
    ],
  },
  {
    title: 'Express Route',
    description: 'Generate Express router code.',
    category: 'Backend Tools',
    tags: ['express', 'route', 'node', 'middleware'],
    content:
      'Create an Express Route Generator.\n\n**Features:**\n1. Router path.\n2. Middleware (Auth, BodyParser).\n3. Controller function.\n4. Async/Await support.\n5. Error handling.',
    variables: [
      {
        name: 'router',
        description: 'Router Type',
        type: 'select',
        options: ['express.Router', 'app.get/post'],
        required: true,
      },
    ],
  },
  {
    title: 'FastAPI Route',
    description: 'Generate FastAPI route decorators.',
    category: 'Backend Tools',
    tags: ['fastapi', 'route', 'python', 'pydantic'],
    content:
      'Create a FastAPI Route Generator.\n\n**Features:**\n1. Operation ID.\n2. Request Model (Pydantic BaseModel).\n3. Response Model.\n4. Path params and Query params.\n5. Tags (Swagger group).',
    variables: [
      {
        name: 'method',
        description: 'HTTP Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        required: true,
      },
    ],
  },
  {
    title: 'Gin Route',
    description: 'Generate Golang Gin router code.',
    category: 'Backend Tools',
    tags: ['gin', 'golang', 'route', 'web'],
    content:
      'Create a Gin Route Generator.\n\n**Features:**\n1. GET/POST Handler.\n2. Binding (ShouldBindQuery).\n3. JSON/HTML response.\n4. Status codes.',
    variables: [
      {
        name: 'version',
        description: 'Gin Version',
        type: 'string',
        defaultValue: 'latest',
        required: false,
      },
    ],
  },
  {
    title: 'Intersection Observer Tester',
    description: 'Test element visibility on screen.',
    category: 'Web APIs',
    tags: ['intersection-observer', 'api', 'test', 'visual'],
    content:
      'Create an Intersection Observer Tester.\n\n**Features:**\n1. Add Box element.\n2. Configure Threshold (0.5, 1.0).\n3. Scroll page.\n4. Visual indicator when intersecting.\n5. Console log callbacks.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Resize Observer Tester',
    description: 'Detect element size changes.',
    category: 'Web APIs',
    tags: ['resize-observer', 'api', 'test', 'layout'],
    content:
      'Create a Resize Observer Tester.\n\n**Features:**\n1. Resizable Box div.\n2. Display Width/Height in real-time.\n3. Console log Entry/Exit.\n4. Border Box detection.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Mutation Observer Tester',
    description: 'Monitor DOM changes.',
    category: 'Web APIs',
    tags: ['mutation-observer', 'api', 'dom', 'test'],
    content:
      'Create a Mutation Observer Tester.\n\n**Features:**\n1. List of observed attributes.\n2. Child List/Subtree options.\n3. Add/Remove nodes via UI.\n4. Log mutations to console.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Clipboard API Tester',
    description: 'Test copy/cut/paste and read/write.',
    category: 'Web APIs',
    tags: ['clipboard', 'api', 'test', 'async'],
    content:
      "Create a Clipboard API Tester.\n\n**Features:**\n1. Input text.\n2. 'Write' button (Clipboard.writeText).\n3. 'Read' button (Clipboard.readText).\n4. Display Error/Success.\n5. Check Permission status.",
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Drag and Drop API',
    description: 'Test HTML5 DnD events.',
    category: 'Web APIs',
    tags: ['dnd', 'api', 'html5', 'mouse'],
    content:
      'Create a DnD Sandbox.\n\n**Features:**\n1. Draggable Source.\n2. Drop Target.\n3. Event Log (dragstart, dragover, drop).\n4. DataTransfer data exchange.\n5. EffectAllowed (Copy, Move).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['Vanilla', 'React-DnD', 'Vue.Draggable'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Speech API (Speech to Text)',
    description: 'Browser speech recognition.',
    category: 'Web APIs',
    tags: ['speech', 'recognition', 'audio', 'api'],
    content:
      'Create a Speech to Text Demo.\n\n**Tech:** webkitSpeechRecognition.\n**Features:**\n1. Start/Stop Listening.\n2. Select Language.\n3. Continuous vs Single shot.\n4. Interim Results display.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Speech API (Text to Speech)',
    description: 'Browser text to speech.',
    category: 'Web APIs',
    tags: ['speech', 'tts', 'audio', 'api'],
    content:
      'Create a Text to Speech Demo.\n\n**Tech:** speechSynthesis.\n**Features:**\n1. Input text.\n2. Select Voice/Google/Female.\n3. Rate/Pitch sliders.\n4. Play/Pause/Stop.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Notification API',
    description: 'Test browser push notifications.',
    category: 'Web APIs',
    tags: ['notification', 'api', 'push', 'alert'],
    content:
      'Create a Notification Tester.\n\n**Features:**\n1. Request Permission button.\n2. Trigger Notification (Title, Body, Icon).\n3. Notification Onclick handler.\n4. Vibration support.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Broadcast Channel',
    description: 'Test communication between tabs.',
    category: 'Web APIs',
    tags: ['broadcast', 'channel', 'tabs', 'api'],
    content:
      'Create a Broadcast Channel Demo.\n\n**Features:**\n1. Open Page 1 (Sender) & Page 2 (Receiver).\n2. Send Message.\n3. Display Message on other tab.\n4. Close channel.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Service Worker Tester',
    description: 'Test SW lifecycle and caching.',
    category: 'PWA & Mobile',
    tags: ['serviceworker', 'pwa', 'offline', 'api'],
    content:
      'Create a Service Worker Tester.\n\n**Tech:** Navigator.serviceWorker.\n**Features:**\n1. Register SW code block.\n2. Listen for Install/Activate events.\n3. Fetch event listener (Caching Strategy).\n4. Log messages.',
    variables: [
      {
        name: 'strategy',
        description: 'Caching Strategy',
        type: 'select',
        options: ['Cache First', 'Network First', 'Network Only'],
        required: true,
      },
    ],
  },
  {
    title: 'Push Notification Sender',
    description: 'Trigger VAPID web push.',
    category: 'PWA & Mobile',
    tags: ['push', 'vapid', 'api', 'notification'],
    content:
      'Create a Push Sender UI.\n\n**Tech:** Web Push Protocol.\n**Features:**\n1. VAPID Keys input.\n2. Subscription JSON input.\n3. Payload input (Title, Body).\n4. Send Request to Push Service.',
    variables: [
      {
        name: 'backend',
        description: 'Server Framework to use',
        type: 'select',
        options: ['Node.js', 'Go', 'Python'],
        required: true,
      },
    ],
  },
  {
    title: 'MediaRecorder API',
    description: 'Record audio/video from camera.',
    category: 'Web APIs',
    tags: ['mediarecorder', 'camera', 'audio', 'video'],
    content:
      'Create a Recorder Demo.\n\n**Tech:** MediaRecorder.\n**Features:**\n1. Select Mic/Camera.\n2. Start/Stop Recording.\n3. Download WebM file.\n4. Live visualizer (Audio) or Preview (Video).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Screen Capture API',
    description: 'Share/Record screen video.',
    category: 'Web APIs',
    tags: ['screen-share', 'getdisplaymedia', 'video', 'api'],
    content:
      "Create a Screen Capture Demo.\n\n**Tech:** navigator.mediaDevices.getDisplayMedia.\n**Features:**\n1. 'Share Screen' button.\n2. Preview stream in video element.\n3. Record Stream.\n4. Stop Sharing.",
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Web MIDI',
    description: 'Connect to MIDI keyboards.',
    category: 'Web APIs',
    tags: ['midi', 'music', 'hardware', 'api'],
    content:
      'Create a Web MIDI Tester.\n\n**Tech:** navigator.requestMIDIAccess.\n**Features:**\n1. List MIDI Inputs.\n2. Visualizer: Note On/Off.\n3. Play sound via Oscillator on Note On.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Bluetooth',
    description: 'Scan and connect to BLE devices.',
    category: 'Web APIs',
    tags: ['bluetooth', 'iot', 'ble', 'api'],
    content:
      'Create a Web Bluetooth Scanner.\n\n**Tech:** navigator.bluetooth.\n**Features:**\n1. Request Device (Filter by Name/Services).\n2. Connect/Disconnect.\n3. Read Characteristic UUID.\n4. Write to Characteristic.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Web USB',
    description: 'Access USB devices.',
    category: 'Web APIs',
    tags: ['usb', 'hardware', 'api', 'device'],
    content:
      'Create a Web USB Connector.\n\n**Tech**: navigator.usb.\n**Features:**\n1. Request Device (Filter by VendorID).\n2. Open Device.\n3. Claim Interface.\n4. Transfer In/Out.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'WebNFC',
    description: 'Read NFC tags.',
    category: 'Web APIs',
    tags: ['nfc', 'hardware', 'rfid', 'api'],
    content:
      'Create a Web NFC Reader.\n\n**Tech**: NDEFReader.\n**Features:**\n1. Scan NFC Tag.\n2. Read Serial Number.\n3. Read Payload.\n4. Write to Tag (if supported).',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Geofencing',
    description: 'Monitor entry/exit of locations.',
    category: 'Web APIs',
    tags: ['geo', 'fence', 'location', 'api'],
    content:
      'Create a Geofence Simulator.\n\n**Tech**: Geolocation API + Mock Logic.\n**Features:**\n1. Set Geo-coordinate point.\n2. Set Radius.\n3. Simulate position movement.\n4. Alert on Enter/Exit.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Mapbox'],
        required: true,
      },
    ],
  },
  {
    title: 'Background Sync',
    description: 'Register sync tasks for offline.',
    category: 'PWA & Mobile',
    tags: ['background', 'sync', 'service-worker', 'api'],
    content:
      "Create a Background Sync Demo.\n\n**Tech**: sw.registerSync.\n**Features:**\n1. Register 'sync-tag' event in SW.\n2. Trigger sync event manually (DevTools).\n3. Show 'Sync completed' UI.",
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Favicon Generator',
    description: 'Create favicons from PNG.',
    category: 'Design Tools',
    tags: ['favicon', 'icon', 'image', 'converter'],
    content:
      'Create a Favicon Generator.\n\n**Features:**\n1. Upload square image.\n2. Generate sizes: 16x16, 32x32, 192x192.\n3. Generate ICO file.\n4. Generate HTML <link> tags.',
    variables: [
      {
        name: 'engine',
        description: 'Image Library',
        type: 'select',
        options: ['Sharp (Node)', 'Canvas', 'ImageMagick'],
        required: true,
      },
    ],
  },
  {
    title: 'Apple Touch Icon',
    description: 'Create Apple specific icons.',
    category: 'Design Tools',
    tags: ['apple', 'icon', 'ios', 'mobile'],
    content:
      'Create an Apple Icon Generator.\n\n**Features:**\n1. Upload Image.\n2. Generate 180x180 and 152x152.\n3. Generate precomposed icon.\n4. Generate HTML tags.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'App Icon Generator',
    description: 'Resize for Play Store / App Store.',
    category: 'Design Tools',
    tags: ['app-icon', 'mobile', 'store', 'resize'],
    content:
      'Create an App Icon Resizer.\n\n**Platform:** {{platform}}.\n**Features:**\n1. Upload 1024x1024 master.\n2. Generate Android Adaptive Icons.\n3. Generate iOS Icons (Contents.json).\n4. Download ZIP.',
    variables: [
      {
        name: 'platform',
        description: 'Target Platform',
        type: 'select',
        options: ['Android', 'iOS', 'Both'],
        required: true,
      },
    ],
  },
  {
    title: 'Splash Screen Generator',
    description: 'Create app launch images.',
    category: 'Design Tools',
    tags: ['splash', 'launch', 'mobile', 'image'],
    content:
      'Create a Splash Screen Generator.\n\n**Features:**\n1. Upload logo.\n2. Set background color.\n3. Set logo size and position.\n4. Generate Android 9-patch or iOS Storyboard.',
    variables: [
      {
        name: 'platform',
        description: 'Target Platform',
        type: 'select',
        options: ['Android', 'iOS'],
        required: true,
      },
    ],
  },
  {
    title: 'PWA Manifest',
    description: 'Generate manifest.json.',
    category: 'PWA & Mobile',
    tags: ['manifest', 'pwa', 'json', 'config'],
    content:
      'Create a PWA Manifest Generator.\n\n**Features:**\n1. App Name/Short Name.\n2. Start URL.\n3. Icons (Upload URLs).\n4. Display Mode (Standalone, Fullscreen).\n5. Theme Color.\n6. Opaque background.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: '404 Error Page',
    description: 'Template for Page Not Found.',
    category: 'Web Templates',
    tags: ['404', 'error', 'template', 'design'],
    content:
      "Create a 404 Page.\n\n**Features:**\n1. Custom Illustration.\n2. Back to Home button.\n3. 'Page Not Found' text.\n4. {{style}}.",
    variables: [
      {
        name: 'style',
        description: 'Design Style',
        type: 'select',
        options: ['Minimalist', 'Illustrated', 'Funny', 'Tech'],
        required: true,
      },
    ],
  },
  {
    title: '500 Error Page',
    description: 'Template for Internal Server Error.',
    category: 'Web Templates',
    tags: ['500', 'error', 'template', 'design'],
    content:
      "Create a 500 Page.\n\n**Features:**\n1. 'Something went wrong' message.\n2. Retry button.\n3. Contact Support link.\n4. {{style}}.",
    variables: [
      {
        name: 'style',
        description: 'Design Style',
        type: 'select',
        options: ['Clean', 'Abstract', 'Dark Mode'],
        required: true,
      },
    ],
  },
  {
    title: 'Password Generator',
    description: 'Generate strong random passwords.',
    category: 'Security Tools',
    tags: ['password', 'generator', 'security', 'random'],
    content:
      'Create a Password Generator.\n\n**Features:**\n1. Length slider (8-64).\n2. Include Uppercase, Numbers, Symbols.\n3. Exclude ambiguous characters (O, 0, l, 1).\n4. Strength meter (Entropy).\n5. Copy to clipboard.',
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Passphrase Generator',
    description: 'Diceware style passphrases.',
    category: 'Security Tools',
    tags: ['passphrase', 'diceware', 'words', 'security'],
    content:
      'Create a Passphrase Generator.\n\n**Features:**\n1. Word count (4-8 words).\n2. Separator (Space, Hyphen, Underscore).\n3. Capitalization (Title, Upper, Lower).\n4. Word list (EFF, BIP39).',
    variables: [
      {
        name: 'list',
        description: 'Word Dictionary',
        type: 'select',
        options: ['EFF Long', 'EFF Short', 'BIP39'],
        required: true,
      },
    ],
  },

  {
    title: 'WebGL 3D Scene Starter',
    description: 'Advanced Three.js starter with post-processing and physics.',
    category: 'Web Graphics',
    tags: ['webgl', 'threejs', '3d', 'graphics'],
    content:
      'Create a WebGL 3D Application using {{library}}.\n\n**Core Features:**\n1. Setup Scene, Camera, and WebGLRenderer with anti-aliasing.\n2. Implement PBR (Physically Based Rendering) materials.\n3. Add lighting (Ambient, Directional with shadows).\n4. Implement OrbitControls and FirstPersonControls.\n5. Post-processing pipeline (Bloom, SSAO, Outline).\n6. Responsive resize handler.',
    variables: [
      {
        name: 'library',
        description: '3D Graphics Library',
        type: 'select',
        options: ['Three.js', 'Babylon.js', 'PlayCanvas'],
        required: true,
      },
      {
        name: 'physics',
        description: 'Physics Engine Integration',
        type: 'select',
        options: ['Cannon.js', 'Ammo.js', 'None'],
        required: false,
      },
      {
        name: 'rendering',
        description: 'Rendering Context',
        type: 'select',
        options: ['WebGL 1.0', 'WebGL 2.0', 'WebGPU'],
        required: false,
      },
    ],
  },
  {
    title: 'WebAssembly (Rust) Module',
    description: 'Setup Rust compilation to Wasm and JS integration.',
    category: 'Web Performance',
    tags: ['wasm', 'rust', 'performance', 'integration'],
    content:
      'Build a WebAssembly Module integration.\n\n**Core Features:**\n1. Initialize Rust project with {{crate}}.\n2. Write a complex calculation function (e.g., image processing).\n3. Configure wasm-pack for bundling.\n4. Generate TypeScript glue code.\n5. Create a JavaScript loader to instantiate the module.\n6. Benchmark performance vs Vanilla JS.',
    variables: [
      {
        name: 'crate',
        description: 'Wasm Template Crate',
        type: 'select',
        options: ['wasm-pack', 'cargo-wasi', 'leptos'],
        required: true,
      },
      {
        name: 'tool',
        description: 'Build Tooling',
        type: 'select',
        options: ['wasm-pack', 'wasm-bindgen'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Worker Generator',
    description: 'Create off-main-thread workers for heavy tasks.',
    category: 'Web APIs',
    tags: ['worker', 'multithreading', 'performance', 'async'],
    content:
      'Generate a Web Worker solution.\n\n**Core Features:**\n1. Dedicated Worker file with {{commsType}}.\n2. Main thread spawning logic.\n3. Data serialization (Transferable objects for performance).\n4. Worker termination cleanup.\n5. Dynamic blob URL creation for inline workers.',
    variables: [
      {
        name: 'commsType',
        description: 'Worker Communication Method',
        type: 'select',
        options: ['postMessage', 'Comlink', 'SharedArrayBuffer'],
        required: true,
      },
    ],
  },
  {
    title: 'SharedArrayBuffer Manager',
    description: 'Shared memory management between multiple workers.',
    category: 'Web APIs',
    tags: ['sharedarraybuffer', 'atomics', 'concurrency', 'wasm'],
    content:
      'Create a Shared Memory Manager.\n\n**Core Features:**\n1. Create SharedArrayBuffer of size {{bufferSize}}.\n2. Implement Atomic operations (Add, Sub, CompareAndSwap) using {{atomicLib}}.\n3. State management for concurrent workers.\n4. Lock implementation (Spinlock/Mutex) for critical sections.',
    variables: [
      {
        name: 'bufferSize',
        description: 'Initial buffer size in bytes',
        type: 'number',
        defaultValue: 1024,
        required: true,
      },
      {
        name: 'atomicLib',
        description: 'Atomic wrapper library',
        type: 'select',
        options: ['Atomics (Native)', 'lockr', 'co-op'],
        required: true,
      },
    ],
  },
  {
    title: 'Web Transport Protocol (WebTransport)',
    description: 'Low-latency secure data transport API.',
    category: 'Web APIs',
    tags: ['webtransport', 'udp', 'quic', 'networking'],
    content:
      'Implement a WebTransport Client.\n\n**Core Features:**\n1. Establish connection to {{serverType}}.\n2. Create Bidirectional streams.\n3. Send Datagrams (UDP style).\n4. Handle transport close/error states.\n5. Statistics logger (Packet loss, latency).',
    variables: [
      {
        name: 'serverType',
        description: 'Server Implementation',
        type: 'select',
        options: ['Web3Transport Server', 'Quiche (Rust)', 'MsQuic (C++)'],
        required: true,
      },
    ],
  },
  {
    title: 'Reporting API (Crash Reporting)',
    description: 'Client-side error tracking and reporting.',
    category: 'Web APIs',
    tags: ['error-reporting', 'logging', 'monitoring', 'bug-tracking'],
    content:
      'Create a Crash Reporting Client.\n\n**Core Features:**\n1. Global window.onerror/UnhandledRejection handler.\n2. Stack Trace parsing ({{parser}}).\n3. Event buffering for offline scenarios.\n4. Send payloads to {{endpoint}}.\n5. User context (Device, URL, Custom Tags).',
    variables: [
      {
        name: 'parser',
        description: 'Stack Trace Parser',
        type: 'select',
        options: ['Stacktrace.js', 'ErrorStackParser', 'TraceKit'],
        required: true,
      },
      {
        name: 'endpoint',
        description: 'API Endpoint',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Request Caching (Service Worker Cache)',
    description: 'Advanced caching strategies using Service Workers.',
    category: 'PWA & Mobile',
    tags: ['service-worker', 'pwa', 'cache', 'offline'],
    content:
      'Build a Advanced Caching Service Worker.\n\n**Core Features:**\n1. Implement {{strategy}} (StaleWhileRevalidate, NetworkFirst, CacheOnly).\n2. Cache expiration logic (TTL).\n3. Cache busting on content update (versioning).\n4. Deduplication of in-flight requests.',
    variables: [
      {
        name: 'strategy',
        description: 'Caching Strategy',
        type: 'select',
        options: [
          'StaleWhileRevalidate',
          'NetworkFirst',
          'CacheOnly',
          'NetworkOnly',
          'StaleOnly',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'IndexedDB Wrapper',
    description: 'Promisified wrapper for IndexedDB.',
    category: 'Storage',
    tags: ['indexeddb', 'storage', 'wrapper', 'async'],
    content:
      'Generate an IndexedDB Wrapper Library.\n\n**Core Features:**\n1. Open Database with versioning.\n2. CRUD operations (Add, Get, Put, Delete) returning Promises.\n3. Indexing support for querying.\n4. Transaction handling (Readwrite/Readonly).\n5. Bulk operations.',
    variables: [
      {
        name: 'library',
        description: 'Helper Library',
        type: 'select',
        options: ['idb', 'Dexie.js', 'Raw (Native)'],
        required: true,
      },
    ],
  },
  {
    title: 'File System Access API (Editor)',
    description: 'Native file access for web editors.',
    category: 'Desktop App Specific',
    tags: ['file-system', 'editor', 'api', 'files'],
    content:
      'Create a Local File Editor.\n\n**Core Features:**\n1. Directory Handle Picker (showDirectoryPicker).\n2. Read/Write file handles using {{accessMode}}.\n3. File watching for external changes.\n4. Permission handling (Permission Request API).\n5. Persist handles via IndexedDB (Origin Private File System).',
    variables: [
      {
        name: 'accessMode',
        description: 'File Read/Write Mode',
        type: 'select',
        options: ['Readable/Writable', 'ReadWrite', 'Append'],
        required: true,
      },
    ],
  },
  {
    title: 'AsyncIterable Streamer',
    description: 'Pipe large data streams via Web Streams API.',
    category: 'Web APIs',
    tags: ['streams', 'readable', 'writable', 'transform'],
    content:
      'Create a Stream Processing Pipeline.\n\n**Core Features:**\n1. ReadableStream from {{source}} (Fetch/File).\n2. TransformStream (process chunks, e.g., {{processType}}).\n3. WritableStream (Write to File/Console).\n4. Backpressure handling.\n5. Error propagation.',
    variables: [
      {
        name: 'source',
        description: 'Data Source',
        type: 'select',
        options: ['Fetch Request', 'File Upload', 'Generator'],
        required: true,
      },
      {
        name: 'processType',
        description: 'Transformation Logic',
        type: 'select',
        options: [
          'Compression (gzip)',
          'Encryption (AES)',
          'Chunking',
          'Line-by-line',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Web MIDI Synthesizer',
    description: 'Browser-based synth using Web Audio & MIDI APIs.',
    category: 'Audio',
    tags: ['midi', 'synth', 'audio', 'hardware'],
    content:
      'Build a MIDI Synthesizer.\n\n**Core Features:**\n1. MIDI Input detection (navigator.requestMIDIAccess).\n2. AudioContext oscillator synthesis.\n3. ADSR Envelope (Attack, Decay, Sustain, Release) for volume control.\n4. Polyphonic voice management.\n5. Visual piano keyboard.',
    variables: [
      {
        name: 'synthType',
        description: 'Synthesis Architecture',
        type: 'select',
        options: ['Subtractive Synth', 'FM Synth', 'Sample Player'],
        required: true,
      },
    ],
  },
  {
    title: 'Audio Worklet Processor',
    description: 'Low-latency audio processing in Worker.',
    category: 'Audio',
    tags: ['audio-worklet', 'audio', 'performance', 'dsp'],
    content:
      'Create an Audio Worklet.\n\n**Core Features:**\n1. AudioWorkletProcessor class implementation.\n2. AudioParam for value modulation (BPM/Rate).\n3. Custom audio algorithm ({{algorithm}}).\n4. Main thread connection (addModule).\n5. Visualizer of audio buffer.',
    variables: [
      {
        name: 'algorithm',
        description: 'Audio DSP Algorithm',
        type: 'select',
        options: ['BiquadFilter', 'Reverb (Convolver)', 'Oscillator', 'Delay'],
        required: true,
      },
    ],
  },
  {
    title: 'RAG (Retrieval-Augmented Generation) Builder',
    description: 'Integration of Vector DB, Embeddings, and LLM.',
    category: 'AI & LLMs',
    tags: ['rag', 'vector-db', 'embeddings', 'llm'],
    content:
      'Build a RAG Application.\n\n**Core Features:**\n1. Document Loader (PDF/TXT) and Chunker ({{chunkingStrategy}}).\n2. Embedding generation using {{embedModel}}.\n3. Vector Database storage ({{vectorDb}}).\n4. Semantic Search with Cosine Similarity.\n5. Context injection into {{llmModel}} prompt.',
    variables: [
      {
        name: 'vectorDb',
        description: 'Vector Database Backend',
        type: 'select',
        options: ['Pinecone', 'Chroma', 'Weaviate', 'Qdrant'],
        required: true,
      },
      {
        name: 'embedModel',
        description: 'Embedding Model',
        type: 'select',
        options: [
          'OpenAI text-embedding-ada-002',
          'HuggingFace MiniLM',
          'Cohere Embed',
        ],
        required: true,
      },
      {
        name: 'llmModel',
        description: 'LLM for Generation',
        type: 'select',
        options: ['GPT-4', 'Claude 3', 'Llama 2'],
        required: true,
      },
      {
        name: 'chunkingStrategy',
        description: 'Text Chunking Method',
        type: 'select',
        options: ['Fixed Size', 'Recursive Character Split', 'Semantic Split'],
        required: true,
      },
    ],
  },
  {
    title: 'LangChain Agent Tool',
    description: 'Autonomous agent using LangChain framework.',
    category: 'AI & LLMs',
    tags: ['langchain', 'agent', 'autonomous', 'tools'],
    content:
      'Create a LangChain Agent.\n\n**Core Features:**\n1. Initialize LLM ({{provider}}).\n2. Define Tools (Search, Calculator, Database).\n3. Agent Loop: Thought -> Action -> Observation -> Thought.\n4. Memory (Summary Buffer / ConversationBuffer).\n5. Stream output to UI.',
    variables: [
      {
        name: 'provider',
        description: 'LLM Provider',
        type: 'select',
        options: ['OpenAI', 'Anthropic', 'Google PaLM'],
        required: true,
      },
    ],
  },
  {
    title: 'Vector Database Embedder',
    description: 'Process text into vectors and store.',
    category: 'AI & LLMs',
    tags: ['vector', 'embeddings', 'api', 'database'],
    content:
      'Create a Vector Embedder API.\n\n**Core Features:**\n1. POST /embed endpoint.\n2. Split text into chunks using {{splitter}}.\n3. Call Embedding API.\n4. Upsert vectors into {{db}}.\n5. Metadata filtering.',
    variables: [
      {
        name: 'splitter',
        description: 'Text Splitter Logic',
        type: 'select',
        options: [
          'RecursiveCharacterTextSplitter',
          'CharacterTextSplitter',
          'MarkdownHeaderTextSplitter',
        ],
        required: true,
      },
      {
        name: 'db',
        description: 'Vector Database',
        type: 'select',
        options: ['Pinecone', 'Weaviate', 'Chroma', 'Local FAISS'],
        required: true,
      },
    ],
  },
  {
    title: 'Prompt Engineering Playground',
    description: 'UI to craft and test prompts against models.',
    category: 'AI & LLMs',
    tags: ['prompt', 'playground', 'testing', 'ui'],
    content:
      'Build a Prompt Engineering Tool.\n\n**Core Features:**\n1. Variable interpolation ({{name}}, {{date}}).\n2. System/User Message templates.\n3. Send to multiple models for comparison.\n4. Token count estimator ({{tokenizer}}).\n5. Version history of prompts.',
    variables: [
      {
        name: 'tokenizer',
        description: 'Token Counting Logic',
        type: 'select',
        options: ['cl100k_base (OpenAI)', 'tiktoken', 'gpt-2-tokenizer'],
        required: true,
      },
    ],
  },
  {
    title: 'Chain-of-Thought Visualizer',
    description: 'Visualize the reasoning steps of an AI.',
    category: 'AI & LLMs',
    tags: ['cot', 'visualization', 'reasoning', 'ui'],
    content:
      "Create a Chain-of-Thought UI.\n\n**Core Features:**\n1. Parse JSON response for 'steps'.\n2. Display nodes/links of reasoning.\n3. Highlight final answer.\n4. Expand/Collapse steps.\n5. Support for streaming tokens.",
    variables: [
      {
        name: 'vizLib',
        description: 'Graph Visualization Library',
        type: 'select',
        options: ['React Flow', 'Cytoscape.js', 'Mermaid'],
        required: true,
      },
    ],
  },
  {
    title: 'Function Calling Interface',
    description: 'UI to configure and execute LLM Function Calling.',
    category: 'AI & LLMs',
    tags: ['function-calling', 'tools', 'json', 'ui'],
    content:
      'Create a Function Calling Interface.\n\n**Core Features:**\n1. Define Function Schema (JSON Schema).\n2. Chat interface with Model.\n3. Parser to extract function calls from Model response.\n4. Execute Function (Mock or Real API).\n5. Inject result back to Model.',
    variables: [
      {
        name: 'model',
        description: 'LLM with Tool Support',
        type: 'select',
        options: ['GPT-3.5-Turbo', 'GPT-4', 'Claude 3 Opus', 'Llama 3'],
        required: true,
      },
    ],
  },
  {
    title: 'Fine-Tuning Data Formatter',
    description: 'Prepare datasets for LLM fine-tuning (JSONL).',
    category: 'AI & LLMs',
    tags: ['finetuning', 'dataset', 'preprocessing', 'jsonl'],
    content:
      "Build a Fine-Tuning Data Formatter.\n\n**Core Features:**\n1. Upload CSV/JSON.\n2. Map columns to 'system', 'user', 'assistant'.\n3. Tokenize to check context length.\n4. Validation of format for {{provider}}.\n5. Export JSONL.",
    variables: [
      {
        name: 'provider',
        description: 'Training Provider',
        type: 'select',
        options: ['OpenAI', 'Llama-Adapter', 'Azure OpenAI'],
        required: true,
      },
    ],
  },
  {
    title: 'Hugging Face Inference',
    description: 'Client-side inference for HF models.',
    category: 'AI & LLMs',
    tags: ['huggingface', 'inference', 'onnx', 'transformers'],
    content:
      'Create a HF Inference UI.\n\n**Core Features:**\n1. Load ONNX/WASM model from Hub.\n2. Tokenization ({{tokenizer}}).\n3. Inference Loop (Forward Pass).\n4. De-tokenization.\n5. Performance metrics (Time per token).',
    variables: [
      {
        name: 'tokenizer',
        description: 'Tokenizer Library',
        type: 'select',
        options: ['tokenizers-wasm', 'huggingface/transformers'],
        required: true,
      },
    ],
  },
  {
    title: 'Multimodal Chat (Text + Image)',
    description: 'Chat interface supporting Image inputs (GPT-4V).',
    category: 'AI & LLMs',
    tags: ['multimodal', 'vision', 'chat', 'gpt4v'],
    content:
      'Build a Multimodal Chat.\n\n**Core Features:**\n1. Message history support.\n2. Image Upload/Preview component.\n3. Convert Image to Base64/URL for API.\n4. Call {{model}} Vision API.\n5. Display image in chat history.',
    variables: [
      {
        name: 'model',
        description: 'Vision Model',
        type: 'select',
        options: [
          'gpt-4-vision-preview',
          'claude-3-opus-20240229',
          'llava-1.5',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Rate Limiter (Sliding Window)',
    description: 'Backend rate limiting using Redis or In-Memory.',
    category: 'Backend Performance',
    tags: ['rate-limit', 'security', 'api', 'middleware'],
    content:
      'Create a Rate Limiting Middleware.\n\n**Core Features:**\n1. {{algorithm}} implementation (Token Bucket, Sliding Window).\n2. Storage ({{store}}).\n3. Headers return (X-RateLimit-Limit, Remaining, Reset).\n4. Redis script for atomic counter.\n5. Key generation by IP/ID.',
    variables: [
      {
        name: 'algorithm',
        description: 'Rate Limiting Logic',
        type: 'select',
        options: ['Sliding Window Log', 'Token Bucket', 'Leaky Bucket'],
        required: true,
      },
      {
        name: 'store',
        description: 'State Storage',
        type: 'select',
        options: ['Redis', 'In-Memory', 'Memcached'],
        required: true,
      },
    ],
  },
  {
    title: 'GraphQL DataLoader',
    description: 'Batching and caching N+1 query problem.',
    category: 'Backend Performance',
    tags: ['graphql', 'dataloader', 'optimization', 'batching'],
    content:
      'Create a DataLoader Implementation.\n\n**Core Features:**\n1. Batch loader function (Accept array of IDs -> Return array of Users).\n2. Cache configuration (TTL, Max Size).\n3. Batching schedule (Wait for 10ms or 10 requests).\n4. Integration with {{graphqlServer}}.\n\n5. Per-request caching.',
    variables: [
      {
        name: 'graphqlServer',
        description: 'Server Type',
        type: 'select',
        options: ['Apollo Server', 'GraphQL Yoga', 'Express'],
        required: true,
      },
    ],
  },
  {
    title: 'Job Queue (Bull/Agenda)',
    description: 'Processing background jobs with retry logic.',
    category: 'Backend Performance',
    tags: ['queue', 'background-jobs', 'redis', 'processing'],
    content:
      'Create a Job Queue System.\n\n**Core Features:**\n1. Define Queue ({{queueName}}) and Processor.\n2. Job schema (Data, Options, Priority).\n3. Retry Strategy (Backoff, Attempts).\n4. Failed job UI.\n5. Scheduler (Cron).',
    variables: [
      {
        name: 'library',
        description: 'Queue Library',
        type: 'select',
        options: ['BullMQ (Redis)', 'Bee-Queue', 'Agenda', 'Kue'],
        required: true,
      },
      {
        name: 'queueName',
        description: 'Default Queue Name',
        type: 'string',
        defaultValue: 'default',
        required: false,
      },
    ],
  },
  {
    title: 'Message Queue (RabbitMQ/Kafka)',
    description: 'Producer and Consumer for event streaming.',
    category: 'Backend Performance',
    tags: ['amqp', 'kafka', 'messaging', 'events'],
    content:
      'Build a Messaging Wrapper.\n\n**Core Features:**\n1. Connection Management to {{broker}}.\n2. Producer (Publish) function with acks.\n3. Consumer (Subscribe) worker.\n4. Dead Letter Queue (DLQ) configuration.\n5. Message serialization (JSON/Protobuf).',
    variables: [
      {
        name: 'broker',
        description: 'Message Broker',
        type: 'select',
        options: ['RabbitMQ', 'Kafka', 'Redis Streams', 'ActiveMQ'],
        required: true,
      },
    ],
  },
  {
    title: 'Caching Layer (Redis/Memcached)',
    description: 'Generic caching wrapper for database queries.',
    category: 'Backend Performance',
    tags: ['cache', 'redis', 'memcached', 'speed'],
    content:
      'Create a Caching Service.\n\n**Core Features:**\n1. `get(key)` and `set(key, value, ttl)` methods.\n2. Store connection to {{engine}}.\n3. Cache stampede protection (Lock).\n4. Serialization handling (JSON).\n5. Namespace support.',
    variables: [
      {
        name: 'engine',
        description: 'Caching Engine',
        type: 'select',
        options: ['Redis', 'Memcached', 'MemoryCache'],
        required: true,
      },
    ],
  },
  {
    title: 'Circuit Breaker',
    description: 'Hystrix-style circuit breaker for external APIs.',
    category: 'Backend Performance',
    tags: ['circuit-breaker', 'resilience', 'reliability', 'fault-tolerance'],
    content:
      'Create a Circuit Breaker.\n\n**Core Features:**\n1. State Machine (Closed, Open, Half-Open).\n2. Thresholds: Error Rate ({{errorPercent}}), Timeout.\n3. Fallback function when Open.\n4. Auto-recovery reset.\n5. Event emitter for state changes.',
    variables: [
      {
        name: 'errorPercent',
        description: 'Error threshold %',
        type: 'number',
        defaultValue: 50,
        required: true,
      },
    ],
  },
  {
    title: 'Connection Pool',
    description: 'Manage DB connections efficiently.',
    category: 'Backend Performance',
    tags: ['pool', 'connection', 'database', 'resources'],
    content:
      'Create a Connection Pool.\n\n**Core Features:**\n1. Max/Min size configuration.\n2. Acquire/Release logic ({{acquireStrategy}}).\n3. Connection validation on lease.\n4. Idle timeout handling.\n5. Logger for pool stats.',
    variables: [
      {
        name: 'acquireStrategy',
        description: 'Request Handling',
        type: 'select',
        options: ['FIFO', 'LIFO', 'Priority'],
        required: true,
      },
    ],
  },
  {
    title: 'WebSocket Gateway',
    description: 'Real-time hub for managing socket connections.',
    category: 'Realtime',
    tags: ['websocket', 'gateway', 'hub', 'socket.io'],
    content:
      'Create a WebSocket Gateway.\n\n**Core Features:**\n1. Connection management (Join/Leave Room).\n2. Broadcast to Room vs Broadcast to All.\n3. ACK (Acknowledgement) handling.\n4. Presence list (Who is in room).\n5. Rate limiting per connection.',
    variables: [
      {
        name: 'adapter',
        description: 'Scaling Adapter',
        type: 'select',
        options: ['In-Memory', 'Redis Adapter', 'MQTT'],
        required: true,
      },
    ],
  },
  {
    title: 'Event Sourcing Store',
    description: 'Save aggregates as event stream.',
    category: 'Backend Architecture',
    tags: ['event-sourcing', 'cqrs', 'event-store', 'audit'],
    content:
      'Create an Event Store.\n\n**Core Features:**\n1. `SaveEvent(aggregateId, type, data, version)`.\n2. `GetEvents(aggregateId)`.\n3. Optimistic Concurrency check (version conflict).\n4. Snapshotting support.\n5. Rebuild Aggregate logic.',
    variables: [
      {
        name: 'db',
        description: 'Storage Engine',
        type: 'select',
        options: ['PostgreSQL', 'MongoDB', 'EventStoreDB'],
        required: true,
      },
    ],
  },
  {
    title: 'CQRS (Command Query Responsibility Segregation)',
    description: 'Separate Read and Write models.',
    category: 'Backend Architecture',
    tags: ['cqrs', 'architecture', 'patterns', 'separation'],
    content:
      'Create a CQRS Structure.\n\n**Core Features:**\n1. Command Handler (Writes to DB).\n2. Query Handler (Reads from Denormalized View).\n3. Bus (Mediator) to route Commands/Queries.\n4. Event Handler to update View on Write.\n5. Validation (FluentValidation/{{validation}}).',
    variables: [
      {
        name: 'validation',
        description: 'Validation Library',
        type: 'select',
        options: ['Zod', 'Joi', 'Class-Validator'],
        required: true,
      },
    ],
  },
  {
    title: 'Domain-Driven Design (DDD) Structure',
    description: 'Modular architecture boilerplate.',
    category: 'Backend Architecture',
    tags: ['ddd', 'domain', 'clean-architecture', 'structure'],
    content:
      'Generate a DDD Monorepo.\n\n**Core Features:**\n1. Domain Layer (Entities, Value Objects).\n2. Application Layer (Services, Ports).\n3. Infrastructure Layer (Repo implementations, DB).\n4. Presentation Layer (Controllers/API).\n5. Event Bus between layers.',
    variables: [
      {
        name: 'style',
        description: 'Folder Structure Style',
        type: 'select',
        options: ['NestJS (Modules)', 'Standard (Layered)', 'Hexagonal'],
        required: true,
      },
    ],
  },
  {
    title: 'Micro-Frontend Module Federation',
    description: 'Module Federation config for React/Vue.',
    category: 'Frontend Architecture',
    tags: ['module-federation', 'micro-frontends', 'webpack', 'plugins'],
    content:
      'Set up Module Federation.\n\n**Core Features:**\n1. Config ModuleFederationPlugin ({{buildTool}}).\n2. Expose components from Remote.\n3. Consume remote components in Host.\n4. Shared dependencies (React, Utils).\n5. Error boundaries for failed fetch.',
    variables: [
      {
        name: 'buildTool',
        description: 'Bundler',
        type: 'select',
        options: ['Webpack 5', 'Rspack', 'TurboPack'],
        required: true,
      },
    ],
  },
  {
    title: 'State Machine (XState)',
    description: 'Visual definition and execution of state machines.',
    category: 'Frontend Architecture',
    tags: ['xstate', 'state-machine', 'visual', 'logic'],
    content:
      'Create an XState Machine.\n\n**Core Features:**\n1. Define States (Idle, Loading, Success, Error).\n2. Transitions with events.\n3. Actions and Services (async calls).\n4. Context propagation.\n5. Visualizer integration.',
    variables: [
      {
        name: 'type',
        description: 'Machine Type',
        type: 'select',
        options: [
          'Finite State Machine',
          'Parallel State Machine',
          'Hierarchical',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'SignalR / Socket Hub',
    description: 'Real-time hub for .NET or Node.',
    category: 'Realtime',
    tags: ['signalr', 'realtime', 'websocket', 'backend'],
    content:
      'Create a Real-time Hub.\n\n**Core Features:**\n1. Define Methods (SendChat, JoinGroup).\n2. Group management logic.\n3. Auth/Autorization check on Join.\n4. Connection ID mapping.\n5. Heartbeat keep-alive.',
    variables: [
      {
        name: 'framework',
        description: 'Platform',
        type: 'select',
        options: [
          'ASP.NET Core (SignalR)',
          'Node.js (Socket.io/WebSocket)',
          'Django (Channels)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Push Notification Service',
    description: 'Send FCM/APNS notifications.',
    category: 'Mobile & Notifications',
    tags: ['push', 'fcm', 'apns', 'notification'],
    content:
      'Create a Push Notification Service.\n\n**Core Features:**\n1. Register Device Token (Platform: iOS/Android).\n2. Send to Topic or Token.\n3. Payload formatting (APNS vs FCM).\n4. Collapse Key (Replace old notification).\n5. Priority handling.',
    variables: [
      {
        name: 'provider',
        description: 'Service Provider',
        type: 'select',
        options: [
          'Firebase Cloud Messaging',
          'Apple Push Notification Service',
          'OneSignal',
          'Amazon SNS',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Deep Linking (Universal Links / App Links)',
    description: 'Handle web-to-app navigation.',
    category: 'Mobile App Specific',
    tags: ['deeplink', 'universal-links', 'app-links', 'routing'],
    content:
      'Implement Deep Linking.\n\n**Core Features:**\n1. Configure App Site Association (apple-app-site-asset.json / assetlinks.json).\n2. Parse incoming link in App.\n3. Routing logic (Open specific screen).\n4. Fallback for Web.\n5. Dynamic Link handling (Deferred Deep Linking).',
    variables: [
      {
        name: 'platform',
        description: 'Target OS',
        type: 'select',
        options: ['iOS', 'Android', 'Flutter', 'React Native'],
        required: true,
      },
    ],
  },
  {
    title: 'Biometric Auth (TouchID / FaceID)',
    description: 'Native biometric security.',
    category: 'Mobile App Specific',
    tags: ['biometric', 'touchid', 'faceid', 'security'],
    content:
      'Create a Biometric Lock Screen.\n\n**Core Features:**\n1. Check availability.\n2. Prompt User (FaceID/Fingerprint).\n3. Fallback to PIN code.\n4. Encrypted storage of Key/Token.\n5. Error handling (User Cancel, Lockout).',
    variables: [
      {
        name: 'framework',
        description: 'Mobile Framework',
        type: 'select',
        options: [
          'React Native (expo-local-authentication)',
          'Flutter (local_auth)',
          'Native (LocalAuthentication)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'In-App Purchase (IAP)',
    description: 'Implement Subscriptions and Consumables.',
    category: 'Mobile App Specific',
    tags: ['iap', 'revenue', 'subscriptions', 'store'],
    content:
      'Build an IAP Module.\n\n**Core Features:**\n1. Fetch Products from Store.\n2. Purchase request flow.\n3. Receipt Validation (Backend {{backend}}).\n4. Subscription Status (Active, Expired).\n5. Restore Purchases.',
    variables: [
      {
        name: 'backend',
        description: 'Verification Backend',
        type: 'select',
        options: [
          'Node.js',
          'Google Play Billing API',
          'App Store Server Notifications',
        ],
        required: true,
      },
      {
        name: 'platform',
        description: 'Store Platform',
        type: 'select',
        options: ['Apple App Store', 'Google Play Store', 'Amazon'],
        required: true,
      },
    ],
  },
  {
    title: 'Background Task (Headless)',
    description: 'Run tasks in background while app closed.',
    category: 'Mobile App Specific',
    tags: ['background', 'task', 'headless', 'workmanager'],
    content:
      'Create a Background Task.\n\n**Core Features:**\n1. Periodic Task Trigger (Interval).\n2. Constraints (Network Available, Charging).\n3. Execution Logic (Fetch Data / Sync).\n4. Error handling.\n5. Foreground Service notification requirement (Android).',
    variables: [
      {
        name: 'framework',
        description: 'Framework',
        type: 'select',
        options: [
          'React Native (react-native-background-job)',
          'Flutter (workmanager)',
          'Native',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Location Tracking (Geolocation)',
    description: 'High-precision GPS tracking with batching.',
    category: 'Mobile App Specific',
    tags: ['gps', 'tracking', 'location', 'privacy'],
    content:
      'Create a Location Tracker.\n\n**Core Features:**\n1. Request Permission (Always When in Use).\n2. Start Location Updates (Filter: Accuracy > {{accuracy}}m).\n3. Batching updates to save battery.\n4. Geofencing logic.\n5. Path visualization on map.',
    variables: [
      {
        name: 'accuracy',
        description: 'Minimum Accuracy Meters',
        type: 'number',
        defaultValue: 10,
        required: true,
      },
    ],
  },
  {
    title: 'Scan to Pay (QR Code)',
    description: 'Camera scanner for payment QR codes.',
    category: 'Mobile App Specific',
    tags: ['qr', 'camera', 'payment', 'scan'],
    content:
      'Create a Payment QR Scanner.\n\n**Core Features:**\n1. Camera View ({{cameraLib}}).\n2. QR Detection.\n3. Parse URL/Cryptocode.\n4. Open Payment App or API.\n5. Flashlight toggle.',
    variables: [
      {
        name: 'cameraLib',
        description: 'Vision Library',
        type: 'select',
        options: [
          'react-native-vision-camera',
          'mobile_scanner',
          'AVFoundation (Native)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'XSS Prevention (DOMSanitizer)',
    description: 'Safe HTML injection library wrapper.',
    category: 'Web Security',
    tags: ['xss', 'sanitization', 'security', 'html'],
    content:
      'Create a Sanitization Helper.\n\n**Core Features:**\n1. Input dirty HTML.\n2. {{sanitizer}} config (Allowed tags, attributes).\n3. Output clean HTML.\n4. Strip dangerous scripts/events.\n5. Server-side vs Client-side mode.',
    variables: [
      {
        name: 'sanitizer',
        description: 'Sanitization Library',
        type: 'select',
        options: ['DOMPurify', 'sanitize-html', 'js-xss'],
        required: true,
      },
    ],
  },
  {
    title: 'CSRF Token Manager',
    description: 'Double Submit Cookie pattern generator.',
    category: 'Web Security',
    tags: ['csrf', 'security', 'cookie', 'token'],
    content:
      'Create a CSRF Protection.\n\n**Core Features:**\n1. Generate Token per session.\n2. Set Double Submit Cookie.\n3. Verify Token in Headers on POST.\n4. Sync with JWT Token.\n5. Regenerate on login.',
    variables: [
      {
        name: 'strategy',
        description: 'Protection Strategy',
        type: 'select',
        options: [
          'Double Submit Cookie',
          'Sync Token Pattern',
          'CSRF Header (X-XSRF-Token)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Content Security Policy (CSP) Generator',
    description: 'Generate meta tags and header values.',
    category: 'Web Security',
    tags: ['csp', 'security', 'header', 'policy'],
    content:
      "Create a CSP Builder.\n\n**Core Features:**\n1. Select Directives (script-src, style-src, img-src).\n2. Sources list ('self', 'unsafe-inline', hostnames).\n3. Report-Only mode toggle.\n4. Generate Header string.\n5. HTML <meta> tag output.",
    variables: [
      {
        name: 'level',
        description: 'Security Level',
        type: 'select',
        options: ['Strict', 'Moderate', 'Lax'],
        required: true,
      },
    ],
  },
  {
    title: 'SQL Injection Preventer',
    description: 'Parameterized query builder visualizer.',
    category: 'Web Security',
    tags: ['sql-injection', 'security', 'query', 'database'],
    content:
      'Create a Secure Query Builder.\n\n**Core Features:**\n1. Visualize Safe (Parameterized) vs Unsafe (Concatenated) SQL.\n2. Input: Table, Where Clause.\n3. Output: Prepared Statement code.\n4. Explain how Injection is blocked.',
    variables: [
      {
        name: 'db',
        description: 'Database Type',
        type: 'select',
        options: ['MySQL', 'PostgreSQL', 'SQL Server'],
        required: true,
      },
    ],
  },
  {
    title: 'Encryption Key Manager',
    description: 'Rotate and manage secrets in backend.',
    category: 'Web Security',
    tags: ['encryption', 'keys', 'rotation', 'security'],
    content:
      'Create a Key Manager.\n\n**Core Features:**\n1. Encrypt with Key V1.\n2. Decrypt with Key V2 (Rotation).\n3. Storage in KMS (AWS/HSM/Local).\n4. Access logging.\n5. Revocation mechanism.',
    variables: [
      {
        name: 'algorithm',
        description: 'Encryption Algo',
        type: 'select',
        options: ['AES-256-GCM', 'ChaCha20-Poly1305', 'RSA-OAEP'],
        required: true,
      },
    ],
  },
  {
    title: 'GitHub Actions Workflow (CI/CD)',
    description: 'Build, Test, Deploy automation.',
    category: 'Dev Ops',
    tags: ['github-actions', 'ci-cd', 'yaml', 'automation'],
    content:
      'Create a GitHub Action Workflow.\n\n**Core Features:**\n1. Trigger on Push/PR.\n2. Checkout code.\n3. Setup {{lang}}.\n4. Run Tests (Jest/PyTest).\n5. Build Docker image.\n6. Deploy to {{provider}}.',
    variables: [
      {
        name: 'provider',
        description: 'Deployment Target',
        type: 'select',
        options: ['AWS S3/EC2', 'Vercel', 'Heroku', 'Docker Hub'],
        required: true,
      },
      {
        name: 'lang',
        description: 'Runtime Language',
        type: 'select',
        options: ['Node', 'Python', 'Go', 'Java'],
        required: true,
      },
    ],
  },
  {
    title: 'GitLab CI Pipeline (.gitlab-ci.yml)',
    description: 'Multi-stage pipelines for GitLab.',
    category: 'Dev Ops',
    tags: ['gitlab', 'ci-cd', 'yaml', 'pipeline'],
    content:
      'Create a GitLab CI Pipeline.\n\n**Core Features:**\n1. Define Stages (Build, Test, Deploy).\n2. Cache node_modules/venv.\n3. Docker Image definition.\n4. Script execution.\n5. Artifacts.',
    variables: [
      {
        name: 'image',
        description: 'Docker Runner Image',
        type: 'string',
        defaultValue: 'node:latest',
        required: true,
      },
    ],
  },
  {
    title: 'Azure Dev Ops Pipeline',
    description: 'YAML for Azure Pipelines.',
    category: 'Dev Ops',
    tags: ['azure', 'Dev Ops', 'yaml', 'build'],
    content:
      'Create an Azure Pipeline.\n\n**Core Features:**\n1. Triggers (branches, paths).\n2. Pool (Windows vs Linux).\n3. Variables.\n4. Jobs and Steps.\n5. Deployment to Azure App Service.',
    variables: [
      {
        name: 'pool',
        description: 'Agent Pool',
        type: 'select',
        options: ['Azure Pipelines', 'Self-Hosted', 'VMSS'],
        required: true,
      },
    ],
  },
  {
    title: 'CircleCI Config',
    description: 'Orbs and workflows config.',
    category: 'Dev Ops',
    tags: ['circleci', 'ci-cd', 'yaml', 'orbs'],
    content:
      'Create a CircleCI Config.\n\n**Core Features:**\n1. Version: 2.1.\n2. Workflows.\n3. Reusable commands.\n4. Docker layer caching.\n5. Filters (Branch).\n6. Contexts (API Keys).',
    variables: [
      {
        name: 'language',
        description: 'Language',
        type: 'select',
        options: ['Node', 'Python', 'Go', 'Docker'],
        required: true,
      },
    ],
  },
  {
    title: 'ArgoCD Application (GitOps)',
    description: 'Kubernetes Continuous Deployment.',
    category: 'Dev Ops',
    tags: ['argocd', 'gitops', 'kubernetes', 'yaml'],
    content:
      'Create an ArgoCD Application.\n\n**Core Features:**\n1. Project.\n2. Source (Git Repository).\n3. Destination (Cluster/ Namespace).\n4. Sync Policy (Auto vs Manual).\n5. Sync Waves.',
    variables: [
      {
        name: 'cluster',
        description: 'Target Cluster Name',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Docker Compose Production',
    description: 'Multi-container production setup.',
    category: 'Dev Ops',
    tags: ['docker', 'compose', 'production', 'volumes'],
    content:
      'Create a Production Compose.\n\n**Core Features:**\n1. Services: App, DB, Redis, Nginx Proxy.\n2. Networks (Backend only).\n3. Volumes (Persistence).\n4. Healthchecks.\n5. Restart Policy (Always).\n6. Secrets (Swarm) or Envs.',
    variables: [
      {
        name: 'proxy',
        description: 'Reverse Proxy',
        type: 'select',
        options: ['Nginx', 'Traefik', 'Caddy'],
        required: true,
      },
    ],
  },
  {
    title: 'Terraform AWS Module',
    description: 'Reusable Terraform components.',
    category: 'Infrastructure as Code',
    tags: ['terraform', 'aws', 'iac', 'reusable'],
    content:
      'Create a Terraform Module.\n\n**Resource:** {{resourceType}}.\n**Core Features:**\n1. inputs.tf (Variables).\n2. main.tf (Resource logic with VPC/Subnet lookups).\n3. outputs.tf (IDs, IPs).\n4. Auto-scaling configuration.',
    variables: [
      {
        name: 'resourceType',
        description: 'AWS Resource',
        type: 'select',
        options: [
          'EC2 Instance',
          'RDS Database',
          'S3 Bucket',
          'Lambda Function',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Ansible Galaxy Role',
    description: 'Packaged Ansible automation logic.',
    category: 'Infrastructure as Code',
    tags: ['ansible', 'galaxy', 'automation', 'roles'],
    content:
      'Create an Ansible Role.\n\n**Core Features:**\n1. Tasks in tasks/main.yml.\n2. Handlers in handlers/main.yml.\n3. Defaults in defaults/main.yml.\n4. Templates (Jinja2).\n5. File structure (files/ templates/ vars/).',
    variables: [
      {
        name: 'os',
        description: 'Target OS',
        type: 'select',
        options: ['Ubuntu', 'CentOS', 'Windows'],
        required: true,
      },
    ],
  },
  {
    title: 'Cloudflare Worker (Edge)',
    description: 'Serverless functions at the edge.',
    category: 'Edge Computing',
    tags: ['cloudflare', 'workers', 'edge', 'javascript'],
    content:
      'Create a Cloudflare Worker.\n\n**Core Features:**\n1. Fetch event (Request/Response).\n2. Routing logic (Path matching).\n3. Fetch origin (with cache headers).\n4. Modify Response (HTML injection).\n5. KV Storage access.',
    variables: [
      {
        name: 'binding',
        description: 'Data Binding',
        type: 'select',
        options: ['KV (Store)', 'R2 (S3)', 'D1 (SQL)', 'Durable Objects'],
        required: true,
      },
    ],
  },
  {
    title: 'Deno Deploy Script',
    description: 'Deployment workflow for Deno projects.',
    category: 'Edge Computing',
    tags: ['deno', 'deploy', 'javascript', 'edge'],
    content:
      'Create a Deno Deploy.\n\n**Target:** {{platform}}.\n**Core Features:**\n1. `deno.json` configuration.\n2. Import map support.\n3. Permissions flags (--allow-net).\n4. Test command.\n5. Build/Optimize steps.',
    variables: [
      {
        name: 'platform',
        description: 'Host Platform',
        type: 'select',
        options: ['Deno Deploy', 'Vercel', 'Netlify', 'Docker'],
        required: true,
      },
    ],
  },
  {
    title: 'CLI (Command Line Interface)',
    description: 'Professional CLI with Help and Flags.',
    category: 'Developer Tools',
    tags: ['cli', 'commander', 'yargs', 'node', 'go'],
    content:
      'Create a CLI Tool.\n\n**Core Features:**\n1. Commander/Clap parser.\n2. Sub-commands (init, build, deploy).\n3. Global flags (--verbose, --config).\n4. Interactive prompts ({{prompter}}).\n5. Colorful output (Chalk/Colorette).',
    variables: [
      {
        name: 'prompter',
        description: 'Input Prompt Library',
        type: 'select',
        options: ['Inquirer.js', 'Enquirer', 'Cliggy', 'BubbleTea'],
        required: true,
      },
    ],
  },
  {
    title: 'VS Code Extension: Web View',
    description: 'VS Code extension using Webview panel.',
    category: 'Developer Tools',
    tags: ['vscode', 'extension', 'webview', 'ui'],
    content:
      'Create a VS Code Webview Extension.\n\n**Core Features:**\n1. Command to open panel.\n2. Communication (PostMessage) between extension.ts and webview.ts.\n3. React/Vue app inside webview.\n4. Persistence (Context.globalState).\n5. Loading states.',
    variables: [
      {
        name: 'framework',
        description: 'Webview UI Library',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Linter Plugin (ESLint Custom)',
    description: 'Custom rule definition for ESLint.',
    category: 'Developer Tools',
    tags: ['eslint', 'plugin', 'ast', 'rules'],
    content:
      'Create an ESLint Plugin.\n\n**Core Features:**\n1. Rule definition (meta: type, docs, fixable).\n2. AST Visitor (Traverse nodes).\n3. Report Logic (Identifier name check).\n4. Auto-fixer (Fixer function).\n5. Tests (RuleTester).',
    variables: [
      {
        name: 'ruleName',
        description: 'Name of the new rule',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Bundler Plugin (Vite/Rollup)',
    description: 'Transform assets during build.',
    category: 'Developer Tools',
    tags: ['vite', 'rollup', 'plugin', 'build'],
    content:
      'Create a Bundler Plugin.\n\n**Core Features:**\n1. Name (Virtual Module resolution).\n2. Transform hook (Load ID, transform code).\n3. Generate bundle hook.\n4. Output file manipulation.\n5. Integration with {{bundler}}.',
    variables: [
      {
        name: 'bundler',
        description: 'Target Bundler',
        type: 'select',
        options: ['Vite', 'Rollup', 'Webpack'],
        required: true,
      },
    ],
  },
  {
    title: 'Monorepo (Nx / Turborepo)',
    description: 'Setup for multi-package repository.',
    category: 'Developer Tools',
    tags: ['monorepo', 'nx', 'turbo', 'workspace'],
    content:
      'Create a Monorepo.\n\n**Tool:** {{tool}}.\n**Core Features:**\n1. Workspace configuration (Apps, Libs).\n2. Shared dependencies.\n3. Pipeline for commands (Build, Test - depends on Build).\n4. Output caching.\n5. Generate new app/library.',
    variables: [
      {
        name: 'tool',
        description: 'Monorepo Manager',
        type: 'select',
        options: ['Nx', 'Turborepo', 'Lerna', 'Yarn Workspaces'],
        required: true,
      },
    ],
  },
  {
    title: 'Design System (Tokens + Components)',
    description: 'Centralized design tokens and Storybook.',
    category: 'Frontend Architecture',
    tags: ['design-system', 'storybook', 'css-in-js', 'tokens'],
    content:
      'Build a Design System.\n\n**Core Features:**\n1. Design Tokens (SDTF/JSON) for colors/spacing.\n2. Component Library (React/Vue).\n3. Storybook integration.\n4. Export CSS/SCSS variables.\n5. Documentation site ({{docGen}}).',
    variables: [
      {
        name: 'docGen',
        description: 'Documentation Generator',
        type: 'select',
        options: ['Storybook Docs', 'Styleguidist', 'Docz'],
        required: true,
      },
      {
        name: 'style',
        description: 'CSS Approach',
        type: 'select',
        options: ['Tailwind', 'CSS Modules', 'Styled Components', 'Emotion'],
        required: true,
      },
    ],
  },
  {
    title: 'A11y (Accessibility) Linter',
    description: 'Automated check for a11y violations.',
    category: 'Web Accessibility',
    tags: ['a11y', 'axe', 'wcag', 'audit'],
    content:
      'Create an A11y Linter.\n\n**Core Features:**\n1. Scanning engine ({{scanner}}).\n2. Detect issues: Contrast, Alt text, ARIA attributes, Heading order.\n3. Severity levels (Critical, Serious, Moderate).\n4. Highlight issues on screen overlay.\n5. Generate Report (JSON/HTML).',
    variables: [
      {
        name: 'scanner',
        description: 'Accessibility Engine',
        type: 'select',
        options: ['Axe Core', 'Lighthouse', 'Pa11y'],
        required: true,
      },
      {
        name: 'standard',
        description: 'Compliance Standard',
        type: 'select',
        options: ['WCAG 2.1 AA', 'WCAG 2.1 AAA', 'WCAG 2.0'],
        required: true,
      },
    ],
  },
  {
    title: 'Focus Trap (Modal Accessibility)',
    description: 'Trap keyboard focus within dialogs.',
    category: 'Web Accessibility',
    tags: ['focus-trap', 'a11y', 'modal', 'keyboard'],
    content:
      'Create a Focus Trap Component.\n\n**Core Features:**\n1. Capture initial active element.\n2. Listen for Tab/Shift+Tab.\n3. Loop focus inside container.\n4. Trap deactivation (Escape key/Click Outside).\n5. Restore focus on close.',
    variables: [
      {
        name: 'library',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Vanilla'],
        required: true,
      },
    ],
  },
  {
    title: 'Data Grid (Advanced)',
    description: 'Virtualized, sortable, editable grid.',
    category: 'UI Components',
    tags: ['grid', 'table', 'virtualized', 'performance'],
    content:
      'Create an Advanced Data Grid.\n\n**Core Features:**\n1. Row Virtualization (Handle 100k rows).\n2. Sorting and Filtering.\n3. Column Resizing/Reordering.\n4. Cell Editing.\n5. Tree data structure (Expand/Collapse).',
    variables: [
      {
        name: 'library',
        description: 'Grid Library',
        type: 'select',
        options: ['TanStack Table', 'React-Window', 'AG Grid', 'Adazzle'],
        required: true,
      },
    ],
  },
  {
    title: 'PDF Viewer with Annotation',
    description: 'View PDF and add Text/Draw annotations.',
    category: 'Documents',
    tags: ['pdf', 'viewer', 'annotation', 'canvas'],
    content:
      'Create a PDF Annotator.\n\n**Core Features:**\n1. PDF Render ({{renderer}}).\n2. Canvas overlay for drawing.\n3. Text Highlight tool.\n4. Sticky Note tool.\n5. Save annotations as XFDF/JSON.',
    variables: [
      {
        name: 'renderer',
        description: 'PDF Rendering Lib',
        type: 'select',
        options: ['PDF.js', 'PDFium (Wasm)', 'MuPDF'],
        required: true,
      },
    ],
  },
  {
    title: 'Markdown Editor (WYSIWYG)',
    description: 'Visual editor with Markdown export.',
    category: 'Editor',
    tags: ['markdown', 'editor', 'wysiwyg', 'prosemirror'],
    content:
      'Create a Markdown Editor.\n\n**Core Features:**\n1. ProseMirror / TipTap engine.\n2. Toolbar (Bold, H1, H2, Link, Image).\n3. Live Markdown preview.\n4. Shortcode support.\n5. Export Markdown.',
    variables: [
      {
        name: 'engine',
        description: 'Editor Engine',
        type: 'select',
        options: ['TipTap', 'Lexical', 'Slate', 'ToastUI'],
        required: true,
      },
    ],
  },
  {
    title: 'Video Player (Custom Controls)',
    description: 'Fully styled video player wrapper.',
    category: 'Media',
    tags: ['video', 'hls', 'player', 'controls'],
    content:
      'Create a Custom Video Player.\n\n**Core Features:**\n1. Support VOD and Live Stream (HLS/DASH via {{streamLib}}).\n2. Custom Controls (Play/Pause, Volume, Fullscreen).\n3. Theater Mode.\n4. Playback Rate control (0.5x, 2x).\n5. Posters/Thumbnails.',
    variables: [
      {
        name: 'streamLib',
        description: 'Streaming Library',
        type: 'select',
        options: ['Hls.js', 'Dash.js', 'Video.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Audio Waveform Editor',
    description: 'Visualize and cut audio in browser.',
    category: 'Media',
    tags: ['audio', 'waveform', 'editor', 'dsp'],
    content:
      'Create a Waveform Editor.\n\n**Core Features:**\n1. Draw waveform (Peaks.js/{{engine}}).\n2. Selection region (Click/Drag).\n3. Trim/Save selection.\n4. Zoom in/out.\n5. Color mapping (RMS, Peak).',
    variables: [
      {
        name: 'engine',
        description: 'Audio Engine',
        type: 'select',
        options: ['Peaks.js', 'WaveformJS', 'Web Audio API Canvas'],
        required: true,
      },
    ],
  },
  {
    title: 'Collaborative Cursor Provider',
    description: 'Show real-time cursors of other users.',
    category: 'Realtime',
    tags: ['cursors', 'collaboration', 'websocket', 'presence'],
    content:
      'Create a Cursor Provider.\n\n**Core Features:**\n1. Receive position updates via Websocket.\n2. Render cursor {{color}}.\n3. Show name tag near cursor.\n4. Interpolate movement (Smoothness).\n5. Cleanup on disconnect.',
    variables: [
      {
        name: 'lib',
        description: 'Provider Library',
        type: 'select',
        options: ['Y-WebSocket Provider', 'Liveblocks', 'Yjs'],
        required: true,
      },
    ],
  },
  {
    title: 'Liveblocks Presence',
    description: 'Add avatars and presence to Liveblocks.',
    category: 'Realtime',
    tags: ['liveblocks', 'collaboration', 'presence', 'react'],
    content:
      "Implement Liveblocks Presence.\n\n**Core Features:**\n1. `usePresence` hook.\n2. Display avatars of users in room.\n3. Display 'You are typing' indicator.\n4. Cursor data (x, y).\n5. Connect {{framework}} components.",
    variables: [
      {
        name: 'framework',
        description: 'UI Framework',
        type: 'select',
        options: ['React', 'Vue', 'Svelte'],
        required: true,
      },
    ],
  },
  {
    title: 'Hetzner Server Manager',
    description: 'Deploy/Manage servers on Hetzner Cloud.',
    category: 'Dev Ops',
    tags: ['hetzner', 'cloud', 'api', 'management'],
    content:
      'Create a Hetzner CLI/Dashboard.\n\n**Core Features:**\n1. SSH Key management.\n2. Create Server (Select {{serverType}}).\n3. Create Floating IPs.\n4. Power On/Off.\n5. ISO rescue system.',
    variables: [
      {
        name: 'serverType',
        description: 'Server Plan',
        type: 'select',
        options: ['CPX11', 'CCX22', 'EX41', 'CX21'],
        required: true,
      },
    ],
  },
  {
    title: 'DigitalOcean Droplet Manager',
    description: 'Manage Droplets via API.',
    category: 'Dev Ops',
    tags: ['digitalocean', 'cloud', 'api', 'droplet'],
    content:
      'Create a DO Manager.\n\n**Core Features:**\n1. List Droplets.\n2. Create Droplet (Size/Region/Image).\n3. Take Snapshot.\n4. Enable Monitoring.\n5. List Project Resources.',
    variables: [
      {
        name: 'region',
        description: 'Initial Region',
        type: 'select',
        options: ['NYC1', 'SFO2', 'AMS3', 'FRA1'],
        required: true,
      },
    ],
  },
  {
    title: 'AWS S3 File Manager',
    description: 'Web-based file browser for S3 buckets.',
    category: 'Dev Ops',
    tags: ['s3', 'aws', 'storage', 'manager'],
    content:
      'Create an S3 Manager.\n\n**Core Features:**\n1. List Buckets.\n2. List Objects ({{pattern}} prefix).\n3. Upload File (Multipart upload for large files).\n4. Generate Presigned URL (TTL).\n5. Delete object.',
    variables: [
      {
        name: 'pattern',
        description: 'Default prefix filter',
        type: 'string',
        defaultValue: 'uploads/',
        required: false,
      },
    ],
  },
  {
    title: 'Google Cloud Scheduler Job',
    description: 'Create scheduled Cloud Run/Functions jobs.',
    category: 'Dev Ops',
    tags: ['gcp', 'scheduler', 'cron', 'cloud-run'],
    content:
      'Create a GCP Scheduler.\n\n**Core Features:**\n1. Target Service (Cloud Run, Pub/Sub, HTTP).\n2. Schedule (Cron format).\n3. Timezone.\n4. Retry Config.\n5. Output gcloud CLI commands.',
    variables: [
      {
        name: 'target',
        description: 'Target Service',
        type: 'select',
        options: ['Cloud Run', 'App Engine', 'HTTP URL'],
        required: true,
      },
    ],
  },
  {
    title: 'Raspberry Pi (Raspi) Controller',
    description: 'Web interface to control GPIO pins.',
    category: 'IoT (Internet of Things)',
    tags: ['raspberrypi', 'gpio', 'webiopi', 'relay'],
    content:
      'Create a Raspi GPIO Control.\n\n**Core Features:**\n1. Server ({{backend}}) handling GPIO.\n2. Web UI to toggle pins (On/Off).\n3. PWM Slider (Brightness/Speed).\n4. Input Read (Button press).\n5. SSH command execution button.',
    variables: [
      {
        name: 'backend',
        description: 'GPIO Library/Server',
        type: 'select',
        options: ['RPi.GPIO (Python/Flask)', 'WiringPI (Node)'],
        required: true,
      },
    ],
  },
  {
    title: 'ESP32/Arduino Firmware Updater',
    description: 'OTA (Over The Air) update server.',
    category: 'IoT',
    tags: ['esp32', 'arduino', 'ota', 'firmware'],
    content:
      'Create an OTA Updater.\n\n**Core Features:**\n1. Upload Firmware binary (.bin) to server.\n2. Generate Version JSON.\n3. Device check-for-update logic.\n4. Web Server serving binary.\n5. Authentication (Device Key).',
    variables: [
      {
        name: 'protocol',
        description: 'Update Protocol',
        type: 'select',
        options: ['HTTP Download', 'MQTT Stream', 'Custom Protocol'],
        required: true,
      },
    ],
  },
  {
    title: 'Home Assistant (HASS) Add-On',
    description: 'Custom integration for Home Assistant.',
    category: 'IoT',
    tags: ['home-assistant', 'integration', 'iot', 'smart-home'],
    content:
      'Create a HASS Add-On.\n\n**Type:** {{type}}.\n**Core Features:**\n1. Configuration (config.yaml).\n2. Manifest.json.\n3. Service Handler (call service).\n4. State Updater.\n5. Discovery (MQTT/API).',
    variables: [
      {
        name: 'type',
        description: 'Add-on Architecture',
        type: 'select',
        options: ['Python (Custom Component)', 'Bash Script', 'Docker Compose'],
        required: true,
      },
    ],
  },
  {
    title: 'Zigbee2MQTT Coordinator',
    description: 'Manage Zigbee devices via Web UI.',
    category: 'IoT',
    tags: ['zigbee', 'mqtt', 'coordinator', 'iot'],
    content:
      'Create a Zigbee Dashboard.\n\n**Core Features:**\n1. List connected devices (Bulbs, Sensors).\n2. Permit Join (Add new device).\n3. Rename Devices.\n4. Touchlink (Bind/Unbind).\n5. Cluster commands (On/Off, Color, Brightness).',
    variables: [
      {
        name: 'adapter',
        description: 'Coordinator Hardware',
        type: 'select',
        options: ['Sonoff Zigbee Bridge', 'CC2531', 'ConBee II', 'Z-Stack'],
        required: true,
      },
    ],
  },
  {
    title: 'Log Aggregator (Graylog/ELK)',
    description: 'Dashboard for application logs.',
    category: 'Dev Ops',
    tags: ['logging', 'elk', 'graylog', 'dashboard'],
    content:
      'Create a Log Dashboard.\n\n**Source:** {{input}}.\n**Core Features:**\n1. Grep/Filter logs.\n2. Time range picker.\n3. Bar chart of log levels (Info, Warn, Error).\n4. Click line to inspect JSON payload.\n5. Live tail mode.',
    variables: [
      {
        name: 'input',
        description: 'Log Source',
        type: 'select',
        options: ['File Upload', 'Syslog Endpoint', 'Elasticsearch Query'],
        required: true,
      },
    ],
  },
  {
    title: 'Uptime Monitor (Heartbeat)',
    description: 'Check website availability continuously.',
    category: 'Monitoring',
    tags: ['uptime', 'monitoring', 'status', 'ping'],
    content:
      'Create an Uptime Monitor.\n\n**Core Features:**\n1. Add Endpoint (URL).\n2. Set Interval (Every {{interval}} mins).\n3. Check HTTP Status Code and Response Time.\n4. Record Downtime.\n5. Alert on failure (Email/Slack).',
    variables: [
      {
        name: 'interval',
        description: 'Check Interval in Minutes',
        type: 'number',
        defaultValue: 1,
        required: true,
      },
    ],
  },
  {
    title: 'Alert Manager (Prometheus)',
    description: 'Manage Prometheus alerting rules.',
    category: 'Monitoring',
    tags: ['prometheus', 'alertmanager', 'monitoring', 'alerts'],
    content:
      'Create an Alert Manager Config.\n\n**Core Features:**\n1. Route (Group by label).\n2. Inhibit rules (Silence alerts if parent is firing).\n3. Receiver (Email, Slack, PagerDuty).\n4. Silence management.\n5. Alert UI (Status Page).',
    variables: [
      {
        name: 'receiver',
        description: 'Notification Channel',
        type: 'select',
        options: ['Email', 'Slack', 'Webhook', 'PagerDuty'],
        required: true,
      },
    ],
  },
  {
    title: 'Dashboard Grafana Panel',
    description: 'Custom panel plugin for Grafana.',
    category: 'Monitoring',
    tags: ['grafana', 'panel', 'visualization', 'plugin'],
    content:
      'Create a Grafana Panel.\n\n**Core Features:**\n1. Data Query ({{datasource}}).\n2. Visualization (Heatmap, Status Dot).\n3. Options (Thresholds, Units).\n4. TypeScript/React implementation.\n5. JSON Editor.',
    variables: [
      {
        name: 'datasource',
        description: 'Data Source Type',
        type: 'select',
        options: ['Prometheus', 'InfluxDB', 'Graphite', 'MySQL'],
        required: true,
      },
    ],
  },
  {
    title: 'ETL Pipeline (Apache Airflow)',
    description: 'Directed Acyclic Graph (DAG) for data.',
    category: 'Data Engineering',
    tags: ['airflow', 'etl', 'dag', 'pipeline'],
    content:
      'Create an Airflow DAG.\n\n**Task:** {{task}}.\n**Core Features:**\n1. BashOperator / PythonOperator.\n2. Dependencies (set_upstream / set_downstream).\n3. Schedule (Cron).\n4. Retries / Timeout.\n5. XComs (Pass data between tasks).',
    variables: [
      {
        name: 'task',
        description: 'Task Description',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'Data Warehouse Schema (Star Schema)',
    description: 'Design dimensional modeling for BI.',
    category: 'Data Engineering',
    tags: ['data-warehouse', 'star-schema', 'bi', 'dimensional'],
    content:
      'Create a Star Schema.\n\n**Core Features:**\n1. Central Fact Table (Transactions).\n2. Dimension Tables (Customer, Product, Time, Store).\n3. Foreign Keys definitions.\n4. Surrogate Keys (ID).',
    variables: [
      {
        name: 'type',
        description: 'Schema Type',
        type: 'select',
        options: ['Star Schema', 'Snowflake Schema', 'Galaxy Schema'],
        required: true,
      },
    ],
  },
  {
    title: 'ETL Script (Pentaho/Kettle)',
    description: 'Spoon transformation logic.',
    category: 'Data Engineering',
    tags: ['pentaho', 'kettle', 'etl', 'transformation'],
    content:
      'Create an ETL Job.\n\n**Core Features:**\n1. Input step (CSV/SQL).\n2. Transformation (Join, Calculator, Filter).\n3. Database Lookup.\n4. Output Step (Load into {{target}}).\n5. Error handling (Log records).',
    variables: [
      {
        name: 'target',
        description: 'Destination DB',
        type: 'select',
        options: ['MySQL', 'PostgreSQL', 'Oracle', 'Excel'],
        required: true,
      },
    ],
  },
  {
    title: 'Apache Kafka Producer',
    description: 'Send events to Kafka topic.',
    category: 'Data Engineering',
    tags: ['kafka', 'producer', 'events', 'stream'],
    content:
      'Create a Kafka Producer.\n\n**Core Features:**\n1. Broker List.\n2. Topic Creation.\n3. Key/Value logic.\n4. Compression (Gzip/Snappy).\n5. Acknowledgment (All, Leader).',
    variables: [
      {
        name: 'compression',
        description: 'Compression Algorithm',
        type: 'select',
        options: ['none', 'gzip', 'snappy', 'lz4', 'zstd'],
        required: true,
      },
    ],
  },
  {
    title: 'Data Streaming (Flink)',
    description: 'Stateful computation on streams.',
    category: 'Data Engineering',
    tags: ['flink', 'streaming', 'analytics', 'realtime'],
    content:
      'Create a Flink Job.\n\n**Core Features:**\n1. Source (Kafka/Socket).\n2. Window Function (Tumbling, Sliding).\n3. Aggregation (Count, Sum).\n4. Sink (Database/CSV).\n5. State TTL.',
    variables: [
      {
        name: 'window',
        description: 'Window Type',
        type: 'select',
        options: ['Tumbling', 'Sliding', 'Session'],
        required: true,
      },
    ],
  },
  {
    title: 'Graph Visualization (D3 Force)',
    description: 'Interactive graph of nodes and edges.',
    category: 'Data Visualization',
    tags: ['d3', 'force-graph', 'network', 'visualization'],
    content:
      'Create a Force Directed Graph.\n\n**Core Features:**\n1. Load Nodes/Links JSON.\n2. D3 Force Simulation (Charge, Center, Collision).\n3. Zoom/Pan controls.\n4. Hover details.\n5. Search/Highlight nodes.',
    variables: [
      {
        name: 'lib',
        description: 'Visualization Lib',
        type: 'select',
        options: ['D3.js', 'Vis.js', 'Cytoscape.js'],
        required: true,
      },
    ],
  },
  {
    title: 'Mapbox GL Map',
    description: 'Custom vector map with GeoJSON.',
    category: 'Maps & Geo',
    tags: ['mapbox', 'gl', 'vector', 'map'],
    content:
      'Create a Mapbox GL Map.\n\n**Core Features:**\n1. Add Layer (Tileset or GeoJSON).\n2. Style Layer (Circle, Line, Fill).\n3. Markers/Pins.\n4. Popup on click.\n5. Geolocate User.',
    variables: [
      {
        name: 'style',
        description: 'Map Style URL',
        type: 'string',
        required: true,
      },
    ],
  },
  {
    title: 'OpenLayers Map',
    description: 'Web map with tile layers and features.',
    category: 'Maps & Geo',
    tags: ['openlayers', 'map', 'layers', 'vector'],
    content:
      'Create an OpenLayers Map.\n\n**Core Features:**\n1. View (Zoom, Center, Projection).\n2. Layer Group (OSM, Stamen).\n3. Vector Layer (GeoJSON features).\n4. Select Interaction (Click to Identify).\n5. Measure tool (Line length).',
    variables: [
      {
        name: 'projection',
        description: 'Map Projection',
        type: 'select',
        options: ['EPSG:3857 (Web Mercator)', 'EPSG:4326 (WGS84)'],
        required: true,
      },
    ],
  },
  {
    title: 'Leaflet Map with GeoJSON',
    description: 'Interactive map plugin.',
    category: 'Maps & Geo',
    tags: ['leaflet', 'geojson', 'map', 'plugin'],
    content:
      'Create a Leaflet Map Plugin.\n\n**Core Features:**\n1. Base Tile Layer (OSM, CartoDB).\n2. GeoJSON Layer ({{styleType}}).\n3. Clustering (Leaflet.markercluster).\n4. Draw Controls (Polygon, Line, Marker).\n5. Popup Template.',
    variables: [
      {
        name: 'styleType',
        description: 'Visual Style',
        type: 'select',
        options: ['Choropleth', 'Points of Interest', 'Heatmap'],
        required: true,
      },
    ],
  },
  {
    title: 'Three.js Text Geometry',
    description: 'Render 3D text in WebGL.',
    category: '3D Graphics',
    tags: ['three.js', 'text', '3d', 'font'],
    content:
      'Create a 3D Text Renderer.\n\n**Core Features:**\n1. Load Font (Typeface.json).\n2. TextGeometry ({{fontFile}}).\n3. Mesh Normal Material.\n4. Alignment (Center, Left).\n5. Extrusion settings.',
    variables: [
      {
        name: 'fontFile',
        description: 'Source Font',
        type: 'select',
        options: [
          'helvetiker_regular.typeface.json',
          'gentilis_bold.typeface.json',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Three.js Physics (Cannon.js)',
    description: 'Gravity and collision simulation.',
    category: '3D Graphics',
    tags: ['cannon.js', 'three.js', 'physics', 'simulation'],
    content:
      'Create a 3D Physics Scene.\n\n**Core Features:**\n1. Init Physics World (Cannon).\n2. Sync Mesh (Three.js) to Body (Cannon).\n3. Gravity and Materials (Bounciness).\n4. Step simulation.\n5. Raycaster for picking.',
    variables: [
      {
        name: 'library',
        description: 'Physics Lib',
        type: 'select',
        options: ['Cannon-es', 'Ammo.js', 'Oimo.js'],
        required: true,
      },
    ],
  },
  {
    title: 'WebGPU API Initialization',
    description: 'Setup next-gen graphics backend.',
    category: 'Web Graphics',
    tags: ['webgpu', 'wgsl', 'graphics', 'compute'],
    content:
      'Create a WebGPU Init.\n\n**Core Features:**\n1. Request Adapter.\n2. Create Device, Context, Queue.\n3. Shader Module (WGSL).\n4. Pipeline Setup.\n5. Draw Call.',
    variables: [
      {
        name: 'shader',
        description: 'Shader Type',
        type: 'select',
        options: ['Fragment + Vertex', 'Compute'],
        required: true,
      },
    ],
  },
  {
    title: 'Babylon.js VR Scene',
    description: 'VR WebXR experience.',
    category: '3D Graphics',
    tags: ['babylon.js', 'webxr', 'vr', 'cardboard'],
    content:
      'Create a Babylon VR Scene.\n\n**Core Features:**\n1. Enable WebXR Experience Helper.\n2. Create Environment.\n3. Scene Optimizer.\n4. Controller support (Grip, Trigger).\n5. Teleportation logic.',
    variables: [
      {
        name: 'experience',
        description: 'Device Type',
        type: 'select',
        options: ['VR (Oculus/Quest)', 'AR (Mobile)'],
        required: true,
      },
    ],
  },
  {
    title: 'Canvas 2D Particle System',
    description: 'High-performance particle effects.',
    category: 'Web Graphics',
    tags: ['canvas', 'particles', '2d', 'animation'],
    content:
      'Create a Particle System.\n\n**Core Features:**\n1. Class Particle (x, y, vx, vy, life, color).\n2. Update Loop (Physics: Gravity, Friction).\n3. Draw Loop ({{renderMode}}).\n4. Pooling (Recycle dead particles).\n5. Mouse Interaction (Repulse/Attract).',
    variables: [
      {
        name: 'renderMode',
        description: 'Drawing Style',
        type: 'select',
        options: ['Circles', 'Squares', 'Images (Textures)'],
        required: true,
      },
    ],
  },
  {
    title: 'SVG Filter Builder',
    description: 'Create visual effects (Blur, Drop Shadow).',
    category: 'Web Graphics',
    tags: ['svg', 'filters', 'visuals', 'effect'],
    content:
      'Create an SVG Filter.\n\n**Filter Type:** {{filterType}}.\n**Core Features:**\n1. Filter Primitive (feGaussianBlur, feColorMatrix).\n2. Input/Source Graphic.\n3. Result definition.\n4. UI Controls (Blur Amount, Opacity).\n5. Apply to DOM element (SVG filter URL).',
    variables: [
      {
        name: 'filterType',
        description: 'Effect Type',
        type: 'select',
        options: ['Glow', 'Turbulence', 'Drop Shadow', 'Blur'],
        required: true,
      },
    ],
  },
  {
    title: 'React Native Paper',
    description: 'Paper-like UI for React Native.',
    category: 'Mobile UI',
    tags: ['react-native', 'paper', 'material', 'ui'],
    content:
      'Create a Paper-based UI.\n\n**Components:**\n1. Paper (Surface) elevation.\n2. Typography (Text, Heading).\n3. Button (Contained, Outlined).\n4. TextInput.\n5. Card with Image.',
    variables: [
      {
        name: 'darkMode',
        description: 'Theme Mode',
        type: 'boolean',
        defaultValue: false,
        required: false,
      },
    ],
  },
  {
    title: 'Flutter UI (Cupertino)',
    description: 'iOS style widgets in Flutter.',
    category: 'Mobile UI',
    tags: ['flutter', 'cupertino', 'ios', 'ui'],
    content:
      'Create a Cupertino Page.\n\n**Widgets:**\n1. CupertinoPageScaffold.\n2. CupertinoNavigationBar.\n3. CupertinoTextField.\n4. CupertinoSlidingSegmentedControl.\n5. IOS-style transitions.',
    variables: [
      {
        name: 'theme',
        description: 'Color Scheme',
        type: 'select',
        options: ['Primary Color', 'System Grey', 'System Orange'],
        required: true,
      },
    ],
  },
  {
    title: 'Android Jetpack Compose',
    description: 'Modern declarative Android UI.',
    category: 'Mobile UI',
    tags: ['android', 'jetpack-compose', 'kotlin', 'ui'],
    content:
      'Create a Jetpack Compose UI.\n\n**Composables:**\n1. Surface/Card.\n2. LazyColumn for list.\n3. TopAppBar.\n4. Button/TextFields.\n5. Material You (Theme) implementation.',
    variables: [
      {
        name: 'version',
        description: 'Compose BOM Version',
        type: 'string',
        defaultValue: '2023.10.01',
        required: false,
      },
    ],
  },
  {
    title: 'iOS SwiftUI (List)',
    description: 'SwiftUI list implementation.',
    category: 'Mobile UI',
    tags: ['swiftui', 'ios', 'list', 'ui'],
    content:
      'Create a SwiftUI List.\n\n**Features:**\n1. List struct data.\n2. ForEach loop.\n3. List row (HStack/Image/Text).\n4. NavigationLink to Detail.\n5. Pull to Refresh.',
    variables: [
      {
        name: 'style',
        description: 'List Style',
        type: 'select',
        options: ['Inset Grouped', 'Plain', 'Inset'],
        required: true,
      },
    ],
  },
  {
    title: 'Electron Main Process',
    description: 'Main.js setup with IPC.',
    category: 'Desktop Architecture',
    tags: ['electron', 'ipc', 'main', 'process'],
    content:
      'Create an Electron Main Process.\n\n**Features:**\n1. app.whenReady (Create Window).\n2. IPC Handlers ({{ipcLibrary}}).\n3. BrowserWindow creation (Vibrancy, Traffic Light Position).\n4. Auto-update (Electron Updater).\n5. Menu creation.',
    variables: [
      {
        name: 'ipcLibrary',
        description: 'IPC Library',
        type: 'select',
        options: ['Electron IPC Main', 'ipc-main', 'custom'],
        required: true,
      },
    ],
  },
  {
    title: 'Tauri Command (Rust)',
    description: 'Rust backend for Tauri desktop app.',
    category: 'Desktop Architecture',
    tags: ['tauri', 'rust', 'command', 'invoke'],
    content:
      'Create a Tauri Command.\n\n**Features:**\n1. #[tauri::command] attribute.\n2. JSON Arguments and Response.\n3. System calls (fs, shell).\n4. Error handling.\n5. Logging.',
    variables: [
      {
        name: 'sysCall',
        description: 'System Operation',
        type: 'select',
        options: ['File Read', 'Shell Execute', 'Dialog', 'Notification'],
        required: true,
      },
    ],
  },
  {
    title: 'Slack Bot (Bolt SDK)',
    description: 'Bot for Slack workspace.',
    category: 'Bots',
    tags: ['slack', 'bot', 'workflow', 'sdk'],
    content:
      'Create a Slack App.\n\n**Features:**\n1. App Manifest (Bolt for JS).\n2. Events (App Home Opened, Message).\n3. Commands (Slash command /hello).\n4. Modals (Views).\n5. Interaction (Block Kit).',
    variables: [
      {
        name: 'trigger',
        description: 'Bot Trigger',
        type: 'select',
        options: ['Mention', 'Slash Command', 'Shortcut'],
        required: true,
      },
    ],
  },
  {
    title: 'Discord Bot (Discord.js)',
    description: 'Bot for Discord server.',
    category: 'Bots',
    tags: ['discord', 'bot', 'gateway', 'voice'],
    content:
      'Create a Discord Bot.\n\n**Features:**\n1. Intents (Guilds, GuildMessages, MessageContent).\n2. Prefix command (!ping).\n3. Slash command data.\n4. Embed builder (Color, Fields).\n5. Voice Connection (Play audio).',
    variables: [
      {
        name: 'gateway',
        description: 'Gateway Version',
        type: 'select',
        options: ['GatewayIntentBits v10', 'GatewayIntentBits v14'],
        required: false,
      },
    ],
  },
  {
    title: 'Telegram Bot (Aiogram)',
    description: 'Bot for Telegram.',
    category: 'Bots',
    tags: ['telegram', 'bot', 'long-polling', 'async'],
    content:
      'Create a Telegram Bot.\n\n**Features:**\n1. {{lib}} Dispatcher.\n2. /start command with Web App button.\n3. /help command.\n4. Inline query (Search results).\n5. Payment handling (Stars).',
    variables: [
      {
        name: 'lib',
        description: 'Python Library',
        type: 'select',
        options: ['Aiogram (3.x)', 'Python-Telegram-Bot', 'PyTelegramBotAPI'],
        required: true,
      },
    ],
  },
  {
    title: 'WhatsApp Business API',
    description: 'Cloud API integration.',
    category: 'Bots',
    tags: ['whatsapp', 'cloud-api', 'business', 'chat'],
    content:
      'Create a WhatsApp Sender.\n\n**Core Features:**\n1. Setup API Client.\n2. Send Text/Template message.\n3. Webhook listener (Inbound messages).\n4. Media upload.\n5. Verify signature (Meta security).',
    variables: [
      {
        name: 'type',
        description: 'Access Type',
        type: 'select',
        options: ['Cloud API', 'On-Premises API (Provider)'],
        required: true,
      },
    ],
  },
  {
    title: 'Twilio Flex (Contact Center)',
    description: 'Programmable contact center UI.',
    category: 'VoIP & Communications',
    tags: ['twilio', 'flex', 'contact-center', 'ui'],
    content:
      'Create a Twilio Flex UI.\n\n**Core Features:**\n1. CRM plugin (Open/Update Task attributes).\n2. Agent status (Available, Busy).\n3. Canvas Task (Custom UI in iframe).\n4. Voice SDK (Conference).\n5. Chat Channel.',
    variables: [
      {
        name: 'channel',
        description: 'Media Channel',
        type: 'select',
        options: ['Voice', 'Chat', 'Sms', 'Email'],
        required: true,
      },
    ],
  },
  {
    title: 'Asterisk/FreeSWITCH Integration',
    description: 'VoIP dialing application.',
    category: 'VoIP & Communications',
    tags: ['asterisk', 'freeswitch', 'voip', 'pbx'],
    content:
      'Create a Softphone.\n\n**Core Features:**\n1. SIP Registration ({{ua}}).\n2. Keypad (DTMF tones).\n3. Audio Output (Ringer, Voice).\n4. Hold/Transfer buttons.\n5. Mute/Hold.',
    variables: [
      {
        name: 'ua',
        description: 'SIP User Agent',
        type: 'select',
        options: ['JsSIP', 'SIP.js', 'JSSIP'],
        required: true,
      },
    ],
  },
  {
    title: 'Jitsi Meet Integration',
    description: 'Embed Jitsi video conference.',
    category: 'VoIP & Communications',
    tags: ['jitsi', 'video', 'meeting', 'embed'],
    content:
      'Create a Jitsi Embed.\n\n**Core Features:**\n1. Room Name generator.\n2. Domain configuration ({{domain}}).\n3. Config options (Start with audio off, Mute everyone).\n4. User info (Avatar, Name).\n5. API buttons (Kick, Mute - requires JWT auth).',
    variables: [
      {
        name: 'domain',
        description: 'Jitsi Domain',
        type: 'string',
        defaultValue: 'meet.jit.si',
        required: true,
      },
    ],
  },
  {
    title: 'Web Speech API (Speech to Text)',
    description: 'Real-time transcription.',
    category: 'Audio & Speech',
    tags: ['web-speech', 'stt', 'recognition', 'api'],
    content:
      'Create a Speech-to-Text App.\n\n**Core Features:**\n1. SpeechRecognition object.\n2. Continuous recording.\n3. Interim Results (Stream text as you speak).\n4. Final Results.\n5. {{language}} selection.',
    variables: [
      {
        name: 'language',
        description: 'Recognition Language',
        type: 'string',
        defaultValue: 'en-US',
        required: true,
      },
    ],
  },
  {
    title: 'MediaPipe Hands',
    description: 'Hand tracking and gestures.',
    category: 'AI / Vision',
    tags: ['mediapipe', 'vision', 'hands', 'gesture'],
    content:
      'Create a Hand Tracker.\n\n**Core Features:**\n1. Camera Input (Webcam).\n2. Hands Solution (Landmarks).\n3. Gesture Recognizer (Pinch, Point, Thumbs Up).\n4. Canvas Overlay (Draw skeleton).\n5. Mouse emulation (Click with pinch).',
    variables: [
      {
        name: 'maxHands',
        description: 'Max number of hands to track',
        type: 'number',
        defaultValue: 2,
        required: true,
      },
    ],
  },
  {
    title: 'OpenCV.js Face Detect',
    description: 'Detect faces using OpenCV WASM.',
    category: 'AI / Vision',
    tags: ['opencv', 'wasm', 'face', 'detection'],
    content:
      'Create an OpenCV Face Detector.\n\n**Core Features:**\n1. Load Haar Cascade XML ({{cascade}}).\n2. Video stream processing.\n3. Draw rectangles around faces.\n4. Confidence threshold.\n5. Performance optimization.',
    variables: [
      {
        name: 'cascade',
        description: 'Haar Cascade Type',
        type: 'select',
        options: ['Frontal Face', 'Eye', 'Full Body'],
        required: true,
      },
    ],
  },
  {
    title: 'Pose Estimation (MoveNet)',
    description: 'Body posture detection.',
    category: 'AI / Vision',
    tags: ['movenet', 'pose', 'skeleton', 'fitness'],
    content:
      'Create a Pose Estimator.\n\n**Core Features:**\n1. Camera stream.\n2. PoseNet (MoveNet Lightning/Thunder).\n3. Keypoints overlay (Nose, Eyes, Shoulders...).\n4. Confidence score.\n5. Calculate angles (Elbow bend, Squat depth).',
    variables: [
      {
        name: 'model',
        description: 'Model Complexity',
        type: 'select',
        options: ['Lightning (Faster)', 'Thunder (Accurate)', 'Posenet'],
        required: true,
      },
    ],
  },
  {
    title: 'Object Detection (CocoSsd)',
    description: 'Detect 80 object types.',
    category: 'AI / Vision',
    tags: ['coco-ssd', 'object', 'tensorflow', 'wasm'],
    content:
      'Create an Object Detector.\n\n**Core Features:**\n1. Load COCO-SSD Model.\n2. Camera stream.\n3. Detect objects (Person, Cup, Car...).\n4. Draw boxes with labels.\n5. Count objects.',
    variables: [
      {
        name: 'threshold',
        description: 'Confidence Threshold',
        type: 'number',
        defaultValue: 0.5,
        required: true,
      },
    ],
  },
  {
    title: 'Color Picker (Chrome DevTools style)',
    description: 'Advanced color picker with palettes.',
    category: 'UI Tools',
    tags: ['color', 'picker', 'eyedropper', 'hsl'],
    content:
      'Create an Advanced Color Picker.\n\n**Core Features:**\n1. HSL, RGB, Hex inputs.\n2. Alpha/Opacity slider.\n3. Color Palette (Swatches).\n4. Contrast check (WCAG).\n5. History (Last used).',
    variables: [
      {
        name: 'format',
        description: 'Initial Format',
        type: 'select',
        options: ['HEX', 'RGB', 'HSL'],
        required: true,
      },
    ],
  },
  {
    title: 'Form Builder (JSON Schema)',
    description: 'Generate forms from JSON schema.',
    category: 'Forms',
    tags: ['jsonschema', 'form', 'react-jsonschema-form', 'dynamic'],
    content:
      'Create a Dynamic Form Builder.\n\n**Core Features:**\n1. Input JSON Schema.\n2. UI Schema (Field width/Order).\n3. Custom Widgets (Rating, Date).\n4. Validation.\n5. Submit handler.',
    variables: [
      {
        name: 'engine',
        description: 'Form Library',
        type: 'select',
        options: ['react-jsonschema-form', 'formily', 'mui-rjsf'],
        required: true,
      },
    ],
  },
  {
    title: 'Wizard (Multi-step Form)',
    description: 'Linear progression form.',
    category: 'Forms',
    tags: ['wizard', 'multi-step', 'form', 'stepper'],
    content:
      'Create a Wizard Form.\n\n**Steps:**\n1. Personal Info.\n2. Address.\n3. Review.\n\n**Features:**\n1. Navigation (Back/Next).\n2. State persistence (Keep data on back).\n3. Progress bar.\n4. Validation per step.',
    variables: [
      {
        name: 'orientation',
        description: 'Layout Orientation',
        type: 'select',
        options: ['Horizontal', 'Vertical'],
        required: true,
      },
    ],
  },
  {
    title: 'Draggable Grid (GridStack)',
    description: 'Dashboard with movable widgets.',
    category: 'UI Tools',
    tags: ['gridstack', 'drag-drop', 'dashboard', 'widgets'],
    content:
      'Create a Draggable Dashboard.\n\n**Core Features:**\n1. GridStack init ({{library}}).\n2. Widgets (Item ID, X, Y, W, H).\n3. Resize handle.\n4. Drag handle.\n5. Persistent Layout (Save/Load JSON).',
    variables: [
      {
        name: 'library',
        description: 'Grid Library',
        type: 'select',
        options: ['GridStack', 'Muuri', 'React-Grid-Layout', 'React-Draggable'],
        required: true,
      },
    ],
  },
  {
    title: 'Virtual Scroll (Infinite List)',
    description: 'Render only visible items for performance.',
    category: 'Performance',
    tags: ['virtual-scroll', 'infinite', 'list', 'performance'],
    content:
      'Create a Virtual Scroller.\n\n**Core Features:**\n1. Item Height (Fixed or Dynamic).\n2. Buffer size (Extra DOM nodes).\n3. Scroll event listener.\n4. Visible index calculation.\n5. Loading indicator at bottom.',
    variables: [
      {
        name: 'library',
        description: 'Virtualization Lib',
        type: 'select',
        options: ['TanStack Virtual', 'react-window', 'react-virtualized'],
        required: true,
      },
    ],
  },
  {
    title: 'Skeleton Loading',
    description: 'Placeholder shimmer effect while loading.',
    category: 'UI Tools',
    tags: ['skeleton', 'loading', 'shimmer', 'placeholder'],
    content:
      'Create a Skeleton Loader.\n\n**Core Features:**\n1. Animated gradient shimmer.\n2. Pulse effect ({{effect}}).\n3. Avatar placeholder.\n4. Text line placeholders.\n5. Card placeholder.',
    variables: [
      {
        name: 'effect',
        description: 'Animation Type',
        type: 'select',
        options: ['Wave', 'Pulse', 'None'],
        required: true,
      },
    ],
  },
  {
    title: 'Date Range Picker',
    description: 'Select start and end dates.',
    category: 'Forms',
    tags: ['date', 'range', 'picker', 'calendar'],
    content:
      'Create a Date Range Picker.\n\n**Core Features:**\n1. Two inputs (Start, End) or inline calendar.\n2. Presets (Today, Last 7 Days, Last Month).\n3. Validation (Start < End).\n4. Highlighting.',
    variables: [
      {
        name: 'locale',
        description: 'Date Locale',
        type: 'string',
        defaultValue: 'en-US',
        required: false,
      },
    ],
  },
  {
    title: 'Select with Multi-Select',
    description: 'Dropdown with tags/chips.',
    category: 'Forms',
    tags: ['select', 'multi', 'dropdown', 'combobox'],
    content:
      'Create a Multi-Select Component.\n\n**Core Features:**\n1. Single/Multi toggle.\n2. Dropdown list with checkboxes.\n3. Selected items as Chips/Tags.\n4. Search/Filter inside dropdown.\n5. Create new option.',
    variables: [
      {
        name: 'style',
        description: 'Visual Style',
        type: 'select',
        options: ['Standard', 'Outline', 'Filled', 'Underline'],
        required: true,
      },
    ],
  },
  {
    title: 'Toggle Switch (iOS Style)',
    description: 'On/Off switch component.',
    category: 'Forms',
    tags: ['toggle', 'switch', 'ios', 'ui'],
    content:
      'Create a Toggle Switch.\n\n**Core Features:**\n1. Checked/Unchecked state.\n2. Disabled state.\n3. Animation ({{anim}}).\n4. Accessible (A11y) support.\n5. Label association.',
    variables: [
      {
        name: 'anim',
        description: 'Transition Style',
        type: 'select',
        options: ['iOS', 'Material', 'Flat', 'Neumorphic'],
        required: true,
      },
    ],
  },
  {
    title: 'Autocomplete (Mention/Emoji)',
    description: 'Text input with suggestions popup.',
    category: 'Forms',
    tags: ['autocomplete', 'mention', 'trigger', 'text'],
    content:
      "Create an Autocomplete Input.\n\n**Triggers:**\n1. '@' for Users.\n2. '#' for Channels.\n3. Emoji picker.\n\n**Features:**\n1. Match detection ({{regex}}).\n2. Popup position.\n3. Keyboard navigation (Up/Down/Enter).\n4. Insert text at cursor.",
    variables: [
      {
        name: 'regex',
        description: 'Trigger Pattern',
        type: 'string',
        defaultValue: '@',
        required: true,
      },
    ],
  },
  {
    title: 'Markdown to PDF (Puppeteer)',
    description: 'Convert MD docs to PDF using headless browser.',
    category: 'Documents',
    tags: ['puppeteer', 'pdf', 'markdown', 'convert'],
    content:
      'Create a Markdown to PDF Service.\n\n**Core Features:**\n1. MD to HTML conversion ({{mdLib}}).\n2. Load HTML in Puppeteer.\n3. Header/Footer pages.\n4. CSS injection for print styling.\n5. Save PDF.',
    variables: [
      {
        name: 'mdLib',
        description: 'Markdown Parser',
        type: 'select',
        options: ['Marked', 'Remarkable', 'Showdown', 'Markdown-It'],
        required: true,
      },
    ],
  },
  {
    title: 'QR Code Generator (Custom Logo)',
    description: 'Create QR with embedded logo.',
    category: 'Mobile & Tools',
    tags: ['qr', 'logo', 'generator', 'branding'],
    content:
      'Create a Custom QR Code.\n\n**Core Features:**\n1. QR Library ({{lib}}).\n2. Center Image (Logo).\n3. Error Correction Level ({{ecc}}).\n4. Size and Colors.\n5. Download SVG/PNG.',
    variables: [
      {
        name: 'lib',
        description: 'QR Library',
        type: 'select',
        options: ['QRious', 'qrcode', 'kjua'],
        required: true,
      },
      {
        name: 'ecc',
        description: 'Error Correction Level',
        type: 'select',
        options: ['L', 'M', 'Q', 'H'],
        required: true,
      },
    ],
  },
  {
    title: 'PDF Compressor',
    description: 'Reduce PDF file size.',
    category: 'Documents',
    tags: ['pdf', 'compression', 'optimize', 'tool'],
    content:
      'Create a PDF Compressor.\n\n**Core Features:**\n1. Upload PDF.\n2. Remove metadata.\n3. Downsample images ({{dpi}}).\n4. Subset fonts.\n5. Download optimized file.',
    variables: [
      {
        name: 'dpi',
        description: 'Target DPI for images',
        type: 'number',
        defaultValue: 150,
        required: true,
      },
    ],
  },
  {
    title: 'OCR (Tesseract.js)',
    description: 'Extract text from images.',
    category: 'Documents',
    tags: ['ocr', 'tesseract', 'image', 'text'],
    content:
      'Create an OCR Tool.\n\n**Core Features:**\n1. Worker creation ({{worker}}).\n2. Image upload.\n3. Language selection ({{lang}}).\n4. Progress bar.\n5. Text Result Output.',
    variables: [
      {
        name: 'worker',
        description: 'Worker Type',
        type: 'select',
        options: [
          'Tesseract.js',
          'Tesseract.JS Worker',
          'Tesseract Async (WASM)',
        ],
        required: true,
      },
      {
        name: 'lang',
        description: 'OCR Language Data',
        type: 'string',
        defaultValue: 'eng',
        required: true,
      },
    ],
  },
  {
    title: 'Spreadsheet (Excel-like Grid)',
    description: 'Editable cell matrix.',
    category: 'UI Components',
    tags: ['spreadsheet', 'grid', 'excel', 'table'],
    content:
      'Create a Spreadsheet Component.\n\n**Core Features:**\n1. Cell addressing (A1, B2).\n2. Copy/Paste buffer.\n3. Formula evaluation (Simple Sum/Avg).\n4. Cell selection (Drag).\n5. Resizable rows/cols.',
    variables: [
      {
        name: 'engine',
        description: 'Formula Engine',
        type: 'select',
        options: ['HyperFormula', 'Handsontable Formula', 'Simple'],
        required: true,
      },
    ],
  },
  {
    title: 'Code Diff Viewer',
    description: 'Compare two text strings visually.',
    category: 'Developer Tools',
    tags: ['diff', 'compare', 'mermaid', 'diff-view'],
    content:
      'Create a Diff Viewer.\n\n**Core Features:**\n1. Input Original and New strings.\n2. Algorithm ({{algo}}).\n3. Side-by-side or Unified view.\n4. Color coding (Red: Removed, Green: Added).\n5. Line numbers.',
    variables: [
      {
        name: 'algo',
        description: 'Diff Algorithm',
        type: 'select',
        options: ['Myers Diff', 'Patience Diff', 'Line-by-line'],
        required: true,
      },
    ],
  },
  {
    title: 'API Client Generator',
    description: 'OpenAPI/Swagger to Axios wrapper.',
    category: 'Developer Tools',
    tags: ['swagger', 'api', 'client', 'axios'],
    content:
      'Generate an API Client.\n\n**Core Features:**\n1. Parse Swagger Spec ({{version}}).\n2. Generate TypeScript Interfaces.\n3. Generate API Service Class.\n4. Request/Response Interceptors.\n5. Tag grouping.',
    variables: [
      {
        name: 'version',
        description: 'Spec Version',
        type: 'select',
        options: ['OpenAPI 2.0', 'OpenAPI 3.0', 'Swagger 2.0'],
        required: true,
      },
    ],
  },
  {
    title: 'Storybook Knobs',
    description: 'Interactive controls for Storybook stories.',
    category: 'Developer Tools',
    tags: ['storybook', 'knobs', 'ui', 'controls'],
    content:
      'Create a Storybook Story.\n\n**Features:**\n1. ArgsObject definition.\n2. Decorator ({{library}}).\n3. Types: text, boolean, color, number.\n4. Action arg (simulate event).\n5. Playground mode.',
    variables: [
      {
        name: 'library',
        description: 'Storybook Version',
        type: 'select',
        options: [
          'Storybook 8 (React)',
          'Storybook 8 (Vue)',
          'Storybook 6 (React)',
        ],
        required: true,
      },
    ],
  },
  {
    title: 'Micro-frontend Container',
    description: 'Shell for loading micro-frontends.',
    category: 'Frontend Architecture',
    tags: ['single-spa', 'qiankun', 'micro-frontends', 'container'],
    content:
      'Create a Container.\n\n**Core Features:**\n1. Layout (Header, Sidebar, Content).\n2. Import map (Qiankun/Single-SPA).\n3. App Registry (Map names to fetch functions).\n4. Global state sharing (Propy/CustomEventBus).\n5. Error boundary.',
    variables: [
      {
        name: 'framework',
        description: 'Container Framework',
        type: 'select',
        options: ['Single-SPA', 'Qiankun', 'Module Federation (Host)'],
        required: true,
      },
    ],
  },
];

export default promptTemplates;
