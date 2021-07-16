import React, { useState, useEffect } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

const { Meta } = Card

const CardEvent = ({ events }) => {
    let location = useLocation()

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

    let renderCard = []

    let render = events.map((el, i) => {
        if (location.pathname === '/favoris') {
            renderCard.push(
                evID.includes(el.record.id) ? (
                    <Card
                        className="card-content"
                        key={i}
                        hoverable
                        cover={
                            <Link key={i} to={`/event/${el.record.id}`}>
                                {/* <img
                                    alt={el.record.fields.cover_alt}
                                    src={el.record.fields.cover_url}
                                /> */}
                                <div
                                    className="img-event"
                                    style={{
                                        backgroundImage: `url(${el.record.fields.cover_url})`,
                                    }}
                                ></div>
                            </Link>
                        }
                    >
                        <Meta
                            title={el.record.fields.title}
                            description={el.record.fields.category}
                        />
                        <p className="card-date">
                            {Api.convertDate(el.record.fields.date_start, ',', 'à', true)}
                        </p>
                        <p className="card-content">{el.record.fields.lead_text}</p>
                        <Button
                            onClick={() => editFavorite(el)}
                            icon={evID.includes(el.record.id) ? <HeartFilled /> : <HeartOutlined />}
                            className={evID.includes(el.record.id) ? 'is-favorite' : ''}
                        >
                            Enregistrer
                        </Button>
                    </Card>
                ) : null
            )
        } else {
            renderCard.push(
                <Card
                    key={i}
                    hoverable
                    style={{ width: 550 }}
                    cover={
                        <Link key={i} to={`/event/${el.record.id}`}>
                            {/* <img
                                alt={el.record.fields.cover_alt}
                                src={el.record.fields.cover_url}
                            />{' '} */}
                            <div
                                className="img-event"
                                style={{
                                    backgroundImage: `url(${el.record.fields.cover_url})`,
                                }}
                            ></div>
                        </Link>
                    }
                >
                    <Meta title={el.record.fields.title} description={el.record.fields.category} />
                    <p className="card-date">
                        {Api.convertDate(el.record.fields.date_start, ',', 'à', true)}
                    </p>
                    <p className="card-content">{el.record.fields.lead_text}</p>
                    <Button
                        onClick={() => editFavorite(el)}
                        icon={evID.includes(el.record.id) ? <HeartFilled /> : <HeartOutlined />}
                        className={evID.includes(el.record.id) ? 'is-favorite' : ''}
                    >
                        Enregistrer
                    </Button>
                </Card>
            )
        }
    })

    return <div className="card-container">{renderCard}</div>
}

export default CardEvent
