const fetch = require('isomorphic-fetch');
const fs = require('fs');

const writeToFile = (ip) => {
    fs.writeFile("last", ip, function(err) {
        if(err) return console.error(err);
    
        // console.log("The file was saved!");
    }); 
}

function readFile () {
    try {
        var contents = fs.readFileSync('last', 'utf8');
    } 
    catch(err) {
        fs.writeFile("last", "", function(err) {
            if(err) return console.error(err);
        }); 
    }
    return contents;
}


const pushToBullet = (ip) => {
    fetch("https://api.pushbullet.com/v2/pushes", {
        method: "POST", 
        body: JSON.stringify({
            "type":"note", 
            "title":"New IP Address",
            "body": ip
        }),
        headers: {
            "Content-Type": "application/json",
            "Access-Token": "o.ZMAT8JvhDq8sZmvPRUVWXAh70q6JxeHk"
            // "Authorization": "Bearer o.ZMAT8JvhDq8sZmvPRUVWXAh70q6JxeHk"
        },
    })
        // .then(res => res.json())
        // .then(res => console.log(res))
        .catch(error => console.error('Error:', error))

}

fetch("http://ip-api.com/json")
    .then(res => res.json())
    .then(res => {
        const current = res.query;
        const last = readFile();
        // console.log(current, last)

        if ( current !== last ) {
            writeToFile(current);
            pushToBullet(current);
        }
    })
    .catch(error => console.error('Error:', error))