import axios from 'axios'

import _ from 'lodash'

import { message } from 'antd'

const PUBLIC_ROUTE = '/api/v2/catalog/datasets/que-faire-a-paris-'

const that = {
    getAxiosInstence() {
        let reqHeaders = {}

        return axios.create({
            baseURL: 'https://opendata.paris.fr',
            headers: reqHeaders,
            // timeout: 1000,
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
                        err.response.status !== 404
                    ) {
                        message.error('Une erreur est survenue.')
                    }

                    reject(err)
                })
        })
    },

    getLastFromDate(params) {
        return that.showRoute(`${PUBLIC_ROUTE}/records/`, params)
    },
    getEventById(id) {
        return that.showRoute(`${PUBLIC_ROUTE}/records/${id}/`)
    },

    getEventBySearch(params) {
        return that.showRoute(`${PUBLIC_ROUTE}/records/`, params)
    },

    setLs(data) {
        return localStorage.setItem('favorites', JSON.stringify(data))
    },
    getLs(lsKey) {
        let ls = localStorage.getItem(lsKey)
        return JSON.parse(ls)
    },
    removeLs(lsKey) {
        return localStorage.getItem(lsKey)
    },

    /* Query builder */
    query: {
        search(params, value = '') {
            if (!_.isEmpty(value)) {
                params.search = value
            }

            return params
        },
        ordering(params, sorter) {
            if (!_.isEmpty(sorter.order)) {
                let sortVal = sorter.field
                if (sorter.order === 'descend') {
                    sortVal = '-' + sortVal
                }
                params.order_by = sortVal
            }
            return params
        },
        pagination(params, pagination) {
            // params.page = pagination.current || 1
            params.limit = pagination.pageSize

            return params
        },
    },

    convertDate(date, splitVal = '' || null, replaceBy = '', totalDate = false) {
        let res = new Date(date).toLocaleString()
        console.log()
        if (splitVal !== null && totalDate === false) {
            // Get only the date
            res = res.split(splitVal)[0]
        } else {
            // Get full date and edit element sepator -> 10/10/2020 - 15h00
            let newV = res.split(splitVal)[0] + ' ' + replaceBy + res.split(splitVal)[1]
            res = newV
        }
        return res
    },

    removeHTMLTag(sentences) {
        return sentences.replace(/<[^>]+>/g, '')
    },

    stripAccent(word) {
        return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    },
}

export default that
