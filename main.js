const chalk = require("chalk");
const { argv } = require("yargs");
const { edit } = require("./editPostV2");
const { getExisting } = require("./getexistingv2");

main()

async function main() {

    try {
        
        if (!argv?.postId && !argv.mvpId ) {
            console.log('provide postId and mvpId argument \r\n example:  \r\nnode editPost.js --postId=2222 --mvpId=AZ-MVP-5003833')
            return;
        }
        
        let existingPost = await getExisting(argv.postId)
        let status =  await edit(existingPost,argv.mvpId)
        console.log(chalk.green('post updated', status?.link))


    } catch (err) {

        console.log(err)
    }

}