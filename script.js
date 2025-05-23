// Currency list with more currencies
const currencies = [
    { code: 'USD', name: 'United States Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'NZD', name: 'New Zealand Dollar' },
    { code: 'BRL', name: 'Brazilian Real' },
    { code: 'ZAR', name: 'South African Rand' },
    { code: 'HKD', name: 'Hong Kong Dollar' },
    { code: 'KRW', name: 'South Korean Won' },
    { code: 'MYR', name: 'Malaysian Ringgit' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'RUB', name: 'Russian Ruble' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'AED', name: 'United Arab Emirates Dirham' },
    { code: 'THB', name: 'Thai Baht' },
    { code: 'IDR', name: 'Indonesian Rupiah' },
    { code: 'VND', name: 'Vietnamese Dong' },
    { code: 'PHP', name: 'Philippine Peso' },
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'NOK', name: 'Norwegian Krone' },
    { code: 'DKK', name: 'Danish Krone' },
    { code: 'PLN', name: 'Polish Zloty' },
    { code: 'HUF', name: 'Hungarian Forint' },
];

// Load currency options into select elements
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

currencies.forEach(currency => {
    let option = document.createElement('option');
    option.value = currency.code;
    option.textContent = currency.name;
    fromCurrencySelect.appendChild(option);

    option = document.createElement('option');
    option.value = currency.code;
    option.textContent = currency.name;
    toCurrencySelect.appendChild(option);
});

// Fetch exchange rates and perform the conversion
async function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
        document.getElementById('result').textContent = 'Please enter a valid amount.';
        return;
    }

    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.rates[toCurrency]) {
            const rate = data.rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('result').textContent = 'Unable to fetch conversion rates.';
        }
    } catch (error) {
        document.getElementById('result').textContent = 'Error fetching conversion rates.';
    }
}

// Handle theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggleButton.addEventListener('click', () => {
    // Toggle dark mode class on <html> element
    document.documentElement.classList.toggle('dark');

    // Change icon based on theme
    if (document.documentElement.classList.contains('dark')) {
        themeIcon.setAttribute('d', 'M8 0a8 8 0 0 1 0 16A8 8 0 0 1 8 0z');
    } else {
        themeIcon.setAttribute('d', 'M11.742 10.344a6.52 6.52 0 0 0 1.168-2.344A6.5 6.5 0 0 0 10.528 2.283a6.553 6.553 0 0 0-1.563-.26C7.015 2.019 4.961 3.797 4.661 6.444A6.505 6.505 0 0 0 3.1 7.742a6.5 6.5 0 0 0 5.5 10.128c1.96-.417 3.663-1.665 4.836-3.347a6.497 6.497 0 0 0-1.594-4.179z');
    }
});
