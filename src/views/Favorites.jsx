import React, { useState, useEffect } from 'react'

import { BackTop, Empty } from 'antd'

import _ from 'lodash'

import Api from '../api/api'

import CardsEvent from '../components/CardEvent'

const Favorites = () => {
    const [state, setState] = useState({
        events: [],
    })

    const getLocalStorage = () => {
        let ls = Api.getLs('favorites')

        let newS = _.cloneDeep(state)

        let record = []

        if (!_.isNil(ls)) {
            ls.map((el, i) => {
                let newFormat = { record: {} }
                newFormat.record.id = el.evID

                newFormat.record.fields = el
                record.push(newFormat)
            })
            newS.events = record

            setState(newS)
        }
    }

    useEffect(() => {
        getLocalStorage()
        return () => {}
    }, [])

    return (
        <>
            {_.isEmpty(state.events) ? <Empty /> : <CardsEvent events={state.events} />}

            <BackTop />
        </>
    )
}

export default Favorites
