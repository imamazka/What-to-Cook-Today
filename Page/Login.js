import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const InputText = (props) => {
    return(
    <TextInput
        style={Styles.inputText}
        value={props.state} 
        placeholder= {props.placeholder}
        onChangeText={text => props.setState(text)}
        secureTextEntry={props.secure}/>
    )
};

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    return (
        <View style={{flex: 1, backgroundColor: "#FFF"}}>
            <View style={Styles.containerLogin}>
                <Text style={Styles.loginText}>LOGIN</Text>
            </View>
            <InputText state={email} placeholder="Email" setState={setEmail} secure={false}/>
            <InputText state={password} placeholder="Password" setState={setPassword} secure={true}/>
            <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                <TouchableOpacity activeOpacity={0.5}>
                    <Text style={Styles.forgotPass}>forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
                <TouchableOpacity style={Styles.loginButton} activeOpacity={0.5}>
                    <Text style={Styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center', marginTop: 15, flexDirection: 'row'}}>
                <Text style={Styles.signUpFoot}>
                    Don't have an account,  
                </Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Text style={[Styles.signUpFoot, {color: "#0C40F9", textDecorationLine: 'underline'}]}>Sign Up</Text>
                    </TouchableOpacity>
                <Text style={Styles.signUpFoot}> Now</Text>
            </View>
        </View> 
    )
};

const Styles = StyleSheet.create ({
    containerLogin: {
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 150
    },
    loginText: {
        fontSize: 45,
        fontWeight: "bold",
        color: "#22CB65",
        //fontFamily: 'NotoSans-Bold'
    },
    inputText: {
        backgroundColor: "#F6F6F6",
        marginTop: 22,
        marginHorizontal: 25,
        borderRadius: 30,
        height: 50,
        paddingHorizontal: 20
    },
    forgotPass: {
        //fontFamily: 'NotoSans-Medium',
        fontSize: 12,
        marginTop: 20,
        marginRight: 40
    },
    loginButton: {
        width: 180,
        height: 50,
        backgroundColor: "#22CB65",
        borderRadius: 30,
        marginTop: 34,
        justifyContent: 'center' 
    },
    buttonText: {
        //fontFamily: 'NotoSans-Medium',
        color: "#FFF",
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500'
    },

signUpFoot: {
    fontSize: 13
}
});

export default Login
