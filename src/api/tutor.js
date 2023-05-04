import Request from './request'
import APIs from './api'
import Store from '../utils/store'
export default class Tutor extends Request{

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

    static async getTutors(data)
    {
        return await this.post(APIs.tutor.list,data)
    }
    static async getDetailTutor(tutorId)
    {
        return await this.get(APIs.tutor.detail+tutorId)
    }
    
    static async getSchedule(tutorId,time)
    {
        return await this.get(APIs.tutor.schedule+`?tutorId=${tutorId}&startTimestamp=${time.startTimestamp}&endTimestamp=${time.endTimestamp}`)
    }
    static async getFeedback(tutorId,data)
    {
        return await this.get(APIs.feedback.list+`${tutorId}?page=${data.page}&perPage=${data.perPage}`)
    }
   
}