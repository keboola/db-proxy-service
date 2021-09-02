export * from "snowflake-sdk";

// patching snowflake `ConnectionConfig` to allow changing various parameters
// https://github.com/snowflakedb/snowflake-connector-nodejs/issues/182

let maxRetries = 0;
let maxLoginRetries = 0;
let retrySleepTime = 1000;

export function setMaxRetries(value: number) {
  maxRetries = value;
}
export function setMaxLoginRetries(value: number) {
  maxLoginRetries = value;
}
export function setRetrySleepTime(value: number) {
  retrySleepTime = value;
}

const ConnectionConfig = require("snowflake-sdk/lib/connection/connection_config");

ConnectionConfig.prototype.getRetrySfMaxNumRetries = function () {
  return maxRetries;
};
ConnectionConfig.prototype.getRetrySfMaxLoginRetries = function () {
  return maxLoginRetries;
};
ConnectionConfig.prototype.getRetrySfStartingSleepTime = function () {
  return retrySleepTime;
};
