const Server =    "https://sandbox.api.lettutor.com/"  //"http://192.168.1.56:2221/" 
const APIs = {
    //APP_ID
    APPLE_STORE_ID:"",
    GOOGLE_PACKAGE_NAME:"",
    // endpoints
    user: { 
        login: Server + "auth/login/",
        logout: Server + "logout/", 
        forgotPassword: Server + "user/forgotPassword",
        register: Server + "auth/register",
        refreshToken: Server + "auth/refresh-token",
        verify: Server + "auth/verifyAccount?token=",
        like: Server + "user/manageFavoriteTutor",
        booking: Server + "booking",
        bookingList: Server + "booking/list/student?"

    },
    tutor:{
        list: Server + "tutor/search",
        detail: Server + "tutor/",
        schedule: Server + "schedule/"
    },
    feedback:{
        list: Server + "feedback/v2/"
    }
   
};
    
export default APIs;