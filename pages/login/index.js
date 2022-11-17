import { FormControl, Grid, TextField, Typography,Button} from "@material-ui/core"
import Layout from "../../Componets/Layout"
import useStyles from "../../utils/styles"
import NextLink from 'next/link'
import { useContext } from "react"
import axios from 'axios'
import {useRouter} from 'next/router'
import Store from "../../utils/store"
import Cookies from "js-cookie" 
import {useForm,Controller} from 'react-hook-form'
import { useSnackbar } from 'notistack'

const login = ()=>{

    const {state, dispatch} = useContext(Store)
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const {userInfo} = state;
    const {handleSubmit, control, formState:{errors}} = useForm()
    const classes = useStyles()
    const router = useRouter()
    const {redirect} = router.query;
    if(userInfo){
        router.push('/')
    }
    const submitHandler = async({email,password})=>{
        console.log(email,password);
        closeSnackbar();
        try {
            const data = await axios.post('/api/users/login',{email,password}) ;
            console.log(data);
            dispatch({type:'USER_LOGIN',payload:data})
            Cookies.set('userInfo',JSON.stringify(data))
            router.push(redirect || '/')
           
        } catch (error) {
            //  alert(error.response.data ? error.response.data.message : error.message)
             enqueueSnackbar(error.response.data ? error.response.data.message : error.message,{variant: 'error'})
        }
        // try {
        //     const  data = await fetch(`/api/users/login`,{method:'POST',
        //     body: JSON.stringify(emailVal,passwordVal)
        // });
        //     console.log(data);
        //     alert('Sucessfully LoggedIn') 
        // } catch (error) {
        //     alert(error.response.data ? error.response.data.message : error.message)
        // }
      
        return false;
    }
    return(
        <Layout title="Login">
            <Grid container>
                <Grid item md={12} xs={12}>
                <form id="formName" onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                        <Typography variant="h4" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Login</Typography>
                        <div className="formWrapper">
                            <FormControl fullWidth>
                                <Controller
                                    name='email'
                                    control={control}
                                    defaultValue=''
                                    rules={{required:true, pattern:/^\S+@\S+$/i}}
                                    render={({field})=>   
                                    <TextField className={classes.marginTopBtm} 
                                        variant="outlined" 
                                        color="secondary" 
                                        id="email" 
                                        label="Enter Email" 
                                        InputProps={{type:'email'}}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email ? errors.email.type === 'pattern' ? 'Email is Not Valid One' :
                                            'This Field Is Required' : ' '
                                        }
                                    fullWidth
                                    {...field}
                                    >
                                </TextField> }
                            >
                                </Controller>
                             
                                <Controller 
                                  name="password"
                                  control={control}
                                  defaultValue=''
                                  rules={{required:true,minLength:6}}
                                  render={({field})=> 
                                        
                                    <TextField 
                                            className={classes.marginTopBtm} 
                                            variant="outlined" 
                                            color="secondary" 
                                            id="password" 
                                            label="Enter Password" 
                                            InputProps={{type:'password'}} 
                                            fullWidth
                                            error={Boolean(errors.password)}
                                            helperText={errors.password ? errors.password.type=== 'minLength' ? 'Password Should Contain 6 Characters' :
                                            'This Field Is Required' : ' '
                                        }
                                            {...field}
                                            >        
                                    </TextField>
                                }
                                >

                                </Controller>
                            





                                   
                               
                                <Button form="formName" className={classes.marginTopBtm} variant='contained' color='primary' type="submit">Login</Button>
                                <Typography variant="h6" style={{textTransform:'uppercase'}}><i>don't have account</i> <Button color="primary"><NextLink href={`/register?redirect=${redirect || '/'}`}>Register</NextLink></Button></Typography>
                            </FormControl>
                        </div>
                </form>
                </Grid>
            </Grid>
            
        </Layout>
    )
}

export default login;