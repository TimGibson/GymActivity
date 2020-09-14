import * as React from 'react';
import { useState, Fragment } from 'react';
import ReactMapGL, { Marker, GeolocateControl, LinearInterpolator, Popup } from 'react-map-gl';
import load_icon from '../../images/loading.gif'
import axios from 'axios';
import Pins from './pins';
import PopupContent from "./popup";

const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const geolocateStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
};

function Map() {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 43.650256,
        longitude: -79.387024,
        zoom: 13
    });
    const [postal, setPostal] = useState('')
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState([])
    const [popup, setPopup] = useState({})

    const findGyms = (lat, lng) => {
        axios.post('http://localhost:3000/test', { lat, lng })
            .then(res => {
                console.log(res)
                let nextPins = []
                res.data.results.map(gym => {
                    console.log(gym)
                    nextPins.push({
                        latitude: gym.geometry.location.lat,
                        longitude: gym.geometry.location.lng,
                        name: gym.name,
                        photos: gym.photos,
                        hours: gym.opening_hours
                    })
                })
                setPins(nextPins)
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    const submitPostal = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&key=${API_KEY}`)
            .then(res => {
                setLoading(false)
                let location = res.data.results[0].geometry.location && res.data.results[0].geometry.location
                if (location) {
                    goToViewport(location.lng, location.lat)
                    findGyms(location.lat, location.lng)
                }
            })
    }

    const goToViewport = (longitude, latitude) => {
        setViewport({
            ...viewport,
            longitude,
            latitude,
            zoom: 13,
            transitionInterpolator: new LinearInterpolator(),
            transitionDuration: 700
        });
    };

    const onClickPin = info => {
        setPopup(info)
    }

    const onGeolocate = info => {
        findGyms(info.coords.latitude, info.coords.longitude)
    }

    return (
        <Fragment>
            { loading &&
                <div style={{ position: 'absolute', height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2}}>
                    <img style={{ height: 200 }} src={load_icon} alt={"loading"} />
                </div>
            }
            <div style={{ position: "absolute", top:-1.55, left: 40, zIndex: 2}}>
                {/*<button onClick={() => findGyms(viewport.latitude, viewport.longitude)}>testapi</button>*/}
                <form onSubmit={submitPostal}>
                    <input style={{outline: 0, border: '2px solid lightgrey', padding: '4.2px 8px', width: 130, margin: 10, position: 'relative', borderRadius: '5px', fontSize: '15.1px', fontFamily: 'Open Sans' }}
                           type="text"
                           placeholder={'Enter Postal/Zip'}
                           value={postal}
                           onChange={v => setPostal(v.target.value)} />
                </form>
            </div>
            <ReactMapGL
                mapboxApiAccessToken={'pk.eyJ1IjoidGltZ2lic29uIiwiYSI6ImNrZWo0NmZ6ZDFkcDcycm52ZHNydm1xM3MifQ.jzV-w7o6yKCMeU1L6s9glg'}
                transitionInterpolator={new LinearInterpolator({speed: 1.2})}
                transitionDuration='auto'
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
            >
                {popup.latitude &&
                    <Popup
                        offsetTop={8}
                        closeOnClick={false}
                        closeButton={false}
                        tipSize={1}
                        anchor="top"
                        longitude={popup.longitude ? popup.longitude : 0}
                        latitude={popup.latitude ? popup.latitude : 0}
                        onClose={() => setPopup({})}
                    >
                        <PopupContent info={popup}/>
                    </Popup>
                }
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={{enableHighAccuracy: true}}
                    onGeolocate={onGeolocate}
                />
                <Pins data={pins} onClick={onClickPin} />
            </ReactMapGL>
        </Fragment>

    );
}

export default Map