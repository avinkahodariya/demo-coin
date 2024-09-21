const express = require('express')
const app = express()
const PORT = 4000

// /api/codes.js

const axios = require('axios');
const cheerio = require('cheerio');

export async function getCoinMasterCodes() {
    try {
      const { data } = await axios.get('https://www.theroaringman.com/claim-your-free-spins-in-coin-master/#google_vignette'); // Official Facebook page
      const $ = cheerio.load(data);
  
      // This is a placeholder. You must modify it to extract actual spin links from the page.
      $('a').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && href.includes('coinmaster')) {
          console.log("🚀 ~ file: server.js:23 ~ $ ~ href:", href)
          codes.push(href); // You should refine the filter based on actual links structure
        }
      });
  
      return codes;
    } catch (error) {
      console.error('Error fetching codes:', error);
      return [];
    }
  }


app.get('/home', async(req, res) => {
    const codes= await getCoinMasterCodes()
  res.status(200).json({ codes });
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app