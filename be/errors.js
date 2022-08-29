export const errorHandler = (err, _req, res, next) => {
    if (res.headersSent) return next(err);
    if(!err) return next();

    if(err.code === "argument_missing" || err.code === "field_missing"){
        return res.status(400).send({
            message: err.message
        })
    }
    
    if(err.code === "nonexist_id"){
        return res.status(404).send({})
    }

    console.log(err)
    res.status(500);
    res.send('500: Internal server error');
}

export class MissingArgumentError extends Error {
    constructor(message){
        super(message)
        this.name = "MissingArgumentError"
        this.code = "argument_missing"
    }
}

export class BodyRequiredError extends Error {
    constructor(message){
        super(message)
        this.name = "BodyFieldMissing"
        this.code = "field_missing"
    }
}

export class IdMatchNoResource extends Error {
    constructor(message){
        super(message)
        this.name = "IdMatchNoResource"
        this.code = "nonexist_id"
    }
}