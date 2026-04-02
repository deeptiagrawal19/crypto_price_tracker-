

```markdown
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
