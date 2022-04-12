import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import Sprite, { ISpriteProps } from 'components/canvas/Sprite';
import { GAME_BG_SPRITE_SIZE } from 'utils/constants';
import SpriteSheet from '../../../assets/sprites/spriteSheet.png';

export interface IBackGroundProps extends IProps {
    width: number
    height: number
}

class Background extends DisplayObject<IBackGroundProps> {
    private xRowsNum: number;

    private yRowsNum: number;

    private levelMetaData: Array<Array<Sprite<ISpriteProps>>> = [];

    private readonly config = {
        upperBoarder: {
            sx: 0,
            sy: 0,
            sWidth: GAME_BG_SPRITE_SIZE,
            sHeight: GAME_BG_SPRITE_SIZE,
        },
        road: {
            sx: 100,
            sy: 0,
            sWidth: GAME_BG_SPRITE_SIZE,
            sHeight: GAME_BG_SPRITE_SIZE,
        },
        bottomBoarder: {
            sx: 200,
            sy: 0,
            sWidth: GAME_BG_SPRITE_SIZE,
            sHeight: GAME_BG_SPRITE_SIZE,
        },
    }

    constructor(props: IBackGroundProps) {
        super(props);
        this.xRowsNum = Math.ceil(this.props.width / GAME_BG_SPRITE_SIZE);
        this.yRowsNum = Math.ceil(this.props.height / GAME_BG_SPRITE_SIZE);
        for (let i = 0; i < this.yRowsNum; i += 1) {
            const isFirst = i === 0;
            const isLast = i === this.yRowsNum - 1;
            let configObj = isFirst ? this.config.upperBoarder : this.config.road;
            if (isLast) {
                configObj = this.config.bottomBoarder;
            }
            const row = [];
            for (let j = 0; j < this.xRowsNum; j += 1) {
                row.push(new Sprite({
                    src: SpriteSheet,
                    sx: configObj.sx,
                    sy: configObj.sy,
                    sWidth: configObj.sWidth,
                    sHeight: configObj.sHeight,
                    dx: j * GAME_BG_SPRITE_SIZE,
                    dy: i * GAME_BG_SPRITE_SIZE,
                    dWidth: configObj.sWidth,
                    dHeight: configObj.sHeight,
                }));
            }
            this.levelMetaData.push(row);
        }
    }

    render = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
        this.levelMetaData.forEach(sprites => {
            sprites.forEach(sprite => {
                sprite.render(ctx, deltaTime);
            });
        });
    }
}

export default Background;
