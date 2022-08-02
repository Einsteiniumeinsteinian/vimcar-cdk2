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

    // adds one row to dashboard for each lambda function
    public addLambda(functionName: string, displayName: string) {

        const dimensions = {
            "FunctionName": functionName
        };

        this.lambdaDashboard.addWidgets(
            new TextWidget({
                markdown: `### ${displayName}`,
                height: 1,
                width: 24
              }),

            new GraphWidget({
                title: displayName + " Invocations",
                left: [
                    this.invocations.with({
                        dimensionsMap: dimensions,
                    }),

                ]
            }),

            new GraphWidget({
                title: displayName + " Duration",
                left: [
                    this.duration.with({
                        dimensionsMap: dimensions,
                    }),
                    this.duration.with({
                        dimensionsMap: dimensions,
                        statistic: "avg"
                    }),
                    this.duration.with({
                        dimensionsMap: dimensions,
                        statistic: "max"
                    }),
                ]
            }),

            new GraphWidget({
                title: displayName + " Errors",
                left: [
                    this.errors.with({
                        dimensionsMap: dimensions,
                    }),
                    this.throttles.with({
                        dimensionsMap: dimensions,
                    }),
                    this.provisionedConcurrencySpillovers.with({
                        dimensionsMap: dimensions,
                    })
                ]
            }),

            new GraphWidget({
                title: displayName + " ConcurrentExecutions",
                right: [
                    this.concurrentExecutions.with({
                        dimensionsMap: dimensions,
                    }),
                    this.provisionedConcurrentExecutions.with({
                        dimensionsMap: dimensions,
                    }),
                    this.provisionedConcurrencyUtilization.with({
                        dimensionsMap: dimensions,
                    })
                ]
            }),
        );
    }
    // adds one row to dashboard for API
    public addApi(api: ApiDetails) {

        const dimensions = {
          "ApiName": api.apiName,
          "Stage": api.apiStage
        };
        
        this.lambdaDashboard.addWidgets(
    
          new TextWidget({
            markdown: `### ${api.displayName}`,
            height: 1,
            width: 24
          }),
    
          new GraphWidget({
            title: api.displayName + " Calls",
            left: [
              this.calls.with({
                dimensionsMap: dimensions,
              })
            ]
          }),
    
          new GraphWidget({
            title: api.displayName + " Latency",
            left: [
              this.latency.with({
                dimensionsMap: dimensions,
              }),
    
              this.latency.with({
                dimensionsMap: dimensions,
                statistic: "P99",
              })
            ]
          }),
    
          new GraphWidget({
            title: api.displayName + " Intg Latency",
            right: [
              this.integrationLatency.with({
                dimensionsMap: dimensions,
              }),
              this.integrationLatency.with({
                dimensionsMap: dimensions,
                statistic: "P99"
              })
            ]
          }),
          
          new GraphWidget({
            title: api.displayName + " Errors",
            right: [
              this.error4xx.with({
                dimensionsMap: dimensions,
              }),
              this.error5xx.with({
                dimensionsMap: dimensions,
              })
            ]
          }),
        );
      }
}
