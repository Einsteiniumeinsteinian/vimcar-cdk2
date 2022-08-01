import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Dashboard, GraphWidget, Metric, TextWidget } from 'aws-cdk-lib/aws-cloudwatch';

export interface ApiDetails {
  apiName: string;
  apiStage: string;
  displayName: string;
}

export interface LambdaDashboardsStackProps extends StackProps {
  dashboardName: string;
}

export class CdkVimcar2LambdaDashboardStack extends Stack {


  protected readonly lambdaDashboard: Dashboard;

  protected readonly invocations = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Invocations",
    statistic: "sum"
  });

  protected readonly duration = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Duration",
    statistic: "min"
  });

  protected readonly errors = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Errors",
    statistic: "sum"
  });

  protected readonly throttles = new Metric({
    namespace: "AWS/Lambda",
    metricName: "Throttles",
    statistic: "sum"
  });

  protected readonly provisionedConcurrencySpillovers = new Metric({
    namespace: "AWS/Lambda",
    metricName: "ProvisionedConcurrencySpilloverInvocations",
    statistic: "sum"
  });

  protected readonly concurrentExecutions = new Metric({
    namespace: "AWS/Lambda",
    metricName: "ConcurrentExecutions",
    statistic: "sum"
  });

  protected readonly provisionedConcurrentExecutions = new Metric({
    namespace: "AWS/Lambda",
    metricName: "ProvisionedConcurrentExecutions",
    statistic: "sum"
  });

  protected readonly provisionedConcurrencyUtilization = new Metric({
    namespace: "AWS/Lambda",
    metricName: "ProvisionedConcurrencyUtilization",
    statistic: "sum"
  });

  protected readonly calls = new Metric({
    namespace: "AWS/ApiGateway",
    metricName: "Count",
    // period: period,
    statistic: "sum"
  });

  protected readonly latency = new Metric({
    namespace: "AWS/ApiGateway",
    metricName: "Latency",
    // period: period,
    statistic: "avg"
  });

  protected readonly integrationLatency = new Metric({
    namespace: "AWS/ApiGateway",
    metricName: "IntegrationLatency",
    // period: period,
    statistic: "avg"
  });

  protected readonly error4xx = new Metric({
    namespace: "AWS/ApiGateway",
    metricName: "4XXError",
    // period: period,
    statistic: "sum"
  });

  protected readonly error5xx = new Metric({
    namespace: "AWS/ApiGateway",
    metricName: "5XXError",
    // period: period,
    statistic: "sum"
  });

  constructor(scope: Construct, id: string, props: LambdaDashboardsStackProps) {
    super(scope, id, props);

    this.lambdaDashboard = new Dashboard(this, props.dashboardName, {
      dashboardName: props.dashboardName
    });
  }

}