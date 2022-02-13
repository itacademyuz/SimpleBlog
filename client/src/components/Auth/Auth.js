import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import {useDispatch} from 'react-redux'
import Icon from './icon'
import { AUTH } from '../../constants/actionTypes'
import {signup, signin} from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleShowPassword = () => setShowPassword((prevShowPass)=>!prevShowPass)
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }else{
            dispatch(signin(formData, navigate))
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    const switchMode = ()=>{
        setIsSignUp((prevIsSignup)=>!prevIsSignup)
        handleShowPassword(false)
    }
    const googleSuccess = async (res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, data:{result, token}})
            navigate('/')
        } catch (e) {
            console.log(`${e}`);
        }
    }
    const googleFailure = ()=>{
        console.log(`Google sign in was unsuccessfull. Try Again Later`);
    }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp? 'Sign Up': 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange}  half />
                                <Input name='lastName' label="Last Name" handleChange={handleChange}  half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                    {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>}
                </Grid>
                
                <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp? "Sign Up": "Sign In"}</Button>
                <GoogleLogin
                    clientId='321671755725-1mqht41ct5muul00iecpupietgbqfvk9.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button 
                        className={classes.googleButton} 
                        color="primary" 
                        fullWidth 
                        onClick={renderProps.onClick} 
                        disabled={renderProps.disabled} 
                        startIcon={<Icon/>}
                        variant="contained"
                        >
                            Sign In with Google
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent='flex-end'>
                    <Grid type="item">
                        <Button onClick={switchMode}>{isSignUp? 'Already have account? Sign In':"Dont have an account? Sign In"}</Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth