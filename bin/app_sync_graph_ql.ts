#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AppSyncGraphQlStack } from '../lib/app_sync_graph_ql-stack';

const app = new cdk.App();
new AppSyncGraphQlStack(app, 'AppSyncGraphQlStack');
