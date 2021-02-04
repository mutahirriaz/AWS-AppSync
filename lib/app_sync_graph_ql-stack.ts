import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync'
import * as lambda from '@aws-cdk/aws-lambda'

export class AppSyncGraphQlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here


    // AppSync gives you the GraphQl whth api key
    const api = new appsync.GraphqlApi(this, "GRAPHQL_API", {
      name: 'cdk-appsync-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),       ///Path specified for lambda
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,     ///Defining Authorization Type
          apiKeyConfig: {
            expires: cdk.Expiration.after(cdk.Duration.days(365))   ///set expiration for API Key
          }
        },
      },
      xrayEnabled: true                                             ///Enables xray debugging
    });

    // Lambda Function
    const myLambda = new lambda.Function(this, "LambdaFucntion", {
      runtime: lambda.Runtime.NODEJS_12_X,            ///set nodejs runtime environment
      code: lambda.Code.fromAsset('lambda'),          ///path for lambda function directory
      handler: 'welcome.handler',                       ///specfic fucntion in specific file
      // timeout: cdk.Duration.seconds(10)               Time for function to break. limit upto 15 mins
    });

    // DataSource for lambda function 
    const lambdaDataSource = api.addLambdaDataSource('First lambda DataSource', myLambda);

    // resolver for DataSource
    lambdaDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'welcome'
    });

    lambdaDataSource.createResolver({
      typeName: 'Query',
      fieldName: 'hello'
    });

    lambdaDataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'addProduct'
    });

    // Get Graphql Api or you get from AppSync Service
    new cdk.CfnOutput(this, 'GraphQlURL', {
      value: api.graphqlUrl
    });

    // Get Graphql Api_Key or you get from AppSync Service
    new cdk.CfnOutput(this, 'GraphQlAPI_KEY', {
      value: api.apiKey || ''
    })


  }

}
