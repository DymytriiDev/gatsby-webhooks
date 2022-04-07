# gatsby-webhooks
Customizable webhook catcher for Gatsby websites.

### Requirements
- Gatsby
- Express.js
### Usage
Place webhooks.js inside Gatsby project root folder, then:
```
node webhooks.js
```
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
