import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar:{
        // backgroundColor:'#16181d!important',
        boxShadow:'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
        '& h6':{
            color:'#FFFFFF',
            marginLeft:'20px!important'
        },  
        '& h5':{
            color:'#FFFFFF',
        } ,
    },
    shopIcon:{
        marginLeft:'20px!important',
        marginTop:'8px'
    },
    flexWrap:{
        padding:'0px 50px'
    },
    grow:{
        flexGrow:1,
        display:'flex',
        justifyContent:'end',
        alignItems:'center'
    },
    flexWrapper:{
        display:'flex',
        alignItems:'center'
    },
    cartIcon:{
        margin:'0 5px'
    },
    customContainer:{
        minHeight:'85vh!important',
        padding:'50px 25px!important',
        ['@media (max-width:414px)']:{
            padding:'50px 10px!important'
        }
    },
    customFooter:{
        textAlign:'center',
        padding:'10px 0px',
        background: '#20232a',
        '& p':{
            fontSize:'16px',
            fontFamily:'monospace',
            fontWeight:500,
            color:'#FFFFFF'
        }    
    },
    marginTopBtm:{
        margin:'20px 0px',
        position:'relative',
        '& #email-helper-text':{
            position:'absolute',
            bottom:'-22px',
            margin:'5px 0px 0px 5px',
            textTransform: 'capitalize'
        },
        '& #password-helper-text':{
            position:'absolute',
            bottom:'-22px',
            margin:'5px 0px 0px 5px',
            textTransform: 'capitalize'
        },
        '& #name-helper-text':{
            position:'absolute',
            bottom:'-22px',
            margin:'5px 0px 0px 5px',
            textTransform: 'capitalize'
        },
        '& #ConfirmPassword-helper-text':{
            position:'absolute',
            bottom:'-22px',
            margin:'5px 0px 0px 5px',
            textTransform: 'capitalize'
        },
    },
    cardImg:{
        width:'100%',
        height:'600px',
        objectFit:'unset',
        ['@media (max-width:414px)']:{
            height:'auto'
        }
    },
    form:{
        width:'70%',
        margin:'0 auto',
        ['@media (max-width:736px)'] : {
            width:'100%'
        }
    },
    navbarButton:{
        color:'#FFFFFF'
    },
    customCard:{
        position:'relative',
        top:'0px',
        '&:hover':{
            transition:'all 0.2s ease-out;',
            boxShadow:'0px 4px 8px rgba(38, 38, 38, 0.2);',
            top:'-6px',
            background:'#FFFFFF'
        }
    },
    error:{
        margin:'0px',
        fontWeight:'700',
        textTransform:'uppercase',
        fontSize:'11px',
        color:'#9a0036'
    },
    customStepper:{
        backgroundColor:'unset!important'
    },
    upperCase:{
        textTransform:'uppercase!important'
    },
    "@global":{
        "@keyframes fadeIn":{
            "0%":{
                opacity:0
            },
            "100%":{
                opacity:1
            }
        }
    },
    blinkText:{
        fontSize:'10px',
        fontWeight:'bold',
        margin:'0',
        textTransform:'uppercase',
        animation:'fadeIn 0.9s infinite alternate ease-in-out'
    }
    
   
    
},{ name: "MuiExample_Component" })

export default useStyles;