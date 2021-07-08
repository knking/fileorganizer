let fs=require("fs")
let os=require("os")
let path=require("path")


function organizefn(dirPath){
    //console.log("organize command is implemented ",dirPath);
    // 1.Input -> directory path given
    let destPath;
    if(dirPath==undefined){
        destPath=process.cwd();
        return;
    }else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){

            //2. create -> organised_file -> Directory
            destPath=path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }
            
        }else{
            console.log("Kindely enter correct path");
            return;
        }
    }

organizeHelper(dirPath,destPath);

}

function organizeHelper(src, dest){
    //3.identifies category of all the files present in that input directory

    let childName =fs.readdirSync(src);
    //console.log(childName);
    for(let i=0;i<childName.length;i++){
        let childAddress=path.join(src,childName[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category =getCategory(childName[i]);
            //console.log(childName[i],"belongs to ",category);
            //4.copy/cut files to the organised directory 
            sendFiles(childAddress,dest,category);
        }
    }
}
function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }

    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    //fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to ",category);

}
function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
   //console.log(ext);
   for(let type in types){
       let cTypeArr=types[type];
       for(let i=0;i<cTypeArr.length;i++){
           if(ext==cTypeArr[i]){
               return type;
           }
       }

   }
   return "others type";

}

module.exports={
    organizeKey:organizefn
}