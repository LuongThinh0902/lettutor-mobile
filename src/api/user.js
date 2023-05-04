import Request from './request'
import APIs from './api'
import Store from '../utils/store'
export default class User extends Request{

    static getDefault()
    {
        return {
            id: 0,
            name: '',
            email:"",
            avatar:"",
            birthday:"",
            canSendMessage:false,
            country:"",
            courses:[],
            isActivated:true,
            isPhoneActivated:true,
            language:"",
            learnTopics:[],
            level:"",
            phone:"",
            requireNote:"",
            roles:[],
            studySchedule:"",
            testPreparations:[],
            timezone:7,
            walletInfo: {
                amount: 0,
                bonus: 0,
                createdAt: "",
                id: "",
                isBlocked: false,
                updatedAt: "",
                userId: ""
            }
        }
    }

    static async login(email, password)
    {
        let result = await this.post(APIs.user.login, {
            email: email,
            password: password
        })
        console.log("res",result)
        if(result.statusCode != 400)
        {
            await Store.set('user', result.user)
            await Store.set('accessToken', result.tokens.access.token)
            await Store.set('refreshToken', result.tokens.refresh.token)
        }
        return result
    }

    static async logout()
    {
        const res = await this.delete(APIs.user.logout)
        await Store.set('accessToken', "")
        await Store.set('refreshToken', "")
        await Store.set('user', this.getDefault())
    }

    static async register(data)
    {
        let result = await this.post(APIs.user.register, data)
        console.log("res",result)
        if(result.statusCode != 400)
        {
            await Store.set('user', result.user)
            await Store.set('accessToken', result.tokens.access.token)
            await Store.set('refreshToken', result.tokens.refresh.token)
        }
        return result
    }

    static async getUser(id)
    {
        return await this.get(APIs.user.list+"/"+id)
    }
   
    static async forgotPassword(data)
    {
        return await this.post(APIs.user.forgotPassword, data)
    }
   
    static async setPW(data)
    {
        return await this.post(APIs.user.setPW, data)
    }
    static async like(data)
    {
        return await this.post(APIs.user.like, data)
    }
    static async booking(data)
    {
        return await this.post(APIs.user.booking, data)
    }
    static async bookingList()
    {
        const now = new Date();
        const dateTimeLte = now.getTime();
        return await this.get(APIs.user.bookingList+`page=1&perPage=20&dateTimeGte=${dateTimeLte}&orderBy=meeting&sortBy=asc`)
    }
}