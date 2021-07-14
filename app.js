const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;


const logger = require("morgan");
const { foos } = require('./foos.json');
let { jobs } = require('./data.json');
app.use(logger("dev"));
require("dotenv").config();
const cors = require("cors");

app.use(cors());

//CRUD
//index show jobs 
app.get("/jobs", (req, res) => {
    if (req.params.title) {
        jobs.filter(j => j.title == req.params.title)
    }
    //res.send(jobs.slice(0, 25));
    res.send(jobs);
});

//create a job
app.post("/jobs", (req, res) => {
    jobs.push({...req.body })
    res.send("k");
});

//show a job
app.get("/jobs/:id", (req, res) => {
    let index = jobs.findIndex(f => {
        return f.id == parseInt(req.params.id);
    })
    res.send(jobs[index]);
});
//update a job
app.patch("/jobs/:id", (req, res) => {
    let index = jobs.findIndex(f => {
        return f.id == req.params.id;
    })
    const job = jobs[index]
    jobs[index] = {
        ...job,
        ...req.body
    }
    res.send(jobs);
});
//delete
app.delete("/jobs/:id", (req, res) => {
    jobs = jobs.reduce((result, job) => {
        if (job.id != req.params.id) {
            result.push(job);
        }
        return result;
    })

    console.log(jobs);
    res.send(jobs);
})

app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.statusCode = 404;
    next(error);
});

function errorHandler(err, req, res, next) {
    console.log(err);
    res.status(err.statusCode || 500);
    res.send(err.message);
}
// //create a foo
// app.post("/foos", (req, res) => {
//     foos.push({...req.body });
//     res.send("k");
// });
// //read all foos
// app.get("/foos", (req, res) => {
//     res.send(foos);
// });
// //show 1 foo  
// app.get("/foos/:id", (req, res) => {
//     let index = foos.findIndex(f => {
//         return f.id == parseInt(req.params.id);
//     })
//     res.send(foos[index]);
// });
// //update a foo
// app.patch("/foos/:id", (req, res) => {
//     let index = foos.findIndex(f => {
//         return f.id == parseInt(req.params.id);
//     })
//     const foo = foos[index]
//     foos[index] = {
//         ...foo,
//         ...req.body
//     }
//     res.send(foos);
// });

// //delete a foo
// app.delete("/foos/:id", (req, res) => {
//     foos = foos.filter(f => {
//         return f.id != parseInt(req.params.id);
//     })
//     res.send(foos);
// });
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});