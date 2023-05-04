import { init } from "@rematch/core"
import immerPlugin from "@rematch/immer"
import selectPlugin from "@rematch/select"
// import persistPlugin from "@rematch/persist"
import {models} from "../models/index.js"
// import storage from "redux-persist/lib/storage"
const persistConfig = {
    key: "root",
    // storage,
  }
  
const store = init({
     models,
     plugins:[immerPlugin(), selectPlugin()]
})

export default store