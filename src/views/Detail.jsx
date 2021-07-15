import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { Row, Col, Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

const Detail = () => {
    let { id } = useParams()

    const [state, setState] = useState({
        id: '',
        event: [],
    })

    useEffect(() => {
        fetchEvent()
        return () => {}
    }, [])

    const fetchEvent = async () => {
        try {
            let res = await Api.getEventById(id)
            setState({ ...state, event: [res], id: id })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Row>
            {state.event.map((el, i) => {
                return (
                    <React.Fragment key={i}>
                        <Col md={12}>
                            <div className="wrapper-event">
                                <div className="event__title">
                                    <h1 className="">{el.record.fields.title}</h1>
                                    <h2>{el.record.fields.contact_name}</h2>
                                </div>
                                <div className="event__image">
                                    <img
                                        src={el.record.fields.cover_url}
                                        alt="Fond de l'événement"
                                    />
                                </div>

                                <div className="event__lead-text">
                                    <p>{el.record.fields.lead_text}</p>
                                </div>
                                <div className="event__description">
                                    <p>{Api.removeHTMLTag(el.record.fields.description)}</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={12} className="wrapper-informations">
                            <Button
                                // onClick={() => addToFavorite(el.record.id)}
                                // type="primary"
                                icon={
                                    state.id == el.record.id ? <HeartFilled /> : <HeartOutlined />
                                }
                                className={state.id === el.record.id ? 'is-favorite' : ''}
                            >
                                {console.log(state.id, el.record.fields)}
                                Sauvegarder
                            </Button>
                            <div className="container informations__date">
                                <p className="title">Dates:</p>
                                <span>
                                    {Api.convertDate(el.record.fields.date_start, ',', 'à', true)}
                                </span>
                            </div>
                            <div className="container informations__price">
                                <p className="title">Prix:</p>
                                <span>{el.record.fields.price_detail}</span>
                            </div>
                            <div className="container informations__to-go">
                                <p className="adress">{el.record.fields.address_name}</p>
                                <p className="adress">{el.record.fields.address_street}</p>
                                <p className="adress">{el.record.fields.address_zipcode}</p>
                                <div className="to-go__in-transport">
                                    <p className="title">En transports</p>
                                    <p>{el.record.fields.transport}</p>
                                </div>
                            </div>
                            <div className="more-informations"></div>
                        </Col>
                    </React.Fragment>
                )
            })}
        </Row>
    )
}

export default Detail
