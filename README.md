# AbuseIPDB Intelligence Scanner

A web app to **scan IP addresses and CIDR ranges against [AbuseIPDB](https://www.abuseipdb.com/)
right in your browser**, then explore the results with an instant verdict, smart insights,
a risk pie chart, score distribution, and a searchable/sortable table.

## How it works
- Enter IPs / CIDR ranges (one per line) and one or more **AbuseIPDB API keys**.
- The browser fans the lookups out in parallel, distributing them across your keys
  (more keys = faster + higher daily limit; each free key allows 1000 checks/day).
- Because browsers can't call the AbuseIPDB API directly (CORS), requests go through a
  tiny **Vercel serverless proxy** (`/api/check`). Your keys are forwarded to AbuseIPDB
  and **never stored or logged**.
- Results render live; you can filter, sort, copy IPs, and **export to CSV**.
- You can also **Load CSV** to view a previously exported scan instead of scanning.

## Features
- Parallel client-side scanning with multi-key load balancing + live progress
- Auto **verdict banner** + plain-language **smart insights**
- Interactive **donut** risk breakdown (hover + click-to-filter)
- Score-distribution bars, top-countries, animated stat cards
- Search, filter chips (All / Reported / Suspicious / Malicious), column sorting
- Copy-IP, export-filtered-CSV, slide-in help guide, responsive, zero front-end deps

## CSV format (for Load CSV / exports)
```
IP,AbuseScore,Reports,Country,LastReported,ISP
```

## Deploy
Static front-end + one serverless function — deploys on Vercel with zero config
(the `/api` folder is auto-detected as a Node serverless function). No build step.

## Security notes
- Use **your own** API keys. They are sent only to this project's proxy to reach AbuseIPDB.
- The proxy does not persist keys or results.
- Each free AbuseIPDB key is limited to 1000 checks/day.

## License
MIT
