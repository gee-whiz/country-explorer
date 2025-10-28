# Country Data Explorer

Single-page web app for browsing country data powered by the REST Countries API. Search by name, filter by region, and curate a personal list of favourites stored in `localStorage`.

## Features

- Instant search with debounced input for country names.
- Region dropdown filter and favourites-only toggle.
- Lightweight country cards showing flag, capital, and population.
- Favourite state persisted locally between sessions.

## Getting Started

1. Clone or download this repository.
2. Serve the project root with any static server, for example:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` (or the reported URL) in a modern browser.

> Opening `index.html` directly from the file system also works in most browsers because the app only issues HTTPS requests to the REST Countries API.

## Usage

- Type in the **Search by name** field to narrow results.
- Use the **All regions** dropdown to focus on a specific region.
- Toggle **Favourites only** to switch between all countries and saved favourites.
- Press **Add favourite** on a card to save it; press **Remove favourite** to clear it.

## Screenshots

![Country grid with filters](assets/screenshot1.png)
![Favourite view showing saved countries](assets/screenshot2.png)

## Project Structure

| Path        | Description                                    |
|-------------|------------------------------------------------|
| `index.html`| Entry point with layout scaffolding            |
| `styles.css`| Core styling for cards and layout              |
| `app.js`    | Fetches data, handles filtering, favourites    |

## Data Source

Country data comes from [restcountries.com](https://restcountries.com). Each card uses `cca2` codes to load flag images from [flagcdn.com](https://flagcdn.com).

## Future Ideas

- Add pagination or infinite scroll for large result sets.
- Expose more filters (population range, subregion, languages).
- Cache API results to reduce re-fetching on repeat visits.
