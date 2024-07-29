import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export class DemoLocalstackStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'api', {
            description: 'example api gateway',
            deployOptions: {
                stageName: 'dev',
            },
        });

        const nodeFunction = new NodejsFunction(this, 'nodeFunction', {
            memorySize: 128,
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: `./functions/index.ts`,
            timeout: cdk.Duration.seconds(14000),
            bundling: {
                sourceMap: true
            }
        });

        const methods = api.root.addResource('hello');
        methods.addMethod('GET', new LambdaIntegration(nodeFunction));
    }
}
