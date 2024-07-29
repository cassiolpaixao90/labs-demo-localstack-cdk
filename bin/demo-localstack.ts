#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {DemoLocalstackStack} from '../lib/demo-localstack-stack';

const app = new cdk.App();
new DemoLocalstackStack(app, 'DemoLocalstackStack', {});
