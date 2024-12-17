import React from "react";
import {View, Text} from "react-native";

export const applyCustomCode = externalCodeSetup => {
    // call custom code api here
    // externalCodeSetup.configApi.setAppSwitchEnabled(true);
    externalCodeSetup.navigationApi.replaceScreenComponent("SignupScreen", () => (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>This is my signup screen.</Text>
        </View>
    ));

	// display at console first load
    console.log("Log Testing");
 
    // display object in console
    setTimeout(function(){
         
        console.log("This is a console log with object.", {test:1,buddyboss:true});
 
    },1000);
};