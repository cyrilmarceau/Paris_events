import React, { useState, useEffect } from 'react'

import { Form, BackTop, Button, Empty } from 'antd'

import { SearchOutlined } from '@ant-design/icons'

import _ from 'lodash'

import FormBuilder from '../components/formBuilder/main'

import fields from '../fields/search.json'

import Api from '../api/api'

import CardsEvent from '../components/CardEvent'

const Search = () => {
    const [state, setState] = useState({
        filters: {
            search: '',
        },
        events: [],
        error: false,
    })

    const [form] = Form.useForm()

    const formRef = React.createRef()

    const searchEvent = async () => {
        try {
            let params = {}

            params = Api.query.search(params, state.filters.search)

            let res
            if (!_.isEmpty(state.filters.search)) {
                res = await Api.getEventBySearch(params)
            }

            _.isEmpty(res.records)
                ? setState({ ...state, error: true })
                : setState({ ...state, events: res.records, error: false })
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
                onFinish={searchEvent}
            >
                <FormBuilder fieldsList={fields} className="search-event__fields" />
                <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
                    Rechercher
                </Button>
            </Form>

            <div className="search-result">
                <h1>Résultat de la recherche</h1>
                {state.error && <Empty />}

                <CardsEvent events={state.events} />
                <BackTop />
            </div>
        </>
    )
}

export default Search
