// api/songs.js  — Vercel Serverless Function
// Reads song numbers from Google Sheet and returns them as JSON.
// Sheet must have: Column A = slot name (row1–row5), Column B = number

const { google } = require('googleapis');

module.exports = async (req, res) => {
  // Allow the website to call this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

  try {
    // Parse the service account JSON stored as an environment variable
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Read A2:B6  (5 data rows, skipping the header row)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A2:B6',
    });

    const rows = response.data.values || [];

    // Build a simple object: { row1: "142", row2: "58", ... }
    const songs = {};
    rows.forEach(([slot, number]) => {
      if (slot) songs[slot] = number || '';
    });

    res.status(200).json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch song numbers' });
  }
};
