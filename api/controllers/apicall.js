

import fetch from 'node-fetch'
import request from 'request';
import http from "http"
import CompanyData from '../models/CompanyData.js';


export const advanceSearch = async (req, res, next) =>{
    console.log("getting new data...")
    let username = '7defcf60-fc41-4010-9607-f1c866874e3a';
    let password = '';
    var auth = "Basic " +  Buffer.from(username + ":" + password).toString("base64");
    // headers.set('Authorization', 'Basic ' + encode(username + ":" + password));
    

    // fetch('https://api.company-information.service.gov.uk/advanced-search/companies?incorporated_from=2022-07-21&incorporated_to=2022-07-21&size=100', {
    // method: 'GET',
    // headers: {
    //     // 'Content-Type': 'application/json',
    //     'Authorization' : auth
    // },
    // // body: '{}'
    // }).then((response, body) => {
    //     console.log(body)
    //     res.status(200).json(body)
    // }).catch(err => {console.log(err);});



    var auth = "Basic " + Buffer.from(username + ":" + password).toString("base64");
    var url = "https://api.company-information.service.gov.uk/advanced-search/companies?incorporated_from=2022-07-21&incorporated_to=2022-07-21&size=5";


     request.get ({
        url : url,
        headers : {
            "Authorization" : auth,
            "Content-Type": "application/json"
        }
    }, async function (error, response, body)  {
        console.log(typeof body );
        // var json = JSON.stringify(body);

        const companyData = await CompanyData(body)

        res.status(200).send(companyData)
        
        // res.status(200).json(body)

    });

    // var url = "https://api.company-information.service.gov.uk/advanced-search/companies?incorporated_from=2022-07-21&incorporated_to=2022-07-21&size=10";

    // var auth = 'Basic ' + Buffer.from(username + ":" + password).toString("base64");
    // var options = {
    //     host: url,
    //     port: 3000,
    //     method:"GET",
    //     path: url,
    //     headers:{
    //         "Proxy-Authorization": auth,
    //         Host: url
    //     } 
    // };
    // http.get(options, function(res) {
    //     console.log(res);
    //     // res.pipe(process.stdout);
    // });
}