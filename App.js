import React from "react";
import AppNavigator from "./Navigations/AppNavigator";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider as StyleProvider } from "styled-components";
import storage from "@react-native-community/async-storage";
import axios from "axios";
import auth from "@react-native-firebase/auth";

import { typography } from "./src/utils/typography";
import { theme } from "./constants/themes/theme";
import { url } from "./constants/url";
import { store, persistor } from "./redux/store";
import "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-community/google-signin";

GoogleSignin.configure({
  webClientId:
    "224107367556-5p66preh3vuaqd9pekuni6kntl1p36jn.apps.googleusercontent.com",
});
// GoogleSignin.configure({
//   webClientId:
//     "204671252808-97sscs3kcjnp7loh3b4246lbs08oqef8.apps.googleusercontent.com",
// });

axios.interceptors.request.use(async (request) => {
  const { token } = await auth().currentUser.getIdTokenResult();
  console.log(token);
  request.headers["Authorization"] = `Token ${token}`;
  request.baseURL = url;
  request.headers["Content-Type"] = "application/json; charset=UTF-8";
  return request;
});

typography();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <StyleProvider theme={theme}>
            <AppNavigator />
          </StyleProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
