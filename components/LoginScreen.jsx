import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { connectUser } from "../connect/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    connectUser(email, password)
      .then((user) => {
        navigation.navigate("MainScreen");
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
      <Button title="Se connecter" onPress={handleLogin} />
      <Button
        title="Créer un compte"
        onPress={() => navigation.navigate("SignupScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
