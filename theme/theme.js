import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //primary: "#ecf0fd", // Sobrescribe solo el color primario
    //secondary: "#dae1fb",
    strong: "#001c55",
    surface: "#ecf0fd",
    surfaceVariant: "#ecf0fd",    
    accent:"#dae1fb"
  },
  roundness: 2,
  button: {
    outlined: {
      borderColor: "#001c55", // Color del borde
      borderWidth: 2, // Ancho del borde
      color:'red'
    },
  },
};

export default theme;
