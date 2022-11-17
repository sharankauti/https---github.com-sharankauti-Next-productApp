import { FormControl, Grid, TextField, Typography,Button } from "@material-ui/core"
import Layout from "../../Componets/Layout"
import useStyles from "../../utils/styles"
import NextLink from 'next/link'
import { useContext, useState } from "react"
import axios from 'axios'
import {useRouter} from 'next/router'
import Store from "../../utils/store"
import Cookies from "js-cookie"
import {useForm,Controller} from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { getError } from "../../utils/error"

const register = ()=>{
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const {handleSubmit, control, formState:{errors}} = useForm()
    const {state, dispatch} = useContext(Store)
    const {userInfo} = state;
    
    const classes = useStyles()
  
    const router = useRouter()
    const {redirect} = router.query;
    if(userInfo){
        router.push('/')
    }
    const submitHandler = async(name,email,password,confirmPassword)=>{
        closeSnackbar()
        if (password != confirmPassword) {
            enqueueSnackbar('Password Doest Match',{variant: 'error'})
            return
        }
        try {
            const data = await axios.post('/api/users/register',{email,password,name}) ;
            alert(data);
            dispatch({type:'USER_LOGIN',payload:data})
            Cookies.set('userInfo',JSON.stringify(data))
            router.push(redirect || '/')
           
        } catch (err) {
            alert(err)
            //enqueueSnackbar(err.response.data ? err.response.data.message : err.message, { variant: 'error' });
        }
     
    }
    return(
        <Layout title="Register">
            <Grid container>
                <Grid item md={12} xs={12}>
                <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                        <Typography variant="h4" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Register</Typography>
                        <div className="formWrapper">
                            <FormControl fullWidth>
                            
                            <Controller
                                name="name" 
                                control={control}
                                defaultValue=""
                                rules={{minLength:3,required:true}}
                                render={({field})=>
                            
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="name" 
                                    label="Enter Name" 
                                    InputProps={{type:'text'}}
                                    error={Boolean(errors.name)}
                                    helperText= {errors.name ? errors.name.type === 'minLength' ? 'Name should be More than 3 chars' :'This Field Is Required' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >

                            </Controller>

                            <Controller
                                name="email"
                                defaultValue=""
                                control={control}
                                rules={{pattern:/^\S+@\S+$/i,required:true}}
                                render={({field})=>
                                <TextField className={classes.marginTopBtm} 
                                variant="outlined" 
                                color="secondary" 
                                id="email" 
                                label="Enter Email" 
                                InputProps={{type:'email'}}
                                fullWidth
                                error={Boolean(errors.email)}
                                helperText= {errors.email ? errors.email.type === 'pattern' ? 'Email is Not Valid One' :
                                'This Field Is Required' : ' '
                                }
                                {...field}
                                >
                                </TextField>
                            }
                            >
                            </Controller>

                            <Controller
                                name="password"
                                defaultValue=""
                                control={control}
                                rules={{required:true,minLength:6}}
                                render={({field})=>
                                <TextField 
                                className={classes.marginTopBtm} 
                                variant="outlined" 
                                color="secondary" 
                                id="password" 
                                label="Enter Password" 
                                InputProps={{type:'password'}} 
                                error={Boolean(errors.password)}
                                helperText={errors.password ? errors.password.type=== 'minLength' ? 'Password Should Contain 6 Characters' :
                                'This Field Is Required' : ' '
                            }
                                fullWidth 
                                {...field}
                                >        
                            </TextField>
                            
                            }
                            
                            ></Controller>

                            <Controller
                                name="confirmPassword"
                                defaultValue=""
                                control={control}
                                rules={{required:true,minLength:6}}
                                render={({field})=>
                                <TextField 
                                className={classes.marginTopBtm} 
                                variant="outlined" 
                                color="secondary" 
                                id="ConfirmPassword" 
                                label="Enter Confirm Password" 
                                InputProps={{type:'password'}} 
                                error={Boolean(errors.confirmPassword)}
                                helperText={errors.confirmPassword ? errors.confirmPassword.type=== 'minLength' ? 'confirmPassword Should Contain 6 Characters' :
                                'This Field Is Required' : ' '
                            }
                                fullWidth
                                {...field}
                                >        
                            </TextField>
                            }
                            >

                            </Controller>
                         
                               
                              
                               
                                <Button className={classes.marginTopBtm} variant='contained' color='primary' type="submit">Register</Button>
                                <Typography variant="h6" style={{textTransform:'uppercase'}}><i>Already Have Account</i> <Button color="primary"><NextLink href={`/login?redirect=${redirect || '/'}`}>Login</NextLink></Button></Typography>
                            </FormControl>
                        </div>
                </form>
                </Grid>
            </Grid>
            
        </Layout>
    )
}

export default register;