
const url = "https://uvbabcplougjvajgiehj.supabase.co/rest/v1/"
const key = "sb_publishable_nWdWHZLmG4IYDQiiDwcZxw_Rjr9pWf5"
//pensei em fazer tds os decorators
//mas como so eram 3 requests
const supabaseFetch = async (endpoint, options = {}) => {
    return fetch(`${url}${endpoint}`, {
        ...options,
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            ...options.headers
        }
    })
}


export { supabaseFetch }