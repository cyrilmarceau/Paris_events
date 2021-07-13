import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

const { Meta } = Card

const CardEvent = ({ events }) => {
    const [localStorageItem, setLocalStorageItem] = useState([])
    const [fav, setFav] = useState([])

    const editFavorite = (el) => {
        // setLocalStorageItem((localStorageItem) => [...localStorageItem, el.record])
        let a
        let newVal = {}

        // Check if ID exist in the localStorage
        let ls = Api.getLs('favorites')
        if (!_.isEmpty(ls)) {
            ls.map((elLs, i) => {
                if (elLs.evID !== el.record.id) {
                    a = []
                    // console.log('pas encore rajouter')
                    a.push(ls)
                    newVal = el.record.fields
                    newVal.evID = el.record.id
                    a.push(newVal)
                    Api.setLs(JSON.stringify(a))
                } else {
                    a = []
                    a.push(ls)
                    a.splice(i, 1)

                    Api.setLs(JSON.stringify(a))
                    console.log('déjà ajouter')
                }
            })
        } else {
            a = []
            newVal = el.record.fields
            newVal.evID = el.record.id
            a.push(newVal)
            Api.setLs(JSON.stringify(a))
        }

        // Api.setLs(JSON.stringify(newVal))
        // let ls = Api.getLs('favorites')
        // _.find(ls, function (o) {
        //     if (o.evID !== el.record.id) {
        //         console.log(o)
        //     } else {
        //         setFav((fav) => [...fav, newVal])
        //     }
        // })
    }

    useEffect(() => {
        let ls = Api.getLs('favorites')
        // Create default array with empty value in local storage if we don't have value
        if (!_.isEmpty(ls)) {
            setLocalStorageItem((localStorageItem) => [...localStorageItem, ls])
            // Api.setLs(JSON.stringify([]))
        } else {
            // Set value in array
        }

        return () => {}
    }, [])

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
                            // icon={
                            // id.includes(el.record.id) ? <HeartFilled /> : <HeartOutlined />
                            // }
                            // className={id.includes(el.record.id) ? 'is-favorite' : ''}
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
