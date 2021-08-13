# db-proxy-service

Allows testing credentials from many different database systems.

### Usage

1. Clone the repository
2. `yarn` or `npm install`
3. `yarn start` or `npm run start`

### Endpoints

<table>
  <tr>
    <th>Endpoint</th>
    <th>Request</th>
    <th>Response</th>
  </tr>
  <tr>
    <td><pre>/credentials/snowflake</pre></td>
    <td>
<pre>
hostname: string,
port: number,
username: string,
password: string,
database: string,
schema?: string,
workspace?: string
</pre>
    </td>
    <td>
<pre>
success: boolean
</pre>
    </td>
  </tr>
</table>

### Examples

Testing `Snowflake` credentials:

```js
fetch("http://localhost:3000/credentials/snowflake", {
  method: "POST",
  hostname: "https://<account>.snowflakecomputing.com",
  port: 443,
  username: "...",
  password: "...",
  database: "...",
  schema: "...",
  warehouse: "..."
});
```
