import { dispatch } from "store/index";
import { http } from "../config/axios";
import { addNotification } from "store/reducers/notificationSlice";

const urlParams = (params) => {
    let paramsArray = [];
    Object.keys(params).map((value) => {
        return paramsArray.push(`${value}=${params[value]}`);
    });
    return paramsArray.join("&");
}

const httpReqestHandler = (errors) => {

    if(errors.response && errors.response.status === 401) {
        window.location.replace('/login')
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return {
            status : errors.response.status,
            message: errors.response.data.message,
        }
    }

    if(errors.response && errors.response.status === 411) {
        return {
            status : errors.response.status,
            message: errors.response.data.message,
            errors: errors.response.data.data
        }
    }

    if(errors.response && errors.response.status === 403) {
        const newNotification = {
            id: Date.now(),
            message: "you don't have permission to view this content",
            type: "error"
        };
        dispatch(addNotification(newNotification));
        return {
            status : errors.response.status,
            message: errors.response.data.message,
        }
    }

    if(errors.response && errors.response.status === 404) {
        const newNotification = {
            id: Date.now(),
            message: errors.response.data.message,
            type: "error"
        };
        dispatch(addNotification(newNotification));
        return {
            status : errors.response.status,
            message: errors.response.data.message,
        }
    }

    if(errors.response && errors.response.status === 422) {
        Object.keys(errors.response.data.data).map(key => {
        const newNotification = {
            id: Date.now(),
            message: errors.response.data.data[key],
            type: "error"
        };
        dispatch(addNotification(newNotification));
        })
        
        return {
            status : errors.response.status,
            message: errors.response.data.data,
            errors: errors.response.data.data
        }
    }

    if(errors.response && errors.response.status === 500) {
        const newNotification = {
            id: Date.now(),
            message: errors.response.data.message,
            type: "error"
        };
        dispatch(addNotification(newNotification));
        return {
            status : errors.response.status,
            message: errors.response.data.message,
        }
    }

    if(errors && errors.message == "Network Error") {
        const newNotification = {
            id: Date.now(),
            message: errors.message,
            type: "error"
        };
        dispatch(addNotification(newNotification));
        return {
            message : errors.message,
            name : errors.name
        }
    }

    return errors;
}

const httpResponseHandler = (response) => {
    return {
        status : 200,
        message: response.data.message,
        data: response.data.data
    };
}


export const getRequest = async (path, params) => {

    const url = params ? `${path}?${urlParams(params)}` : path;
    return await http.get(url)
        .then((response) => httpResponseHandler(response))
        .catch((error) => httpReqestHandler(error));
}

export const postRequest = async (path, body) => {
    return await http.post(path, body)
        .then((response) => { return httpResponseHandler(response)})
        .catch((error) => {return httpReqestHandler(error)});
}

export const putRequest = async (path, body) => {
    return await http.put(path, body)
    .then((response) => httpResponseHandler(response))
    .catch((error) => httpReqestHandler(error));
}

export const delRequest = async (path) => {
    return await http.delete(path)
    .then((response) => httpResponseHandler(response))
    .catch((error) => httpReqestHandler(error));
}

export const patchRequest = async (path, body) => {
    return await http.patch(path, body)
        .then((response) => httpResponseHandler(response))
        .catch((error) => httpReqestHandler(error));
}