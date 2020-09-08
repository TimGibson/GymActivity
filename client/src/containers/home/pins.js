
import * as React from 'react';
import { PureComponent } from 'react';
import { Marker } from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const pinIcon = "m407.579 87.677c-31.073-53.624-86.265-86.385-147.64-87.637-2.62-.054-5.257-.054-7.878 0-61.374 1.252-116.566" +
    " 34.013-147.64 87.637-31.762 54.812-32.631 120.652-2.325 176.123l126.963 232.387c.057.103.114.206.173.308 5.586 9.709 " +
    "15.593 15.505 26.77 15.505 11.176 0 21.183-5.797 26.768-15.505.059-.102.116-.205.173-.308l126.963-232.387c30.304-55.471 " +
    "29.435-121.311-2.327-176.123zm-151.579 144.323c-39.701 0-72-32.299-72-72s32.299-72 72-72 72 32.299 72 72-32.298 72-72 72z"

const size = 36;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends PureComponent {
  render() {
    const {data, onClick} = this.props;

    return data.map((city, index) => (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
        <div style={{ width: size, height: size }}>
            <svg
                height='100%'
                width='100%'
                viewBox='0 0 512 512'
                style={{
                    cursor: 'pointer',
                    fill: '#d00',
                    stroke: 'none',
                    transform: `translate(${-size / 2}px,${-size}px)`
                }}
                onClick={() => onClick(city)}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={pinIcon} />
            </svg>
        </div>
      </Marker>
    ));
  }
}