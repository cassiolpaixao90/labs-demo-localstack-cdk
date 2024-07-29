#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DemoLocalstackStack } from './core'

const app = new cdk.App();
new DemoLocalstackStack(app, 'DemoLocalstackStack', {});
