import User from '../api/user'
import store from '../utils/store'

export const user = {
    name: "user",
    state: {
        isLogin:false,
        data:User.getDefault(),
    },
    reducers: {
        updateUserLogin: (state, payload) => {
            state.isLogin = true
            state.data = payload
        },
        logoutUser:(state, payload) => {
            state.isLogin = false
            state.userLogin = payload
        }
    },
    effects: {
        async login(payload, rootState) {
            this.updateUserLogin(payload)
        },
        async register(payload, rootState) {
          console.log("payload",payload)
          const result = await User.register(payload)
          if(result.statusCode != 400)
          {
              console.log("register-res",result)
              return result
          }
          else
          {
            return result
          }
        },
        async logout(payload, rootState) {
            // await User.logout(user.id)
            await store.set('accessToken', "not-set")
            await store.set('refreshToken', "not-set")
            await this.logoutUser(User.getDefault()) // dispatch action to a local reducer
            return true
        }
    }
  };