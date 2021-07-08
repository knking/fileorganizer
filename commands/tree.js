let fs=require("fs")
let os=require("os")
let path=require("path")

function treefn(dirPath){
    //console.log("tree command is implemented",dirPath);

    //let destPath;
    if(dirPath==undefined){
        treeHelper(process.cwd(),"");
        return;
    }else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
        treeHelper(dirPath,"");    
        }else{
            console.log("Kindely enter correct path");
            return;
        }
    }
}

function treeHelper(dirPath,indent){
    //isfile or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent +"|---"+fileName);
    }else{
        let dirName=path.basename(dirPath);
        console.log(indent+"'--"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childPath=path.join(dirPath,childrens[i]);
            treeHelper(childPath,indent +"\t");
        }
    }
}

module.exports={
    treeKey:treefn
}