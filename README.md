# db-proxy-service

Allows testing credentials from many different database systems.

### Endpoints

<table>
  <tr>
    <th>Endpoint</th>
    <th>Request</th>
    <th>Response</th>
  </tr>
  <tr>
    <td><pre>GET /api/health</pre></td>
    <td>N/A</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><pre>POST /api/credentials/snowflake</pre></td>
    <td>
<pre>
host: string
port: number
username: string
password: string
database: string
schema?: string
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

### Local development

```
$ yarn && yarn dev
```

### Examples

Testing `Snowflake` credentials:

```js
fetch("http://localhost:3000/api/credentials/snowflake", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    host: "https://<account>.snowflakecomputing.com",
    port: 443,
    username: "...",
    password: "...",
    database: "...",
    schema: "...",
    warehouse: "..."
  })
});
```

## License

MIT licensed, see [LICENSE](./LICENSE) file.
