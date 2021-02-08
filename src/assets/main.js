var fs = require('fs'),
    crypto = require('crypto'),
    filePath = './lineage-17.1-20210131-nightly-onclite-signed.zip'



//Creates a hash from data
function getHash(data,algorithm) {
    return crypto.createHash(algorithm)
                 .update(data,'utf-8')
                 .digest('hex');
}
//Creates a file hash
function hashFile(path,algorithm,callback) {
    //create stream
    let stream = fs.createReadStream(path)
    //get the file stream
    let file = ''
    stream.on('data', (chunk)=>{
        
        file += chunk
    })
    stream.on('error',(err)=>{
        console.error(err)
    })

    //once file has finished hashing
    stream.on('end',()=>{
        hash = getHash(file,algorithm)
        callback(hash)
        //finally output the file hash
    })
    
}

//Checks if file has a specific hash, returns a callback 
function compareAgainst(path,algorithm,targetHash,callback) {
    hashFile(path,algorithm,(currentHash)=>{
        if( currentHash === targetHash){
            callback(true)
        }else{
            callback(false)
        }
    })
}

/* compareAgainst(filePath,'sha1','095aea9240ff11d4f4435385775945ca527f0fb7079c34e3400fe41b7a07cb9b',
(result) =>{
    console.log(result?'Match!':'Not a match!')
})
 */
function fileHashTest(path,algorithm, callback){
    let hash = crypto.createHash(algorithm)
    let stream = fs.createReadStream(path)
    stream.on('data', (data) => {
        hash.update(data)
    })
    stream.on('end', ()=>{
        callback(hash.digest('hex'))
    })
}
fileHashTest(filePath,'sha256', (result)=>{
    console.log(result === '095aea9240ff11d4f4435385775945ca527f0fb7079c34e3400fe41b7a07cb9b')
})
