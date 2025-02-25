1. npm i typescript ts-node-dev express @types/express

2. tsc --init

3. npm install dotenv @types/dotenv

4. npm i express-validator
   -> import { validationResult } from 'express-validator'
   -> validate request params
5. express-async-errors
   -> async error handling

6. npm i mongoose @types/mongoose

7. npm install cookie-session @types/cookie-session
   -> A user session can be stored in cookies.

8. npm i jsonwebtoken @types/jsonwebtoken

9. npm i --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server

10. npm install --save mongoose-update-if-current

# Error structure

    {
        "errors": [
            {
                "message": "Error connecting to DB"
            },
    ]
    }

## ValidationError structure

    {
        type: 'alternative_grouped';
        msg: any;
        path: string;
        nestedErrors: FieldValidationError[][];
    }

# Abstract Class

    1. Can not be instantiated
    2. Used to set up requirements for the subclasses.
    3. Creates a Class when translated to JS -> we can use it in instanceof checks.
    4. sub class must have its properties. eg: status code as number

# Inspect mongoDB

    1. kubectl exec -it <mongo-pod-name> -- mongosh --eval "show dbs"
    OR
    1. terminal run -> kubectl run test --rm -it --image=mongo -- bash
    1. inside shell run -> mongosh mongodb://auth-mongo-srv:27017
    1. show dbs
    OR
    1. kubectl exec -it <mongo-pod-name> -- mongosh

# Saving secrets in kubernates pods

    Create -> kubectl create secret generic jwt-secret --from-literal=JWT_KEY=qwerty
    Read   -> kubectl get secrets
    Delete -> kubectl delete secret jwt-secret

# common shared modeul - https://github.com/vinayak-nk/shared

    1. created a common shared repo
    2. publish and import package in micro services and adjust imports

    ## publish package

    1. create npm account
    2. create organization
    3. package.json name -> @ORG_NAME/NAME, EX: "name": "@vktickets/common"
    4. commit code
    5. npm publish --access public

    6. moved middleware and errors folders to shared module
    7. npm i express @types/express express-validator cookie-session @types/cookie-session jsonwebtoken @types/jsonwebtoken
