import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface ApiDetails {
  apiName: string;
  apiStage: string;
  displayName: string;
}