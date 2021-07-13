import React, { useState, useEffect } from 'react'

import _ from 'lodash'

import Api from '../api/api'

import CardsEvent from '../components/CardEvent'

const Home = () => {
    const [state, setState] = useState({
        filters: {
            sorter: {
                order: 'descend',
                field: 'date_start',
            },
            pagination: {
                pageSize: 1,
            },
        },
        events: [],
    })

    useEffect(() => {
        fetchLastEv()
        return () => {}
    }, [])

    const fetchLastEv = async () => {
        let newS = _.cloneDeep(state)
        try {
            let params = {}
            params = Api.query.ordering(params, state.filters.sorter)
            params = Api.query.pagination(params, state.filters.pagination)

            let res = await Api.getLastFromDate(params)

            newS.events = res.records
            setState(newS)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <h1 className="home-title">Bienvenue sur le site de Paris event</h1>
            <CardsEvent events={state.events} />
        </>
    )
}

export default Home
