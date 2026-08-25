/* ==========================================================================
   ATMOSPHERE — WEATHER DASHBOARD LOGIC (SCRIPT.JS)
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. WMO Weather Code Configuration (SVG Icons, Labels, Themes)
  // --------------------------------------------------------------------------
  const WMO_CODES = {
    0: { label: 'Clear Sky', icon: (isDay) => getClearIcon(isDay), theme: (isDay) => isDay ? 'theme-clear-day' : 'theme-clear-night' },
    1: { label: 'Mainly Clear', icon: (isDay) => getPartlyCloudyIcon(isDay), theme: (isDay) => isDay ? 'theme-clear-day' : 'theme-clear-night' },
    2: { label: 'Partly Cloudy', icon: (isDay) => getPartlyCloudyIcon(isDay), theme: () => 'theme-cloudy' },
    3: { label: 'Overcast', icon: () => getOvercastIcon(), theme: () => 'theme-cloudy' },
    45: { label: 'Foggy', icon: () => getFogIcon(), theme: () => 'theme-fog' },
    48: { label: 'Depositing Rime Fog', icon: () => getFogIcon(), theme: () => 'theme-fog' },
    51: { label: 'Light Drizzle', icon: () => getDrizzleIcon(), theme: () => 'theme-rain' },
    53: { label: 'Moderate Drizzle', icon: () => getDrizzleIcon(), theme: () => 'theme-rain' },
    55: { label: 'Dense Drizzle', icon: () => getDrizzleIcon(), theme: () => 'theme-rain' },
    56: { label: 'Freezing Drizzle', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    57: { label: 'Dense Freezing Drizzle', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    61: { label: 'Slight Rain', icon: () => getRainIcon(), theme: () => 'theme-rain' },
    63: { label: 'Moderate Rain', icon: () => getRainIcon(), theme: () => 'theme-rain' },
    65: { label: 'Heavy Rain', icon: () => getHeavyRainIcon(), theme: () => 'theme-rain' },
    66: { label: 'Light Freezing Rain', icon: () => getRainIcon(), theme: () => 'theme-snow' },
    67: { label: 'Heavy Freezing Rain', icon: () => getHeavyRainIcon(), theme: () => 'theme-snow' },
    71: { label: 'Slight Snow Fall', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    73: { label: 'Moderate Snow Fall', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    75: { label: 'Heavy Snow Fall', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    77: { label: 'Snow Grains', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    80: { label: 'Slight Rain Showers', icon: () => getRainIcon(), theme: () => 'theme-rain' },
    81: { label: 'Moderate Rain Showers', icon: () => getRainIcon(), theme: () => 'theme-rain' },
    82: { label: 'Violent Rain Showers', icon: () => getHeavyRainIcon(), theme: () => 'theme-rain' },
    85: { label: 'Slight Snow Showers', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    86: { label: 'Heavy Snow Showers', icon: () => getSnowIcon(), theme: () => 'theme-snow' },
    95: { label: 'Thunderstorm', icon: () => getThunderIcon(), theme: () => 'theme-thunderstorm' },
    96: { label: 'Thunderstorm with Hail', icon: () => getThunderIcon(), theme: () => 'theme-thunderstorm' },
    99: { label: 'Heavy Thunderstorm', icon: () => getThunderIcon(), theme: () => 'theme-thunderstorm' }
  };

  function getWeatherDetails(code, isDay = 1) {
    const defaultDetails = { label: 'Unknown Weather', icon: () => getPartlyCloudyIcon(isDay), theme: () => 'theme-default' };
    return WMO_CODES[code] || defaultDetails;
  }

  // Crisp Vector SVG Generators for Weather Icons
  function getClearIcon(isDay) {
    if (isDay) {
      return `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <circle cx="32" cy="32" r="14" fill="#FBBF24" stroke="#F59E0B" stroke-width="2"/>
        <path d="M32 6v6M32 52v6M6 32h6M52 32h6M13.6 13.6l4.2 4.2M46.2 46.2l4.2 4.2M13.6 50.4l4.2-4.2M46.2 17.8l4.2-4.2" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
      </svg>`;
    } else {
      return `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor">
        <path d="M42 16A18 18 0 1 1 20 40a18 18 0 0 0 22-24z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="2"/>
        <circle cx="48" cy="18" r="2" fill="#F8FAFC"/>
        <circle cx="40" cy="10" r="1.5" fill="#F8FAFC"/>
      </svg>`;
    }
  }

  function getPartlyCloudyIcon(isDay) {
    return `<svg viewBox="0 0 64 64" fill="none">
      ${isDay ? '<circle cx="24" cy="24" r="11" fill="#FBBF24"/>' : '<path d="M30 14A14 14 0 1 1 14 32a14 14 0 0 0 16-18z" fill="#E2E8F0"/>'}
      <path d="M22 46c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 54 41a7 7 0 0 1-1 14H22a8 8 0 0 1 0-16z" fill="#94A3B8" fill-opacity="0.9" stroke="#E2E8F0" stroke-width="2"/>
    </svg>`;
  }

  function getOvercastIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M16 42c0-6 4-10 10-10 1 0 2 0 3 .3A9 9 0 0 1 46 37a6 6 0 0 1-1 12H16a7 7 0 0 1 0-14z" fill="#64748B" fill-opacity="0.8"/>
      <path d="M24 50c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 56 45a7 7 0 0 1-1 14H24a8 8 0 0 1 0-16z" fill="#94A3B8" stroke="#E2E8F0" stroke-width="2"/>
    </svg>`;
  }

  function getFogIcon() {
    return `<svg viewBox="0 0 64 64" fill="none" stroke="#94A3B8" stroke-width="3" stroke-linecap="round">
      <path d="M18 42c0-5 4-9 9-9 1 0 2 0 3 .3A8 8 0 0 1 45 38a6 6 0 0 1-1 11H18a6 6 0 0 1 0-12z" fill="#64748B" fill-opacity="0.5"/>
      <line x1="14" y1="46" x2="50" y2="46"/>
      <line x1="18" y1="52" x2="46" y2="52"/>
    </svg>`;
  }

  function getDrizzleIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M20 38c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 52 33a7 7 0 0 1-1 14H20a8 8 0 0 1 0-16z" fill="#94A3B8"/>
      <path d="M24 52v4M36 52v4M48 52v4" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  function getRainIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M20 34c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 52 29a7 7 0 0 1-1 14H20a8 8 0 0 1 0-16z" fill="#64748B"/>
      <path d="M24 48l-3 8M34 48l-3 8M44 48l-3 8" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  function getHeavyRainIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M20 30c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 52 25a7 7 0 0 1-1 14H20a8 8 0 0 1 0-16z" fill="#475569"/>
      <path d="M20 46l-3 10M30 46l-3 10M40 46l-3 10M50 46l-3 10" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  }

  function getSnowIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M20 34c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 52 29a7 7 0 0 1-1 14H20a8 8 0 0 1 0-16z" fill="#94A3B8"/>
      <circle cx="24" cy="50" r="2.5" fill="#E2E8F0"/>
      <circle cx="34" cy="54" r="2.5" fill="#E2E8F0"/>
      <circle cx="44" cy="50" r="2.5" fill="#E2E8F0"/>
    </svg>`;
  }

  function getThunderIcon() {
    return `<svg viewBox="0 0 64 64" fill="none">
      <path d="M20 30c0-6 5-11 11-11 1 0 2 0 3 .3A10 10 0 0 1 52 25a7 7 0 0 1-1 14H20a8 8 0 0 1 0-16z" fill="#334155"/>
      <path d="M34 38l-6 10h6l-3 8 10-12h-6l5-6h-6z" fill="#FBBF24" stroke="#F59E0B" stroke-width="1.5"/>
    </svg>`;
  }

  // --------------------------------------------------------------------------
  // 2. Application State & Memory Cache
  // --------------------------------------------------------------------------
  const state = {
    currentUnit: 'C',         // 'C' or 'F'
    activeWeatherData: null,  // Holds current fetched payload
    recentSearches: [],       // Max 5 items
    cache: new Map(),         // Key: search string, Value: weather payload
    debounceTimer: null
  };

  // --------------------------------------------------------------------------
  // 3. DOM Elements Reference
  // --------------------------------------------------------------------------
  const DOM = {
    ambientBg: document.getElementById('ambientBg'),
    searchForm: document.getElementById('searchForm'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    searchSubmitBtn: document.getElementById('searchSubmitBtn'),
    suggestionsList: document.getElementById('suggestionsList'),
    locationBtn: document.getElementById('locationBtn'),
    unitCBtn: document.getElementById('unitCBtn'),
    unitFBtn: document.getElementById('unitFBtn'),
    recentSearchesContainer: document.getElementById('recentSearchesContainer'),
    recentChips: document.getElementById('recentChips'),
    
    // States
    emptyState: document.getElementById('emptyState'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    dashboardContent: document.getElementById('dashboardContent'),
    
    // Error elements
    errorTitle: document.getElementById('errorTitle'),
    errorMessage: document.getElementById('errorMessage'),
    errorRetryBtn: document.getElementById('errorRetryBtn'),
    
    // Weather elements
    cityName: document.getElementById('cityName'),
    countryName: document.getElementById('countryName'),
    localTime: document.getElementById('localTime'),
    currentTemp: document.getElementById('currentTemp'),
    conditionLabel: document.getElementById('conditionLabel'),
    feelsLike: document.getElementById('feelsLike'),
    weatherIconContainer: document.getElementById('weatherIconContainer'),
    
    // Metrics
    metricHumidity: document.getElementById('metricHumidity'),
    metricWind: document.getElementById('metricWind'),
    metricUV: document.getElementById('metricUV'),
    metricPressure: document.getElementById('metricPressure'),
    
    // Forecast tracks
    hourlyTrack: document.getElementById('hourlyTrack'),
    dailyGrid: document.getElementById('dailyGrid')
  };

  // --------------------------------------------------------------------------
  // 4. State Management & Renderer Engine
  // --------------------------------------------------------------------------
  function setUIState(uiState, errorDetails = {}) {
    DOM.emptyState.classList.add('hidden');
    DOM.loadingState.classList.add('hidden');
    DOM.errorState.classList.add('hidden');
    DOM.dashboardContent.classList.add('hidden');

    if (uiState === 'EMPTY') {
      DOM.emptyState.classList.remove('hidden');
      applyTheme('theme-default');
    } else if (uiState === 'LOADING') {
      DOM.loadingState.classList.remove('hidden');
    } else if (uiState === 'ERROR') {
      DOM.errorState.classList.remove('hidden');
      DOM.errorTitle.textContent = errorDetails.title || 'Error Occurred';
      DOM.errorMessage.textContent = errorDetails.message || 'Unable to complete weather request.';
      applyTheme('theme-default');
    } else if (uiState === 'SUCCESS') {
      DOM.dashboardContent.classList.remove('hidden');
    }
  }

  function applyTheme(themeClass) {
    document.body.className = '';
    document.body.classList.add(themeClass);
  }

  // Temperature unit helpers
  function convertTemp(celsius, toUnit) {
    if (celsius === null || celsius === undefined) return '--';
    if (toUnit === 'F') {
      return Math.round((celsius * 9 / 5) + 32);
    }
    return Math.round(celsius);
  }

  function formatWind(windKph, unit) {
    if (unit === 'F') {
      const mph = Math.round(windKph * 0.621371);
      return `${mph} mph`;
    }
    return `${Math.round(windKph)} km/h`;
  }

  // --------------------------------------------------------------------------
  // 5. Open-Meteo API Fetch Handlers
  // --------------------------------------------------------------------------

  // Search Geocoding API by City Name
  async function geocodeCity(query) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Geocoding service unavailable.');
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`No city found matching "${query}". Please check spelling.`);
    }
    return data.results;
  }

  // Fetch Weather Data by Latitude and Longitude
  async function fetchWeatherData(lat, lon, locationInfo) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather data service unavailable.');
    const weatherRaw = await response.json();

    return {
      location: locationInfo,
      weather: weatherRaw
    };
  }

  // Execute Complete Weather Search Pipeline
  async function handleCitySearch(cityName) {
    if (!cityName || !cityName.trim()) return;
    const cleanQuery = cityName.trim();

    // Check memory cache
    const cacheKey = cleanQuery.toLowerCase();
    if (state.cache.has(cacheKey)) {
      console.log(`Cache hit for "${cleanQuery}"`);
      state.activeWeatherData = state.cache.get(cacheKey);
      renderDashboard(state.activeWeatherData);
      addRecentSearch(state.activeWeatherData.location.name, state.activeWeatherData.location.country);
      return;
    }

    setUIState('LOADING');
    toggleSearchButtonLoading(true);

    try {
      const geoResults = await geocodeCity(cleanQuery);
      const firstResult = geoResults[0];

      const locationInfo = {
        name: firstResult.name,
        country: firstResult.country || firstResult.admin1 || '',
        admin1: firstResult.admin1 || '',
        latitude: firstResult.latitude,
        longitude: firstResult.longitude
      };

      const fullData = await fetchWeatherData(firstResult.latitude, firstResult.longitude, locationInfo);

      // Store in memory cache
      state.cache.set(cacheKey, fullData);
      state.activeWeatherData = fullData;

      renderDashboard(fullData);
      addRecentSearch(locationInfo.name, locationInfo.country);

    } catch (err) {
      console.error('Search error:', err);
      setUIState('ERROR', {
        title: 'Location Not Found',
        message: err.message || 'We could not find weather data for that city.'
      });
    } finally {
      toggleSearchButtonLoading(false);
    }
  }

  // Reverse Geocode for Browser GPS Geolocation
  async function handleGeolocationSearch() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setUIState('LOADING');
    toggleSearchButtonLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Perform reverse lookup or fallback to Lat/Lon display name
          let locationInfo = {
            name: 'Current Location',
            country: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
            latitude: lat,
            longitude: lon
          };

          try {
            const revUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${lat},${lon}&count=1&language=en&format=json`;
            const revResp = await fetch(revUrl);
            if (revResp.ok) {
              const revData = await revResp.json();
              if (revData.results && revData.results.length > 0) {
                locationInfo.name = revData.results[0].name;
                locationInfo.country = revData.results[0].country || '';
              }
            }
          } catch (e) {
            // Non-critical reverse lookup error fallback
          }

          const fullData = await fetchWeatherData(lat, lon, locationInfo);
          state.activeWeatherData = fullData;

          renderDashboard(fullData);
          addRecentSearch(locationInfo.name, locationInfo.country);

        } catch (err) {
          setUIState('ERROR', {
            title: 'GPS Location Error',
            message: 'Unable to fetch weather for your current position.'
          });
        } finally {
          toggleSearchButtonLoading(false);
        }
      },
      (error) => {
        toggleSearchButtonLoading(false);
        setUIState('ERROR', {
          title: 'Location Permission Denied',
          message: 'Please allow location access or manually type a city name in the search bar.'
        });
      }
    );
  }

  // --------------------------------------------------------------------------
  // 6. UI Renderers
  // --------------------------------------------------------------------------

  function renderDashboard(data) {
    const { location, weather } = data;
    const current = weather.current;
    const hourly = weather.hourly;
    const daily = weather.daily;

    const weatherMeta = getWeatherDetails(current.weather_code, current.is_day);

    // Apply Weather Atmospheric Theme
    applyTheme(weatherMeta.theme(current.is_day));

    // Render Location Header
    DOM.cityName.textContent = location.name;
    DOM.countryName.textContent = location.country ? `${location.country}` : '';
    
    // Local Time
    const now = new Date();
    DOM.localTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Current Temp & Condition
    DOM.currentTemp.textContent = `${convertTemp(current.temperature_2m, state.currentUnit)}°`;
    DOM.conditionLabel.textContent = weatherMeta.label;
    DOM.feelsLike.textContent = `Feels like ${convertTemp(current.apparent_temperature, state.currentUnit)}°`;
    DOM.weatherIconContainer.innerHTML = weatherMeta.icon(current.is_day);

    // Secondary Metrics
    DOM.metricHumidity.textContent = `${current.relative_humidity_2m}%`;
    DOM.metricWind.textContent = formatWind(current.wind_speed_10m, state.currentUnit);
    DOM.metricUV.textContent = daily.uv_index_max && daily.uv_index_max[0] !== undefined ? daily.uv_index_max[0].toFixed(1) : '--';
    DOM.metricPressure.textContent = `${Math.round(current.surface_pressure)} hPa`;

    // Render Hourly Forecast (Next 24 Hours)
    renderHourlyTrack(hourly, current.is_day);

    // Render 7-Day Forecast
    renderDailyGrid(daily);

    setUIState('SUCCESS');
  }

  function renderHourlyTrack(hourly, isDay) {
    DOM.hourlyTrack.innerHTML = '';
    const timeArray = hourly.time || [];
    const tempArray = hourly.temperature_2m || [];
    const codeArray = hourly.weather_code || [];
    const popArray = hourly.precipitation_probability || [];

    const nowHour = new Date().getHours();

    // Show next 24 hours starting from current hour
    const startIndex = Math.max(0, timeArray.findIndex(t => new Date(t).getHours() >= nowHour));
    const itemsToShow = timeArray.slice(startIndex, startIndex + 24);

    itemsToShow.forEach((timeStr, idx) => {
      const actualIndex = startIndex + idx;
      const dateObj = new Date(timeStr);
      const hourFormatted = dateObj.toLocaleTimeString([], { hour: 'numeric' });
      const isNow = idx === 0;

      const code = codeArray[actualIndex];
      const temp = tempArray[actualIndex];
      const pop = popArray[actualIndex] || 0;

      const hourlyMeta = getWeatherDetails(code, 1);

      const card = document.createElement('div');
      card.className = `hourly-card ${isNow ? 'is-now' : ''}`;
      card.innerHTML = `
        <span class="hourly-time">${isNow ? 'Now' : hourFormatted}</span>
        <div class="hourly-icon">${hourlyMeta.icon(1)}</div>
        <span class="hourly-temp">${convertTemp(temp, state.currentUnit)}°</span>
        ${pop > 10 ? `<span class="hourly-pop">💧 ${pop}%</span>` : ''}
      `;

      DOM.hourlyTrack.appendChild(card);
    });
  }

  function renderDailyGrid(daily) {
    DOM.dailyGrid.innerHTML = '';
    const timeArray = daily.time || [];
    const codeArray = daily.weather_code || [];
    const maxTempArray = daily.temperature_2m_max || [];
    const minTempArray = daily.temperature_2m_min || [];

    // Calculate global min/max range for visual temperature bar
    const globalMin = Math.min(...minTempArray);
    const globalMax = Math.max(...maxTempArray);
    const range = globalMax - globalMin || 1;

    timeArray.forEach((dateStr, idx) => {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const isToday = idx === 0;
      const dayName = isToday ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'short' });
      const monthDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

      const code = codeArray[idx];
      const maxTemp = maxTempArray[idx];
      const minTemp = minTempArray[idx];

      const dailyMeta = getWeatherDetails(code, 1);

      // Percentage for temperature bar styling
      const leftPercent = Math.max(0, Math.min(100, ((minTemp - globalMin) / range) * 100));
      const widthPercent = Math.max(15, Math.min(100 - leftPercent, ((maxTemp - minTemp) / range) * 100));

      const card = document.createElement('div');
      card.className = 'daily-card';
      card.innerHTML = `
        <span class="daily-date">${dayName}</span>
        <span class="daily-subdate">${monthDate}</span>
        <div class="daily-icon">${dailyMeta.icon(1)}</div>
        <span class="daily-condition">${dailyMeta.label}</span>
        <div class="temp-range-bar">
          <span class="temp-low">${convertTemp(minTemp, state.currentUnit)}°</span>
          <div class="temp-bar-bg">
            <div class="temp-bar-fill" style="left: ${leftPercent}%; width: ${widthPercent}%;"></div>
          </div>
          <span class="temp-high">${convertTemp(maxTemp, state.currentUnit)}°</span>
        </div>
      `;

      DOM.dailyGrid.appendChild(card);
    });
  }

  // Re-render UI when switching °C / °F without API call
  function setTemperatureUnit(unit) {
    if (state.currentUnit === unit) return;
    state.currentUnit = unit;

    if (unit === 'C') {
      DOM.unitCBtn.classList.add('active');
      DOM.unitCBtn.setAttribute('aria-pressed', 'true');
      DOM.unitFBtn.classList.remove('active');
      DOM.unitFBtn.setAttribute('aria-pressed', 'false');
    } else {
      DOM.unitFBtn.classList.add('active');
      DOM.unitFBtn.setAttribute('aria-pressed', 'true');
      DOM.unitCBtn.classList.remove('active');
      DOM.unitCBtn.setAttribute('aria-pressed', 'false');
    }

    if (state.activeWeatherData) {
      renderDashboard(state.activeWeatherData);
    }
  }

  // --------------------------------------------------------------------------
  // 7. Recent Searches Bar Engine
  // --------------------------------------------------------------------------
  function addRecentSearch(cityName, countryName) {
    if (!cityName) return;
    const label = countryName ? `${cityName}, ${countryName}` : cityName;

    // Filter duplicates
    state.recentSearches = state.recentSearches.filter(item => item.name.toLowerCase() !== cityName.toLowerCase());
    state.recentSearches.unshift({ name: cityName, label: label });

    // Limit to 5
    if (state.recentSearches.length > 5) {
      state.recentSearches.pop();
    }

    renderRecentChips();
  }

  function renderRecentChips() {
    if (state.recentSearches.length === 0) {
      DOM.recentSearchesContainer.classList.add('hidden');
      return;
    }

    DOM.recentSearchesContainer.classList.remove('hidden');
    DOM.recentChips.innerHTML = '';

    state.recentSearches.forEach(item => {
      const chip = document.createElement('button');
      chip.className = 'recent-chip';
      chip.innerHTML = `<span>📍</span> ${item.name}`;
      chip.addEventListener('click', () => {
        DOM.searchInput.value = item.name;
        handleCitySearch(item.name);
      });
      DOM.recentChips.appendChild(chip);
    });
  }

  // --------------------------------------------------------------------------
  // 8. Auto-Suggestions Dropdown Handler
  // --------------------------------------------------------------------------
  function handleInputSuggestions(e) {
    const val = e.target.value.trim();
    if (val.length > 0) {
      DOM.clearSearchBtn.classList.remove('hidden');
    } else {
      DOM.clearSearchBtn.classList.add('hidden');
      DOM.suggestionsList.classList.add('hidden');
      return;
    }

    if (val.length < 2) {
      DOM.suggestionsList.classList.add('hidden');
      return;
    }

    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(async () => {
      try {
        const results = await geocodeCity(val);
        renderSuggestions(results);
      } catch (e) {
        DOM.suggestionsList.classList.add('hidden');
      }
    }, 300);
  }

  function renderSuggestions(results) {
    if (!results || results.length === 0) {
      DOM.suggestionsList.classList.add('hidden');
      return;
    }

    DOM.suggestionsList.innerHTML = '';
    results.forEach(res => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.role = 'option';
      
      const countryStr = [res.admin1, res.country].filter(Boolean).join(', ');
      li.innerHTML = `
        <strong>${res.name}</strong>
        <span class="suggestion-country">${countryStr}</span>
      `;

      li.addEventListener('click', () => {
        DOM.searchInput.value = res.name;
        DOM.suggestionsList.classList.add('hidden');
        handleCitySearch(res.name);
      });

      DOM.suggestionsList.appendChild(li);
    });

    DOM.suggestionsList.classList.remove('hidden');
  }

  function toggleSearchButtonLoading(isLoading) {
    if (isLoading) {
      DOM.searchSubmitBtn.disabled = true;
      DOM.searchSubmitBtn.innerHTML = '<span class="spinner">Loading...</span>';
    } else {
      DOM.searchSubmitBtn.disabled = false;
      DOM.searchSubmitBtn.innerHTML = '<span>Search</span>';
    }
  }

  // --------------------------------------------------------------------------
  // 9. Event Listeners Setup
  // --------------------------------------------------------------------------
  function initEventListeners() {
    // Form Submit
    DOM.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      DOM.suggestionsList.classList.add('hidden');
      handleCitySearch(DOM.searchInput.value);
    });

    // Typing Input Suggestions & Clear Button
    DOM.searchInput.addEventListener('input', handleInputSuggestions);

    DOM.clearSearchBtn.addEventListener('click', () => {
      DOM.searchInput.value = '';
      DOM.clearSearchBtn.classList.add('hidden');
      DOM.suggestionsList.classList.add('hidden');
      DOM.searchInput.focus();
    });

    // Close suggestions dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!DOM.searchForm.contains(e.target) && !DOM.suggestionsList.contains(e.target)) {
        DOM.suggestionsList.classList.add('hidden');
      }
    });

    // GPS Geolocation Button
    DOM.locationBtn.addEventListener('click', handleGeolocationSearch);

    // Unit Buttons
    DOM.unitCBtn.addEventListener('click', () => setTemperatureUnit('C'));
    DOM.unitFBtn.addEventListener('click', () => setTemperatureUnit('F'));

    // Retry Button in Error State
    DOM.errorRetryBtn.addEventListener('click', () => {
      const val = DOM.searchInput.value || 'London';
      handleCitySearch(val);
    });

    // Quick Cities in Welcome Empty State
    document.querySelectorAll('.quick-city-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const city = e.currentTarget.getAttribute('data-city');
        DOM.searchInput.value = city;
        handleCitySearch(city);
      });
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    setUIState('EMPTY');
  });

})();
