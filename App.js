import { PaperProvider } from "react-native-paper";
import Main from "./components/Main";

import { NativeRouter } from "react-router-native";
import { AppProvider } from "./components/Context/AppContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import theme from "./theme/theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeRouter>
        <AppProvider>
          <PaperProvider theme={theme}>
            <Main />
          </PaperProvider>
        </AppProvider>
      </NativeRouter>
    </SafeAreaProvider>
  );
}
