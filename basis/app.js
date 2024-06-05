const {startScraping} = require("./scraper")
const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser')

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

let listOfArticles = []

app.get("/:id/" , (req , res)=> {
    const {id} = req.params;
    console.log(id)

    res.status(200).json({givenId : id})
})

app.post("/scrape/" , async (req , res)=> {
    console.log(req.body);
    const {prompt} = req.body;
    console.log(prompt)
    try {
        const resultsList = await startScraping(prompt);
        if(resultsList.ok) {
            console.log("retrieved successfully");
        console.log(resultsList.scrapedDataList)
        console.log("in server");
        res.status(200).json({ok : true , searchResults : resultsList.scrapedDataList})
        }
        else {
            res.status(400).json({ok : false , errorMsg : "server side , document not loaded , Please try again"})
        }
    }
    catch(e) {
        console.log("document not loaded");
        res.status(400).json({ok : false , errorMsg : "server side , document not loaded , Please try again"});
    }
})


app.listen(5000 , ()=> {
    console.log(`server started at localhost:3000`);
})



// const getData = async ()=> {
//     const newList = await startScraping("machine learning")
//     console.log(newList)
// }

// getData()