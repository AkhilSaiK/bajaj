const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Helper function to handle Base64 decoding and validation
function isValidBase64File(base64String) {
   try {
      const buffer = Buffer.from(base64String, 'base64');
      return buffer.length > 0;
   } catch (error) {
      return false;
   }
}

// Helper function to return MIME type from a base64 string
function getMimeType(base64String) {
   const mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
   return mime ? mime[1] : null;
}

// Helper function to filter numbers and alphabets
function filterData(data) {
   const numbers = data.filter((d) => !isNaN(d));
   const alphabets = data.filter((d) => isNaN(d));
   const lowerCaseAlphabets = alphabets.filter((ch) => ch === ch.toLowerCase());
   const highestLowerCaseAlphabet = lowerCaseAlphabets.sort().reverse()[0] || null;
   return { numbers, alphabets, highestLowerCaseAlphabet };
}

// POST route
app.post('/bfhl', (req, res) => {
   const { data, file_b64 } = req.body;
   const fullName = "Akhil_Sai_Kapa";
   const dob = "28102003";
   const userId = "Akhil_Sai_Kapa_28102003";
   
   const { numbers, alphabets, highestLowerCaseAlphabet } = filterData(data);
   const isFileValid = file_b64 ? isValidBase64File(file_b64) : false;
   const fileMimeType = isFileValid ? getMimeType(file_b64) : null;
   const fileSizeKB = isFileValid ? Buffer.from(file_b64, 'base64').length / 1024 : null;

   res.json({
      is_success: true,
      user_id: userId,
      email: "akhilsai_kapa@srmap.edu.in",
      roll_number: "AP21110010125",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowerCaseAlphabet ? [highestLowerCaseAlphabet] : [],
      file_valid: isFileValid,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKB ? fileSizeKB.toFixed(2) : null
   });
});

// GET route
app.get('/bfhl', (req, res) => {
   res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
