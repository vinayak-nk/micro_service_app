1. npm i typescript ts-node-dev express @types/express

2. tsc --init

3. npm install dotenv @types/dotenv


Error structure
=================
{
    "errors": [
        {
            "message": "Error connecting to DB"
        },
    ]
}


Abstract Class
===============
1. Can not be instantiated
2. Used to set up req for the sub classes.
3. Creates a Class when translated to JS -> we can use it in instanceof checks.

