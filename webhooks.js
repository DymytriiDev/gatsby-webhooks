// Deps //
const { exec } = require("child_process");
const express = require("express");
const gatsbyWebhookHelper = express();
gatsbyWebhookHelper.use( express.json() );

// Config //
const WEBHOOK_PORT = 9000;
var ongoing_process = false;

// Gatsby Update/Re-build sequences //
const cleanRebuildSequence = [
    "npm run clean",
    "gatsby build"
    // Add custom commands here
];
const quickRebuildSequence = [
    "gatsby build"
    // Add custom commands here
];
// You can also create your custom callback terminal sequences...

// Routing (Gatsby Update/Re-build sequences) //
createGatsbyWebhook('/clean_gatsby_rebuild/', cleanRebuildSequence)
createGatsbyWebhook('/quick_gatsby_rebuild/', quickRebuildSequence)
// You can also create custom webhook callbacks with your custom sequences...



// FUNCTIONS //

/* FUNCTION: Create Gatsby webhook route.
    endpoint(string) "/test/" - endpoint path
    sequence(array) [string, ...] - callback commands, will be executed synchronously in order, same as "commands" in runSequence()
*/
function createGatsbyWebhook(endpoint, sequence){
    gatsbyWebhookHelper.post( endpoint, ( req, res ) => {
        runSequence(sequence);
        res.sendStatus( 200 );
    });
    
}

/* FUNCTION: Run Terminal Sequence.
    commands(array) [string, ...] - callback commands, will be executed synchronously in order.
*/
function runSequence (commands=false){
    if(commands === false || ongoing_process === true) return false;

    console.log("Initializing a Webhook sequence.");
    ongoing_process = true;
    var commandArr = [...commands];
    let newCommand = commandArr[0];
    commandArr.shift();

    // Execute terminal command
    if (!newCommand || newCommand.trim() === "") return false;

    exec(String(newCommand), (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);

        // Recursive continuation
        if (commandArr.length>0) {
            runSequence(commandArr);
        } else {
            console.log("Webhook callback sequence Completed.");
            ongoing_process = false;
        }
    });

    return true;
}

// Start //
function start_gatsby_webhook_listener(){
    gatsbyWebhookHelper.listen( WEBHOOK_PORT, () => console.log( 'Node Webhook helper started on port 9000.' ) );
}
start_gatsby_webhook_listener();