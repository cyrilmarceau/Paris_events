import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { Card, Button } from 'antd'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import _ from 'lodash'

import Api from '../api/api'

const { Meta } = Card

const CardEvent = ({ events }) => {
    const [state, setState] = useState({
        id: '',
    })

    const addToFavorite = (id) => {
        let newS = _.cloneDeep(state)
        newS.id = id

        setState(newS)
        Api.setLs('id', id)
    }

    const checkLocalStorage = async () => {
        let id = localStorage.getItem(`id`)

        let newS = _.cloneDeep(state)
        newS.id = id
        setState(newS)
    }

    useEffect(() => {
        checkLocalStorage()
        return () => {}
    }, [state.id])

    return (
        <>
            {events.map((el, i) => {
                return (
                    <Link key={i} to={`/event/${el.record.id}`}>
                        <Card
                            hoverable
                            style={{ width: 550 }}
                            cover={<img alt="example" src={el.record.fields.cover_url} />}
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
                                onClick={() => addToFavorite(el.record.id)}
                                // type="primary"
                                icon={
                                    state.id == el.record.id ? <HeartFilled /> : <HeartOutlined />
                                }
                                className={state.id == el.record.id ? 'is-favorite' : ''}
                            />
                            {console.log(new Date(el.record.timestamp).toLocaleString())}
                            <p>{el.record.fields.timestamp}</p>
                        </Card>
                    </Link>
                )
            })}
        </>
    )
}

export default CardEvent

// {id: "416564e33bd8b869c4d09c0aba1d8aeeb9b008df", timestamp: "2021-07-12T04:00:05.019Z", size: 2440, fields: {…}}
// fields:
// access_link: "https://billetterie.maisondelaradio.fr/api/1/redirect/product/performance?id=10228363066774"
// access_mail: null
// access_phone: "0156401516"
// access_type: "reservation"
// address_city: "Paris"
// address_name: "Auditorium de Radio France"
// address_street: "116 Avenue du Président Kennedy"
// address_zipcode: "75016"
// blind: 0
// category: "Concerts -> Classique"
// contact_facebook: null
// contact_mail: "contact.billetterie@radiofrance.com"
// contact_name: "Radio France"
// contact_phone: "0156401516"
// contact_twitter: null
// contact_url: "https://www.maisondelaradio.fr/evenement/concert-symphonique/saint-saens-ndeg-2-alexandre-kantorow"
// cover: {mimetype: "image/jpeg", format: "JPEG", url: "https://opendata.paris.fr/api/v2/catalog/datasets/…e-a-paris-/files/909516b172a8b73ed9bca48ecf4c5d21", color_summary: Array(3), filename: "82447_bmNfYndfMV9jcmVkaXQtamltLWhpbnNvbi1vLmpwZWc=.jpg", …}
// cover_alt: "Nicholas Collon"
// cover_credit: "Jim Hinson"
// cover_url: "https://cdn.paris.fr/qfap/2021/07/07/82447_bmNfYndfMV9jcmVkaXQtamltLWhpbnNvbi1vLmpwZWc=.jpg"
// date_description: "Le vendredi 30 septembre 2022<br />de 20h à 22h<br />"
// date_end: "2022-09-30T20:00:00+00:00"
// date_start: "2022-09-30T18:00:00+00:00"
// deaf: 0
// description: "<p class=\"\">Nicholas Collon a imaginé là un programme franco-anglais qui s’ouvrira par une flamboyante partition de Berlioz inspirée de Byron. Harold en Italie ? Non, l’Ouverture du Corsaire, à propos de laquelle le compositeur écrivait : « Ce morceau doit se présenter avec une certaine crânerie. » Le Deuxième Concerto pour piano de Saint-Saëns, dont on commémore en 2021 les cent ans de la disparition, sera joué par Alexandre Kantorow, cette saison en résidence à Radio France. Le concert s’achèvera avec la Première Symphonie d’Elgar. « Elgar est sur les épaules de Berlioz », écrivit un soir un journaliste allemand !<br></p><p class=\"\"><br></p>"
// id: "120141"
// lat_lon: {lat: 48.852135, lon: 2.279797}
// lead_text: "HECTOR BERLIOZ\nLe Corsaire, ouverture\n\nCAMILLE SAINT-SAËNS\nConcerto pour piano et orchestre n° 2\n\nEDWARD ELGAR\nSymphonie n° 1\n\nALEXANDRE KANTOROW piano\nORCHESTRE NATIONAL DE FRANCE\nNICHOLAS COLLON direction"
// occurrences: "2022-09-30T20:00:00+02:00_2022-09-30T22:00:00+02:00"
// pmr: 0
// price_detail: "de 10 à 67€"
// price_type: "payant"
// programs: null
// tags: null
// title: "SAINT-SAËNS, N° 2 / ALEXANDRE KANTOROW"
// transport: "10 : Javel - André Citroën (677m)\n6 : Bir-Hakeim (701m)"
// updated_at: "2021-07-07T09:33:08+00:00"
// url: "https://quefaire.paris.fr/120141/saint-saens-n-2-alexandre-kantorow"
// __proto__: Object
// id: "416564e33bd8b869c4d09c0aba1d8aeeb9b008df"
// size: 2440
// timestamp: "2021-07-12T04:00:05.019Z"
// __proto__: Object
