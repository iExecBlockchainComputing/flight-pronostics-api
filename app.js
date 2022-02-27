const express = require('express');
const fs = require('fs');

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

const port=3000;
app.listen(port, ()=>{
console.log(`App running on Port ${port}`);
});

function randombetween(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }