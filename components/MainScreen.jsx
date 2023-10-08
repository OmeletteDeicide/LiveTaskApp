import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import {
  createColumn,
  deleteColumn,
  fetchColumns,
} from "../connect/firebaseConfig";

const MainScreen = ({ navigation }) => {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  };
  const handleColumnNameChange = (text) => {
    setNewColumnName(text);
  };
  const handleDeleteColumn = async (columnId) => {
    try {
      await deleteColumn(columnId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la colonne :", error);
    }
    const updatedColumns = columns.filter((column) => column.id !== columnId);
    setColumns(updatedColumns);
  };

  useEffect(() => {
    async function fetchAndSetColumns() {
      const fetchedColumns = await fetchColumns();
      setColumns(fetchedColumns);
    }

    fetchAndSetColumns();
  }, []);

  return (
    <View>
      <Button title="Se déconnecter" onPress={handleLogout} />
      <ScrollView horizontal>
        <TextInput
          placeholder="Nom de la colonne"
          value={newColumnName}
          onChangeText={handleColumnNameChange}
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 5,
            margin: 10,
          }}
        />
        <Button
          title="Ajouter une colonne"
          onPress={async () => {
            if (newColumnName) {
              createColumn(newColumnName);
              setNewColumnName("");             
              const fetchedColumns = await fetchColumns();
              setColumns(fetchedColumns);
            }
          }}
        />
      </ScrollView>

      {/* Affichez les colonnes récupérées depuis Firestore */}
      <ScrollView horizontal>
        {columns.map((column) => (
          <View
            key={column.id}
            style={{
              borderRadius: 10,
              backgroundColor: "lightblue",
              padding: 10,
              margin: 5,
            }}
          >
            <Text>{column.name}</Text>
            {/* Vous pouvez ajouter d'autres informations des colonnes ici si nécessaire */}
            <Button
              title="Supprimer"
              onPress={() => handleDeleteColumn(column.id)}
              color="red" // Couleur du bouton de suppression
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainScreen;
