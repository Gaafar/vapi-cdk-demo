import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  // tslint:disable-next-line no-unused-variable
  context: APIGatewayEventRequestContext,
) : Promise <any> => {
  try {
    const ncco = [
      {
        action: 'talk',
        text: 'Press 1 for pizza or 2 for burger',
        bargeIn: true,
      },
      {
        action: 'input',
        eventUrl: [`https://${event.headers['Host']}/${event.requestContext.stage}/input`],
        maxDigits: 1,
      },
    ];
    return { statusCode: 200, body: JSON.stringify(ncco) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
