import { Step, StepLabel, Stepper } from '@material-ui/core'
import React from 'react'
import useStyles from '../utils/styles'

const StepsWizard = ({activeStep = 0}) => {
    const classes = useStyles()
  return (
    <Stepper className={classes.customStepper} activeStep={activeStep} alternativeLabel>
        {
            ['Login','ShippingAddress','PaymentMethod','PlaceOrder'].map(step => (

                <Step key={step}><StepLabel>{step}</StepLabel></Step>
            ))
        }
    </Stepper>
  )
}

export default StepsWizard