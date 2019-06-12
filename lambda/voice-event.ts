import { APIGatewayProxyEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export const handler = async (
  event: APIGatewayProxyEvent,
  // tslint:disable-next-line no-unused-variable
  context: APIGatewayEventRequestContext,
) : Promise <any> => {
  try {
    const body = JSON.parse(event.body || '{}');
    console.log('received event', body);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
