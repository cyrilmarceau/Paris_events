import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

const { Meta } = Card

const CardEvent = ({ events }) => {
    const [evID, setEvID] = useState([])

    const editFavorite = (el) => {
        let valueLs
        let newVal = {}

        // Check if ID exist in the localStorage
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            ls.map((elLs, i) => {
                if (elLs.evID === el.record.id) {
                    console.log('SPLICE')
                    // Remove item from localStorage
                    ls.splice(i, 1)
                    setEvID(evID.filter((id) => id !== elLs.evID))
                    // Set new value to the state
                    Api.setLs(JSON.stringify(ls))
                } else {
                    valueLs = []

                    ls.map((el) => valueLs.push(el))

                    newVal = el.record.fields
                    newVal.evID = el.record.id
                    if (evID.indexOf(el.record.id) === -1) {
                        setEvID((evID) => [...evID, el.record.id])
                        console.log('PUSH')
                    }
                    valueLs.push(newVal)
                    Api.setLs(JSON.stringify(valueLs))
                }
            })
        } else {
            console.log('ADD IF EMPTY')
            valueLs = []

            newVal = el.record.fields
            newVal.evID = el.record.id
            valueLs.push(newVal)

            setEvID((evID) => [...evID, el.record.id])
            Api.setLs(JSON.stringify(valueLs))
        }
    }

    useEffect(() => {
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            ls.map((el) => {
                setEvID((evID) => [...evID, el.evID])
            })
        }
    }, [])

    // useEffect(() => {
    //     localStorageItem.map((el) => {
    //         console.log(el)
    //         setEvID((evID) => [...evID, el.evID])
    //     })
    //     return () => {}
    // }, [localStorageItem])

    return (
        <div className="card-container">
            {events.map((el, i) => {
                return (
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
                            // type="primary"
                            // id.includes(el.record.id) ? <HeartFilled /> : <HeartOutlined />
                            icon={evID.includes(el.record.id) ? <HeartFilled /> : <HeartOutlined />}
                            className={evID.includes(el.record.id) ? 'is-favorite' : ''}
                        >
                            Enregistrer
                        </Button>
                    </Card>
                )
            })}
        </div>
    )
}

export default CardEvent
