# Remittance Optimizer

A platform that ranks and calculates the absolute best payout routes for Pakistani freelancers moving money from international platforms (Payoneer, Wise, Elevate, etc.) to their local bank accounts.

## Architecture
- **Frontend**: Next.js App Router (Statically Exported via GitHub Pages)
- **Backend**: FastAPI + SQLite (Running locally via NSSM, automatically scrapes daily)
- **Data Gathering**: Python BeautifulSoup web scraper

## Backend Deployment (NSSM Windows Service)
This application runs a local backend service on port `8080`. To install the backend executable as a permanent Windows Service:

1. Download [NSSM](https://nssm.cc/).
2. Extract the `win64/nssm.exe` into your `backend/dist` folder.
3. Open an Administrator Command Prompt in the `dist` folder.
4. Run:
   ```cmd
   nssm install RemittanceOptimizer "%CD%\backend.exe"
   nssm start RemittanceOptimizer
   ```
   
Your backend is now running flawlessly in the background on port 8080 and will boot up automatically when you restart your PC. The built-in APScheduler automatically fetches the latest Google Finance exchange rates every 24 hours.

## Frontend Configuration
The frontend automatically points to your PC's public IP address for all API calls. To deploy it to GitHub Pages:
1. Push this repository to GitHub.
2. Go to **Settings > Pages**.
3. Choose **GitHub Actions** as the source.
4. Add a Next.js workflow, and it will deploy statically.
