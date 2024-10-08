const express = require('express')
const app = express()
const PORT = 4000

// /api/codes.js

const axios = require('axios');
const cheerio = require('cheerio');

const path = "https://www.theroaringman.com/claim-your-free-spins-in-coin-master/#google_vignette"
// const path = "https://apkintel.com/"

 async function getCoinMasterCodes() {
    try {
      const { data } = await axios.get(path); // Official Facebook page
      const $ = cheerio.load(data);
      let codes = [];  // Initialize the codes array

      // This is a placeholder. You must modify it to extract actual spin links from the page.
      $('a').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && href.includes('coinmaster')) {
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
    const codes = await getCoinMasterCodes()
  res.status(200).json({ codes: codes });
})


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app