// Event listener for DOMContentLoaded event
window.addEventListener("DOMContentLoaded", domLoaded);

// Function to handle DOMContentLoaded event
function domLoaded() {
    // Retrieve references to the input elements and the convert button
    const celsiusInput = document.getElementById("cInput");
    const fahrenheitInput = document.getElementById("fInput");
    const convertButton = document.getElementById("convertButton");

    // Add event listeners for input change
    celsiusInput.addEventListener("input", function() {
        fahrenheitInput.value = ""; // Clear Fahrenheit input when Celsius input changes
    });

    fahrenheitInput.addEventListener("input", function() {
        celsiusInput.value = ""; // Clear Celsius input when Fahrenheit input changes
    });

    // Add event listener for button click
    convertButton.addEventListener("click", convertTemperature);
}

// Function to update weather image based on Fahrenheit value
function updateWeatherImage(fahrenheitValue, weatherImage) {
    const errorMessage = document.getElementById("errorMessage");
    if (!isNaN(fahrenheitValue)) {
        // Determine weather image based on temperature range
        if (fahrenheitValue < 32) {
            setWeatherImage("cold.png", "Cold", weatherImage); // Set cold weather image
        } else if (fahrenheitValue >= 32 && fahrenheitValue <= 50) {
            setWeatherImage("cool.png", "Cool", weatherImage); // Set cool weather image
        } else {
            setWeatherImage("warm.png", "Warm", weatherImage); // Set warm weather image
        }
    } else {
        errorMessage.textContent = "No Image?"; // Display error message if Fahrenheit value is not a number
    }
}

// Function to set weather image source and alt text
function setWeatherImage(src, alt, weatherImage) {
    weatherImage.src = src;
    weatherImage.alt = alt;
}

// Function to handle temperature conversion
function convertTemperature() {
    // Retrieve references to the input elements and error message element
    const celsiusInput = document.getElementById("cInput");
    const fahrenheitInput = document.getElementById("fInput");
    const weatherImage = document.getElementById("weatherImage");
    const errorMessage = document.getElementById("errorMessage");

    // Continue with the original logic
    if (fahrenheitInput.value !== "") {
        const fahrenheitValue = parseFloat(fahrenheitInput.value);
        if (isNaN(fahrenheitValue)) {
            errorMessage.textContent = `${fahrenheitInput.value} is not a number`; // Display error message for invalid input
            return;
        } else {
            errorMessage.textContent = ""; // Clear error message
        }
        const celsiusValue = convertFtoC(fahrenheitValue);
        celsiusInput.value = Number.isInteger(celsiusValue) ? celsiusValue : celsiusValue.toFixed(2); // Update Celsius input field
        updateWeatherImage(fahrenheitValue, weatherImage); // Update weather image
        fahrenheitInput.value = ""; // Clear Fahrenheit input field
    } else if (celsiusInput.value !== "") {
        const celsiusValue = parseFloat(celsiusInput.value);
        if (isNaN(celsiusValue)) {
            errorMessage.textContent = `${celsiusInput.value} is not a number`; // Display error message for invalid input
            return;
        } else {
            errorMessage.textContent = ""; // Clear error message
        }
        const fahrenheitValue = convertCtoF(celsiusValue);
        fahrenheitInput.value = Number.isInteger(fahrenheitValue) ? fahrenheitValue : fahrenheitValue.toFixed(2); // Update Fahrenheit input field
        updateWeatherImage(fahrenheitValue, weatherImage); // Update weather image
        celsiusInput.value = ""; // Clear Celsius input field
    } else {
        errorMessage.textContent = "Please enter a temperature value."; // Display error message if both input fields are empty
    }
}

// Function to convert Celsius to Fahrenheit
function convertCtoF(degreesCelsius) {
    return degreesCelsius * 9 / 5 + 32;
}

// Function to convert Fahrenheit to Celsius
function convertFtoC(degreesFahrenheit) {
    return (degreesFahrenheit - 32) * 5 / 9;
}
