// Deps
const { exec } = require("child_process");
const express = require("express");
const gatsbyWebhookHelper = express();
gatsbyWebhookHelper.use( express.json() );

// Config
const WEBHOOK_PORT = 9000;

// Gatsby Update/Re-build sequences
const cleanRebuildSequence = [
    "npm run clean",
    "gatsby build"
    // Add custom commands here
];
const quickRebuildSequence = [
    "npm run clean"
    // Add custom commands here
];
// You can also create your custom callback terminal sequences...

// Routing (Gatsby Update/Re-build sequences)
gatsbyWebhookHelper.post( '/clean_gatsby_rebuild/', ( req, res ) => {
    console.log("Initializing Clean & Rebuild. This may take a few minutes.");
    runSequence(cleanRebuildSequence);
    res.sendStatus( 200 );
} );

gatsbyWebhookHelper.post( '/quick_gatsby_rebuild/', ( req, res ) => {
    console.log("Initializing Rebuild. Please wait a moment...");
    runSequence(quickRebuildSequence);
    res.sendStatus( 200 );
} );
// You can also create custom webhook callbacks with your custom sequences...


/* FUNCTION: Run Terminal Sequence.
    commands(array) [string, ...] - callback commands, will be executed synchronously in order.
*/
function runSequence (commands=false){
    if(!commands) return false;

    let newCommand = commands[0];
    commands.shift();

    // Execute terminal command
    exec(newCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);

        // Recursive continuation
        if (commands.length>0) runSequence(commands);
        else console.log("Webhook callback sequence Completed.");
    });
}

// Start
gatsbyWebhookHelper.listen( WEBHOOK_PORT, () => console.log( 'Node Webhook helper started on port 9000.' ) );