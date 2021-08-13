// @ts-ignore Hack - set the maximum number of retries to 1.
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

export {};
