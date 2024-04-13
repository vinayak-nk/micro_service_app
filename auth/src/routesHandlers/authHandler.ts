const currentUserHandler = (req: any, res: any) => {
    res.send('current user')
}

const signinHandler = (req: any, res: any) => {
  res.send('signin....')  
}

const signoutHandler = (req: any, res: any) => {
  res.send('signout....')  
}

const signupHandler = (req: any, res: any) => {
  res.send('signup....')  
}

export { currentUserHandler, signinHandler, signoutHandler, signupHandler }