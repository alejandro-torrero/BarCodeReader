import React from "react";
import { Text, IconButton, Surface } from "react-native-paper";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Alert } from "react-native";

import { useContext } from "react";
import AppContext from "../Context/AppContext";

const BarListItem = ({ item, index }) => {
  const { deleteBarCode } = useContext(AppContext);

  const handleDelete = () => {
    deleteBarCode(item);
  };

  return (
    <Surface style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.text}>{index + 1}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.text}>{item.data}</Text>
        <Text variant="bodySmall">Contenido</Text>
      </View>
      <IconButton
        icon="trash-can-outline"
        size={25}
        iconColor="#c63637"
        onPress={handleDelete}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#e2e8f3",
    borderRadius: 10,
    marginVertical: 9,
    width: "100%",
  },
  text: {
    fontSize: 17,
  },
  indexContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dataContainer: {
    //minWidth: "60%",
    //maxWidth: "60%",
    width:'60%'
  },
});

export default BarListItem;
