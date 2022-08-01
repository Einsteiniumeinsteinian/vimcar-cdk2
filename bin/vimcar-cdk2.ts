#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VimcarCdk2Stack } from '../lib/vimcar-cdk2-stack';
import {CdkVimcar2LambdaDashboardStack} from '../lib/vimcar-cdk2-lamba-dashboard';

const app = new cdk.App();


const vimmcar2LambdaDashboardStack = new CdkVimcar2LambdaDashboardStack(app, 'VimcarLamdaDashboardStack',{
    dashboardName: "VimcarLambdaDashboard"
})
const vimcarCdk2Stack = new VimcarCdk2Stack(app, 'VimcarCdk2Stack');
