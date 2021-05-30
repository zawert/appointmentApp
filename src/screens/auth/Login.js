import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
} from "react-native";
 
import {connect} from 'react-redux';

import InputField from '../../components/ui/InputField';
import DefaultButton from '../../components/ui/DefaultButton';
import BottomView from '../../components/ui/BottomView';
import {
  loginUser,
  FormReducer,
  LOG_IN_INPUTS,
  INPUT_UPDATE,
} from '../../store/actions';

const Login = ({navigation, loginUser, auth: {isAuthenticated}}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
  
    const [formState, dispatchFormState] = useReducer(FormReducer, LOG_IN_INPUTS);
  
    const inputChangedHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
          type: INPUT_UPDATE,
          value: inputValue,
          isValid: inputValidity,
          input: inputIdentifier,
        });
      },
      [dispatchFormState],
    );
  
    useEffect(() => {
      if (error) {
        Alert.alert('An error occured!', error, [{text: 'Okay'}]);
        setError(null);
      }
    }, [error]);
  
    useEffect(() => {
      if (isAuthenticated) {
        navigation.navigate({routeName: 'App'});
      }
    }, [isAuthenticated]);
  
    const authHandler = async () => {
      Keyboard.dismiss();
      if (formState.formIsValid) {
        setLoading(true);
        await loginUser({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        });
        setError('Please make sure your email or password is valid');
          } else {
        setLoading(isAuthenticated);
      }
    };
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/logo.png")} />
      <Text style={styles.title}>Booking App</Text>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.inputView}>
      <InputField
          style={styles.TextInput}
          id="email"
          label="Email address"
          placeholder="Email address"
          autoCompleteType="email"
          keyboardType="email-address"
          returnKeyType="next"
          email
          required
          maxLength={255}
          autoCapitalize="none"
          initialValue=""
          errorText="Please make sure your email address is valid"
          onInputChange={inputChangedHandler}
        />
      </View>
 
      <View style={styles.inputView}>
      <InputField
          style={styles.TextInput}
          id="password"
          label="Password"
          placeholder="Password"
          keyboardType="default"
          returnKeyType="done"
          password
          required
          secureTextEntry
          maxLength={25}
          autoCapitalize="none"
          initialValue=""
          errorText="Please make sure your password is valid"
          onInputChange={inputChangedHandler}
        />
      </View>

        <DefaultButton text="LOGIN" onPress={authHandler} />
        <BottomView
        text="Don't have an account?"
        onPress={() => {
          navigation.navigate({routeName: 'Register'});
        }}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 10,
    height:150,
    width:150
  },

 
  inputView: {
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 10,
    paddingHorizontal: 5,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    marginBottom: 5,
    marginBottom: 15,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8E5EFF",
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loginUser})(Login);
