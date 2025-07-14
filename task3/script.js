class TemperatureConverter {
    constructor() {
        this.temperatureInput = document.getElementById('temperature-input');
        this.convertButton = document.getElementById('convert-btn');
        this.resultSection = document.getElementById('result-section');
        this.errorMessage = document.getElementById('error-message');
        this.unitRadios = document.querySelectorAll('input[name="unit"]');
        
        this.celsiusResult = document.getElementById('celsius-result');
        this.fahrenheitResult = document.getElementById('fahrenheit-result');
        this.kelvinResult = document.getElementById('kelvin-result');
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.convertButton.addEventListener('click', () => this.convertTemperature());
        this.temperatureInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.convertTemperature();
            }
        });
        
        // Clear error message when user starts typing
        this.temperatureInput.addEventListener('input', () => {
            this.clearError();
        });
    }
    
    validateInput(value) {
        if (value === '' || value === null || value === undefined) {
            this.showError('Please enter a temperature value.');
            return false;
        }
        
        if (isNaN(value)) {
            this.showError('Please enter a valid number.');
            return false;
        }
        
        const numValue = parseFloat(value);
        
        // Check for absolute zero violations
        const selectedUnit = this.getSelectedUnit();
        if (selectedUnit === 'celsius' && numValue < -273.15) {
            this.showError('Temperature cannot be below absolute zero (-273.15°C).');
            return false;
        }
        if (selectedUnit === 'fahrenheit' && numValue < -459.67) {
            this.showError('Temperature cannot be below absolute zero (-459.67°F).');
            return false;
        }
        if (selectedUnit === 'kelvin' && numValue < 0) {
            this.showError('Kelvin temperature cannot be negative.');
            return false;
        }
        
        return true;
    }
    
    getSelectedUnit() {
        for (const radio of this.unitRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
    }
    
    convertTemperature() {
        const inputValue = this.temperatureInput.value.trim();
        
        if (!this.validateInput(inputValue)) {
            return;
        }
        
        const temperature = parseFloat(inputValue);
        const fromUnit = this.getSelectedUnit();
        
        // Convert to Celsius first (base unit)
        let celsius;
        switch (fromUnit) {
            case 'celsius':
                celsius = temperature;
                break;
            case 'fahrenheit':
                celsius = (temperature - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = temperature - 273.15;
                break;
        }
        
        // Convert from Celsius to all units
        const fahrenheit = (celsius * 9/5) + 32;
        const kelvin = celsius + 273.15;
        
        this.displayResults(celsius, fahrenheit, kelvin, fromUnit);
    }
    
    displayResults(celsius, fahrenheit, kelvin, originalUnit) {
        // Clear previous highlights
        this.celsiusResult.classList.remove('highlight');
        this.fahrenheitResult.classList.remove('highlight');
        this.kelvinResult.classList.remove('highlight');
        
        // Update display values
        this.celsiusResult.querySelector('.temperature-value').textContent = 
            `${this.formatTemperature(celsius)}°C`;
        this.fahrenheitResult.querySelector('.temperature-value').textContent = 
            `${this.formatTemperature(fahrenheit)}°F`;
        this.kelvinResult.querySelector('.temperature-value').textContent = 
            `${this.formatTemperature(kelvin)}K`;
        
        // Highlight the original unit
        switch (originalUnit) {
            case 'celsius':
                this.celsiusResult.classList.add('highlight');
                break;
            case 'fahrenheit':
                this.fahrenheitResult.classList.add('highlight');
                break;
            case 'kelvin':
                this.kelvinResult.classList.add('highlight');
                break;
        }
        
        // Show results section
        this.resultSection.classList.add('show');
    }
    
    formatTemperature(temp) {
        return Math.round(temp * 100) / 100; // Round to 2 decimal places
    }
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.temperatureInput.style.borderColor = '#e74c3c';
    }
    
    clearError() {
        this.errorMessage.textContent = '';
        this.temperatureInput.style.borderColor = '#e1e5e9';
    }
}

// Initialize the temperature converter when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TemperatureConverter();
});

// Add some fun temperature facts
const temperatureFacts = [
    "Absolute zero is the theoretical temperature at which all molecular motion stops.",
    "The hottest temperature ever recorded on Earth was 134°F (56.7°C) in Death Valley.",
    "The coldest temperature ever recorded on Earth was -128.6°F (-89.2°C) in Antarctica.",
    "Room temperature is typically considered to be around 68-72°F (20-22°C).",
    "Water freezes at 32°F (0°C) and boils at 212°F (100°C) at sea level."
];

// Display a random fact when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const randomFact = temperatureFacts[Math.floor(Math.random() * temperatureFacts.length)];
    console.log(`🌡️ Temperature Fact: ${randomFact}`);
});