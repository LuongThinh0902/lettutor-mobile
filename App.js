
import {enableScreens} from 'react-native-screens';
enableScreens();

import { StoreProvider } from './src/storer/provider.js'
import Controller from "./src/controller.js"
export default function App() {
  return (
    <StoreProvider >
          <Controller/>
    </StoreProvider>
  );
}