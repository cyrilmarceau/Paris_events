import axios from 'axios'

import _ from 'lodash'

import { message } from 'antd'

const PUBLIC_ROUTE = '/api'

const that = {
    getAxiosInstence() {
        let reqHeaders = {}

        return axios.create({
            baseURL: process.env.PUBLIC_API_FULL_URL,
            headers: reqHeaders,
            // timeout: 1000,
        })
    },

    listRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    if (
                        !_.isNil(err.response) &&
                        !_.isNil(err.response.status) &&
                        err.response.status == 422
                    ) {
                        message.error('Une erreur est survenue.')
                    }

                    reject(err)
                })
        })
    },
    showRoute(url, extraParams = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    if (
                        !_.isNil(err.response) &&
                        !_.isNil(err.response.status) &&
                        err.response.status != 404
                    ) {
                        message.error('Une erreur est survenue.')
                    }

                    reject(err)
                })
        })
    },
    createRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    message.error('Création impossible.')
                    reject(err)
                })
        })
    },
    updateRoute(url, values) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.patch(url, values)
                .then((apiResp) => {
                    let res = apiResp.data

                    resolve(res)
                })
                .catch((err) => {
                    message.error('Enregistrement impossible.')
                    reject(err)
                })
        })
    },
    deleteRoute(url, extraParams = {}, extraData = {}) {
        let api = that.getAxiosInstence()

        return new Promise((resolve, reject) => {
            api.delete(url, { params: extraParams, data: extraData })
                .then((apiResp) => {
                    resolve('ok')
                })
                .catch((err) => {
                    message.error('Suppression impossible.')
                    reject(err)
                })
        })
    },

    getLastFromDate() {},

    stripAccent(word) {
        return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
}

export default that
