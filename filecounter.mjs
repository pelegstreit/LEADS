import fs from 'fs/promises';
import log from '@ajar/marker';
import { Stats } from 'fs';

async function fileCounter(folder, counter = 0){
    try{
        let realFolder = await fs.readdir(folder)
        for (let item of realFolder){
        // log.cyan(item)
            let folderCheck = await fs.stat(`${folder}/${item}`);
             if (folderCheck.isDirectory() === true){
                let newFolder = `${folder}/${item}`
                 counter= await fileCounter(newFolder, counter)
                }
                else{
                    counter= counter + 1}
            }
    return counter
        }
    catch(err){
        console.log(err)}
}

let folder = `./node_modules`
let finalamount =await fileCounter(folder)
log.blue(`the numbers of files in ${folder} are ${finalamount}`)


