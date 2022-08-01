#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VimcarCdk2Stack } from '../lib/vimcar-cdk2-stack';

const app = new cdk.App();
new VimcarCdk2Stack(app, 'VimcarCdk2Stack');
