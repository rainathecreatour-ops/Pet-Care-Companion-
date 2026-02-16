import React, { useState, useEffect } from 'react';
import { Heart, PawPrint, Calendar, Clock, Scale, FileText, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

export default function PetCareApp() {
  const [isLicensed, setIsLicensed] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [petProfile, setPetProfile] = useState(null);
  const [careLog, setCareLog] = useState([]);
  const [dietLog, setDietLog] = useState([]);
  const [sleepLog, setSleepLog] = useState([]);
  
  // Profile form states
  const [profileForm, setProfileForm] = useState({
    name: '', type: '', age: '', breed: '', firstTime: ''
  });
  
  // Log form states
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
    const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return pattern.test(key);
  };

  const handleLicenseSubmit = () => {
    const trimmedKey = licenseKey.trim().toUpperCase();
    
    if (validateLicense(trimmedKey)) {
      localStorage.setItem('petCareAppLicense', trimmedKey);
      setIsLicensed(true);
      setLicenseError('');
    } else {
      setLicenseError('Invalid license key format. Please use format: XXXX-XXXX-XXXX-XXXX');
    }
  };

  const loadData = () => {
    const profile = localStorage.getItem('petProfile');
    const care = localStorage.getItem('careLog');
    const diet = localStorage.getItem('dietLog');
    const sleep = localStorage.getItem('sleepLog');
    
    if (profile) setPetProfile(JSON.parse(profile));
    if (care) setCareLog(JSON.parse(care));
    if (diet) setDietLog(JSON.parse(diet));
    if (sleep) setSleepLog(JSON.parse(sleep));
  };

  const saveData = () => {
    if (petProfile) localStorage.setItem('petProfile', JSON.stringify(petProfile));
    localStorage.setItem('careLog', JSON.stringify(careLog));
    localStorage.setItem('dietLog', JSON.stringify(dietLog));
    localStorage.setItem('sleepLog', JSON.stringify(sleepLog));
  };

  useEffect(() => {
    if (isLicensed) saveData();
  }, [petProfile, careLog, dietLog, sleepLog]);

  const petTypes = {
    dog: {
      name: 'Dog',
      facts: 'Dogs are social pack animals that thrive on companionship and routine.',
      dos: ['Daily exercise (30-120 min depending on breed)', 'Regular training and mental stimulation', 'Dental care', 'Socialization with other dogs'],
      donts: ['Leave alone for extended periods', 'Feed chocolate, grapes, onions, or xylitol', 'Skip vaccinations', 'Ignore behavioral issues'],
      diet: 'High-quality dog food appropriate for age and size. Feed 1-2 times daily. Always provide fresh water.',
      habitat: 'Safe indoor space with comfortable bed, outdoor access for exercise, secure fencing if yard access.',
      enclosure: 'Crate for training (optional), bed, food/water bowls, toys, collar, leash',
      vet: 'General veterinarian or canine specialist'
    },
    cat: {
      name: 'Cat',
      facts: 'Cats are independent but affectionate animals that require mental stimulation and vertical space.',
      dos: ['Provide scratching posts', 'Clean litter box daily', 'Play interactive games daily', 'Regular grooming for long-haired breeds'],
      donts: ['Declaw (harmful procedure)', 'Feed dog food or human food regularly', 'Use harsh discipline', 'Skip annual check-ups'],
      diet: 'High-protein cat food. Feed 2-3 times daily. Wet food recommended for hydration.',
      habitat: 'Indoor environment with vertical climbing spaces, hiding spots, window access for bird watching.',
      enclosure: 'Litter box, scratching posts, cat tree, food/water bowls, toys, bed',
      vet: 'General veterinarian or feline specialist'
    },
    bird: {
      name: 'Bird',
      facts: 'Birds are highly intelligent, social creatures requiring daily interaction and mental enrichment.',
      dos: ['Provide varied diet with fruits and vegetables', 'Allow supervised out-of-cage time', 'Rotate toys regularly', 'Maintain consistent sleep schedule (10-12 hours)'],
      donts: ['Use non-stick cookware (toxic fumes)', 'Keep in kitchen area', 'Expose to strong scents or smoke', 'Leave in direct sunlight without shade'],
      diet: 'Species-specific pellets, fresh fruits/vegetables, occasional seeds. Avoid avocado, chocolate, salt.',
      habitat: 'Spacious cage away from drafts and direct sun, toys, perches of varying sizes.',
      enclosure: 'Large cage (width > height), multiple perches, toys, food/water dishes, cuttlebone, bird bath',
      vet: 'Avian veterinarian (specialized in birds)'
    },
    rabbit: {
      name: 'Rabbit',
      facts: 'Rabbits are social, intelligent animals that require space to hop and explore.',
      dos: ['Provide unlimited hay', 'Bunny-proof living areas', 'Handle gently and support hindquarters', 'Spay/neuter for health and behavior'],
      donts: ['Keep in small cages 24/7', 'Feed iceberg lettuce or processed foods', 'Bathe (unless medically necessary)', 'Pick up by ears'],
      diet: 'Unlimited timothy hay, daily fresh vegetables, limited pellets, occasional fruit treats.',
      habitat: 'Large exercise pen or free-roam space, hiding spots, safe chewing materials.',
      enclosure: 'Large pen or room access, litter box, hay rack, water bottle/bowl, hiding house, chew toys',
      vet: 'Exotic animal veterinarian with rabbit experience'
    },
    reptile: {
      name: 'Reptile',
      facts: 'Reptiles are cold-blooded and require specific temperature and humidity levels to thrive.',
      dos: ['Maintain proper temperature gradient', 'Provide UVB lighting (for most species)', 'Monitor humidity levels', 'Handle when they\'re alert and warm'],
      donts: ['House different species together', 'Use heat rocks', 'Overfeed', 'Neglect temperature regulation at night'],
      diet: 'Species-specific (insects, rodents, vegetables). Research your specific reptile\'s needs.',
      habitat: 'Temperature-controlled enclosure with heating and lighting, hiding spots, proper substrate.',
      enclosure: 'Appropriately-sized terrarium, heating equipment, UVB light, thermometer/hygrometer, hides, water dish, substrate',
      vet: 'Exotic animal veterinarian or reptile specialist'
    },
    fish: {
      name: 'Fish',
      facts: 'Fish require stable water conditions and species-appropriate tank mates.',
      dos: ['Cycle tank before adding fish', 'Test water parameters weekly', 'Perform regular water changes (25% weekly)', 'Research species compatibility'],
      donts: ['Overstock the tank', 'Overfeed', 'Use soap or chemicals near tank', 'Add fish too quickly'],
      diet: 'Species-specific flakes/pellets, occasional frozen or live food. Feed small amounts 1-2 times daily.',
      habitat: 'Appropriately-sized filtered tank with heater (for tropical fish), proper lighting cycle.',
      enclosure: 'Tank (minimum 10 gallons for most species), filter, heater, thermometer, decorations, plants, water test kit',
      vet: 'Aquatic veterinarian or exotic animal vet with fish experience'
    }
  };

  if (!isLicensed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <PawPrint className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Pet Care Companion</h1>
          <p className="text-center text-gray-600 mb-6">Enter your license key to activate</p>
          
          <div>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 text-center font-mono text-lg"
              maxLength={19}
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
            <p className="text-sm text-gray-500 text-center">
              Purchase your license key from Gumroad to access all features
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
                    <option key={type} value={type}>{petTypes[type].name}</option>
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
                  placeholder="e.g., 2 years"
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
              <PawPrint className="text-purple-600" />
              Pet Care Companion
            </h1>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your pet profile?')) {
                  setPetProfile(null);
                  setCareLog([]);
                  setDietLog([]);
                  setSleepLog([]);
                  localStorage.removeItem('petProfile');
                  localStorage.removeItem('careLog');
                  localStorage.removeItem('dietLog');
                  localStorage.removeItem('sleepLog');
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{petProfile.name}</h2>
          <p className="text-gray-600">{petInfo.name} • {petProfile.age} {petProfile.breed && `• ${petProfile.breed}`}</p>
          {petProfile.firstTime && (
            <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              First-time owner
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['home', 'care', 'diet', 'sleep'].map(view => (
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
              <p className="text-gray-700 mb-4">{petInfo.facts}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-green-700 mb-4">✓ Do's</h3>
              <ul className="space-y-2">
                {petInfo.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-red-700 mb-4">✗ Don'ts</h3>
              <ul className="space-y-2">
                {petInfo.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Diet</h3>
              <p className="text-gray-700">{petInfo.diet}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Habitat Requirements</h3>
              <p className="text-gray-700">{petInfo.habitat}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Enclosure Essentials</h3>
              <p className="text-gray-700">{petInfo.enclosure}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Veterinary Care</h3>
              <p className="text-gray-700">{petInfo.vet}</p>
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
                  placeholder="Add care activity (e.g., Morning walk, Brush teeth)"
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
                <p className="text-gray-500 text-center py-8">No care activities logged yet</p>
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
                  placeholder="Amount (e.g., 1 cup, 50g)"
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
                <p className="text-gray-500 text-center py-8">No meals logged yet</p>
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
                <p className="text-gray-500 text-center py-8">No sleep data logged yet</p>
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
      </div>
    </div>
  );
}
