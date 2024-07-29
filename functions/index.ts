import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda"

const headers = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
}

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
    return {
        statusCode: 200,
        body: JSON.stringify(event),
        headers,
    }
}
