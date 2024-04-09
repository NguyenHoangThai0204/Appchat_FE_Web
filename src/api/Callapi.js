import axios from 'axios'


var api = axios.create({
    baseURL:'http://localhost:3001/api/user'
})
var api2 = axios.create({
    baseURL:'http://localhost:3001/api/'
})
  
export const postApiNoneToken=(url,data)=>{
    return api.post(url,data)
}

export const getApiNoneTokenMessage=(url,data)=>{
    return api2.get(url,data)
}

export const getApiNoneToken=(url,data)=>{
    return api.get(url,data)
}

export const putApiNoneToken=(url,data)=>{
    return api.put(url,data)
}

export const getApiWithToken=(url)=>{
    // const token = getUserStorage().token
    const token = null;
    return api.get(url, {
        headers: {
            "token":`${token}`
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token} `,
        },
      });
}

export const postApiWithToken=(url,data)=>{
    // const token = getUserStorage().token
    const token = null;
    return api.post(url,data, {
        headers: {
            "token":`${token}`
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token} `,
        },
      });
}
   