const express = require('express')

const app = express();

app.get('/health', (_req, res)=>{
    res.status(200).json({message: "Success"});
})

// Error Handling
app.use((_req, _res, next) =>{
    const error = new Error('Resource Not Found');
    error.status = 404;
    next(error);
});

app.use((error, _req, res, _next) => {
    if(error.status){
        return res.status(error.status).json({
            message: error.message,
        });
    }

    res.status(500).json({message: "Something went wrong"});
})


module.exports = app;