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

    const [evID, setEvID] = useState([])

    const editFavorite = (el) => {
        let valueLs
        let newVal = {}
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            const eventIndexFound = ls.findIndex((e) => e.evID === el.record.id)

            if (eventIndexFound > -1) {
                const eventFound = ls.find((e) => e.evID === el.record.id)
                // Remove item in LS if exist
                ls.splice(eventIndexFound, 1)

                setEvID(evID.filter((id) => id !== eventFound.evID))
                // Set new value to the LS
                Api.setLs(ls)
            } else {
                newVal = el.record.fields
                newVal.evID = el.record.id

                // Check if ID not exist in state
                if (evID.indexOf(el.record.id) === -1) setEvID((evID) => [...evID, el.record.id])

                ls.push(newVal)

                Api.setLs(ls)
            }
        } else {
            valueLs = []

            newVal = el.record.fields
            newVal.evID = el.record.id
            valueLs.push(newVal)

            setEvID((evID) => [...evID, el.record.id])
            Api.setLs(valueLs)
        }
    }

    useEffect(() => {
        // Get default item in ls if he is not empty
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            ls.map((el) => {
                setEvID((evID) => [...evID, el.evID])
            })
        }
    }, [])

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
        <Row gutter={{ xs: 8, sm: 16, md: 60 }}>
            {state.event.map((el, i) => {
                return (
                    <React.Fragment key={i}>
                        {/* <div className="wrapper-event"> */}
                        <Col md={24} className="event-container-title">
                            <div className="event__title">
                                <h1 className="">{el.record.fields.title}</h1>
                                <h2>{el.record.fields.contact_name}</h2>
                            </div>
                        </Col>

                        <Col md={12} className="event-content">
                            <div className="event__image">
                                <img src={el.record.fields.cover_url} alt="Fond de l'événement" />
                            </div>

                            <div className="event__lead-text">
                                <p>{el.record.fields.lead_text}</p>
                            </div>
                            <div className="event__description">
                                <p>{Api.removeHTMLTag(el.record.fields.description)}</p>
                            </div>
                        </Col>
                        <Col md={12} className="event-informations">
                            <Button
                                onClick={() => editFavorite(el)}
                                icon={
                                    evID.includes(el.record.id) ? (
                                        <HeartFilled />
                                    ) : (
                                        <HeartOutlined />
                                    )
                                }
                                className={evID.includes(el.record.id) ? 'is-favorite' : ''}
                            >
                                Enregistrer
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
                        {/* </div> */}
                    </React.Fragment>
                )
            })}
        </Row>
    )
}

export default Detail
