import React from 'react'
import axios, { AxiosResponse } from 'axios'

export default function fetcher(url: string): any {
    return axios.get(process.env.BASE_URL + url).then((response) => {
        return response.data
    })
}
