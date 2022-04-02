import React from 'react';
import { Image } from 'react-bootstrap';
import car1 from '../../img/car1.svg';
import car2 from '../../img/car2.svg';
import car3 from '../../img/car3.svg';
import bus1 from '../../img/bus1.svg';
import truck1 from '../../img/truck1.svg';

export const Cars = () => (
    <>
        <Image
            style={{ position: 'absolute', top: '15%', right: '30%' }}
            src={car1}
            width={78}
            height={158}
        />
        <Image
            style={{ position: 'absolute', top: '12%', left: '15%' }}
            src={car2}
            width={78}
            height={158}
        />
        <Image
            style={{ position: 'absolute', bottom: '10%', right: '17%' }}
            src={car3}
            width={78}
            height={158}
        />
        <Image
            style={{ position: 'absolute', top: '50%', left: '5%' }}
            src={car3}
            width={78}
            height={158}
        />
        <Image
            style={{ position: 'absolute', bottom: '5%', left: '25%' }}
            src={bus1}
            width={78}
            height={294}
        />
        <Image
            style={{ position: 'absolute', top: '30%', right: '5%' }}
            src={truck1}
            width={88}
            height={303}
        />
    </>
);
