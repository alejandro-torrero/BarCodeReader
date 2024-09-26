import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Icon } from "react-native-paper";

import theme from "../../theme/theme";

const CustomButton = ({ title, icon, active }) => {
  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          overflow: "hidden",
          width:80
        },
        active && {
          backgroundColor: theme.colors.accent,          
        },
      ]}
    >
      <Icon source={icon} size={30} color="#1e182e" />
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CustomButton;
