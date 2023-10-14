export const getToken=()=>{
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
}