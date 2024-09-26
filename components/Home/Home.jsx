import React from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useState, useContext, useEffect } from "react";
import {
  Text,
  IconButton,
  Divider,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import BarList from "./BarList";
import { useNavigate } from "react-router-native";
import theme from "../../theme/theme";
import AppContext from "../Context/AppContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const Home = () => {
  const nav = useNavigate();

  const [visible, setVisible] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [resDialog, setResDialog] = useState({
    state: false,
    title: "",
    message: "",
  });

  const [processingType, setProcessingType] = useState([
    {
      id: 0,
      text: "Sin formato",
      value: "GEN",
    },
  ]);

  const [processingTypeSelect, setProcessingTypeSelect] = useState("GEN");

  // Dialogo de selección de tipo de procesamiento
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Dialogo de respuesta de la petición, tanto error como éxito
  const showResDialog = () => setResDialog(true);
  const hideResDialog = () => setResDialog(false);

  const { barCodes, flushBarCodeList } = useContext(AppContext);

  const sendData = async () => {
    // Preparación del cuerpo
    let jsonData;
    setIndicator(true);
    hideDialog();
    try {
      const jsonValue = await AsyncStorage.getItem("scannerConf");      
      if (jsonValue != null) {
        // La configuración del aplicativo se convierte
        jsonData = JSON.parse(jsonValue);

        // Se prepara el cuerpo y se hace la petición
        const body = {
          conf: {
            email: jsonData.email,
            key: jsonData.key,
            processingType: processingTypeSelect,
          },
          barCodes,
        };

        // Se lanza petición
        await axios
          .post("http://" + jsonData.serverIP + ":5005/send", body)
          .then((res) => {
            setIndicator(false);
            // Se elimina el contenido escaneado de códigos de barras
            flushBarCodeList();
            setResDialog({
              state: true,
              title: "Operación exitosa",
              message: "El correo ha sido enviado al usuario.",
            });
          })
          .catch((err) => {
            setIndicator(false);
            setResDialog({
              state: true,
              title: "Error en la operación",
              message:
                "Ha ocurrido un error al momento de hacer la petición.\nError " +
                err.response.data.result.error +
                ": " +
                err.response.data.result.message,
            });
          });
      } else {
        setIndicator(false);
        Alert.alert(
          "Error",
          "Error al recuperar la información del aplicativo. Campos de configuración nulos\n\nerr-s2"
        );
      }
    } catch (e) {      
      Alert.alert(
        "Ha ocurrido un error",
        "No se ha podido recuperar la información del aplicativo. Revisa la configuración o comunícate con el adminsitrador del sistema.\n\nerr-s1"        
      );
    }
  };

  const getProcessingType = async () => {
    let jsonData;
    // Obtener información de configuración
    try {
      const jsonValue = await AsyncStorage.getItem("scannerConf");

      if (jsonValue != null) {
        // Información obtenida

        jsonData = JSON.parse(jsonValue);
        // Se realiza la petición

        const body = {
          conf: {
            email: jsonData.email,
            key: jsonData.key            
          }          
        };

        await axios
          .post("http://" + jsonData.serverIP + ":5005/processing-type",body)
          .then((res) => {
            setProcessingType(res.data.processingType);
          });
      }
    } catch (e) {
      // Información no obtenida, se mantiene el estado sin cambio
    }
  };

  useEffect(() => {
    // Petición para obtener tipos de procesamiento
    getProcessingType();
  }, []);

  return (
    <>
      {barCodes.length === 0 ? (
        <View style={styles.body}>
          <Text style={{ textAlign: "center" }} variant="headlineSmall">
            ¡Comienza a escanear!
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            En este momento no cuentas con códigos de barra escaneados, para
            registar uno dirígete a la sección de cámara.
          </Text>
          <IconButton
            icon="camera"
            mode="contained"
            iconColor={theme.colors.strong}
            size={40}
            style={{ marginTop: 30 }}
            onPress={() => {
              nav("/scan");
            }}
          />
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: 10,
            height: "78%",
          }}
        >
          <View style={styles.headContainer}>
            <Text variant="titleLarge">Registros</Text>
          </View>

          <Divider />
          <BarList />
          <View style={styles.btnContainer}>
            <Text>Total registrados: {barCodes.length}</Text>
            <Button icon="send" mode="outlined" onPress={showDialog}>
              Enviar
            </Button>
          </View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Tipo de procesamiento</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodySmall">
                  Elige el tipo de procesamiento para la información escaneada
                  en la aplicación. Tu elección definirá el formato del archivo
                  enviado.
                </Text>
                <View style={styles.selectorContainer}>
                  <Picker
                    style={styles.selector}
                    selectedValue={processingTypeSelect}
                    onValueChange={(value, index) => {
                      setProcessingTypeSelect(value);
                    }}
                  >
                    {processingType.map((item) => (
                      <Picker.Item
                        label={item.text}
                        value={item.value}
                        key={item.id}
                      />
                    ))}
                  </Picker>
                </View>
              </Dialog.Content>
              <Dialog.Actions style={styles.btnContainer}>
                <Button
                  mode="outlined"
                  onPress={() => {
                    sendData();
                  }}
                >
                  Aceptar
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
      {indicator && (
        <View style={styles.appIndicator}>
          <ActivityIndicator size={60} color="#e29c00" />
        </View>
      )}

      {/* Dialog de resultado de petición */}

      <Portal>
        <Dialog visible={resDialog.state} onDismiss={hideResDialog}>
          <Dialog.Title>{resDialog.title}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodySmall">{resDialog.message}</Text>
          </Dialog.Content>
          <Dialog.Actions style={styles.btnContainer}>
            <Button mode="outlined" onPress={hideResDialog}>
              Aceptar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  headContainer: {
    padding: 10,
  },  
  btnContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    margin: 10,    
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
  selector: {
    backgroundColor: "white",
  },
  selectorContainer: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 1.5,
    borderRadius: 5,
  },
});

export default Home;
