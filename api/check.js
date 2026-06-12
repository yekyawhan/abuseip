// Vercel serverless function: proxy a single AbuseIPDB /check lookup.
// The browser cannot call api.abuseipdb.com directly (CORS), so it POSTs here.
// The API key is forwarded to AbuseIPDB and never stored or logged.
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST' });
    return;
  }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const ip = body && body.ip;
  const key = body && body.key;
  const maxAge = (body && body.maxAge) || 90;

  if (!ip || !key) {
    res.status(400).json({ error: 'Missing ip or key' });
    return;
  }
  try {
    const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=${encodeURIComponent(maxAge)}`;
    const r = await fetch(url, { headers: { Key: key, Accept: 'application/json' } });
    const text = await r.text();
    res.status(r.status).setHeader('content-type', 'application/json').send(text);
  } catch (e) {
    res.status(502).json({ error: 'Upstream error: ' + String(e) });
  }
};
