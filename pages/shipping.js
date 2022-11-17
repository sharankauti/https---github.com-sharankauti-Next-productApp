import { FormControl, Grid, TextField, Typography,Button } from "@material-ui/core"
import Layout from "../Componets/Layout"
import useStyles from "../utils/styles"
import NextLink from 'next/link'
import { useContext, useEffect } from "react"
import {useRouter} from 'next/router'
import Store from "../utils/store"
import Cookies from "js-cookie"
import {useForm,Controller} from 'react-hook-form'
import StepsWizard from "../Componets/StepsWizard"

const shipping = ()=>{
    const {handleSubmit, control, formState:{errors}, setValue} = useForm()
    const {state, dispatch} = useContext(Store)
    const {userInfo,cart:{shippingAddress}} = state;
    const classes = useStyles()
  
    const router = useRouter()
    const {redirect} = router.query;
    useEffect(()=>{
      if(!userInfo){
        router.push('/login?redirect=/shipping')
    }
    setValue('fullName',shippingAddress.fullName)
    setValue('address',shippingAddress.address)
    setValue('city',shippingAddress.city)
    setValue('postalCode',shippingAddress.postalCode)
    setValue('country',shippingAddress.country)
    },[])
   
    const submitHandler = async({fullName,address,city,postalCode,country})=>{
            dispatch({type:'SAVE_ADDRESS',payload:{fullName,address,city,postalCode,country}})
            Cookies.set('shippingAddress',JSON.stringify({fullName,address,city,postalCode,country}))
            router.push(redirect || '/payment')
    }
    return(
        <Layout title="Shipping">
            <StepsWizard activeStep={1}></StepsWizard>
            <Grid container>
                <Grid item md={12} xs={12}>
                <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                        <Typography variant="h4" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Shipping</Typography>
                        <div className="formWrapper">
                            <FormControl fullWidth> 
                            <Controller
                                name="fullName" 
                                control={control}
                                defaultValue=""
                                rules={{minLength:3,required:true}}
                                render={({field})=> 
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="fullName" 
                                    label="Enter fullName" 
                                    InputProps={{type:'text'}}
                                    error={Boolean(errors.fullName)}
                                    helperText= {errors.fullName ? errors.fullName.type === 'minLength' ? 'fullName should be More than 3 chars' :'This Field Is Required' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >
                            </Controller>

                            <Controller
                                name="address" 
                                control={control}
                                defaultValue=""
                                rules={{required:true}}
                                render={({field})=> 
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="address" 
                                    label="Enter Address" 
                                    InputProps={{type:'text'}}
                                    error={Boolean(errors.address)}
                                    helperText= {errors.address ? 'Please Enter Your Address' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >
                            </Controller>

                            <Controller
                                name="city" 
                                control={control}
                                defaultValue=""
                                rules={{required:true}}
                                render={({field})=> 
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="city" 
                                    label="Enter City" 
                                    InputProps={{type:'text'}}
                                    error={Boolean(errors.city)}
                                    helperText= {errors.city ?  'Please Enter Your City' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >
                            </Controller>


                            <Controller
                                name="country" 
                                control={control}
                                defaultValue=""
                                rules={{required:true}}
                                render={({field})=> 
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="country" 
                                    label="Enter Country" 
                                    InputProps={{type:'text'}}
                                    error={Boolean(errors.country)}
                                    helperText= {errors.country ?  'Please Enter Your Country' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >
                            </Controller>

                            <Controller
                                name="postalCode" 
                                control={control}
                                defaultValue=""
                                rules={{minLength:6,required:true}}
                                render={({field})=> 
                                <TextField className={classes.marginTopBtm} 
                                    variant="outlined" 
                                    color="secondary" 
                                    id="postalCode" 
                                    label="Enter PostalCode" 
                                    InputProps={{type:'number'}}
                                    error={Boolean(errors.postalCode)}
                                    helperText= {errors.postalCode ? errors.postalCode.type === 'minLength' ? 'postalCode should be More than 5 chars' :'This Field Is Required' :''}
                                    fullWidth
                                    {...field}
                                    >
                                </TextField>
                            }
                            >
                            </Controller>

                         

                                <Button className={classes.marginTopBtm} variant='contained' color='primary' type="submit">Continue</Button>
                               
                            </FormControl>
                        </div>
                </form>
                </Grid>
            </Grid>
            
        </Layout>
    )
}

export default shipping;