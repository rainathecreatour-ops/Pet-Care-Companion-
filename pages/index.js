import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, FileText, Plus, Trash2, Check, AlertCircle, Download, Info } from 'lucide-react';

export default function PetCareApp() {
  const [isLicensed, setIsLicensed] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [petProfile, setPetProfile] = useState(null);
  const [careLog, setCareLog] = useState([]);
  const [dietLog, setDietLog] = useState([]);
  const [sleepLog, setSleepLog] = useState([]);
  const [checklistLog, setChecklistLog] = useState([]);
  
  const [profileForm, setProfileForm] = useState({
    name: '', type: '', age: '', breed: '', firstTime: ''
  });
  
  const [careActivity, setCareActivity] = useState('');
  const [dietMeal, setDietMeal] = useState('');
  const [dietAmount, setDietAmount] = useState('');
  const [sleepHours, setSleepHours] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('petCareAppLicense');
    if (stored && validateLicense(stored)) {
      setIsLicensed(true);
      setLicenseKey(stored);
      loadData();
    }
  }, []);

  const validateLicense = (key) => {
    const pattern = /^[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}-[A-Z0-9]{8}$/;
    return pattern.test(key);
  };

  const handleLicenseSubmit = () => {
    const trimmedKey = licenseKey.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    if (trimmedKey.length === 32) {
      const formattedKey = trimmedKey.match(/.{1,8}/g).join('-');
      localStorage.setItem('petCareAppLicense', formattedKey);
      setIsLicensed(true);
      setLicenseError('');
    } else {
      setLicenseError('License key must be 32 alphanumeric characters (dashes optional)');
    }
  };

  const loadData = () => {
    const profile = localStorage.getItem('petProfile');
    const care = localStorage.getItem('careLog');
    const diet = localStorage.getItem('dietLog');
    const sleep = localStorage.getItem('sleepLog');
    const checklist = localStorage.getItem('checklistLog');
    
    if (profile) setPetProfile(JSON.parse(profile));
    if (care) setCareLog(JSON.parse(care));
    if (diet) setDietLog(JSON.parse(diet));
    if (sleep) setSleepLog(JSON.parse(sleep));
    if (checklist) setChecklistLog(JSON.parse(checklist));
  };

  const saveData = () => {
    if (petProfile) localStorage.setItem('petProfile', JSON.stringify(petProfile));
    localStorage.setItem('careLog', JSON.stringify(careLog));
    localStorage.setItem('dietLog', JSON.stringify(dietLog));
    localStorage.setItem('sleepLog', JSON.stringify(sleepLog));
    localStorage.setItem('checklistLog', JSON.stringify(checklistLog));
  };

  useEffect(() => {
    if (isLicensed) saveData();
  }, [petProfile, careLog, dietLog, sleepLog, checklistLog, isLicensed]);

  const petTypes = {
    ferret: {
      name: 'Ferret',
      emoji: '🦡',
      facts: 'Ferrets are members of the Mustelidae family (weasels, otters) and are obligate carnivores. They sleep 14-16 hours daily but are highly active when awake. They are social, intelligent, and playful but require significant care and commitment. Illegal in some areas (California, Hawaii, NYC).',
      dos: [
        'Provide multi-level cage minimum 24"L x 24"W x 36"H',
        'Feed high-protein (30-35%) high-fat (15-20%) ferret food',
        'Allow supervised out-of-cage time 2-4 hours daily',
        'Ferret-proof your home completely - they fit anywhere their head fits',
        'Annual vaccinations: canine distemper and rabies (required in most states)',
        'Monitor for 30 minutes post-vaccination (6% reaction rate)',
        'Provide litter box training starting young',
        'Schedule annual vet exams, bi-annual after age 5'
      ],
      donts: [
        'Never feed fruits, vegetables, grains - they cannot digest them',
        'Never use latex rubber toys - intestinal blockages are common',
        'Never leave unsupervised with children or other pets',
        'Never expose to temperatures above 80°F - causes heat stroke',
        'Never bathe more than monthly - strips skin oils, increases odor',
        'Never give human antibiotics (penicillin, erythromycin) - fatal',
        'Never skip ferret-proofing - they escape easily'
      ],
      diet: 'High-quality ferret or kitten kibble (30-35% protein, 15-20% fat). Food available 24/7 due to high metabolism. Occasional treats: cooked meat, meat baby food. NO fruits, vegetables, grains, or dairy.',
      habitat: 'Wire cage minimum 24"x24"x36" with solid floors, ramps, hammocks. Room temperature under 80°F. Dark sleeping enclosure. Litter box in corner. Exercise area for daily playtime.',
      enclosure: 'Large multi-level cage, solid flooring, hammocks/slings, litter box, ferret-safe litter, food/water bowls, cloth bedding, tunnels, safe toys (hard plastic/metal)',
      vet: 'Exotic veterinarian. Canine distemper vaccine (8, 12, 16 weeks, then annual), Rabies (12 weeks, then annual), monthly heartworm/flea prevention, annual dental cleanings',
      lifespan: '7-10 years',
      temperature: '100-104°F normal body temperature',
      supplies: ['High-protein ferret food', 'Multi-level cage', 'Hammock', 'Litter box', 'Safe toys', 'Food bowls', 'Nail clippers', 'Ferret shampoo', 'Carrier']
    },
    chinchilla: {
      name: 'Chinchilla',
      emoji: '🐭',
      facts: 'Chinchillas are from the Andes Mountains and adapted to cool, dry climates. They have 60 hairs per follicle (softest fur of any animal) and exhibit "fur slip" when grabbed. Crepuscular (active dawn/dusk). Can live 10-20 years with proper care.',
      dos: [
        'Provide dust baths 2-3 times weekly using chinchilla-specific dust',
        'Maintain temperature 60-70°F, never exceed 80°F',
        'Offer unlimited grass hay (timothy, meadow, orchard)',
        'Feed 1-2 tablespoons quality chinchilla pellets daily',
        'Provide multi-level cage minimum 24"W x 24"D x 24"H',
        'Give chew toys for continuously growing teeth',
        'Allow 1-2 hours daily supervised playtime',
        'Annual exotic vet exams including dental checks'
      ],
      donts: [
        'Never bathe in water - fur takes too long to dry, causes skin issues',
        'Never expose to temperatures above 80°F - heat stroke is fatal',
        'Never feed nuts, seeds, dried fruit - too high in sugar/fat',
        'Never use cedar or pine bedding - toxic',
        'Never house with rabbits - Pasteurella bacteria is fatal to chinchillas',
        'Never give human antibiotics - many are toxic to rodents',
        'Never leave dust bath in cage - causes eye irritation'
      ],
      diet: 'Unlimited grass hay (timothy, orchard), 1-2 tablespoons chinchilla pellets (18% fiber minimum, 10% protein), limited treats (plain Cheerios, rose hips, hibiscus). Fresh water daily.',
      habitat: 'Multi-level wire cage 24"x24"x24" minimum with solid floors. Paper bedding or fleece. Temperature 60-70°F, humidity 30-50%. Dust bath container, hiding spots, ledges for jumping.',
      enclosure: 'Large multi-level cage, solid floors, hiding houses, ledges, dust bath container, chinchilla dust, hay rack, water bottle, food bowl, chew toys (apple, willow wood)',
      vet: 'Exotic veterinarian. Annual exam, fecal testing, dental checks. No vaccinations needed. Monitor for heat stroke, dental disease, fur problems, respiratory issues.',
      lifespan: '10-20 years',
      temperature: '98-100°F normal body temperature',
      supplies: ['Grass hay', 'Chinchilla pellets', 'Dust bath container', 'Chinchilla dust', 'Multi-level cage', 'Chew toys', 'Hiding house', 'Water bottle', 'Fleece bedding']
    },
    rat: {
      name: 'Rat (Pet Rat)',
      emoji: '🐀',
      facts: 'Rats are highly intelligent, social rodents that can learn tricks and solve puzzles. They MUST live in same-sex pairs or groups - solitary rats become depressed. They are clean, affectionate, and bond strongly with owners. Lifespan is unfortunately short at 2-3 years.',
      dos: [
        'House in same-sex pairs or groups minimum',
        'Provide multi-level cage 24"L x 12"W x 12"H per rat',
        'Offer daily handling and interaction (very social)',
        'Feed rat-specific pellets plus fresh vegetables',
        'Provide hammocks, tunnels, and climbing opportunities',
        'Spot clean daily, full cage clean weekly',
        'Give puzzle toys and training for mental stimulation',
        'Trim nails monthly'
      ],
      donts: [
        'Never house alone - they need rat companionship',
        'Never use wire floors - causes bumblefoot',
        'Never feed citrus to male rats - causes kidney damage',
        'Never expose to cedar/pine - toxic fumes',
        'Never feed chocolate, caffeine, raw beans, green potato',
        'Never skip cage cleaning - ammonia from urine causes respiratory issues',
        'Never use small aquariums - poor ventilation'
      ],
      diet: 'Quality rat pellets (lab blocks), fresh vegetables daily (leafy greens, broccoli, carrots), occasional fruits, cooked eggs, whole grain pasta. Avoid citrus for males. Fresh water daily.',
      habitat: 'Multi-level wire cage minimum 2 cubic feet per rat. Solid or covered wire floors. Hammocks, ropes, branches. Temperature 65-75°F. Good ventilation essential.',
      enclosure: 'Large wire cage, hammocks, hiding spots, ropes/branches, litter box (optional), food bowl, water bottle, chew toys, cardboard boxes',
      vet: 'Exotic veterinarian. No routine vaccinations. Annual wellness check. Watch for respiratory infections (common), tumors, bumblefoot.',
      lifespan: '2-3 years',
      temperature: '97.6-100.6°F normal body temperature',
      supplies: ['Rat pellets', 'Fresh vegetables', 'Large cage', 'Hammocks', 'Bedding', 'Water bottle', 'Food bowl', 'Chew toys', 'Hiding spots']
    },
    gerbil: {
      name: 'Gerbil',
      emoji: '🐹',
      facts: 'Gerbils are desert-adapted rodents that drink very little water and rarely need cage cleaning (minimal odor). They MUST live in same-sex pairs - solitary gerbils become stressed. Active and curious, they love digging and burrowing. Native to Mongolia/China deserts.',
      dos: [
        'House in bonded same-sex pairs',
        'Provide deep bedding (6-8 inches) for burrowing',
        'Offer 10-gallon aquarium or larger tank',
        'Feed gerbil-specific food mix',
        'Provide chew toys for continuously growing teeth',
        'Give dust bath 1-2 times weekly',
        'Handle gently by scooping, never grab tail',
        'Spot clean bedding, full change every 2-3 weeks'
      ],
      donts: [
        'Never house alone - causes severe stress',
        'Never grab or pull the tail - causes serious injury/loss',
        'Never use wire cages - they chew through them',
        'Never use cedar/pine bedding - respiratory toxins',
        'Never overfeed sunflower seeds - obesity',
        'Never house different species together',
        'Never use small wheels - back injuries'
      ],
      diet: 'Gerbil-specific seed mix or pellets, small amounts fresh vegetables (carrot, broccoli), occasional fruits. Limited sunflower seeds (high fat). Fresh water daily despite low consumption.',
      habitat: '10+ gallon glass aquarium with secure mesh lid. 6-8 inches paper bedding for burrowing. Hideouts, tunnels. Temperature 65-75°F. Low humidity.',
      enclosure: '10-gallon+ tank, secure lid, 6-8" bedding, hideouts, tunnels, exercise wheel (8"+ diameter), chew toys, sand bath container, water bottle, food dish',
      vet: 'Exotic veterinarian. Annual health check. No routine vaccinations. Watch for respiratory issues, overgrown teeth, tumors.',
      lifespan: '2-4 years',
      temperature: '98-102°F normal body temperature',
      supplies: ['Gerbil food mix', 'Tank (10+ gal)', 'Deep bedding', 'Hideouts', 'Exercise wheel', 'Sand bath', 'Chew toys', 'Water bottle']
    },
    mouse: {
      name: 'Mouse (Pet Mouse)',
      emoji: '🐭',
      facts: 'Mice are highly social, intelligent rodents. Females MUST live in groups (3+), males can fight so often housed alone or in neutered pairs. They are nocturnal, playful, and surprisingly affectionate. They have a strong odor that requires frequent cleaning.',
      dos: [
        'House female mice in groups of 3+',
        'Provide 10+ gallon tank with secure mesh lid',
        'Offer 1-2" bedding, spot clean every 2-3 days',
        'Feed mouse-specific pellets plus seeds',
        'Provide exercise wheel (5"+ diameter)',
        'Give variety of toys and climbing structures',
        'Handle gently and regularly for socialization',
        'Trim nails if overgrown'
      ],
      donts: [
        'Never house adult males together - they fight',
        'Never use wire floors - foot injuries',
        'Never feed large amounts of fatty foods',
        'Never skip frequent cleaning - strong urine smell',
        'Never use small aquariums - poor ventilation',
        'Never grab by tail tip - can break off',
        'Never expose to cedar/pine bedding'
      ],
      diet: 'Mouse pellets, small amounts seeds (not too many), fresh vegetables (leafy greens, carrots, peas), occasional fruits, cooked egg. Fresh water daily.',
      habitat: '10+ gallon tank with mesh lid. 1-2" paper bedding changed frequently. Multiple hideouts. Temperature 65-75°F. Good ventilation.',
      enclosure: 'Tank (10+ gal), mesh lid, bedding, multiple hides, exercise wheel, climbing toys, tunnels, nest material, water bottle, food dish',
      vet: 'Exotic veterinarian. No routine vaccinations. Annual wellness check. Watch for respiratory infections, tumors, mites.',
      lifespan: '1.5-3 years',
      temperature: '97.7-100.8°F normal body temperature',
      supplies: ['Mouse pellets', 'Tank', 'Bedding', 'Exercise wheel', 'Hideouts', 'Toys', 'Water bottle', 'Nesting material']
    },
    hedgehog: {
      name: 'Hedgehog (African Pygmy)',
      emoji: '🦔',
      facts: 'Hedgehogs are insectivores (not rodents) that are solitary and nocturnal. They have 5,000-7,000 quills that stand up when scared (called "balling up"). Require consistent handling to stay friendly. Illegal in some states (CA, GA, PA, HI, NYC).',
      dos: [
        'House individually - they are solitary animals',
        'Maintain temperature 72-80°F (use heat lamp if needed)',
        'Provide solid-bottom cage minimum 4 square feet',
        'Feed high-quality cat food or hedgehog-specific food',
        'Offer daily handling for 30+ minutes when awake',
        'Give weekly foot baths to remove stuck bedding',
        'Trim nails monthly',
        'Provide exercise wheel (12"+ diameter, solid surface)'
      ],
      donts: [
        'Never house together - they fight',
        'Never use wire wheels - broken legs common',
        'Never let temperature drop below 65°F - can trigger hibernation attempt (fatal)',
        'Never use cedar/pine bedding - respiratory issues',
        'Never feed grapes, raisins, avocado - toxic',
        'Never skip nail trims - causes mobility issues',
        'Never use aquariums without top - they climb well'
      ],
      diet: 'High-quality cat food (chicken-based, 30%+ protein, 20% fat), mealworms, crickets, cooked chicken. Limited fruits/vegetables. Fresh water daily.',
      habitat: 'Solid-bottom cage 4+ square feet. Fleece bedding or paper bedding. Temperature 72-80°F maintained. Hiding spots, tunnels. Exercise wheel essential.',
      enclosure: 'Large cage (4+ sq ft), solid wheel (12"+), hiding spots, fleece liners, food bowl, water bottle, toys, heat source (if needed)',
      vet: 'Exotic veterinarian. Annual exam. No routine vaccinations. Watch for obesity, mites, respiratory infections, tumors.',
      lifespan: '3-6 years',
      temperature: '95-98°F normal body temperature',
      supplies: ['Cat food/hedgehog food', 'Large cage', 'Solid wheel', 'Fleece bedding', 'Hideout', 'Insects', 'Nail clippers', 'Heat lamp']
    },
    beardeddragon: {
      name: 'Bearded Dragon',
      emoji: '🦎',
      facts: 'Bearded dragons are diurnal, omnivorous lizards from Australia. They are docile, easy to handle, and can recognize owners. They require UVB lighting and specific temperatures. "Arm waving" and "head bobbing" are normal communication behaviors.',
      dos: [
        'Provide 40+ gallon tank for adults (75+ gallons recommended)',
        'Maintain basking spot 95-105°F, cool side 75-85°F',
        'Provide UVB lighting 10-12 hours daily (replace every 6 months)',
        'Feed variety: insects (juveniles), vegetables (adults)',
        'Dust insects with calcium + D3 powder',
        'Offer daily baths in shallow warm water',
        'Handle regularly when warm and alert',
        'Monitor weight and body condition'
      ],
      donts: [
        'Never feed wild-caught insects - parasites',
        'Never feed fireflies - highly toxic, fatal',
        'Never use loose substrate for juveniles - impaction risk',
        'Never skip UVB lighting - causes metabolic bone disease',
        'Never cohabitate - they can be territorial',
        'Never handle during shed or when glass surfing (stressed)',
        'Never let temperature drop below 65°F at night'
      ],
      diet: 'Juveniles: 80% insects (crickets, dubia roaches, hornworms), 20% vegetables. Adults: 80% vegetables (collards, mustard greens, squash), 20% insects. Dust with calcium. Fresh water.',
      habitat: '40+ gallon tank (larger better). Basking spot with heat lamp (95-105°F), UVB tube light. Cool side 75-85°F. Branches, rocks, hides. Tile or paper substrate.',
      enclosure: '40+ gal tank, heat lamp, UVB light, thermometers (both ends), branches, rocks, hiding spots, food dishes, water dish, substrate (tile/paper)',
      vet: 'Exotic/reptile veterinarian. Annual exam, fecal parasite testing. No vaccinations. Watch for metabolic bone disease, parasites, respiratory infections.',
      lifespan: '8-12 years',
      temperature: 'Basking: 95-105°F, Cool side: 75-85°F, Night: 65-75°F',
      supplies: ['Live insects', 'Fresh vegetables', 'Tank (40+ gal)', 'Heat lamp', 'UVB light', 'Calcium powder', 'Thermometers', 'Substrate', 'Decor']
    },
    dog: {
      name: 'Dog',
      emoji: '🐕',
      facts: 'Dogs are social pack animals that thrive on companionship and routine. They require daily physical exercise, mental stimulation, and consistent training. According to the American Veterinary Medical Association (AVMA), proper socialization during puppyhood is crucial for developing well-adjusted adult dogs.',
      dos: [
        'Provide daily exercise: 30-120 minutes depending on breed and age',
        'Regular training using positive reinforcement methods',
        'Daily dental care - brush teeth or provide dental chews',
        'Socialize with other dogs and people from puppyhood',
        'Annual vet exams including blood work after age 7',
        'Keep identification tags and microchip updated',
        'Provide mental stimulation with puzzle toys and training',
        'Maintain consistent feeding schedule'
      ],
      donts: [
        'Never leave alone for more than 8-10 hours regularly',
        'Never feed chocolate, grapes, raisins, onions, garlic, xylitol, macadamia nuts',
        'Never skip annual vaccinations (rabies, distemper, parvovirus)',
        'Never use punishment-based training methods',
        'Never leave in hot cars (even for minutes)',
        'Never allow access to toxic plants (lilies, sago palm, azaleas)',
        'Never ignore behavioral changes - may indicate health issues'
      ],
      diet: 'High-quality dog food appropriate for life stage (puppy, adult, senior) and size. Feed 1-2 times daily for adults. Puppies need 3-4 small meals. Avoid table scraps. Fresh water must be available 24/7. Adjust portions based on body condition score.',
      habitat: 'Safe indoor living space with comfortable bed away from drafts. Access to secure outdoor area for bathroom breaks and exercise. Temperature range: 68-78°F. Remove hazards like electrical cords, toxic plants, small objects.',
      enclosure: 'Properly fitted collar with ID tag, harness for walks, 4-6 foot leash, food and water bowls (stainless steel recommended), crate for training (optional), comfortable bed, age-appropriate toys (chew toys, interactive toys), grooming supplies',
      vet: 'General veterinarian or canine specialist. Annual exams, vaccinations every 1-3 years based on vaccine type, heartworm prevention year-round, flea/tick prevention, dental cleanings as recommended',
      lifespan: '10-13 years average (varies by breed)',
      temperature: '101-102.5°F normal body temperature',
      supplies: ['Premium dog food', 'Food/water bowls', 'Collar and leash', 'ID tags', 'Crate', 'Bed', 'Toys', 'Grooming tools', 'First aid kit', 'Poop bags', 'Nail clippers']
    },
    cat: {
      name: 'Cat',
      emoji: '🐈',
      facts: 'Cats are independent but affectionate animals requiring mental stimulation and vertical space. They are obligate carnivores with specific dietary needs. Indoor cats live significantly longer than outdoor cats (12-18 years vs 2-5 years according to AVMA guidelines).',
      dos: [
        'Provide multiple scratching posts (vertical and horizontal)',
        'Clean litter box daily, completely change weekly',
        'Play interactive games 15-30 minutes daily',
        'Brush regularly, especially long-haired breeds',
        'Provide vertical spaces (cat trees, shelves)',
        'Keep indoors or provide secure outdoor enclosure',
        'Annual wellness exams including blood work after age 7',
        'Feed high-protein, meat-based diet'
      ],
      donts: [
        'Never declaw - it\'s painful amputation of toe bones',
        'Never feed dog food or vegetarian diet - cats need taurine',
        'Never use harsh discipline - causes fear and stress',
        'Never skip litter box cleaning - can cause medical issues',
        'Never feed milk - most cats are lactose intolerant',
        'Never leave toxic plants accessible (lilies are deadly)',
        'Never allow access to string, rubber bands, or small objects'
      ],
      diet: 'High-protein, meat-based cat food (wet food recommended for hydration). Feed 2-3 small meals daily. Cats need taurine, an essential amino acid. Avoid fish-only diets. Fresh water daily in multiple locations.',
      habitat: 'Indoor environment with cat trees, window perches, hiding spots. Litter box in quiet area (1 per cat plus 1 extra). Temperature: 68-78°F. Safe outdoor enclosure optional (catio).',
      enclosure: 'Litter box (1 per cat + 1), unscented litter, scratching posts, cat tree, window perches, food/water bowls (separate locations), interactive toys, hiding boxes, brush/comb',
      vet: 'General veterinarian or feline specialist. Annual exams, FVRCP and rabies vaccines, FeLV/FIV testing, dental cleanings, parasite prevention',
      lifespan: '12-18 years indoor, 2-5 years outdoor',
      temperature: '100.5-102.5°F normal body temperature',
      supplies: ['Premium cat food (wet + dry)', 'Multiple water bowls', 'Litter boxes', 'Litter', 'Scratching posts', 'Cat tree', 'Toys', 'Brush', 'Nail clippers', 'Carrier']
    },
    bird: {
      name: 'Bird (Parakeet/Cockatiel)',
      emoji: '🦜',
      facts: 'Birds are highly intelligent, social creatures requiring daily interaction and mental enrichment. They can live 10-30+ years depending on species. Birds are prey animals and hide illness, so observing behavior daily is critical.',
      dos: [
        'Provide species-appropriate pellets as base diet',
        'Offer fresh vegetables and fruits daily (15-20% of diet)',
        'Allow supervised out-of-cage time (minimum 2-3 hours daily)',
        'Rotate toys weekly to prevent boredom',
        'Maintain 10-12 hours dark, quiet sleep time',
        'Provide perches of varying diameters and materials',
        'Schedule annual avian vet exams',
        'Socialize and talk to your bird daily'
      ],
      donts: [
        'Never use non-stick cookware (PTFE/Teflon fumes are deadly)',
        'Never keep in kitchen - fumes, steam are dangerous',
        'Never feed avocado, chocolate, salt, caffeine, alcohol',
        'Never use aerosol sprays or scented candles near birds',
        'Never leave in direct sunlight without shade option',
        'Never keep in drafty areas or near AC/heating vents',
        'Never house different species together initially'
      ],
      diet: 'Species-specific pellets (70-80%), fresh vegetables (15-20%), limited fruits (5%), occasional seeds. Remove uneaten fresh food after 2-3 hours. Cuttlebone or mineral block for calcium.',
      habitat: 'Cage away from drafts, direct sun, kitchen. Minimum cage: budgie 18x18x18", cockatiel 20x20x24". Bar spacing: budgie ½", cockatiel ¾". Temperature: 65-80°F. Humidity: 30-50%.',
      enclosure: 'Appropriately sized cage, multiple perches (natural wood, varying sizes), stainless steel food/water dishes, cuttlebone, toys (foraging, chewing), cover for night, bird bath, play gym',
      vet: 'Certified Avian Veterinarian. Annual exam, nail/beak trim as needed, fecal testing, blood work for older birds',
      lifespan: 'Parakeet: 5-10 years, Cockatiel: 15-20 years, Parrot: 20-80 years',
      temperature: '105-107°F normal body temperature',
      supplies: ['Pellet food', 'Cage', 'Perches', 'Food/water dishes', 'Toys', 'Cuttlebone', 'Cage cover', 'Play stand', 'Cleaning supplies']
    },
    rabbit: {
      name: 'Rabbit',
      emoji: '🐰',
      facts: 'Rabbits are social, intelligent lagomorphs (not rodents) requiring companionship and space. They can be litter trained. Rabbits have continuously growing teeth requiring constant hay access. Never bathe rabbits unless medically necessary.',
      dos: [
        'Provide unlimited timothy hay (80-90% of diet)',
        'Bunny-proof living areas - cover cords, remove toxins',
        'Handle gently, support hindquarters always',
        'Spay/neuter by 6 months (health and behavior benefits)',
        'Provide 3-4 hours daily exercise outside enclosure',
        'Check teeth regularly for overgrowth',
        'Brush weekly, daily during molt',
        'Pair with another rabbit (spayed/neutered)'
      ],
      donts: [
        'Never keep in small cages 24/7 - need minimum 12 sq ft',
        'Never feed iceberg lettuce, beans, potato, rhubarb',
        'Never bathe unless medically necessary (can cause shock)',
        'Never pick up by ears - causes severe injury',
        'Never use cedar or pine bedding - toxic fumes',
        'Never leave unsupervised with other pets',
        'Never overfeed pellets - leads to obesity'
      ],
      diet: 'Unlimited timothy or grass hay (main diet), 1-2 cups fresh vegetables daily (romaine, cilantro, parsley), ¼ cup pellets per 5 lbs body weight, limited fruit treats. Always fresh water.',
      habitat: 'Large exercise pen (minimum 4x4 feet) or free-roam safe room. Litter box with paper-based litter. Temperature: 60-70°F. Provide hiding houses and tunnels. Rabbit-proof all areas.',
      enclosure: 'X-pen or large cage (minimum 4x4 feet), litter box, hay rack, heavy ceramic bowls, water bottle or bowl, hiding house, safe chew toys (willow, apple wood), fleece blankets',
      vet: 'Exotic animal veterinarian with rabbit experience. Annual exam, spay/neuter, dental checks, GI stasis watch',
      lifespan: '8-12 years',
      temperature: '101.3-103.1°F normal body temperature',
      supplies: ['Timothy hay', 'Pellets', 'Fresh veggies', 'Exercise pen', 'Litter box', 'Paper bedding', 'Hay rack', 'Water bowl', 'Hiding house', 'Chew toys']
    },
    hamster: {
      name: 'Hamster',
      emoji: '🐹',
      facts: 'Hamsters are solitary, nocturnal rodents. Syrian hamsters MUST be housed alone. Dwarf hamsters sometimes tolerate same-sex pairs if introduced young. They are active primarily at night and need large cages with deep bedding for burrowing.',
      dos: [
        'Provide minimum 450 sq inch floor space (larger better)',
        'Offer 6-8 inches bedding depth for burrowing',
        'Give appropriately-sized exercise wheel (8-12" diameter)',
        'Provide fresh vegetables 2-3 times weekly',
        'Handle gently after they wake naturally',
        'Spot clean daily, full clean weekly',
        'Check cheek pouches for impacted food',
        'Provide chew toys for teeth maintenance'
      ],
      donts: [
        'Never house Syrian hamsters together - will fight to death',
        'Never use wire-bottom cages - causes foot injuries',
        'Never use small wheels - causes back problems',
        'Never use cedar or pine bedding - toxic',
        'Never place in direct sunlight',
        'Never wake during day - causes stress',
        'Never use hamster balls for extended time - stressful'
      ],
      diet: 'High-quality hamster pellets (tablespoon daily), small amounts timothy hay, occasional fresh vegetables (carrot, broccoli, cucumber), limited seeds/nuts. Fresh water daily.',
      habitat: 'Minimum 450 square inch cage (larger better), 6-8" paper-based bedding, hide houses. Temperature: 65-75°F. Avoid drafts and direct sun.',
      enclosure: 'Large cage or bin cage (minimum 450 sq in), 6-8" paper bedding, appropriately-sized wheel, hideouts, water bottle, food dish, chew toys, exercise items',
      vet: 'Exotic veterinarian familiar with hamsters. Health checks as needed, watch for wet tail, tumors',
      lifespan: '2-3 years',
      temperature: '97-100°F normal body temperature',
      supplies: ['Hamster pellets', 'Paper bedding', 'Large cage', 'Exercise wheel', 'Hideout', 'Water bottle', 'Food dish', 'Chew toys', 'Sand bath']
    },
    guineapig: {
      name: 'Guinea Pig',
      emoji: '🐹',
      facts: 'Guinea pigs are social herbivores that must live in pairs or groups. They cannot produce their own Vitamin C and need daily supplementation. They vocalize extensively and require lots of space despite small size.',
      dos: [
        'House in pairs or groups (same sex or neutered)',
        'Provide unlimited timothy hay always',
        'Feed 1 cup fresh vegetables daily high in Vitamin C',
        'Offer vitamin C supplement daily (10-50mg)',
        'Provide minimum 7.5 sq ft for one, 10.5 sq ft for two',
        'Clean cage 2-3 times weekly',
        'Trim nails monthly',
        'Provide hidey houses for each guinea pig'
      ],
      donts: [
        'Never house alone - they need companionship',
        'Never use exercise wheels or balls - unsafe',
        'Never skip vitamin C - causes scurvy',
        'Never use wire bottom cages - causes bumblefoot',
        'Never bathe frequently - causes skin issues',
        'Never feed iceberg lettuce, dairy, or meat',
        'Never house with rabbits - different needs, injuries'
      ],
      diet: 'Unlimited timothy hay (most important), 1 cup fresh vegetables daily (bell peppers, kale, romaine), 1/8 cup pellets fortified with vitamin C, limited fruit. Fresh water daily.',
      habitat: 'Minimum 7.5 sq ft for one (larger better), solid bottom cage, 2-3" paper bedding. Temperature: 65-75°F. Avoid drafts. Multiple hide houses.',
      enclosure: 'Large C&C cage or enclosure (7.5+ sq ft), paper bedding, multiple hideouts, hay rack, ceramic food bowls, water bottle, fleece bedding (optional)',
      vet: 'Exotic veterinarian. Annual wellness exam, nail trims, monitor for URI, scurvy, dental issues',
      lifespan: '5-7 years',
      temperature: '99-103°F normal body temperature',
      supplies: ['Timothy hay', 'Guinea pig pellets', 'Fresh vegetables', 'Large cage', 'Bedding', 'Hideouts', 'Food bowls', 'Water bottle', 'Vitamin C drops']
    },
    fish: {
      name: 'Freshwater Fish',
      emoji: '🐠',
      facts: 'Tropical fish require stable water conditions and cycling before adding fish. The nitrogen cycle takes 4-6 weeks. Larger tanks (20+ gallons) are easier for beginners. Test water parameters weekly. Most tropical fish need 75-80°F water.',
      dos: [
        'Cycle tank 4-6 weeks before adding fish',
        'Test water parameters weekly (ammonia, nitrite, nitrate, pH)',
        'Perform 20-25% water changes weekly',
        'Research species compatibility before mixing',
        'Quarantine new fish 2-4 weeks before adding to main tank',
        'Feed small amounts 1-2 times daily',
        'Maintain temperature 75-80°F for tropical',
        'Use water conditioner to remove chlorine/chloramines'
      ],
      donts: [
        'Never add untreated tap water',
        'Never overstock tank - research bioload',
        'Never overfeed - causes ammonia spikes',
        'Never clean with soap/chemicals',
        'Never add fish during cycling period',
        'Never mix aggressive with peaceful species',
        'Never skip water testing',
        'Never replace all water at once'
      ],
      diet: 'Species-specific flakes/pellets, frozen foods (bloodworms, brine shrimp), blanched vegetables for herbivores. Feed only what fish eat in 2-3 minutes, 1-2 times daily.',
      habitat: 'Minimum 20 gallon tank for beginners. Cycled filter, heater (75-80°F), thermometer, lighting (8-10 hours daily), air pump (optional). Decorations, plants.',
      enclosure: 'Aquarium (20+ gallons recommended), filter, heater, thermometer, lighting, substrate (gravel/sand), decorations, live or artificial plants, water test kit, siphon, net',
      vet: 'Aquatic veterinarian or fish-experienced exotic vet. Often requires home treatment based on symptoms and water testing',
      lifespan: 'Varies by species: Goldfish 10-30 years, Betta 3-5 years, Tetras 5-10 years',
      temperature: 'Varies by species (Tropical: 75-80°F, Goldfish: 65-72°F)',
      supplies: ['Tank (20+ gallons)', 'Filter', 'Heater', 'Thermometer', 'Light', 'Substrate', 'Decorations', 'Water test kit', 'Conditioner', 'Fish food', 'Net', 'Siphon']
    },
    reptile: {
      name: 'Reptile (Leopard Gecko)',
      emoji: '🦎',
      facts: 'Reptiles are cold-blooded and require specific temperature gradients. Leopard geckos are beginner-friendly, nocturnal, and don\'t require UVB lighting. Always handle reptiles when they\'re warm and alert, never when cold or during shed.',
      dos: [
        'Provide temperature gradient (hot: 88-92°F, cool: 75-80°F)',
        'Use heat mat with thermostat (never heat rocks)',
        'Offer proper hiding spots in hot and cool zones',
        'Dust insects with calcium + D3 powder',
        'Provide shallow water dish, change daily',
        'Handle gently after warming up',
        'Monitor shedding - provide humid hide',
        'Keep detailed temperature and feeding logs'
      ],
      donts: [
        'Never house different species together',
        'Never use heat rocks - cause severe burns',
        'Never feed wild-caught insects - parasites',
        'Never skip calcium supplementation',
        'Never use loose substrate for young geckos - impaction risk',
        'Never handle during shed period',
        'Never allow temperature drops below 65°F',
        'Never keep in glass tank without proper heating'
      ],
      diet: 'Live insects (crickets, mealworms, dubia roaches) dusted with calcium powder with D3. Feed juveniles daily, adults 3-4 times weekly. Gut-load insects before feeding. Fresh water daily.',
      habitat: '20-gallon long tank minimum for one gecko. Paper towel or tile substrate. Under-tank heating pad with thermostat. Three hides (hot, cool, humid). Temperature gradient required.',
      enclosure: '20+ gallon tank, under-tank heater, thermostat, three hiding spots, shallow water dish, calcium dish, paper towel/tile substrate, thermometer (hot and cool ends)',
      vet: 'Exotic/reptile veterinarian. Annual exam, fecal parasite testing, monitor for metabolic bone disease, impaction',
      lifespan: '10-20 years',
      temperature: 'Requires temperature gradient: 88-92°F hot side, 75-80°F cool side',
      supplies: ['Tank (20+ gal)', 'Heat mat', 'Thermostat', 'Hides', 'Water dish', 'Substrate', 'Thermometers', 'Calcium powder', 'Live insects', 'Feeding tongs']
    }
  };

  const templates = {
    dailyRoutine: {
      title: 'Daily Care Routine',
      items: ['Morning feeding', 'Fresh water', 'Exercise/play time', 'Litter box/cage spot check', 'Evening feeding', 'Medications (if any)', 'Grooming check', 'Bedtime routine']
    },
    bedtimeRoutine: {
      title: 'Bedtime Routine',
      items: ['Final potty break', 'Check water availability', 'Turn off lights/cover cage', 'Ensure proper temperature', 'Check all enclosures secured', 'Quiet time before sleep']
    },
    eatingRoutine: {
      title: 'Feeding Schedule',
      items: ['Morning meal (time & amount)', 'Afternoon meal (if applicable)', 'Evening meal (time & amount)', 'Treats (type & frequency)', 'Fresh water changes', 'Food bowl cleaning']
    },
    supplyChecklist: {
      title: 'Pet Supply Checklist',
      items: ['Food (appropriate type)', 'Food & water bowls', 'Bed/hiding spots', 'Toys', 'Grooming supplies', 'Cleaning supplies', 'First aid kit', 'Carrier', 'Identification (collar/tag)', 'Veterinarian contact info']
    },
    firstTimerChecklist: {
      title: 'First-Time Pet Owner Checklist',
      items: [
        '✓ Research your pet\'s specific needs',
        '✓ Find exotic/specialized vet before bringing pet home',
        '✓ Pet-proof your home',
        '✓ Purchase all supplies in advance',
        '✓ Set up habitat/enclosure before arrival',
        '✓ Plan feeding schedule',
        '✓ Prepare emergency contact list',
        '✓ Budget for routine and emergency care',
        '✓ Learn proper handling techniques',
        '✓ Understand common health issues for species',
        '✓ Join species-specific online communities',
        '✓ Schedule first vet appointment'
      ]
    },
    vetVisit: {
      title: 'Veterinary Visit Checklist',
      items: ['Annual exam scheduled', 'Vaccinations up to date', 'Parasite prevention current', 'Dental check performed', 'Weight recorded', 'Discussed any concerns', 'Refilled medications', 'Scheduled next appointment']
    }
  };

  const downloadTemplate = (templateName) => {
    const template = templates[templateName];
    const petName = petProfile ? petProfile.name : 'Your Pet';
    
    let content = `${template.title}\nPet: ${petName}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    template.items.forEach((item, index) => {
      content += `${index + 1}. ${item}\n   [ ] Completed\n\n`;
    });
    content += '\n\nNotes:\n_______________________\n_______________________\n_______________________\n';
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.title.replace(/\s+/g, '_')}_${petName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isLicensed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
              🐾
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Pet Care Companion</h1>
          <p className="text-center text-gray-600 mb-6">Enter your license key to activate</p>
          
          <div>
            <input
              type="text"
              placeholder="Enter 32-character key (dashes optional)"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-center font-mono text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleLicenseSubmit()}
            />
            
            {licenseError && (
              <div className="flex items-start gap-2 mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{licenseError}</span>
              </div>
            )}
            
            <button
              onClick={handleLicenseSubmit}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Activate License
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center mb-3">
              Purchase your license key from Gumroad to access all features
            </p>
            <p className="text-xs text-gray-400 text-center">
              Example: 0CC6A9C8-0EF7467C-B4D5F871-182E65F3
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleProfileSubmit = () => {
    if (profileForm.name && profileForm.type && profileForm.age && profileForm.firstTime) {
      setPetProfile({
        name: profileForm.name,
        type: profileForm.type,
        age: profileForm.age,
        breed: profileForm.breed,
        firstTime: profileForm.firstTime === 'yes'
      });
    }
  };

  const addCareLog = () => {
    if (careActivity) {
      setCareLog([...careLog, { id: Date.now(), date: new Date().toISOString(), activity: careActivity, completed: false }]);
      setCareActivity('');
    }
  };

  const toggleCareLog = (id) => {
    setCareLog(careLog.map(log => log.id === id ? { ...log, completed: !log.completed } : log));
  };

  const addDietLog = () => {
    if (dietMeal && dietAmount) {
      setDietLog([...dietLog, { id: Date.now(), date: new Date().toISOString(), meal: dietMeal, amount: dietAmount }]);
      setDietMeal('');
      setDietAmount('');
    }
  };

  const addSleepLog = () => {
    if (sleepHours) {
      setSleepLog([...sleepLog, { id: Date.now(), date: new Date().toISOString(), hours: sleepHours }]);
      setSleepHours('');
    }
  };

  const deleteLog = (type, id) => {
    if (type === 'care') setCareLog(careLog.filter(log => log.id !== id));
    if (type === 'diet') setDietLog(dietLog.filter(log => log.id !== id));
    if (type === 'sleep') setSleepLog(sleepLog.filter(log => log.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!petProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Heart className="text-pink-500" />
              Create Your Pet Profile
            </h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Are you a first-time pet owner?</label>
                <select 
                  value={profileForm.firstTime}
                  onChange={(e) => setProfileForm({...profileForm, firstTime: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes, this is my first pet</option>
                  <option value="no">No, I have experience</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                <select 
                  value={profileForm.type}
                  onChange={(e) => setProfileForm({...profileForm, type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select pet type...</option>
                  {Object.keys(petTypes).map(type => (
                    <option key={type} value={type}>{petTypes[type].emoji} {petTypes[type].name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet's Name</label>
                <input 
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input 
                  type="text"
                  value={profileForm.age}
                  onChange={(e) => setProfileForm({...profileForm, age: e.target.value})}
                  placeholder="e.g., 2 years, 6 months"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Breed/Species (optional)</label>
                <input 
                  type="text"
                  value={profileForm.breed}
                  onChange={(e) => setProfileForm({...profileForm, breed: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                />
              </div>

              <button 
                onClick={handleProfileSubmit}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Create Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const petInfo = petTypes[petProfile.type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              Pet Care Companion
            </h1>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your pet profile?')) {
                  setPetProfile(null);
                  setCareLog([]);
                  setDietLog([]);
                  setSleepLog([]);
                  setChecklistLog([]);
                  localStorage.removeItem('petProfile');
                  localStorage.removeItem('careLog');
                  localStorage.removeItem('dietLog');
                  localStorage.removeItem('sleepLog');
                  localStorage.removeItem('checklistLog');
                }
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Reset Profile
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-3xl">{petInfo.emoji}</span>
                {petProfile.name}
              </h2>
              <p className="text-gray-600">{petInfo.name} • {petProfile.age} {petProfile.breed && `• ${petProfile.breed}`}</p>
              {petProfile.firstTime && (
                <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  First-time owner
                </div>
              )}
            </div>
            <div className="text-right text-sm text-gray-600">
              <p>Lifespan: {petInfo.lifespan}</p>
              <p>Body Temp: {petInfo.temperature}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['home', 'care', 'diet', 'sleep', 'templates'].map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                currentView === view
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {currentView === 'home' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About {petInfo.name}s</h3>
              <p className="text-gray-700 leading-relaxed">{petInfo.facts}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">✓ Essential Do's</h3>
              <ul className="space-y-3">
                {petInfo.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-red-700 mb-4">✗ Critical Don'ts</h3>
              <ul className="space-y-3">
                {petInfo.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Diet & Nutrition</h3>
              <p className="text-gray-700 leading-relaxed">{petInfo.diet}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Habitat Requirements</h3>
              <p className="text-gray-700 leading-relaxed">{petInfo.habitat}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Essential Supplies</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">{petInfo.enclosure}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Shopping List:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {petInfo.supplies.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Veterinary Care</h3>
              <p className="text-gray-700 leading-relaxed">{petInfo.vet}</p>
            </div>
          </div>
        )}

        {currentView === 'care' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-purple-600" />
              Daily Care Routine
            </h3>
            
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={careActivity}
                  onChange={(e) => setCareActivity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCareLog()}
                  placeholder="Add care activity (e.g., Morning walk, Fresh water)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button 
                  onClick={addCareLog}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {careLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No care activities logged yet. Add your daily tasks above!</p>
              ) : (
                careLog.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={log.completed}
                      onChange={() => toggleCareLog(log.id)}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${log.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {log.activity}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(log.date)}</p>
                    </div>
                    <button onClick={() => deleteLog('care', log.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'diet' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="text-purple-600" />
              Diet Tracking
            </h3>
            
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  value={dietMeal}
                  onChange={(e) => setDietMeal(e.target.value)}
                  placeholder="Meal type (e.g., Breakfast, Dinner)"
                  className="flex-1 min-w-48 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={dietAmount}
                  onChange={(e) => setDietAmount(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDietLog()}
                  placeholder="Amount (e.g., 1 cup, 50g, 5 crickets)"
                  className="flex-1 min-w-48 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button 
                  onClick={addDietLog}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {dietLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No meals logged yet. Track your pet's diet!</p>
              ) : (
                dietLog.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{log.meal} - {log.amount}</p>
                      <p className="text-sm text-gray-500">{formatDate(log.date)}</p>
                    </div>
                    <button onClick={() => deleteLog('diet', log.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'sleep' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="text-purple-600" />
              Sleep/Activity Tracking
            </h3>
            
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSleepLog()}
                  placeholder="Hours of sleep/rest"
                  step="0.5"
                  min="0"
                  max="24"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button 
                  onClick={addSleepLog}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {sleepLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No sleep data logged yet. Monitor rest patterns!</p>
              ) : (
                sleepLog.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{log.hours} hours</p>
                      <p className="text-sm text-gray-500">{formatDate(log.date)}</p>
                    </div>
                    <button onClick={() => deleteLog('sleep', log.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'templates' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Download className="text-purple-600" />
                Downloadable Care Templates
              </h3>
              <p className="text-gray-600 mb-6">Click any template to download as a text file. Print or edit as needed!</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(templates).map(([key, template]) => (
                  <div key={key} className="border border-gray-200 rounded-lg p-4 hover:border-purple-600 transition">
                    <h4 className="font-bold text-gray-800 mb-2">{template.title}</h4>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      {template.items.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                      {template.items.length > 3 && (
                        <li className="text-gray-400">...and {template.items.length - 3} more items</li>
                      )}
                    </ul>
                    <button
                      onClick={() => downloadTemplate(key)}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
