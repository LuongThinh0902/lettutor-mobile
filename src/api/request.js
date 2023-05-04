import APIs from './api'
import Store from '../utils/store'
import Util from '../utils'
import mUser from './user'
export default class Request{

    static async send(url, post, method, header='',resend = false){

        let token = await Store.get('accessToken', "not-set")
        if(Util.isEmpty(token)) token = 'not-set'

        if(header === '')
        {
            header = {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            }
        }
        else
        {
            header = { ...header, 
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            }
        }

        let data = {
            method: method,
            mode: 'cors',
            headers: header
        }
        
        if(method.toUpperCase() != 'GET')
        {
            data.body = JSON.stringify(post)
        }

        console.log('Sent data: '+ data.method+ " " + url,post)//, data) --> easier check

        return fetch(url, data)
            .then(response =>  response.text())
            .then( res => JSON.parse(res))
            .then( async output => {

                console.log("output",output)
                if( !resend && !Util.isEmpty(output.connection)) 
                {
                    if(output.connection == "expired-token" )
                    {
                        console.log(url,"Run hear 1")
                        let refreshPost = {
                             refreshToken : await Store.get('refreshToken', "not-set")
                        }
                        if(url != APIs.user.refreshToken)
                        {
                            await this.post(APIs.user.refreshToken, refreshPost)
                            return this.send(url, post, method, header,true)
                        }
                    }
                }
 
                console.log(method+" "+url+": ", output)
                if(output.statusCode == 400 || output.statusCode == 500 )
                {
                    if(Util.isEmpty(output.msg))
                    {
                        output.msg = 'Error, please contact admin.'
                    }
                }

                return output
            })
            .catch(error=>{
                console.log("Sent Request (resend " +resend+ ") got Error: ", error )
                return {'result': 'Failed', 'msg': " Connection failed. Oops, we catched an error!" }
            }) //to catch the errors if any
    }

    static async get(url, header='')
    {
        return this.send(url , {}, 'GET', header)
    }

    static async post(url, post={}, header='')
    {
    
        return this.send(url, post, 'POST', header)
    } 

    static async put(url, post={}, header='')
    {
        return this.send(url, post, 'PUT', header) 
    }

    static async delete(url, post={}, header='')
    {
        return this.send(url, post, 'DELETE', header)
    }
    static async getBasic(url, header='')
    {
        if(header === '')
        {
            header = {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
        else
        {
            header = { ...header, 
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }

        let data = {
            method: 'GET',
            mode: 'cors',
            headers: header
        }

        console.log('Sent data: '+ data.method+ " " + url)//, data) --> easier check

        return fetch(url, data)
            .then(response =>  response.text())
            .then( res => JSON.parse(res))
            .then( async output => output)
            .catch(error=>{
                console.log("Sent Request ) got Error: ", error )
                return {'result': 'Failed', 'msg': 'Connection failed. Oops, we catched an error!'}
            }) //to catch the errors if any
    }
}
