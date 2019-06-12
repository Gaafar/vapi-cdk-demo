import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  // tslint:disable-next-line no-unused-variable
  context: APIGatewayEventRequestContext,
) : Promise <any> => {
  try {
    const body = JSON.parse(event.body || '{}');
    const input = body.dtmf[0] as string;

    const messageForInput = {
      1: 'pizza it is',
      2: 'burger for the win',
    } as {[key: string]: string };

    const message = messageForInput[input];

    const ncco = [
      {
        action: 'talk',
        text: message,
      },
    ];
    return { statusCode: 200, body: JSON.stringify(ncco) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
