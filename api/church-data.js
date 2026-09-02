// api/church-data.js  — Master Church Data API
// Reads ALL dynamic content from Google Sheets and returns as JSON.
// Sheets required:
//   "Sunday"  — service type, time, song numbers
//   "Leaders" — committee members
//   "Youth"   — youth fellowship members

const { google } = require('googleapis');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Cache 60 seconds on CDN, serve stale for 2 mins while revalidating
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    const credentials = JSON.parse(process.env.song_number);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = process.env.GOOGLE_SHEET_ID;

    // ── 1. Sunday sheet (A:B, key-value pairs) ──────────────────────
    const sundayResp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sunday!A2:B20',
    });
    const sunday = {};
    (sundayResp.data.values || []).forEach(([key, val]) => {
      if (key) sunday[key.trim()] = (val || '').trim();
    });

    // ── 2. Leaders sheet (columns: name, role, phone, group) ─────────
    const leadersResp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Leaders!A2:D60',
    });
    const leaders = (leadersResp.data.values || [])
      .filter(r => r[0])
      .map(([name, role, phone, group]) => ({
        name: name || '',
        role: role || '',
        phone: phone || '',
        group: group || '',
      }));

    // ── 3. Youth sheet (columns: name, role, phone, group) ───────────
    const youthResp = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Youth!A2:D40',
    });
    const youth = (youthResp.data.values || [])
      .filter(r => r[0])
      .map(([name, role, phone, group]) => ({
        name: name || '',
        role: role || '',
        phone: phone || '',
        group: group || '',
      }));

    res.status(200).json({ sunday, leaders, youth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch church data' });
  }
};
