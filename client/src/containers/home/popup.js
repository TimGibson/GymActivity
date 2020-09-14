import React, { Fragment } from 'react';
const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const PopupContent = props => {
    let background = props.info.photos && props.info.photos[0].photo_reference

    return (
        <Fragment>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    marginTop: -6,
                    marginLeft: -105,
                    backgroundImage: `url(https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${background}&key=${API_KEY})`,
                    backgroundColor: 'black',
                    width: 200,
                    height: 200,
                    filter: 'blur(1px) brightness(50%)',
                    borderRadius: 1,
                    zIndex: 10
                }} />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    marginTop: -6,
                    marginLeft: -105,
                    width: 200,
                    height: 200,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 1,
                    zIndex: 10
                }}>
                <div style={{ marginTop: 10, width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span style={{ marginLeft: 4, fontSize: 20, fontFamily: 'Open Sans', color: 'White' }}>
                                Gym 4000
                            </span>
                    <div style={{ fontWeight: 700, padding: '6px 8px', borderRadius: 4, fontSize: 11.5, fontFamily: 'Open Sans', color: 'White', backgroundColor: 'Red'}}>
                        BUSY
                    </div>
                </div>

                <div style={{ fontWeight: 600, fontSize: 20, fontFamily: 'Open Sans', color: 'White' }}>
                    73/80
                </div>
                <div style={{
                    cursor: 'pointer',
                    borderRadius: 4,
                    backgroundColor: 'OrangeRed',
                    marginBottom: 14,
                    fontSize: 13,
                    fontFamily: 'Open Sans',
                    color: 'White',
                    padding: '5px 15px',
                }}
                >
                    IM GOING
                </div>
            </div>
        </Fragment>
    );
};

export default PopupContent;
