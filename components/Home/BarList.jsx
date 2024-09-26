import React from "react";
import { FlatList, Text, View } from "react-native";

import BarListItem from "./BarListItem";
import AppContext from "../Context/AppContext";
import { useContext } from "react";

const BarList = () => {
  const {barCodes} = useContext(AppContext);
  return (
    <View style={{
        paddingHorizontal:5,
        marginTop:20,
        height:'73%',        
    }}>
      <FlatList
        data={barCodes}
        renderItem={({ item, index }) => (
          <BarListItem item={item} index={index} />
        )}
      />
    </View>
  );
};

export default BarList;
