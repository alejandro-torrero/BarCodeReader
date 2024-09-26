import React from "react";
import { View, StyleSheet,Alert } from "react-native";
import Scanner from "./Scanner/Scanner";
import { Appbar } from "react-native-paper";
import { Routes, Route, Router } from "react-router-native";

import Home from "./Home/Home";
import AppBar from "./AppBar/AppBar";
import Settings from "./Settings/Settings";

import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import AppContext from "./Context/AppContext";
import theme from "../theme/theme";

import { BackHandler } from "react-native";
import { useEffect } from "react";

const Main = () => {
  const { barCodes, addBarCode, deleteBarCode } = useContext(AppContext);
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const backAction = () => {
      if (pathname === "/scan" || pathname === "/settings") {        
        nav("/")
        return true;
      } else if (pathname === "/") {
        Alert.alert(
          "Confirmación",
          "¿Estás seguro que deseas salir de la aplicación?",
          [
            {
              text: "Cancelar",              
              style: "cancel",
            },
            { text: "Salir", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pathname]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={theme.colors.surface} style="dark" />
      <Appbar.Header>
        {pathname == "/settings" ? (
          <>
            <Appbar.BackAction
              onPress={() => {
                nav("/");
              }}
            />
            <Appbar.Content title="Configuración" />
          </>
        ) : (
          <>
            <Appbar.Content title="Captura de códigos de barra" />
            <Appbar.Action
              icon="cog-outline"
              onPress={() => {
                nav("/settings");
              }}
            />
          </>
        )}
      </Appbar.Header>

      <Routes>
        <Route path="/" exact element={<Home barCodeList={barCodes} />} />
        <Route path="/scan" exact element={<Scanner />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>

      {pathname != "/settings" && <AppBar />}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: "6%",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  midContainer: {
    //height: "87%",
    //backgroundColor: "red",
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Main;
