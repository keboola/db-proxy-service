# db-proxy-service

Allows testing credentials from many different database systems.

### Usage

1. Clone the repository
2. `yarn` or `npm install`
3. `yarn start` or `npm run start`
4. Test the API using `curl`:

```
$ curl \
  -H "Content-type: application/json" \
  -d '{\"hostname\":\"test.com\",\"port\":443,\"username\":\"test\",\"password\":\"test\",\"database\":\"test\",\"schema\":\"test\",\"workspace\":\"test\"}' \
  'http://localhost:3000/credentials/snowflake'
```

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
{
  hostname: string,
  port: number,
  username: string,
  password: string,
  database: string,
  schema: string,
  workspace: string
}
</pre>
    </td>
    <td>
<pre>
{
  success: boolean
}
</pre>
    </td>
  </tr>
</table>

|         Endpoint         | Request | Response |
| :----------------------: | :-----: | :------: |
| `/credentials/snowflake` |    `    |
