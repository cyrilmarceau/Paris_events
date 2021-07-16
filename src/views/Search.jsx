import React, { useState } from 'react'

import { Helmet } from 'react-helmet'

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
        pagination: {
            current: 0,
            offset: 0,
            pageSize: 10,
            total: 0,
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
                ? setState({ ...state, events: [], error: true })
                : setState({
                      ...state,
                      events: res.records,
                      error: false,
                      pagination: {
                          ...state.pagination,
                          total: res.total_count,
                      },
                  })
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
            <Helmet>
                <title>Favoris</title>
            </Helmet>
            <h1 className="search-title">Faite une recherche sur les événements à Paris</h1>
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

            {state.error && <Empty />}

            {!_.isEmpty(state.events) ? (
                <div className="search-result">
                    <h1>Résultat de la recherche</h1>

                    <CardsEvent events={state.events} />
                    <BackTop />
                </div>
            ) : null}
        </>
    )
}

export default Search
