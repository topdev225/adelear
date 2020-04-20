import React, { createContext, useContext } from 'react'
import jwt from 'jwt-decode';
import { useAuth } from './auth-context';


const UserContext = createContext(undefined);

const UserProvider = (props: any) => {
	const auth = useAuth();
	const user = auth.tokens ? true: false;
	const userInfo = user && jwt(auth.tokens.idtoken);

	return ( 
		<UserContext.Provider value={{ user, userInfo }} {...props} />
	)
};

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
