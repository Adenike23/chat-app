import { createContext, useState, useEffect, useContext } from 'react'
import { account } from '../appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState (null)
    const [loading, setLoading] = useState (true)

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.warn(error);
            
        }
        setLoading(false)
    }
    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()
        console.log(credentials);

        try{
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
            // console.log('loggedin:', response);
            const accountDetails = await account.get() // this is to get the user details like name and all. The response doesn't give that info
            setUser(accountDetails)
            console.log('user details:', accountDetails);

            navigate('/')
            
            
        } catch (error) {
            console.error(error);
            
        }
    }

    const handleRegisterUser = async (e, credentials) => {
        e.preventDefault();
        console.log(credentials);
        
        if(credentials.password1 !== credentials.password2) {
            alert('passwords do not match')
            return
        }
        try {
            const response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
        
            await account.createEmailPasswordSession(credentials.email, credentials.password1);
            const accountDetails = await account.get()
            console.log('user details:', accountDetails);
            
            setUser(accountDetails)
            navigate('/')
            
        } catch (error) {
            console.error(error);
            
            
        }
    }
    const handleUserLogOut = async () => {
        try {
            await account.deleteSession('current');
            setUser(null)
            
        } catch (error) {
            console.error(error);
            
        }
    }
    const contextData = {
        user,
        handleUserLogin,
        handleUserLogOut,
        handleRegisterUser
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
}
 
export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext