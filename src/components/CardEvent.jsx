import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

import { useLocation } from 'react-router-dom'

const { Meta } = Card

const CardEvent = ({ events }) => {
    let location = useLocation()

    const [evID, setEvID] = useState([])

    const editFavorite = (el) => {
        let valueLs
        let newVal = {}

        // Check if we have item in localStorage
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            ls.map((elLs, i) => {
                if (elLs.evID === el.record.id) {
                    // Remove item in LS if exist
                    ls.splice(i, 1)

                    // Filter state with id for change icon
                    setEvID(evID.filter((id) => id !== elLs.evID))

                    // Set new value to the LS
                    Api.setLs(JSON.stringify(ls))
                } else {
                    // Remove item if exist
                    valueLs = []

                    ls.map((el) => valueLs.push(el))

                    newVal = el.record.fields
                    newVal.evID = el.record.id

                    // Check if ID not exist in state
                    if (evID.indexOf(el.record.id) === -1) {
                        setEvID((evID) => [...evID, el.record.id])
                    }

                    valueLs.push(newVal)
                    Api.setLs(JSON.stringify(valueLs))
                }
            })
        } else {
            // Add item if LS have 0 item
            valueLs = []

            newVal = el.record.fields
            newVal.evID = el.record.id
            valueLs.push(newVal)

            setEvID((evID) => [...evID, el.record.id])
            Api.setLs(JSON.stringify(valueLs))
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
                        key={i}
                        hoverable
                        style={{ width: 550 }}
                        cover={
                            <Link key={i} to={`/event/${el.record.id}`}>
                                <img alt="example" src={el.record.fields.cover_url} />{' '}
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
                            <img alt="example" src={el.record.fields.cover_url} />{' '}
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
