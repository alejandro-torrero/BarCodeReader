import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";

import { useContext } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-native";
import DupeScan from "./DupeScan";

const ScanResult = ({ barCodeData, retake }) => {
  const { addBarCode,searchBarCode } = useContext(AppContext);
  const nav = useNavigate();

  const handleAddBarCode = () => {
    addBarCode(barCodeData);
    nav("/");
  };

  
  if(searchBarCode(barCodeData)){
    return(
      <DupeScan barCodeData={barCodeData} retake={retake} />
    )
  }

  return (
    <>
      <View style={styles.subContainer}>
        <Text style={styles.subheader}>¡Escaneo exítoso!</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={{ uri: barCodeData.uri }} style={{ flex: 1 }} />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>{barCodeData.data}</Text>
        <Text style={{ textAlign: "center" }}>Valor contenido</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" icon="content-save" onPress={handleAddBarCode}>
          Registrar
        </Button>
        <Button mode="outlined" icon="repeat" onPress={retake}>
          Volver a escanear
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  camera: {
    height: 530,
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subheader: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
  subContainer: {
    padding: 20,
  },
  imgContainer: {
    height: "40%",
  },
  dataText: {
    fontSize: 20,
    textAlign: "center",
  },
  dataContainer: {
    flexDirection: "column",
    alignSelf: "center",
    paddingVertical: 10,
  },
});

export default ScanResult;
