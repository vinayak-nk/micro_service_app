1. npm i typescript ts-node-dev express @types/express

2. tsc --init

3. npm install dotenv @types/dotenv

4. npm i express-validator
    -> import { validationResult } from 'express-validator' 
    -> validate request params
5. express-async-errors
    -> async error handling

6. npm i mongoose @types/mongoose

Error structure
=================
{
    "errors": [
        {
            "message": "Error connecting to DB"
        },
    ]
}


ValidationError structure
--------------------------------
{
    type: 'alternative_grouped';
    msg: any;
    path: string;
    nestedErrors: FieldValidationError[][];
}


Abstract Class
===============
1. Can not be instantiated
2. Used to set up requirements for the subclasses.
3. Creates a Class when translated to JS -> we can use it in instanceof checks.
4. sub class must have its properties. eg: status code as number

