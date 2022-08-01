# gatsby-webhooks
Customizable webhook catcher for Gatsby websites.
Rebuild your Gatsby website automatically running this snippet on your server.

### Requirements
- Gatsby
- Express.js
### Usage
Install Express if you don't have it yet:
```
npm install express
```
Place webhooks.js inside Gatsby project root folder, then:
```
node webhooks.js
```
Consider using a package similar to forever, pm2 or nodemon in order for this script to run constantly.

## Auto build (update) Webhook
By default, the script runs on port 9000 (you can customize it).
That being said, below are example requests.

For Clean & Build:
```
https://your-server-address:9000/clean_gatsby_rebuild/
```
For re-Build:
```
https://your-server-address:9000/quick_gatsby_rebuild/
```

Contributions are encouraged!
