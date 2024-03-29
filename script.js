let API_KEY = '546b82740f4bae8accf19cd6';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

const dropdownContent = document.querySelectorAll('.dropdowns select');
let button = document.querySelector('.btn');
let message = document.querySelector('.msg');

// Populate dropdown menus with currency codes
for (select of dropdownContent) {
    for (currCode in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        select.append(newOptions);
    }

    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    });
}

button.addEventListener('click', async(event) => {
    event.preventDefault();
    let amountBox = document.getElementById('amount');
    let amount = amountBox.value;

    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;

    // Validate amount
    if (amount === "" || isNaN(amount) || parseFloat(amount) <= 0) {
        message.innerText = "Please enter a valid amount.";
        return;
    }

    // Fetch exchange rates
    const URL = `${BASE_URL}/${fromCurrency}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();

        // Calculate conversion
        let rate = data.conversion_rates[toCurrency];
        let result = amount * rate;

        // Display result
        message.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        message.innerText = "Error fetching data. Please try again later.";
    }
});

// Update flag images
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
};
