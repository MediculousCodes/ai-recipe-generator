import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

// First define your schema as you already have
const schema = a.schema({
  BedrockResponse: a.customType({
    body: a.string(),
    error: a.string(),
  }),

  askBedrock: a
    .query()
    .arguments({ ingredients: a.string().array() })
    .returns(a.ref("BedrockResponse"))
    .authorization((allow) => [allow.authenticated()])
    .handler(
      a.handler.custom({
        entry: "./bedrock.js",
        dataSource: "bedrockDS",
        permissions: [
          new PolicyStatement({
            resources: [
              "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0",
              "arn:aws:aoss:us-east-1:605134456935:collection/vxnfavg8pnrtc3qh5li8"
            ],
            actions: [
              "bedrock:InvokeModel",
              "bedrock:Retrieve",
              "bedrock:RetrieveAndGenerate",
              "bedrock:GenerateQuery"
            ],
          })
        ]
      })
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
