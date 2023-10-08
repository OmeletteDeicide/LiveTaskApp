import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { createUser } from "../connect/firebaseConfig";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUser(email, password)
      .then((user) => {
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Adresse e-mail :</Text>
      <TextInput
        placeholder="Adresse e-mail"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text>Mot de passe :</Text>
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="S'inscrire" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
