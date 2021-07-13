import React, { useState, useEffect } from 'react'

import Api from '../api/api'

import _ from 'lodash'

import CardsEvent from '../components/CardEvent'

// 0:{links: Array(3), record: {…}}

// links:[{…}, {…}, {…}]

// record: {fields: {…}, id: "1d7daff17147311f3c78901ac152c18a…}

const Favorites = () => {
    const [state, setState] = useState({
        events: [],
    })

    const getLocalStorage = () => {
        let ls = Api.getLs('favorites')

        let newS = _.cloneDeep(state)

        let record = []
        ls.map((el, i) => {
            let newFormat = { record: {} }
            newFormat.record.id = el.evID

            newFormat.record.fields = el
            record.push(newFormat)
        })
        newS.events = record

        setState(newS)
    }

    useEffect(() => {
        getLocalStorage()
        return () => {}
    }, [])

    return (
        <>
            <CardsEvent events={state.events} />
        </>
    )
}

export default Favorites
