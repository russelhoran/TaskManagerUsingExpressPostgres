const notFound = (req,res)=>{
 res.status(404).send('Route Doent Exits')
}

module.exports=notFound