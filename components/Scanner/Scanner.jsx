import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Button } from "react-native-paper";

import ScanResult from "./ScanResult";
import { useRef } from "react";

const Scanner = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [barCodeData, setBarCodeData] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const cameraRef = useRef(null);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Permitir acceso</Button>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const handleBarCodeScanned = async (scan) => {
    setBarCodeData({
      data: scan.data,
      uri: "-",
    });
    setShowInfo(true);
    /*  try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Escaneado: " + scan.data);
      setBarCodeData({
        data: scan.data,
        uri: photo.uri,
      });
      setShowInfo(true);
    } catch (error) {
      console.error("Error al tomar la fotografía:", error);
      // Aquí puedes manejar el error de acuerdo a tus necesidades
    } */
  };
  /* 
  const handleBarCodeScanned = async (scan) => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Escaneado: " + scan.data);
      setBarCodeData({
        data: scan.data,
        uri: photo.uri,
      });
      setShowInfo(true);
    } catch (error) {
      console.error("Error al tomar la fotografía:", error);
      // Aquí puedes manejar el error de acuerdo a tus necesidades
    }
  }; */

  /*   const handleBarCodeScanned = async (scan) => {
    console.log(scan.data);
    console.log(isCameraReady);
    if (isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: false,
          exif: false,
        });
        console.log("Escaneado: " + scan.data);
        setBarCodeData({
          data: scan.data,
          uri: photo.uri,
        });
        setShowInfo(true);
      } catch (error) {
        console.error("Error al tomar la fotografía:", error);
      }
    } else {
      console.log("Cámara no está lista");
    }
  }; */

  const retakePicture = () => {
    setShowInfo(false);
    setBarCodeData(null);
  };

  return (
    <>
      {!showInfo ? (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            type={type}
            onBarCodeScanned={handleBarCodeScanned}
            ref={cameraRef}
            autoFocus
            ratio="4:3"
            onCameraReady={handleCameraReady}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <Text style={styles.text}>Cambiar cámara</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScanResult barCodeData={barCodeData} retake={retakePicture} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
    //height: "87%",
  },
  camera: {
    //flex: 1,
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

export default Scanner;
