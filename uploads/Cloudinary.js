

let url= `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/auto/upload`

const uploadfile=async(file)=>{
let formdata=new FormData()
 formdata.append('file',file)
 formdata.append("upload_preset","signed_upload")
 const responce=await fetch(url,{
    method:"POST",
    body:formdata
 })

 let data=await responce.json()
 return data
}
module.exports=uploadfile