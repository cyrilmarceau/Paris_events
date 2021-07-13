import React, { useState, useEffect } from 'react'

import FormBuilder from '../components/formBuilder/main'

import { Form } from 'antd'

import _ from 'lodash'

import fields from '../fields/search.json'

import Api from '../api/api'

import CardsEvent from '../components/CardEvent'

const Search = () => {
    const [state, setState] = useState({
        filters: {
            search: '',
        },
        events: [],
    })

    const [form] = Form.useForm()

    const formRef = React.createRef()

    useEffect(() => {
        if (state.filters.search !== '') {
            searchEvent()
        }
        return () => {}
    }, [state.filters.search])

    const searchEvent = async () => {
        try {
            let params = {}
            params = Api.query.search(params, 'search', state.filters.search)

            let res = await Api.getEventBySearch(params)

            setState({ ...state, events: res.records })
        } catch (e) {
            console.log(e)
        }
    }

    const FiltersEvent = (changedValues, allValues) => {
        setState({
            ...state,
            filters: {
                ...state.filters,
                ...allValues,
            },
        })
    }

    return (
        <>
            <Form
                form={form}
                ref={formRef}
                onValuesChange={FiltersEvent}
                className="pe-form-list-search-event"
            >
                <FormBuilder fieldsList={fields} className="search-event__fields" />
            </Form>

            <CardsEvent events={state.events} />
        </>
    )
}

export default Search
