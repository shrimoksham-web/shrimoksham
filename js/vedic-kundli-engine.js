/**
 * SHRI MOKSHAM — Vedic Kundli Blueprint Calculator & Live Panchang Engine
 * High-Precision Parashari & Lahiri Sidereal (Nirayana) Ephemeris Algorithms
 * Supports all dates, times (12h/24h), and comprehensive global/Indian geocoding.
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. COMPREHENSIVE CITY & GEOCODING DATABASE (150+ LOCATIONS & STATE CODES)
  // ==========================================================================
  const CITIES_DB = {
    // Odisha
    'angul': { lat: 20.84, lon: 85.15, tz: 5.5, country: 'India', state: 'Odisha' },
    'bhubaneswar': { lat: 20.2961, lon: 85.8245, tz: 5.5, country: 'India', state: 'Odisha' },
    'cuttack': { lat: 20.4625, lon: 85.8828, tz: 5.5, country: 'India', state: 'Odisha' },
    'puri': { lat: 19.8135, lon: 85.8312, tz: 5.5, country: 'India', state: 'Odisha' },
    'sambalpur': { lat: 21.4669, lon: 83.9812, tz: 5.5, country: 'India', state: 'Odisha' },
    'rourkela': { lat: 22.2604, lon: 84.8536, tz: 5.5, country: 'India', state: 'Odisha' },
    'balasore': { lat: 21.4934, lon: 86.9135, tz: 5.5, country: 'India', state: 'Odisha' },
    'berhampur': { lat: 19.3150, lon: 84.7941, tz: 5.5, country: 'India', state: 'Odisha' },
    'brahmapur': { lat: 19.3150, lon: 84.7941, tz: 5.5, country: 'India', state: 'Odisha' },
    'jharsuguda': { lat: 21.8554, lon: 84.0062, tz: 5.5, country: 'India', state: 'Odisha' },
    'bargarh': { lat: 21.3333, lon: 83.6167, tz: 5.5, country: 'India', state: 'Odisha' },
    'bhadrak': { lat: 21.0543, lon: 86.4969, tz: 5.5, country: 'India', state: 'Odisha' },
    'dhenkanal': { lat: 20.6586, lon: 85.5975, tz: 5.5, country: 'India', state: 'Odisha' },
    'jajpur': { lat: 20.8500, lon: 86.3333, tz: 5.5, country: 'India', state: 'Odisha' },
    'kendrapara': { lat: 20.5000, lon: 86.4200, tz: 5.5, country: 'India', state: 'Odisha' },
    'keonjhar': { lat: 21.6300, lon: 85.5800, tz: 5.5, country: 'India', state: 'Odisha' },
    'koraput': { lat: 18.8100, lon: 82.7100, tz: 5.5, country: 'India', state: 'Odisha' },
    'rayagada': { lat: 19.1700, lon: 83.4200, tz: 5.5, country: 'India', state: 'Odisha' },
    'baripada': { lat: 21.9333, lon: 86.7333, tz: 5.5, country: 'India', state: 'Odisha' },

    // National Metros & Major Indian Cities
    'delhi': { lat: 28.6139, lon: 77.2090, tz: 5.5, country: 'India', state: 'Delhi' },
    'new delhi': { lat: 28.6139, lon: 77.2090, tz: 5.5, country: 'India', state: 'Delhi' },
    'noida': { lat: 28.5355, lon: 77.3910, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'gurgaon': { lat: 28.4595, lon: 77.0266, tz: 5.5, country: 'India', state: 'Haryana' },
    'gurugram': { lat: 28.4595, lon: 77.0266, tz: 5.5, country: 'India', state: 'Haryana' },
    'mumbai': { lat: 19.0760, lon: 72.8777, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'pune': { lat: 18.5204, lon: 73.8567, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'nagpur': { lat: 21.1458, lon: 79.0882, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'nashik': { lat: 19.9975, lon: 73.7898, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'aurangabad': { lat: 19.8762, lon: 75.3433, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'chhatrapati sambhajinagar': { lat: 19.8762, lon: 75.3433, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'thane': { lat: 19.2183, lon: 72.9781, tz: 5.5, country: 'India', state: 'Maharashtra' },
    'kolkata': { lat: 22.5726, lon: 88.3639, tz: 5.5, country: 'India', state: 'West Bengal' },
    'howrah': { lat: 22.5958, lon: 88.2636, tz: 5.5, country: 'India', state: 'West Bengal' },
    'siliguri': { lat: 26.7271, lon: 88.3953, tz: 5.5, country: 'India', state: 'West Bengal' },
    'bengaluru': { lat: 12.9716, lon: 77.5946, tz: 5.5, country: 'India', state: 'Karnataka' },
    'bangalore': { lat: 12.9716, lon: 77.5946, tz: 5.5, country: 'India', state: 'Karnataka' },
    'mysuru': { lat: 12.2958, lon: 76.6394, tz: 5.5, country: 'India', state: 'Karnataka' },
    'mysore': { lat: 12.2958, lon: 76.6394, tz: 5.5, country: 'India', state: 'Karnataka' },
    'hubli': { lat: 15.3647, lon: 75.1240, tz: 5.5, country: 'India', state: 'Karnataka' },
    'mangaluru': { lat: 12.9141, lon: 74.8560, tz: 5.5, country: 'India', state: 'Karnataka' },
    'chennai': { lat: 13.0827, lon: 80.2707, tz: 5.5, country: 'India', state: 'Tamil Nadu' },
    'coimbatore': { lat: 11.0168, lon: 76.9558, tz: 5.5, country: 'India', state: 'Tamil Nadu' },
    'madurai': { lat: 9.9252, lon: 78.1198, tz: 5.5, country: 'India', state: 'Tamil Nadu' },
    'tiruchirappalli': { lat: 10.7905, lon: 78.7047, tz: 5.5, country: 'India', state: 'Tamil Nadu' },
    'salem': { lat: 11.6643, lon: 78.1460, tz: 5.5, country: 'India', state: 'Tamil Nadu' },
    'hyderabad': { lat: 17.3850, lon: 78.4867, tz: 5.5, country: 'India', state: 'Telangana' },
    'warangal': { lat: 17.9689, lon: 79.5941, tz: 5.5, country: 'India', state: 'Telangana' },
    'visakhapatnam': { lat: 17.6868, lon: 83.2185, tz: 5.5, country: 'India', state: 'Andhra Pradesh' },
    'vijayawada': { lat: 16.5062, lon: 80.6480, tz: 5.5, country: 'India', state: 'Andhra Pradesh' },
    'guntur': { lat: 16.3067, lon: 80.4365, tz: 5.5, country: 'India', state: 'Andhra Pradesh' },
    'tirupati': { lat: 13.6288, lon: 79.4192, tz: 5.5, country: 'India', state: 'Andhra Pradesh' },
    'ahmedabad': { lat: 23.0225, lon: 72.5714, tz: 5.5, country: 'India', state: 'Gujarat' },
    'surat': { lat: 21.1702, lon: 72.8311, tz: 5.5, country: 'India', state: 'Gujarat' },
    'vadodara': { lat: 22.3072, lon: 73.1812, tz: 5.5, country: 'India', state: 'Gujarat' },
    'rajkot': { lat: 22.3039, lon: 70.8022, tz: 5.5, country: 'India', state: 'Gujarat' },
    'gandhinagar': { lat: 23.2156, lon: 72.6369, tz: 5.5, country: 'India', state: 'Gujarat' },
    'jaipur': { lat: 26.9124, lon: 75.7873, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'jodhpur': { lat: 26.2389, lon: 73.0243, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'udaipur': { lat: 24.5854, lon: 73.7125, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'kota': { lat: 25.2138, lon: 75.8648, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'ajmer': { lat: 26.4499, lon: 74.6399, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'bikaner': { lat: 28.0229, lon: 73.3119, tz: 5.5, country: 'India', state: 'Rajasthan' },
    'lucknow': { lat: 26.8467, lon: 80.9462, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'kanpur': { lat: 26.4499, lon: 80.3319, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'varanasi': { lat: 25.3176, lon: 82.9739, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'kashi': { lat: 25.3176, lon: 82.9739, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'prayagraj': { lat: 25.4358, lon: 81.8463, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'allahabad': { lat: 25.4358, lon: 81.8463, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'agra': { lat: 27.1767, lon: 78.0081, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'ayodhya': { lat: 26.7922, lon: 82.1998, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'mathura': { lat: 27.4924, lon: 77.6737, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'vrindavan': { lat: 27.5806, lon: 77.7006, tz: 5.5, country: 'India', state: 'Uttar Pradesh' },
    'bhopal': { lat: 23.2599, lon: 77.4126, tz: 5.5, country: 'India', state: 'Madhya Pradesh' },
    'indore': { lat: 22.7196, lon: 75.8577, tz: 5.5, country: 'India', state: 'Madhya Pradesh' },
    'gwalior': { lat: 26.2183, lon: 78.1828, tz: 5.5, country: 'India', state: 'Madhya Pradesh' },
    'jabalpur': { lat: 23.1815, lon: 79.9864, tz: 5.5, country: 'India', state: 'Madhya Pradesh' },
    'ujjain': { lat: 23.1765, lon: 75.7885, tz: 5.5, country: 'India', state: 'Madhya Pradesh' },
    'patna': { lat: 25.5941, lon: 85.1376, tz: 5.5, country: 'India', state: 'Bihar' },
    'gaya': { lat: 24.7914, lon: 85.0002, tz: 5.5, country: 'India', state: 'Bihar' },
    'ranchi': { lat: 23.3441, lon: 85.3096, tz: 5.5, country: 'India', state: 'Jharkhand' },
    'jamshedpur': { lat: 22.8046, lon: 86.2029, tz: 5.5, country: 'India', state: 'Jharkhand' },
    'dhanbad': { lat: 23.7957, lon: 86.4304, tz: 5.5, country: 'India', state: 'Jharkhand' },
    'raipur': { lat: 21.2514, lon: 81.6296, tz: 5.5, country: 'India', state: 'Chhattisgarh' },
    'chandigarh': { lat: 30.7333, lon: 76.7794, tz: 5.5, country: 'India', state: 'Punjab / Haryana' },
    'ludhiana': { lat: 30.9010, lon: 75.8573, tz: 5.5, country: 'India', state: 'Punjab' },
    'amritsar': { lat: 31.6340, lon: 74.8723, tz: 5.5, country: 'India', state: 'Punjab' },
    'shimla': { lat: 31.1048, lon: 77.1734, tz: 5.5, country: 'India', state: 'Himachal Pradesh' },
    'dharamshala': { lat: 32.2190, lon: 76.3234, tz: 5.5, country: 'India', state: 'Himachal Pradesh' },
    'dehradun': { lat: 30.3165, lon: 78.0322, tz: 5.5, country: 'India', state: 'Uttarakhand' },
    'haridwar': { lat: 29.9457, lon: 78.1642, tz: 5.5, country: 'India', state: 'Uttarakhand' },
    'rishikesh': { lat: 30.0869, lon: 78.2676, tz: 5.5, country: 'India', state: 'Uttarakhand' },
    'srinagar': { lat: 34.0837, lon: 74.7973, tz: 5.5, country: 'India', state: 'Jammu & Kashmir' },
    'jammu': { lat: 32.7266, lon: 74.8570, tz: 5.5, country: 'India', state: 'Jammu & Kashmir' },
    'guwahati': { lat: 26.1445, lon: 91.7362, tz: 5.5, country: 'India', state: 'Assam' },
    'thiruvananthapuram': { lat: 8.5241, lon: 76.9366, tz: 5.5, country: 'India', state: 'Kerala' },
    'kochi': { lat: 9.9312, lon: 76.2673, tz: 5.5, country: 'India', state: 'Kerala' },
    'panaji': { lat: 15.4909, lon: 73.8278, tz: 5.5, country: 'India', state: 'Goa' },

    // International Hubs
    'london': { lat: 51.5074, lon: -0.1278, tz: 0.0, country: 'United Kingdom', state: 'England' },
    'new york': { lat: 40.7128, lon: -74.0060, tz: -5.0, country: 'USA', state: 'New York' },
    'san francisco': { lat: 37.7749, lon: -122.4194, tz: -8.0, country: 'USA', state: 'California' },
    'los angeles': { lat: 34.0522, lon: -118.2437, tz: -8.0, country: 'USA', state: 'California' },
    'chicago': { lat: 41.8781, lon: -87.6298, tz: -6.0, country: 'USA', state: 'Illinois' },
    'toronto': { lat: 43.6532, lon: -79.3832, tz: -5.0, country: 'Canada', state: 'Ontario' },
    'vancouver': { lat: 49.2827, lon: -123.1207, tz: -8.0, country: 'Canada', state: 'British Columbia' },
    'dubai': { lat: 25.2048, lon: 55.2708, tz: 4.0, country: 'UAE', state: 'Dubai' },
    'abu dhabi': { lat: 24.4539, lon: 54.3773, tz: 4.0, country: 'UAE', state: 'Abu Dhabi' },
    'singapore': { lat: 1.3521, lon: 103.8198, tz: 8.0, country: 'Singapore', state: 'Singapore' },
    'kuala lumpur': { lat: 3.1390, lon: 101.6869, tz: 8.0, country: 'Malaysia', state: 'Federal Territory' },
    'bangkok': { lat: 13.7563, lon: 100.5018, tz: 7.0, country: 'Thailand', state: 'Bangkok' },
    'sydney': { lat: -33.8688, lon: 151.2093, tz: 10.0, country: 'Australia', state: 'New South Wales' },
    'melbourne': { lat: -37.8136, lon: 144.9631, tz: 10.0, country: 'Australia', state: 'Victoria' },
    'tokyo': { lat: 35.6762, lon: 139.6503, tz: 9.0, country: 'Japan', state: 'Tokyo' },
    'kathmandu': { lat: 27.7172, lon: 85.3240, tz: 5.75, country: 'Nepal', state: 'Bagmati' },
    'colombo': { lat: 6.9271, lon: 79.8612, tz: 5.5, country: 'Sri Lanka', state: 'Western Province' }
  };

  function resolveCoordinates(cityInput) {
    if (!cityInput || typeof cityInput !== 'string') {
      return { lat: 20.84, lon: 85.15, tz: 5.5, name: 'India (Default)' };
    }
    const clean = cityInput.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim();
    const tokens = clean.split(/\s+/).filter(Boolean);

    // Exact and prefix matching
    for (const token of tokens) {
      if (CITIES_DB[token]) {
        const c = CITIES_DB[token];
        return { lat: c.lat, lon: c.lon, tz: c.tz, name: `${c.state || ''}, ${c.country}`.trim() };
      }
    }

    // Multi-word matching (e.g. 'new delhi', 'san francisco')
    for (const key in CITIES_DB) {
      if (clean.includes(key)) {
        const c = CITIES_DB[key];
        return { lat: c.lat, lon: c.lon, tz: c.tz, name: `${c.state || ''}, ${c.country}`.trim() };
      }
    }

    // Heuristics for country detection
    if (clean.includes('uk') || clean.includes('britain') || clean.includes('england')) {
      return { lat: 51.5074, lon: -0.1278, tz: 0.0, name: 'United Kingdom' };
    }
    if (clean.includes('usa') || clean.includes('america') || clean.includes('united states')) {
      return { lat: 39.8283, lon: -98.5795, tz: -5.0, name: 'United States' };
    }
    if (clean.includes('australia')) {
      return { lat: -25.2744, lon: 133.7751, tz: 10.0, name: 'Australia' };
    }
    if (clean.includes('uae') || clean.includes('emirates')) {
      return { lat: 25.2048, lon: 55.2708, tz: 4.0, name: 'UAE' };
    }

    // Default to Indian Standard Time & geographic center
    return { lat: 20.84, lon: 85.15, tz: 5.5, name: cityInput.trim() };
  }

  // ==========================================================================
  // 2. PARSERS FOR MULTI-FORMAT DATES & TIMES (12h/24h, ISO, DD/MM/YYYY)
  // ==========================================================================
  function parseDateInput(val) {
    if (!val) return null;
    val = String(val).trim();

    // ISO format: YYYY-MM-DD
    const isoMatch = val.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (isoMatch) {
      return {
        year: parseInt(isoMatch[1], 10),
        month: parseInt(isoMatch[2], 10),
        day: parseInt(isoMatch[3], 10)
      };
    }

    // DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = val.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (dmyMatch) {
      let p1 = parseInt(dmyMatch[1], 10);
      let p2 = parseInt(dmyMatch[2], 10);
      let y = parseInt(dmyMatch[3], 10);
      if (p1 > 12) {
        return { year: y, month: p2, day: p1 };
      } else if (p2 > 12) {
        return { year: y, month: p1, day: p2 };
      } else {
        // Standard DD/MM/YYYY
        return { year: y, month: p2, day: p1 };
      }
    }

    const dt = new Date(val);
    if (!isNaN(dt.getTime())) {
      return {
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate()
      };
    }
    return null;
  }

  function parseTimeInput(val) {
    if (!val) return { hours: 12, mins: 0 };
    val = String(val).trim().toUpperCase();

    // HH:MM (optional :SS) (optional AM/PM)
    const ampmMatch = val.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?$/);
    if (ampmMatch) {
      let h = parseInt(ampmMatch[1], 10);
      let m = parseInt(ampmMatch[2], 10);
      let ampm = ampmMatch[3];
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return { hours: h, mins: m };
    }

    // Simple HH AM/PM
    const simpleMatch = val.match(/^(\d{1,2})\s*(AM|PM)$/);
    if (simpleMatch) {
      let h = parseInt(simpleMatch[1], 10);
      let ampm = simpleMatch[2];
      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return { hours: h, mins: 0 };
    }

    return { hours: 12, mins: 0 };
  }

  // ==========================================================================
  // 3. VEDIC JYOTISH & SIDEREAL ASTRONOMICAL ENGINE (LAHIRI AYANAMSHA)
  // ==========================================================================
  const RASHIS = [
    { name: 'Mesha (Aries)', shortName: 'Mesha', lord: 'Mars (Mangala)', element: 'Fire', color: 'Coral Red', gemstone: 'Red Coral', nature: 'Dynamic, pioneering, courageous spirit' },
    { name: 'Vrishabha (Taurus)', shortName: 'Vrishabha', lord: 'Venus (Shukra)', element: 'Earth', color: 'Pure White / Rose', gemstone: 'Diamond / White Sapphire', nature: 'Steadfast, aesthetic elegance, grounded patience' },
    { name: 'Mithuna (Gemini)', shortName: 'Mithuna', lord: 'Mercury (Budha)', element: 'Air', color: 'Emerald Green', gemstone: 'Emerald (Panna)', nature: 'Intellectual brilliance, versatile eloquence' },
    { name: 'Karka (Cancer)', shortName: 'Karka', lord: 'Moon (Chandra)', element: 'Water', color: 'Pearl White / Silver', gemstone: 'Natural Pearl (Moti)', nature: 'Profound emotional depth, intuitive devotion' },
    { name: 'Simha (Leo)', shortName: 'Simha', lord: 'Sun (Surya)', element: 'Fire', color: 'Golden Amber / Ruby', gemstone: 'Ruby (Manikya)', nature: 'Noble radiance, magnetic leadership, solar vitality' },
    { name: 'Kanya (Virgo)', shortName: 'Kanya', lord: 'Mercury (Budha)', element: 'Earth', color: 'Forest Green', gemstone: 'Emerald (Panna)', nature: 'Analytical clarity, refined discernment, healing seva' },
    { name: 'Tula (Libra)', shortName: 'Tula', lord: 'Venus (Shukra)', element: 'Air', color: 'Pastel Blue / Opal White', gemstone: 'White Sapphire / Diamond', nature: 'Harmonic equilibrium, diplomatic grace, dharmic justice' },
    { name: 'Vrishchika (Scorpio)', shortName: 'Vrishchika', lord: 'Mars / Ketu', element: 'Water', color: 'Deep Maroon / Crimson', gemstone: 'Red Coral (Moonga)', nature: 'Mystic depth, transformative willpower, spiritual intensity' },
    { name: 'Dhanu (Sagittarius)', shortName: 'Dhanu', lord: 'Jupiter (Guru)', element: 'Fire', color: 'Saffron Gold / Yellow', gemstone: 'Yellow Sapphire (Pukhraj)', nature: 'Philosophical aspiration, higher dharma, expansive wisdom' },
    { name: 'Makara (Capricorn)', shortName: 'Makara', lord: 'Saturn (Shani)', element: 'Earth', color: 'Midnight Navy / Charcoal', gemstone: 'Blue Sapphire (Neelam)', nature: 'Tapasya, steadfast endurance, karmic mastery' },
    { name: 'Kumbha (Aquarius)', shortName: 'Kumbha', lord: 'Saturn / Rahu', element: 'Air', color: 'Electric Blue / Violet', gemstone: 'Blue Sapphire / Hessonite', nature: 'Visionary altruism, cosmic consciousness, liberation' },
    { name: 'Meena (Pisces)', shortName: 'Meena', lord: 'Jupiter (Guru)', element: 'Water', color: 'Aquamarine / Golden Ochre', gemstone: 'Yellow Sapphire (Pukhraj)', nature: 'Universal compassion, transcendent serenity, moksha orientation' }
  ];

  const NAKSHATRAS = [
    { name: 'Ashwini', lord: 'Ketu', deity: 'Ashvini Kumaras', symbol: 'Horse Head', quality: 'Swift Healing & Renewal' },
    { name: 'Bharani', lord: 'Venus', deity: 'Yama', symbol: 'Yoni', quality: 'Sacred Restraint & Creative Fire' },
    { name: 'Krittika', lord: 'Sun', deity: 'Agni', symbol: 'Flame / Razor', quality: 'Purifying Radiance & Truth' },
    { name: 'Rohini', lord: 'Moon', deity: 'Brahma', symbol: 'Celestial Chariot', quality: 'Fertile Grace & Aesthetic Charm' },
    { name: 'Mrigashira', lord: 'Mars', deity: 'Soma (Moon)', symbol: 'Deer Head', quality: 'Searching Spirit, Gentle Wisdom & Vitality' },
    { name: 'Ardra', lord: 'Rahu', deity: 'Rudra', symbol: 'Teardrop / Diamond', quality: 'Storm Clearance & Breakthrough' },
    { name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', symbol: 'Bow & Quiver', quality: 'Return of Light & Boundless Grace' },
    { name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', symbol: 'Sacred Lotus / Udder', quality: 'Supreme Spiritual Nourishment' },
    { name: 'Ashlesha', lord: 'Mercury', deity: 'Sarpa (Nagas)', symbol: 'Coiled Serpent', quality: 'Kundalini Insight & Mystic Perception' },
    { name: 'Magha', lord: 'Ketu', deity: 'Pitris', symbol: 'Royal Throne', quality: 'Ancestral Lineage & Dignity' },
    { name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', symbol: 'Hammock / Couch', quality: 'Blissful Prosperity & Harmony' },
    { name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', symbol: 'Four-Legged Bed', quality: 'Enduring Partnerships & Noble Deeds' },
    { name: 'Hasta', lord: 'Moon', deity: 'Savitar (Sun)', symbol: 'Open Palm', quality: 'Manifestation & Masterful Skill' },
    { name: 'Chitra', lord: 'Mars', deity: 'Tvashtar (Vishwakarma)', symbol: 'Brilliant Jewel', quality: 'Architectural Vision & Divine Design' },
    { name: 'Swati', lord: 'Rahu', deity: 'Vayu (Wind)', symbol: 'Coral Shoot', quality: 'Harmonious Independence & Balance' },
    { name: 'Vishakha', lord: 'Jupiter', deity: 'Indragni', symbol: 'Triumphal Arch', quality: 'Focused Resolve & Divine Triumph' },
    { name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', symbol: 'Blossoming Lotus', quality: 'Devotional Friendship & Dharma' },
    { name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', symbol: 'Sacred Talisman', quality: 'Courage, Leadership & Spiritual Primacy' },
    { name: 'Mula', lord: 'Ketu', deity: 'Nirriti', symbol: 'Tied Roots', quality: 'Deep Rooted Truth & Investigation' },
    { name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas (Waters)', symbol: 'Winnowing Fan', quality: 'Invincible Purification & Grace' },
    { name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishvadevas', symbol: 'Elephant Tusk', quality: 'Permanent Righteousness & Victory' },
    { name: 'Shravana', lord: 'Moon', deity: 'Vishnu', symbol: 'Three Footprints', quality: 'Sacred Listening & High Wisdom' },
    { name: 'Dhanishta', lord: 'Mars', deity: 'Eight Vasus', symbol: 'Mridanga / Flute', quality: 'Rhythm of Abundance & Celebration' },
    { name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', symbol: '100 Physicians', quality: 'Esoteric Healing & Cosmic Vision' },
    { name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', symbol: 'Two-Faced Sword', quality: 'Spiritual Asceticism & Intensity' },
    { name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya', symbol: 'Deep Sea Serpent', quality: 'Serene Wisdom & Samadhi' },
    { name: 'Revati', lord: 'Mercury', deity: 'Pushan', symbol: 'Pair of Golden Fish', quality: 'Safe Journey & Spiritual Abundance' }
  ];

  function computeSiderealEphemeris(year, month, day, hours, mins, latDeg, lonDeg, tzOffset = 5.5) {
    // 1. Calculate Universal Time (UT)
    let utHour = hours + mins / 60 - tzOffset;
    let d = day, m = month, y = year;

    if (utHour < 0) {
      utHour += 24;
      d -= 1;
      if (d < 1) {
        m -= 1;
        if (m < 1) { m = 12; y -= 1; }
        d = new Date(y, m, 0).getDate();
      }
    } else if (utHour >= 24) {
      utHour -= 24;
      d += 1;
      const daysInMonth = new Date(y, m, 0).getDate();
      if (d > daysInMonth) {
        d = 1;
        m += 1;
        if (m > 12) { m = 1; y += 1; }
      }
    }

    // 2. Julian Day Number
    let jy = y, jm = m;
    if (jm <= 2) { jy -= 1; jm += 12; }
    const A = Math.floor(jy / 100);
    const B = 2 - A + Math.floor(A / 4);
    const jd = Math.floor(365.25 * (jy + 4716)) + Math.floor(30.6001 * (jm + 1)) + d + B - 1524.5 + utHour / 24.0;
    const T = (jd - 2451545.0) / 36525.0;

    // 3. Dynamic Lahiri Ayanamsha (Chitra Paksha System)
    const ayanamsha = (23.857092 + 1.396042 * T + 0.000308 * T * T) % 360;

    // 4. Obliquity of Ecliptic
    const eps = 23.439291 - 0.0130042 * T - 0.00000016 * T * T;
    const epsRad = (eps * Math.PI) / 180;

    // 5. Greenwich & Local Sidereal Time
    let gmst = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0) % 360;
    if (gmst < 0) gmst += 360;
    let lst = (gmst + lonDeg) % 360;
    if (lst < 0) lst += 360;
    const lstRad = (lst * Math.PI) / 180;
    const phiRad = (latDeg * Math.PI) / 180;

    // 6. Spherical Trigonometry for Ascendant (Lagna)
    const yAsc = Math.cos(lstRad);
    const xAsc = -Math.sin(lstRad) * Math.cos(epsRad) - Math.tan(phiRad) * Math.sin(epsRad);
    let ascTrop = (Math.atan2(yAsc, xAsc) * 180) / Math.PI;
    if (ascTrop < 0) ascTrop += 360;
    let ascSid = (ascTrop - ayanamsha + 360) % 360;

    // 7. Multi-Term Lunar Theory (ELP-2000 Periodic Perturbations)
    const rad = (deg) => (deg * Math.PI) / 180;
    const L_prime = (218.3164477 + 481267.88123421 * T) % 360;
    const D = (297.8501921 + 445267.1114034 * T) % 360;
    const M_sun_val = (357.5291092 + 35999.0502909 * T) % 360;
    const M_prime = (134.9633964 + 477198.8675055 * T) % 360;
    const F = (93.2720950 + 483202.0175233 * T) % 360;

    const dL =
      6.288774 * Math.sin(rad(M_prime)) +
      1.274027 * Math.sin(rad(2 * D - M_prime)) +
      0.658314 * Math.sin(rad(2 * D)) +
      0.213618 * Math.sin(rad(2 * M_prime)) -
      0.185116 * Math.sin(rad(M_sun_val)) -
      0.114332 * Math.sin(rad(2 * F)) +
      0.058793 * Math.sin(rad(2 * D - 2 * M_prime)) +
      0.057066 * Math.sin(rad(2 * D - M_sun_val - M_prime)) +
      0.053322 * Math.sin(rad(2 * D + M_prime)) +
      0.045758 * Math.sin(rad(2 * D - M_sun_val)) +
      0.040923 * Math.sin(rad(M_prime - M_sun_val)) -
      0.034720 * Math.sin(rad(D)) -
      0.030383 * Math.sin(rad(M_sun_val + M_prime)) +
      0.015327 * Math.sin(rad(2 * D - 2 * F)) -
      0.012528 * Math.sin(rad(2 * F + M_prime)) -
      0.010980 * Math.sin(rad(2 * F - M_prime)) +
      0.010675 * Math.sin(rad(4 * D - M_prime)) +
      0.010034 * Math.sin(rad(3 * M_prime));

    let moonTrop = (L_prime + dL + 3600) % 360;
    let moonSid = (moonTrop - ayanamsha + 360) % 360;

    // 8. Solar Position
    const L0_sun = (280.4665 + 36000.7698 * T) % 360;
    const C_sun = (1.914602 - 0.004817 * T) * Math.sin(rad(M_sun_val)) + (0.019993 - 0.000101 * T) * Math.sin(rad(2 * M_sun_val)) + 0.000289 * Math.sin(rad(3 * M_sun_val));
    const sunTrop = (L0_sun + C_sun + 360) % 360;
    const sunSid = (sunTrop - ayanamsha + 360) % 360;

    // 9. Zodiac & Nakshatra Calculations
    const lagnaRashiIdx = Math.floor(ascSid / 30) % 12;
    const lagnaDegInRashi = ascSid % 30;
    const lagnaNakIdx = Math.floor(ascSid / (360 / 27)) % 27;
    const lagnaPada = Math.floor((ascSid % (360 / 27)) / (360 / 108)) + 1;

    const moonRashiIdx = Math.floor(moonSid / 30) % 12;
    const moonDegInRashi = moonSid % 30;
    const moonNakIdx = Math.floor(moonSid / (360 / 27)) % 27;
    const moonPada = Math.floor((moonSid % (360 / 27)) / (360 / 108)) + 1;

    const sunRashiIdx = Math.floor(sunSid / 30) % 12;
    const sunDegInRashi = sunSid % 30;
    const sunNakIdx = Math.floor(sunSid / (360 / 27)) % 27;
    const sunPada = Math.floor((sunSid % (360 / 27)) / (360 / 108)) + 1;

    return {
      jd,
      ayanamsha,
      lagna: {
        rashi: RASHIS[lagnaRashiIdx],
        rashiIdx: lagnaRashiIdx,
        deg: ascSid,
        degInRashi: lagnaDegInRashi,
        nakshatra: NAKSHATRAS[lagnaNakIdx],
        pada: lagnaPada
      },
      moon: {
        rashi: RASHIS[moonRashiIdx],
        rashiIdx: moonRashiIdx,
        deg: moonSid,
        degInRashi: moonDegInRashi,
        nakshatra: NAKSHATRAS[moonNakIdx],
        pada: moonPada
      },
      sun: {
        rashi: RASHIS[sunRashiIdx],
        rashiIdx: sunRashiIdx,
        deg: sunSid,
        degInRashi: sunDegInRashi,
        nakshatra: NAKSHATRAS[sunNakIdx],
        pada: sunPada
      }
    };
  }

  function formatDMS(degFloat) {
    const d = Math.floor(degFloat);
    const m = Math.floor((degFloat - d) * 60);
    return `${d}° ${m < 10 ? '0' : ''}${m}'`;
  }

  // ==========================================================================
  // 4. KUNDLI FORM CONTROLLER & RESULT RENDERER
  // ==========================================================================
  function initKundliCalculator() {
    const form = document.getElementById('kundliForm');
    const resultPanel = document.getElementById('blueprintResultPanel');
    if (!form || !resultPanel) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('kName')?.value || 'Seeker').trim();
      const rawDob = document.getElementById('kDob')?.value;
      const rawTob = document.getElementById('kTob')?.value || '12:00';
      const rawCity = (document.getElementById('kCity')?.value || 'Angul, India').trim();

      const parsedDate = parseDateInput(rawDob);
      if (!parsedDate) {
        alert('Please enter a valid Date of Birth (e.g. DD/MM/YYYY or select from calendar).');
        return;
      }

      const parsedTime = parseTimeInput(rawTob);
      const geo = resolveCoordinates(rawCity);

      // Execute Astronomical Sidereal calculation
      const chart = computeSiderealEphemeris(
        parsedDate.year,
        parsedDate.month,
        parsedDate.day,
        parsedTime.hours,
        parsedTime.mins,
        geo.lat,
        geo.lon,
        geo.tz
      );

      // Populate Result Card
      const lagnaEl = document.getElementById('resLagna');
      const rashiEl = document.getElementById('resRashi');
      const nakshatraEl = document.getElementById('resNakshatra');
      const lagnaSubEl = document.getElementById('resLagnaSub');
      const rashiSubEl = document.getElementById('resRashiSub');
      const nakshatraSubEl = document.getElementById('resNakshatraSub');
      const sunEl = document.getElementById('resSun');
      const sunSubEl = document.getElementById('resSunSub');
      const elementEl = document.getElementById('resElement');
      const elementSubEl = document.getElementById('resElementSub');
      const gemColorEl = document.getElementById('resGemColor');
      const gemColorSubEl = document.getElementById('resGemColorSub');

      if (lagnaEl) lagnaEl.textContent = chart.lagna.rashi.shortName;
      if (lagnaSubEl) lagnaSubEl.textContent = `${formatDMS(chart.lagna.degInRashi)} • ${chart.lagna.rashi.lord}`;

      if (rashiEl) rashiEl.textContent = chart.moon.rashi.shortName;
      if (rashiSubEl) rashiSubEl.textContent = `${formatDMS(chart.moon.degInRashi)} • ${chart.moon.rashi.lord}`;

      if (nakshatraEl) nakshatraEl.textContent = `${chart.moon.nakshatra.name} (P${chart.moon.pada})`;
      if (nakshatraSubEl) nakshatraSubEl.textContent = `Deity: ${chart.moon.nakshatra.deity}`;

      if (sunEl) sunEl.textContent = chart.sun.rashi.shortName;
      if (sunSubEl) sunSubEl.textContent = `${formatDMS(chart.sun.degInRashi)} • ${chart.sun.nakshatra.name}`;

      if (elementEl) elementEl.textContent = `${chart.lagna.rashi.element} & ${chart.moon.rashi.element}`;
      if (elementSubEl) elementSubEl.textContent = `${chart.lagna.rashi.nature.split(',')[0]} • ${chart.moon.rashi.nature.split(',')[0]}`;

      if (gemColorEl) gemColorEl.textContent = `${chart.lagna.rashi.gemstone}`;
      if (gemColorSubEl) gemColorSubEl.textContent = `${chart.lagna.rashi.color}`;

      // Format Date/Time nicely for user
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const formattedDate = `${parsedDate.day} ${monthNames[parsedDate.month - 1]} ${parsedDate.year}`;
      const h12 = parsedTime.hours % 12 || 12;
      const ampm = parsedTime.hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${h12}:${parsedTime.mins < 10 ? '0' : ''}${parsedTime.mins} ${ampm}`;

      // Inspiring Personalized Discernment Takeaway
      const takeaway = `✦ <strong>${name}</strong>: Your Lagna is <strong>${chart.lagna.rashi.name}</strong> (${formatDMS(chart.lagna.degInRashi)}, governed by ${chart.lagna.rashi.lord}), with Moon in <strong>${chart.moon.rashi.name}</strong> under the star of <strong>${chart.moon.nakshatra.name} (Pada ${chart.moon.pada})</strong>. This grants <em>${chart.moon.nakshatra.quality}</em> paired with ${chart.lagna.rashi.nature.toLowerCase()}. Your Sun sits in <strong>${chart.sun.rashi.name}</strong>, harmonizing inner intuition with decisive outer action.`;
      
      const takeawayEl = document.getElementById('resTakeaway');
      if (takeawayEl) takeawayEl.innerHTML = takeaway;

      // Pre-fill direct WhatsApp consultation URL
      const waMsg = encodeURIComponent(`Hi Shri Moksham, I generated my Cosmic Blueprint on the portal:

*Name:* ${name}
*Date of Birth:* ${formattedDate}
*Time of Birth:* ${formattedTime}
*Birth Place:* ${rawCity}

🪐 *Vedic Lagna (Ascendant):* ${chart.lagna.rashi.name} (${formatDMS(chart.lagna.degInRashi)})
🌙 *Moon Rashi (Chandra):* ${chart.moon.rashi.name} (${formatDMS(chart.moon.degInRashi)})
⭐ *Birth Nakshatra:* ${chart.moon.nakshatra.name} (Pada ${chart.moon.pada} • Deity: ${chart.moon.nakshatra.deity})
☀️ *Sun Sign (Surya):* ${chart.sun.rashi.name} (${formatDMS(chart.sun.degInRashi)})
💎 *Auspicious Gem & Element:* ${chart.lagna.rashi.gemstone} (${chart.lagna.rashi.element})

I would like a detailed 1-on-1 Vedic Jyotish discernment and Satvik remedies.`);

      const consultBtn = document.getElementById('resConsultBtn');
      if (consultBtn) {
        consultBtn.href = `https://wa.me/919997066326?text=${waMsg}`;
      }

      resultPanel.style.display = 'block';
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // ==========================================================================
  // 5. HIGH-PRECISION ASTRONOMICAL DIURNAL ENGINE (RISHIKESH & WORLD)
  // ==========================================================================
  function computeSunriseSunset(date, lat = 30.0869, lon = 78.2676, tzOffset = 5.5) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const gamma = (2 * Math.PI / 365) * (dayOfYear - 1 + (date.getHours() - 12) / 24);

    // Equation of time in minutes
    const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(gamma) - 0.032077 * Math.sin(gamma)
      - 0.014615 * Math.cos(2 * gamma) - 0.040849 * Math.sin(2 * gamma));

    // Solar declination in radians
    const decl = 0.006918 - 0.399912 * Math.cos(gamma) + 0.070257 * Math.sin(gamma)
      - 0.006758 * Math.cos(2 * gamma) + 0.000907 * Math.sin(2 * gamma)
      - 0.002697 * Math.cos(3 * gamma) + 0.00148 * Math.sin(3 * gamma);

    const latRad = (lat * Math.PI) / 180;
    const zenithRad = (90.8333 * Math.PI) / 180; // Atmospheric refraction & solar disc

    const cosHA = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(decl)) / (Math.cos(latRad) * Math.cos(decl));
    const clampedCosHA = Math.max(-1, Math.min(1, cosHA));
    const haDeg = Math.acos(clampedCosHA) * (180 / Math.PI);

    const solarNoonUTC = 720 - 4 * lon - eqtime;
    const solarNoonLocal = solarNoonUTC + tzOffset * 60;

    const sunriseMinutes = solarNoonLocal - haDeg * 4;
    const sunsetMinutes = solarNoonLocal + haDeg * 4;

    const formatMin = (m) => {
      let hrs = Math.floor(m / 60);
      let mins = Math.floor(m % 60);
      let period = hrs >= 12 ? 'PM' : 'AM';
      let displayHrs = hrs % 12 || 12;
      return `${displayHrs}:${mins < 10 ? '0' : ''}${mins} ${period}`;
    };

    // Abhijit Muhurat: 8th Muhurat of daylight span (48 minutes)
    const daySpan = sunsetMinutes - sunriseMinutes;
    const oneMuhurat = daySpan / 15;
    const abhijitStart = sunriseMinutes + 7 * oneMuhurat;
    const abhijitEnd = sunriseMinutes + 8 * oneMuhurat;

    // Rahu Kaal: 8 daytime divisions according to Day of Week
    // Sun: 8th, Mon: 2nd, Tue: 7th, Wed: 5th, Thu: 6th, Fri: 4th, Sat: 3rd
    const rahuParts = [8, 2, 7, 5, 6, 4, 3];
    const dayOfWeek = date.getDay();
    const rahuPartIdx = rahuParts[dayOfWeek] - 1;
    const partDuration = daySpan / 8;
    const rahuStart = sunriseMinutes + rahuPartIdx * partDuration;
    const rahuEnd = rahuStart + partDuration;

    return {
      sunriseStr: formatMin(sunriseMinutes),
      sunsetStr: formatMin(sunsetMinutes),
      abhijitStr: `${formatMin(abhijitStart)} – ${formatMin(abhijitEnd)}`,
      rahuKaalStr: `${formatMin(rahuStart)} – ${formatMin(rahuEnd)}`,
      sunriseMinutes,
      sunsetMinutes
    };
  }

  // ==========================================================================
  // 6. REAL-TIME PANCHANG (DUAL CHANDRA & SURYA MANA) ENGINE
  // ==========================================================================
  function initLivePanchang() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

    const panchangDateEl = document.getElementById('panchangDate');
    if (panchangDateEl) panchangDateEl.textContent = dateStr;

    // Reference Coordinate: Sacred Rishikesh (30.0869° N, 78.2676° E, IST +5.5)
    const rishiLat = 30.0869;
    const rishiLon = 78.2676;
    const rishiTz = 5.5;

    // Real-time Sidereal Ephemeris for today's exact moment
    const chartToday = computeSiderealEphemeris(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      rishiLat,
      rishiLon,
      rishiTz
    );

    // Diurnal Astronomical Timings (Sunrise, Sunset, Abhijit, Rahu Kaal)
    const diurnal = computeSunriseSunset(now, rishiLat, rishiLon, rishiTz);

    // ------------------------------------------------------------------------
    // A. CHANDRA MANA (LUNAR TITHI & METRICS)
    // ------------------------------------------------------------------------
    let angle = (chartToday.moon.deg - chartToday.sun.deg + 360) % 360;
    let tithiNum = Math.floor(angle / 12) + 1;
    let isShukla = tithiNum <= 15;
    let tithiIndexInPaksha = isShukla ? tithiNum : tithiNum - 15;
    let paksha = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';
    let tithiProgressPercent = Math.min(100, Math.max(1, Math.round(((angle % 12) / 12) * 100)));

    const tithiNames = [
      'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
      'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
      'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi',
      isShukla ? 'Purnima' : 'Amavasya'
    ];
    const currentTithiName = tithiNames[tithiIndexInPaksha - 1] || 'Pratipada';
    const currentFullTithi = `${paksha} ${currentTithiName}`;

    // Amanta Lunar Months based on Sun's Sidereal Transit Sign
    const CHANDRA_MAAS = [
      'Mesha (Chaitra)', 'Vaishakha', 'Jyeshtha', 'Ashadha', 
      'Shravana', 'Bhadrapada', 'Ashvina', 'Kartika', 
      'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
    ];
    const chandraMaasName = CHANDRA_MAAS[(chartToday.sun.rashiIdx + 1) % 12];

    // Chandra UI bindings
    const pPakshaBadge = document.getElementById('pPakshaBadge');
    if (pPakshaBadge) pPakshaBadge.textContent = paksha;

    const pChandraTithi = document.getElementById('pChandraTithi');
    if (pChandraTithi) pChandraTithi.textContent = `${currentFullTithi} (${tithiIndexInPaksha})`;

    const pChandraProgress = document.getElementById('pChandraProgress');
    if (pChandraProgress) pChandraProgress.style.width = `${tithiProgressPercent}%`;

    const pChandraProgressText = document.getElementById('pChandraProgressText');
    if (pChandraProgressText) pChandraProgressText.textContent = `${tithiProgressPercent}% elapsed in current tithi`;

    const pChandraMaas = document.getElementById('pChandraMaas');
    if (pChandraMaas) pChandraMaas.textContent = `${chandraMaasName} Maas`;

    const pChandraRashi = document.getElementById('pChandraRashi');
    if (pChandraRashi) pChandraRashi.textContent = `${chartToday.moon.rashi.shortName} (${chartToday.moon.degInRashi.toFixed(1)}°)`;

    const pChandraNakshatra = document.getElementById('pChandraNakshatra');
    if (pChandraNakshatra) pChandraNakshatra.textContent = `${chartToday.moon.nakshatra.name} (Pada ${chartToday.moon.pada}, Lord: ${chartToday.moon.nakshatra.lord})`;

    // Backward-compatibility fallback for pTithi / pNakshatra
    const tithiEl = document.getElementById('pTithi');
    if (tithiEl) tithiEl.textContent = currentFullTithi;
    const nakshatraEl = document.getElementById('pNakshatra');
    if (nakshatraEl) nakshatraEl.textContent = `${chartToday.moon.nakshatra.name} (Pada ${chartToday.moon.pada})`;

    // ------------------------------------------------------------------------
    // B. SURYA MANA (SOLAR TITHI / SAUR PRAVISHTE & METRICS)
    // ------------------------------------------------------------------------
    const saurDay = Math.floor(chartToday.sun.degInRashi) + 1;
    const solarMonthProgress = Math.min(100, Math.max(1, Math.round((chartToday.sun.degInRashi / 30) * 100)));
    const saurTithiText = `${chartToday.sun.rashi.shortName} ${saurDay} Pravishte`;

    const pSuryaBadge = document.getElementById('pSuryaBadge');
    if (pSuryaBadge) pSuryaBadge.textContent = `Saur Day ${saurDay}`;

    const pSuryaTithi = document.getElementById('pSuryaTithi');
    if (pSuryaTithi) pSuryaTithi.textContent = saurTithiText;

    const pSuryaProgress = document.getElementById('pSuryaProgress');
    if (pSuryaProgress) pSuryaProgress.style.width = `${solarMonthProgress}%`;

    const pSuryaProgressText = document.getElementById('pSuryaProgressText');
    if (pSuryaProgressText) pSuryaProgressText.textContent = `Day ${saurDay} of 30 (${solarMonthProgress}% in ${chartToday.sun.rashi.shortName})`;

    const pSuryaMaas = document.getElementById('pSuryaMaas');
    if (pSuryaMaas) pSuryaMaas.textContent = `${chartToday.sun.rashi.shortName} Saur Maas`;

    const pSuryaRashi = document.getElementById('pSuryaRashi');
    if (pSuryaRashi) pSuryaRashi.textContent = `${chartToday.sun.rashi.name} (${chartToday.sun.degInRashi.toFixed(1)}°)`;

    const pSuryaNakshatra = document.getElementById('pSuryaNakshatra');
    if (pSuryaNakshatra) pSuryaNakshatra.textContent = `${chartToday.sun.nakshatra.name} (Pada ${chartToday.sun.pada}, Lord: ${chartToday.sun.nakshatra.lord})`;

    // ------------------------------------------------------------------------
    // C. COSMIC YOGA & ACTIVE KARANA
    // ------------------------------------------------------------------------
    const YOGAS = [
      'Vishkumbha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
      'Atiganda', 'Sukarma', 'Dhriti', 'Shoola', 'Ganda',
      'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
      'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
      'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
      'Indra', 'Vaidhriti'
    ];
    const sumAngle = (chartToday.moon.deg + chartToday.sun.deg) % 360;
    const yogaIdx = Math.floor(sumAngle / (360 / 27)) % 27;
    const yogaEl = document.getElementById('pYoga');
    if (yogaEl) yogaEl.textContent = `${YOGAS[yogaIdx]} Yoga`;

    const KARANAS = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti (Bhadra)', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'];
    const karanaIdx = Math.floor(angle / 6) % 11;
    const karanaEl = document.getElementById('pKarana');
    if (karanaEl) karanaEl.textContent = KARANAS[karanaIdx];

    // ------------------------------------------------------------------------
    // D. SUNRISE, SUNSET, ABHIJIT & RAHU KAAL
    // ------------------------------------------------------------------------
    const sunriseEl = document.getElementById('pSunrise');
    if (sunriseEl) sunriseEl.textContent = diurnal.sunriseStr;

    const sunsetEl = document.getElementById('pSunset');
    if (sunsetEl) sunsetEl.textContent = diurnal.sunsetStr;

    const abhijitEl = document.getElementById('pAbhijitTime');
    if (abhijitEl) abhijitEl.textContent = diurnal.abhijitStr;

    const rahuEl = document.getElementById('pRahuKaalTime');
    if (rahuEl) rahuEl.textContent = diurnal.rahuKaalStr;

    // ------------------------------------------------------------------------
    // E. SYNC TOPBAR TICKER BROADCAST
    // ------------------------------------------------------------------------
    const tickerPanchangItems = document.querySelectorAll('.live-topbar-panchang');
    const tickerBroadcast = `<span class="ticker-live-dot"></span> <b>LIVE PANCHANG:</b> Chandra: ${currentFullTithi} | Surya: ${chartToday.sun.rashi.shortName} Day ${saurDay} • ${chartToday.moon.nakshatra.name} Nakshatra`;
    tickerPanchangItems.forEach(el => {
      el.innerHTML = tickerBroadcast;
    });
  }

  // Initialize upon document readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initKundliCalculator();
      initLivePanchang();
    });
  } else {
    initKundliCalculator();
    initLivePanchang();
  }
})();
