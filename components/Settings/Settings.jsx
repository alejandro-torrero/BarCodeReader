import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, TextInput, Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Settings = () => {
  const [confData, setConfData] = useState({
    email: "",
    key: "",
    serverIP: "",
  });

  const [editEmail, setEditEmail] = useState(false);
  const [editKey, setEditKey] = useState(false);
  const [editServerIP, setEditServerIP] = useState(false);
  const [indicator, setIndicator] = useState(false);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(confData);
      await AsyncStorage.setItem("scannerConf", jsonValue);
      setEditEmail(false);
      setEditKey(false);
      setEditServerIP(false);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("scannerConf");
      if (jsonValue != null) {
        setConfData(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
    }
  };

  const testConnection = async () => {
    // Obtener información de configuración
    setIndicator(true);
    let conf = { ...confData };
    await axios
      .post("http://" + confData.serverIP + ":5005/", { conf })
      .then((res) => {
        setIndicator(false);
        Alert.alert(
          "Conexión exitosa",
          "Status: "+res.status + "\n" + res.data.result.message + "\n" + res.request._url
        );
      })
      .catch((err) => {
        setIndicator(false);
        if (!err.response) {          
          Alert.alert(
            "Conexión fallida",
            "Error de red. Revisa la dirección del servidor o tu conexión a Internet\n"+err.config.url+"\n"+err.code+"\n"+err.data+"\n\nerr-s4"
          );
        } else {
          Alert.alert(
            "Conexión fallida",
            err.response.status + "\n" + err.response.data.result.message+"\n\nerr-s3"
          );
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge">Información de la aplicación</Text>
      <View style={styles.subContainer}>
        <Text variant="titleMedium">Correo electrónico</Text>
        <Text>
          El correo electrónico registrado recibirá la información escaneada de
          la aplicación
        </Text>
        <TextInput
          label={"Correo"}
          mode="outlined"
          value={confData.email}
          disabled={!editEmail}
          onChangeText={(e) => {
            setConfData({
              ...confData,
              email: e,
            });
          }}
        />

        {editEmail ? (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                storeData();
              }}
            >
              Aplicar
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                setEditEmail(false);
              }}
            >
              Cancelar
            </Button>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                setEditEmail(true);
              }}
            >
              Editar correo electrónico
            </Button>
          </View>
        )}
      </View>

      <View style={styles.subContainer}>
        <Text variant="titleMedium">Identificador de aplicación</Text>
        <Text>Registra el identificador vinculado a tu cuenta de correo.</Text>
        <TextInput
          label={"Código"}
          mode="outlined"
          value={confData.key}
          disabled={!editKey}
          onChangeText={(e) => {
            setConfData({
              ...confData,
              key: e,
            });
          }}
        />
        {editKey ? (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                storeData();
              }}
            >
              Aplicar
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                setEditKey(false);
              }}
            >
              Cancelar
            </Button>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                setEditKey(true);
              }}
            >
              Editar identificador
            </Button>
          </View>
        )}
      </View>

      <View style={styles.subContainer}>
        <Text variant="titleMedium">Dirección del servidor</Text>
        <Text>
          Ingresa la dirección del servidor definida por el administrador del
          sistema.
        </Text>
        <TextInput
          label={"Dirección"}
          mode="outlined"
          value={confData.serverIP}
          disabled={!editServerIP}
          onChangeText={(e) => {
            setConfData({
              ...confData,
              serverIP: e,
            });
          }}
        />
        {editServerIP ? (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                storeData();
              }}
            >
              Aplicar
            </Button>
            <Button
              mode="outlined"
              onPress={() => {
                setEditServerIP(false);
              }}
            >
              Cancelar
            </Button>
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={() => {
                setEditServerIP(true);
              }}
            >
              Editar dirección
            </Button>
            <Button mode="outlined" onPress={testConnection}>
              Probar conexión
            </Button>
          </View>
        )}
      </View>

      {indicator && (
        <View style={styles.appIndicator}>
          <ActivityIndicator size={60} color="#e29c00" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  subContainer: {
    padding: 10,
  },
  appIndicator: {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 0,
    right: 0,
    textAlign: "center",
    height: "100%",
    justifyContent: "center",
  },
  btnContainer: {
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Settings;
