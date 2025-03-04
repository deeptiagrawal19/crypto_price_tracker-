# BitPulse Documentation

## Overview

**BitPulse** is a real-time cryptocurrency tracking web application built using **React, Recharts, and React Query**. It provides:

- Live price updates for multiple cryptocurrencies.
- Interactive graphs and market trends.
- A crypto converter for checking values in different currencies.

## Project Setup

### Running the Web App

To set up and run the web app locally:

```sh
# Clone the repository
git clone https://github.com/your-repo/crypto-dashboard.git
cd crypto-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

This will launch the project on [http://localhost:3000](http://localhost:3000).

### Running the Mobile App (if applicable)

If the project includes a mobile version, follow these steps:

```sh
# Navigate to the mobile directory
cd crypto-mobile

# Install dependencies
npm install

# Run the mobile app
npm start
```

This will start the mobile app on an emulator or connected device.

## API Integration

We fetch real-time cryptocurrency data using **CoinCap API**.

### Fetching Historical Price Data

```javascript
const fetchCryptoHistory = async (cryptoId) => {
  const response = await axios.get(
    `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=m5`
  );
  return response.data.data.map((entry) => ({
    time: new Date(entry.time).toLocaleTimeString(),
    price: parseFloat(entry.priceUsd).toFixed(2),
  }));
};
```

We fetch price history every **5 minutes (m5 interval)**. Data is processed to store timestamps and price values.

### Fetching Live Prices

Each cryptocurrency card updates using:

```javascript
useQuery({
  queryKey: ["cryptoHistory", crypto.id],
  queryFn: () => fetchCryptoHistory(crypto.id),
  refetchInterval: 10000, // Fetch new data every 10s
});
```

**React Query** ensures efficient data fetching with caching. `refetchInterval: 10000` keeps data updated every 10 seconds.

## State Management

We chose **React Query** for data fetching and state management because:

- **Automatic caching:** Avoids unnecessary API calls.
- **Background refetching:** Keeps price data fresh.
- **Error handling:** Provides built-in error states.
- **Simple invalidation:** `invalidateQueries()` allows refreshing crypto data.

```javascript
const queryClient = useQueryClient();
const handleRefresh = () => {
  CRYPTOS.forEach((crypto) => {
    queryClient.invalidateQueries(["cryptoHistory", crypto.id]);
  });
};
```

This refresh function forces a data update on button click.

## Challenges & Solutions

### 1. Handling API Rate Limits

- **Problem:** Fetching price updates too frequently exceeded API limits.
- **Solution:** Implemented `staleTime: 300000` (5 minutes) in React Query to reduce unnecessary API calls.

### 2. UI Overlap & Responsiveness

- **Problem:** Crypto cards overlapped on smaller screens.
- **Solution:** Used `gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))"` for a flexible layout.

### 3. Crypto Converter Calculation Issues

- **Problem:** The converter sometimes showed N/A instead of prices.
- **Solution:** Fixed `selectedCryptoData` logic to ensure valid price calculations before displaying values.

```javascript
const selectedCryptoData = cryptoQueries.find(q => q.queryKey?.[1] === selectedCrypto)?.data;
const convertedPrice = selectedCryptoData ? (amount * selectedCryptoData.latestPrice).toFixed(2) : "N/A";
```

### 4. Adding Multi-Currency Support

- **Problem:** The converter only worked for USD.
- **Solution:** Integrated additional currencies like EUR, INR, GBP by fetching conversion rates.

```javascript
const fetchExchangeRate = async (currency) => {
  const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`);
  return response.data.rates[currency];
};
```

## Conclusion

**BitPulse** provides real-time tracking, market analysis, and price conversion features with **React Query and Recharts**. Future improvements include:

- More fiat currency support in the converter.
- Adding historical trends & prediction models.
- Optimizing performance for lower API calls.

**Happy coding! 🚀**
