
const { default: axios } = require('axios')

const jsonsp = require('./spec.json')



async function getExisting (post_id) {

    let options = {
        json:true,
        method:"GET",
        url:`https://public-api.wordpress.com/wp/v2/sites/${jsonsp.blog_id}/posts/${post_id}?pretty=true`,
        headers:{
            authorization: `Bearer ${jsonsp.access_token}`,
            "content-type": "application/x-www-form-urlencoded"
        },
    }

    let {data} = await axios(options).catch(err => console.log(err?.response))


/*     require('fs').writeFileSync('contenttest.json',JSON.stringify(data)) */

    return data
    }


    module.exports={getExisting}




