const { request, expect, test } = require('@playwright/test');
const PDFDocument = require('pdfkit');
const fs = require('fs');

test('Get APIs data and save to PDF', async () => {
  const apiURL = 'https://petstore.swagger.io/v2/store/inventory';
  const headers = {
    accept: 'application/json',
  };

  const apiContext = await request.newContext({
    baseURL: '',
    extraHTTPHeaders: headers,
  });

  const response = await apiContext.get(apiURL);
  const responseBody = await response.json();

  // Save to PDF
  const doc = new PDFDocument();
  const pdfPath = 'api_response.pdf';
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(16).text('API Response Report', { underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`URL: ${apiURL}`);
  doc.moveDown();

  doc.fontSize(12).text('Headers Used:');
  doc.fontSize(10).text(JSON.stringify(headers, null, 2));
  doc.moveDown();

  //Use the code below if you have a request body for post put patch etc
  // doc.fontSize(12).text('Request Body:');
  // doc.fontSize(10).text(JSON.stringify(requestBody, null, 2));
  // doc.moveDown();

  doc.fontSize(12).text('Response Body:');
  doc.fontSize(10).text(JSON.stringify(responseBody, null, 2), {
    width: 500,
    lineGap: 2,
  });
  doc.end();
  console.log(`✅ PDF saved to ${pdfPath}`);
});

