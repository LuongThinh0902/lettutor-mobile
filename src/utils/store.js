import AsyncStorage from '@react-native-async-storage/async-storage';

class Store{
    static async set(key, value) {
        try {

            if(typeof value == 'object' || typeof value == 'array')
            {
                value = JSON.stringify(value)
                
            }
            //if(key=='fcmToken') {console.log("value",key,value)}
            await AsyncStorage.setItem(key, value)
            
        } catch (e) {
            // saving error
            console.log("Error when set Store " + key, value)
        }
    }
    
    static async get(key, notFound = ''){
        try {
            const value = await AsyncStorage.getItem(key)
            return value 
            
        } catch(e) {
            // error reading value
            console.log("Error when get Store " + key)
        }
        return notFound
    }

    static async getArray(key){

        let value = await this.get(key, false)
        if( value !== false )
        {
            value = JSON.parse(value)
        }

        return value
    }

    static async getObject(key){

        return await this.getArray(key)
    }

    static async clearStore()
    {
        await  AsyncStorage.clear()
    }
}

export default Store