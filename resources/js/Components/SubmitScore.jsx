import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, FormLabel, Box, Input, Text, Link, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useState, useEffect, forwardRef, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const SubmitScore = forwardRef(({onHighScoreSubmit}, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [submitError, setSubmitError] = useState(null);
    // const [token, setToken] = useState("");

    // const handleReCaptchaVerify = useCallback(async () => {
    //     if(!executeRecaptcha) {
    //         return;
    //     }

    //     const newToken = await executeRecaptcha('score');
    //     setToken(newToken);

    // }, [executeRecaptcha]);

    // useEffect(() => {
    //     handleReCaptchaVerify();
    // }, [handleReCaptchaVerify]);

    return (
        <Formik
            initialValues={{
                playerName: localStorage.getItem('playerName') ?? ''
            }}
            onSubmit={async (values, actions) => {
                try {
                    actions.setSubmitting(true);
                    setSubmitError(null);
                    const newToken = await executeRecaptcha('score');
                    await onHighScoreSubmit(values.playerName, newToken);
                } catch (error) {
                    setSubmitError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
                } finally {
                    actions.setSubmitting(false);
                }
                
            }}
            validationSchema={
                Yup.object({
                    playerName: Yup.string().max(50 | "Must be at most 50 characters").required("Required")
                })
            }
        >
            {(props) => (
                <Form>
                    { submitError && (
                     <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{submitError}</AlertDescription>
                     </Alert>   
                    )}
                    <Field name='playerName'>
                        {({ field, form }) => (
                        <FormControl isInvalid={form.touched.playerName && form.errors.playerName} mb={3}>
                            <FormLabel as='legend' htmlFor={null} fontWeight='normal'>
                                <Text textAlign={'center'}>Do you want to submit it to the global leaderboard?</Text>
                                <Text textAlign={'center'} fontSize={'sm'}>(Subject to verification)</Text>
                            </FormLabel>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input {...field} placeholder='Name' ref={ref}  />
                            <FormErrorMessage>{form.errors.playerName}</FormErrorMessage>
                        </FormControl>
                        )}
                    </Field>
                    <Button mt={3} colorScheme={'blue'} type='submit' isLoading={props.isSubmitting} isDisabled={!props.isValid || !executeRecaptcha}>
                        {props.isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Box fontSize={'small'} textAlign='left' mt={3} color={'gray.500'}>
                        This site is protected by reCAPTCHA and the Google <Link href="https://policies.google.com/privacy" color='blue.500' textDecoration='underline' isExternal>Privacy Policy</Link> and <Link href="https://policies.google.com/terms" color='blue.500' textDecoration='underline' isExternal>Terms of Service</Link> apply.
                    </Box>
                </Form>
            )}
        </Formik>
      )
});

export default SubmitScore;