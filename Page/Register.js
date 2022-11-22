import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';


const InputText = (props) => {
    return(
    <TextInput
        style={props.styles}
        value={props.state}
        autoCapitalize={props.autoCapitalize} 
        placeholder= {props.placeholder}
        onChangeText={text => props.setState(text)}
        secureTextEntry={props.secure}/>
    )
};

const Register = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
    return (
        <ScrollView vertical={true} showsVerticalScrollIndicator={true}>    
            <View style={{flex: 1, backgroundColor: "#FFF"}}>
                <View style={Styles.containerLogin}>
                    <Text style={Styles.loginText}>REGISTER</Text>
                </View>
                    <View style={{marginTop: 20}}>
                        <InputText styles={Styles.inputText} state={email} placeholder="Email" setState={setEmail} secure={false} autoCapitalize='none'/>
                    </View>
                    <View style={{marginTop: 20}}>
                        <InputText styles={Styles.inputText}state={password} placeholder="Password" setState={setPassword} secure={visiblePassword ? false : true}/>
                        <TouchableOpacity 
                            style={{position: 'absolute', right: 40, top: 15, zIndex: 1}} 
                            onPress={() => {
                                setShowPassword(!showPassword)
                                setVisiblePassword(!visiblePassword)
                            }}
                            activeOpacity={0.9}>
                            <Feather name={showPassword ? 'eye' : 'eye-off'} size={20} color='grey'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}>
                        <InputText styles={Styles.inputText} state={confirmPassword} placeholder="Confirm Password" setState={setConfirmPassword} secure={visibleConfirmPassword ? false : true}/>
                        <TouchableOpacity 
                            style={{position: 'absolute', right: 40, top: 15, zIndex: 1}} 
                            onPress={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                                setVisibleConfirmPassword(!visibleConfirmPassword)
                            }}
                            activeOpacity={0.9}>
                            <Feather name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color='grey'/>
                        </TouchableOpacity>
                    </View>
                <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity style={Styles.loginButton} activeOpacity={0.5}>
                        <Text style={Styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignSelf: 'center', marginTop: 15, flexDirection: 'row'}}>
                    <Text style={Styles.signUpFoot}>
                        Already have an account,   
                    </Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Text style={[Styles.signUpFoot, {color: "#0C40F9", textDecorationLine: 'underline'}]}>Sign In</Text>
                        </TouchableOpacity>
                </View>
            </View> 
        </ScrollView>
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
        //marginTop: 22,
        marginHorizontal: 25,
        borderRadius: 30,
        height: 50,
        paddingLeft: 20,
        paddingRight: 35,
        elevation: 6
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

export default Register;