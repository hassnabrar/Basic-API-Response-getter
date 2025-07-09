//Run npm i in the terminal if you are running this for the first time

// To run the test use 'npx playwright test' in the terminal

const { request, expect, test } = require('@playwright/test');

test('Get APIs data', async () => {
  const apiContext = await request.newContext({
    baseURL: '',
    extraHTTPHeaders: {
      accept: 'application/json',
    },
  });

  const response = await apiContext.get('https://petstore.swagger.io/v2/store/inventory');
  const responseBody = await response.json();
  console.log('Body:', responseBody);
});
