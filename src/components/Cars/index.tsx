import React from 'react';
import { Image } from 'react-bootstrap';
import cn from 'classnames';
import car1 from '../../img/car1.svg';
import car2 from '../../img/car2.svg';
import car3 from '../../img/car3.svg';
import bus1 from '../../img/bus1.svg';
import truck1 from '../../img/truck1.svg';
import css from './Cars.module.css';

const cars = [
    {
        img: car1,
        width: 78,
        height: 158,
        top: '15%',
        right: '30%',
        bottom: 'auto',
        left: 'auto',
    },
    {
        img: car2,
        width: 78,
        height: 158,
        top: '12%',
        right: 'auto',
        bottom: 'auto',
        left: '15%',
    },
    {
        img: car3,
        width: 78,
        height: 158,
        top: 'auto',
        right: '17%',
        bottom: '10%',
        left: 'auto',
    },
    {
        img: car3,
        width: 78,
        height: 158,
        top: '50%',
        right: 'auto',
        bottom: '5%',
        left: '5%',
    },
    {
        img: bus1,
        width: 78,
        height: 294,
        top: 'auto',
        right: 'auto',
        bottom: '5%',
        left: '25%',
    },
    {
        img: truck1,
        width: 88,
        height: 303,
        top: '30%',
        right: '5%',
        bottom: 'auto',
        left: 'auto',
    },
];

export const Cars = () => (
    <>
        {cars.map((car, index) => (
            <Image
                key={index}
                style={{
                    top: car.top,
                    right: car.right,
                    bottom: car.bottom,
                    left: car.left,
                }}
                className={cn(css.car)}
                src={car.img}
                width={car.width}
                height={car.height}
            />
        ))}
    </>
);
