import { ISpriteProps } from 'components/canvas/Sprite';
import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import { GAME_BG_SPRITE_SIZE, GAME_MAX_VEHICLES_PER_LANE, GAME_VEHICLE_SPEED } from 'utils/constants';
import { randomNum } from 'utils/common';
import Vehicle from 'components/canvas/Vehicle';
import SpriteSheet from '../../../assets/sprites/spriteSheet.png';

export enum ELaneDirection {
    LEFT = '@lane-direction/LEFT',
    RIGHT = '@lane-direction/RIGHT'
}

export interface IRoadLane {
    index: number
    originX: number
    originY: number
    direction: ELaneDirection
    children: Vehicle[]
}

export interface IVehicleControllerProps extends IProps {
    width: number
    height: number
}

class VehicleController extends DisplayObject<IVehicleControllerProps> {
    private roadLanes: IRoadLane[] = [];

    constructor(props: IVehicleControllerProps) {
        super(props);
        // lanes = total minus upper and bottom border
        const lanes = Math.ceil(this.props.height / GAME_BG_SPRITE_SIZE) - 2;
        for (let i = 0; i < lanes; i += 1) {
            const isEven = (i % 2) === 0;
            this.roadLanes.push({
                index: i,
                originX: isEven ? -160 : (this.props.width + 160),
                originY: GAME_BG_SPRITE_SIZE * (i + 1.5), /* upper boarder plus half road lane */
                direction: isEven ? ELaneDirection.RIGHT : ELaneDirection.LEFT,
                children: [],
            });
        }
    }

    render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.roadLanes.forEach(roadLane => {
            this.shouldSpawnVehicle(roadLane);
            roadLane.children.forEach(child => {
                child.render(ctx, deltaTime);
            });
            // eslint-disable-next-line no-param-reassign
            roadLane.children = this.filterVehicles(roadLane);
        });
    }

    shouldSpawnVehicle = (roadLane: IRoadLane): void => {
        if (roadLane.children.length === 0) {
            const randomShouldSpawn = randomNum(1, 3500);
            if (randomShouldSpawn > 3) {
                return;
            }
            const isLeft = roadLane.direction === ELaneDirection.LEFT;
            const speed = isLeft ? -GAME_VEHICLE_SPEED : GAME_VEHICLE_SPEED;
            roadLane.children.push(new Vehicle({
                speed,
                ...this.getRandomVehicleProps(roadLane),
            }));
        } else {
            if (roadLane.children.length >= GAME_MAX_VEHICLES_PER_LANE) {
                return;
            }
            const vehicle = roadLane.children[0] as Vehicle;
            if (roadLane.direction === ELaneDirection.RIGHT) {
                if (vehicle.props.dx > this.props.width / 4) {
                    const randomShouldSpawn = randomNum(1, 12);
                    if (randomShouldSpawn > 3) {
                        return;
                    }
                    roadLane.children.push(new Vehicle({
                        speed: GAME_VEHICLE_SPEED,
                        ...this.getRandomVehicleProps(roadLane),
                    }));
                }
                if (vehicle.props.dx > this.props.width / 2) {
                    const randomShouldSpawn = randomNum(1, 5);
                    if (randomShouldSpawn > 3) {
                        return;
                    }
                    roadLane.children.push(new Vehicle({
                        speed: GAME_VEHICLE_SPEED,
                        ...this.getRandomVehicleProps(roadLane),
                    }));
                }
            } else {
                if (vehicle.props.dx < this.props.width / 4) {
                    const randomShouldSpawn = randomNum(1, 10);
                    if (randomShouldSpawn > 3) {
                        return;
                    }
                    roadLane.children.push(new Vehicle({
                        speed: -GAME_VEHICLE_SPEED,
                        ...this.getRandomVehicleProps(roadLane),
                    }));
                }
                if (vehicle.props.dx < this.props.width / 2) {
                    const randomShouldSpawn = randomNum(1, 7);
                    if (randomShouldSpawn > 3) {
                        return;
                    }
                    roadLane.children.push(new Vehicle({
                        speed: -GAME_VEHICLE_SPEED,
                        ...this.getRandomVehicleProps(roadLane),
                    }));
                }
            }
        }
    }

    filterVehicles = (roadLane: IRoadLane): Vehicle[] => roadLane.children.filter(child => {
        const isLeft = roadLane.direction === ELaneDirection.LEFT;
        if (isLeft) {
            return child.props.dx > -170;
        }
        return child.props.dx < this.props.width + 170;
    })

    getRandomVehicleProps = (roadLane: IRoadLane): ISpriteProps => {
        const vehicleNum = randomNum(0, 4);
        let sx = 305;
        if (roadLane.direction === ELaneDirection.RIGHT) {
            sx = 465;
        }
        const sy = 85 * vehicleNum + 5;
        return {
            src: SpriteSheet,
            sx,
            sy,
            sWidth: 160,
            sHeight: 80,
            dx: roadLane.originX,
            dy: roadLane.originY - 40,
            dWidth: 160,
            dHeight: 80,
        };
    }
}

export default VehicleController;
