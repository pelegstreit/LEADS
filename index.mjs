import fs from 'fs/promises';
import log from '@ajar/marker';
import { json } from 'stream/consumers';


async function readleads(){
    console.time('my benchmark');
    let dataArr = []
    let unique = []
    let counter = 0;
    let leads = await fs.readdir('./LEADS')
    // console.log(leads)
    for (let file of leads){
        // console.log(file)
        let data =  await fs.readFile(`./LEADS/${file}`, 'utf-8');
        let splitted = data.split('\r\n');
        for (let part of splitted){
            let personarray = part.split(',')
            let currentline = {}
            if(unique.includes(personarray[0]) === false){
                currentline.facebook_id = personarray[0]
                currentline.full_name= personarray[1].replaceAll('"','')
                currentline.email = personarray[2]
                dataArr.push(currentline)
                unique.push(personarray[0])
                counter = counter + 1
            }
        }
    }
    // console.log(dataArr)

        await fs.writeFile('./result.json', JSON.stringify(dataArr))
     
   console.log(dataArr)
//    var jsonObj = JSON.parse(jsonData);
//    var jsonContent = JSON.stringify(jsonObj);

console.log("number of users:", counter)
    console.timeEnd('my benchmark');
}
readleads().catch( err => log.red('Error writing the file:',err.message))