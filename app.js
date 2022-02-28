const express = require('express');
const fs = require('fs');
var https = require("https");
const app = express();

let flight = JSON.parse(fs.readFileSync(`${__dirname}/flight-simple.json`));

app.get('/api/v1/flights/:flight_iata', (req, res)=>{

    if(req.query.access_key == "iExecAPIkey"){
    res.status(200).json({
        status:'success',
        data: {
           flight: flight 
        }
    });
}else{
    res.status(403).json({
        error:'missing_access_key',
        message : 'You have not supplied an API Access Key. [Required format: access_key=YOUR_ACCESS_KEY]'
    });
}
});

app.put('/api/v1/flights/:flight_iata/changestatus', (req, res)=>{
    let number=randombetween(1,6);
    let status="";
    switch (number) {
        case 1 :
            status="active";
            break;
        case 2 :
            status="landed";
        break;
        case 3 :
            status="cancelled";
        break;
        case 4 :
            status="incident";
        break;
        case 5 :
            status="diverted";
        break;
        case 6 :
            status="diverted";
        break;
    }
    flight[0].flight_status=status;
    console.log(flight[0].flight_status);
    res.status(200).json({
        status:'success',
        newstatus: flight[0].flight_status
    });
})
app.put('/api/v1/flights/:flight_iata/reset', (req, res)=>{
    let status="scheduled";
    
    flight[0].flight_status=status;
    console.log(flight[0].flight_status);
    res.status(200).json({
        status:'success',
        newstatus: flight[0].flight_status
    });
})

const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/www.iexecblockchaincomputing-flightpronostics.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/www.iexecblockchaincomputing-flightpronostics.com/fullchain.pem'),
  }, app);
  
  httpsServer.listen(443, () => {
      console.log('HTTPS Server running on port 443');
  });

function randombetween(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }