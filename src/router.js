const Router = require('express').Router();
const axios = require('axios').default;

const config = require("./config");



const headers ={
    authorization: `Bearer ${config.SG_AUTHTOKEN}`,
    'content-Type': "application/json"
}


Router.get("/ping",(req,res)=>{
    return res.end("pong");
})


Router.get("/_sginfo",async (req,res)=>{
   const { data } = await axios.get(config.SG_FIELD_DEFS_API_ENDPOINT,{headers});

   return res.json({
       data
   });

})


Router.post("/subscribe",async (req,res)=>{

    const { firstName, lastName, email } = req.body;

    const user = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        custom_fields: {
            w1_T: "false",
        },
    }

    const payload = {
        list_ids: [config.THE_OFFICE_LIST_ID],
        contacts: [user]
    }

    const headers ={
       authorization: `Bearer ${config.SG_AUTHTOKEN}`,
    }
    try{
       const { data } = await axios.put(config.SG_CONTACTS_API_ENDPOINT, payload ,{ headers })
        return res.json({
            data
        })
    }catch(err){
        console.error(err.message);
        res.json({
            error:err.message
        })
    }
})

Router.post('/verify',async (req,res)=>{
    const { email } = req.body;
    const user = {
        email,
        custom_fields: {
            w1_T: "true",
        },
    }

    const payload = {
        list_ids: [config.THE_OFFICE_LIST_ID],
        contacts: [user],
        custom_fields: {
            w1_T: "true",
        }
    }
    try{
       const { data } = await axios.put(config.SG_CONTACTS_API_ENDPOINT, payload ,{ headers })
        return res.json({
            data
        })
    }catch(err){
        console.error(err.message);
        res.json({
            error:err.message
        })
    }
})


module.exports = Router;
