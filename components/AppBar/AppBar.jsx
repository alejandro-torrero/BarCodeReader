import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import NavItem from "./NavItem";

import theme from "../../theme/theme";

const handleIconHome = ()=>{
    return "home"
}

const AppBar = () => {
  
  return (
    <View style={styles.container}>
     <NavItem to ="/" title="Inicio" activeIcon="home"/>
     <NavItem to ="/scan" title="Escanear" activeIcon="camera"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});

export default AppBar;
