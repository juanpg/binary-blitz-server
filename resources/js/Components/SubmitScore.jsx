import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text } from "@chakra-ui/react";
import { useColorMode } from '@chakra-ui/react';
import { useState, useEffect, forwardRef, useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRecaptcha } from 'react-hook-recaptcha';

const GoogleRecaptchaFC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [token, setToken] = useState('');
    const [noOfVerifications, setNoOfVerifications] = useState(0);
    const [dynamicAction, setDynamicAction] = useState('homepage');
    const [actionToChange, setActionToChange] = useState('');

    const clickHandler = useCallback(async () => {
        if(!executeRecaptcha) {
            return;
        }

        const result = executeRecaptcha('dynamicAction');

        setToken(result);
        setNoOfVerifications(noOfVerifications => noOfVerifications + 1);
    }, [dynamicAction, executeRecaptcha]);

    const handleTextChange = useCallback(event => {
        setActionToChange(event.target.value);
      }, []);
    
    const handleCommitAction = useCallback(() => {
        setDynamicAction(actionToChange);
    }, [actionToChange]);

    useEffect(() => {
        if (!executeRecaptcha || !dynamicAction) {
            return;
        }

        const handleReCaptchaVerify = async () => {
            const token = await executeRecaptcha(dynamicAction);
            setToken(token);
            setNoOfVerifications(noOfVerifications => noOfVerifications + 1);
        };

        handleReCaptchaVerify();
    }, [executeRecaptcha, dynamicAction]);

    return (
        <div>
          <div>
            <p>Current ReCaptcha action: {dynamicAction}</p>
            <input type="text" onChange={handleTextChange} value={actionToChange} />
            <button onClick={handleCommitAction}>Change action</button>
          </div>
          <br />
          <button onClick={clickHandler}>Run verify</button>
          <br />
          {token && <p>Token: {token}</p>}
          <p> No of verifications: {noOfVerifications}</p>
        </div>
      );
}

const SubmitScore = forwardRef(({onHighScoreSubmit}, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { colorMode } = useColorMode();
    const [token, setToken] = useState("");

    const handleReCaptchaVerify = useCallback(async () => {
        if(!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        const newToken = await executeRecaptcha('score');
        setToken(newToken);
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return (
        <Formik
            initialValues={{
                playerName: localStorage.getItem('playerName') ?? ''
            }}
            onSubmit={(values, actions) => {
                
                actions.setSubmitting(false);
                onHighScoreSubmit(values.playerName, token);
            }}
            validationSchema={
                Yup.object({
                    playerName: Yup.string().max(50 | "Must be at most 50 characters").required("Required")
                })
            }
        >
            {(props) => (
                <Form>
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
                    <Button mt={3} colorScheme={'blue'} type='submit' isLoading={props.isSubmitting} isDisabled={!props.isValid || token.length === 0}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
      )
});

export default SubmitScore;