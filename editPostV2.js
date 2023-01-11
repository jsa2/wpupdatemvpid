
var jsonsp = require('./spec.json')

//Content test
const { default: axios } = require('axios')



async function edit (originalcontent,mvpId) {
var newcontent = originalcontent
    
var modifiedContent = replaceInContent(originalcontent.content?.rendered, `?WT.mc_id=${mvpId}`)

newcontent.content = modifiedContent

/* console.log(modifiedContent) */


//console.log(newcontent)

//Post new content

let options = {
    json:true,
    method:"POST",
    url:`https://public-api.wordpress.com/wp/v2/sites/${jsonsp.blog_id}/posts/${originalcontent.id}`,
    headers:{
        authorization: `Bearer ${jsonsp.access_token}`,
        "content-type": "application/x-www-form-urlencoded"
    },
    data:{
        title:originalcontent.title,
        content:newcontent.content
    }
}

let data = await axios(options)

/* console.log(data?.data) */
return data?.data

}



function replaceInContent (content,id) {
    //  var newrg = new RegExp('(?=(\<a href="https://docs.microsoft.com.*?(?=\#|\")))',"g")
      //gets also versions not having a href, such as rel href 
      var newrg = new RegExp('(?=(href="https://docs.microsoft.com.*?(?=\#|\")))',"g")
      var iter1 = new Set(content.matchAll(newrg, 'g'))
 
      var newrg = new RegExp('(?=(href="https://learn.microsoft.com.*?(?=\#|\")))',"g")
      var iter2 = new Set(content.matchAll(newrg, 'g'))
     
   
 
     var itera = []
 
      iter1.forEach((item) => {
          console.log('data',item[1])
          itera.push(item[1])
     } )

     iter2.forEach((item) => {
        console.log('data',item[1])
        itera.push(item[1])
   } )
     
     var uniq = new Set(itera)
 
     if (uniq.size > 0) {
         uniq.forEach((item) => {
         //console.log('item')
            //console.log(item[1])
         content = content.replace(new RegExp(item, 'g'),(item + id))
        // console.log(content)
         return content
         })
     }
     
     return content
 }

 module.exports={edit}

