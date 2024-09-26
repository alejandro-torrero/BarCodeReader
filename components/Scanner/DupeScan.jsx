import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button } from "react-native-paper";
import { useNavigate } from "react-router-native";

const DupeScan = ({ retake,barCodeData }) => {
  const nav = useNavigate();
  return (
    <>
      <View style={styles.body}>
        <Text style={{ textAlign: "center" }} variant="headlineSmall">
          Registro repetido
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          El código de barras que escaneaste ya se encuentra registrado en la
          lista
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>{barCodeData.data}</Text>
          <Text style={{ textAlign: "center" }}>Valor contenido</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            icon="arrow-left"
            mode="outlined"
            onPress={() => {
              nav("/");
            }}
            style={styles.extraMargin}
          >
            Regresar
          </Button>
          <Button mode="outlined" icon="repeat" onPress={retake}>
            Volver a escanear
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
  },
  dataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    paddingVertical: 10,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imgContainer: {
    height: "40%",
  },
  extraMargin: {
    marginBottom: 20,
  },
});

export default DupeScan;
