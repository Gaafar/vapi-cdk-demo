const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { APP_PRIVATE_KEY,
  APP_APPLICATION_ID,
  APP_APPLICATION_NAME,
  APP_API_KEY,
  APP_API_SECRET,
  APP_PHONE_NUMBER,
  ENDPOINT,
} = process.env;

const apiToken = Buffer.from(`${APP_API_KEY}:${APP_API_SECRET}`).toString('base64');

const setup = async  () => {
  try {
    await axios({
      method: 'PUT',
      url: `https://api.nexmo.com/v2/applications/${APP_APPLICATION_ID}`,
      data: {
        name: APP_APPLICATION_NAME,
        capabilities: {
          voice: {
            webhooks: {
              answer_url: {
                address: `${ENDPOINT}/answer`,
                http_method: 'GET',
              },
              event_url: {
                address: `${ENDPOINT}/event`,
                http_method: 'POST',
              },
            },
          },
        },
      },
      headers: { Authorization: `basic ${apiToken}` },
    });
    console.log('🎉  app setup successful!');
  } catch (error) {
    console.log(error);
  }
};

setup();
