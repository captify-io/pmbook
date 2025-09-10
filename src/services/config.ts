/**
 * @captify/pmbook/services/config - Application configuration
 *
 * Contains configuration data that the platform needs to pick up
 */

import menuConfig from "../config.json";

export const config = {
  // App attributes
  appName: "pmbook",
  version: "1.0.5",
  identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID || "",
  agentId: process.env.BEDROCK_AGENT_ID || "",
  agentAliasId: process.env.BEDROCK_AGENT_ALIAS_ID || "",
  description: "Strategic alignment and business operations platform for government contracting",
  
  // Menu structure
  menu: menuConfig,
  
  // Additional platform configuration
  platform: {
    deployment: {
      dev: "localhost:3000",
      staging: "",
      production: ""
    }
  }
};

export default config;