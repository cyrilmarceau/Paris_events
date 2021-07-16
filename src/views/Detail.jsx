import React, { useState, useEffect } from 'react'

import { Helmet } from 'react-helmet'

import { useParams, Link } from 'react-router-dom'

import { Row, Col, Tag, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

import Leaflet from '../components/Leaflet'

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
            ls.forEach((el) => {
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
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 60 }}>
                {state.event.map((el, i) => {
                    return (
                        <React.Fragment key={i}>
                            <Helmet>
                                <title>{el.record.fields.title}</title>
                            </Helmet>
                            <Col md={24} className="event-container-title">
                                <div className="event__title">
                                    <h1 className="">{el.record.fields.title}</h1>
                                    <h2>{el.record.fields.contact_name}</h2>
                                    {!_.isNil(el.record.fields.tags)
                                        ? el.record.fields.tags.map((el, i) => (
                                              <Tag key={i} color="blue">
                                                  {el}
                                              </Tag>
                                          ))
                                        : null}
                                </div>
                            </Col>

                            <Col md={12} className="event-content">
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
                                    <p className="title">Dates :</p>
                                    <span>
                                        {Api.convertDate(
                                            el.record.fields.date_start,
                                            ',',
                                            'à',
                                            true
                                        )}
                                    </span>
                                </div>
                                <div className="container informations__price">
                                    <p className="title">Prix : </p>
                                    {!_.isNil(el.record.fields.price_detail) ? (
                                        <span>{el.record.fields.price_detail}</span>
                                    ) : (
                                        <span>Non spécifier</span>
                                    )}
                                </div>
                                <div className="container informations__to-go">
                                    <p className="title">S'y rendre : </p>
                                    {!_.isEmpty(el.record.fields.lat_lon) ? (
                                        <Leaflet
                                            title={el.record.fields.title}
                                            pos={el.record.fields.lat_lon}
                                        />
                                    ) : null}

                                    <p className="adress">{el.record.fields.address_name}</p>
                                    <p className="adress">{el.record.fields.address_street}</p>
                                    <p className="adress">{el.record.fields.address_zipcode}</p>
                                </div>
                                {!_.isNil(el.record.fields.transport) ? (
                                    <div className="container to-go__in-transport">
                                        <p className="title">En transports : </p>
                                        <p>{el.record.fields.transport}</p>
                                    </div>
                                ) : null}

                                <div className="container more-informations">
                                    <p className="title">Information complémentaire : </p>
                                    {!_.isNil(el.record.fields.contact_phone) ? (
                                        <div className="sub-title">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="phone-alt"
                                                className="svg-inline--fa fa-phone-alt fa-w-16"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"
                                                ></path>
                                            </svg>
                                            <span> {el.record.fields.contact_phone}</span>
                                        </div>
                                    ) : null}

                                    {!_.isNil(el.record.fields.contact_facebook) ? (
                                        <div className="sub-title">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fab"
                                                data-icon="facebook-f"
                                                className="svg-inline--fa fa-facebook-f fa-w-10"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 320 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                                ></path>
                                            </svg>
                                            <Link href={el.record.fields.contact_facebook}>
                                                {el.record.fields.contact_facebook}
                                            </Link>
                                        </div>
                                    ) : null}
                                    {!_.isNil(el.record.fields.contact_mail) ? (
                                        <div className="sub-title">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="envelope"
                                                className="svg-inline--fa fa-envelope fa-w-16"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                                                ></path>
                                            </svg>
                                            <span>{el.record.fields.contact_mail}</span>
                                        </div>
                                    ) : null}
                                </div>
                            </Col>
                        </React.Fragment>
                    )
                })}
            </Row>
        </>
    )
}

export default Detail
