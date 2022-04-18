import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import Crystal from 'components/canvas/Crystal';
import { GAME_CRYSTAL_ROTATION_STEP, GAME_CRYSTAL_SCORE, GAME_MAX_CRYSTALS } from 'utils/constants';
import { randomNum } from 'utils/common';
import { store } from 'store/store';
import { incrementScore } from 'store/slices/gameSlice';
import CrystalSprite from '../../../assets/sprites/crystal_sprite.png';

export interface ICrystalController extends IProps {
    width: number
    height: number
}

class CrystalController extends DisplayObject<ICrystalController> {
    private crystals: Crystal[];

    constructor(props: ICrystalController) {
        super(props);
        this.crystals = [];
    }

    render = (ctx: CanvasRenderingContext2D, deltaTime: number): void => {
        this.shouldAddCrystal();
        this.crystals.forEach(child => {
            child.render(ctx, deltaTime);
        });
    }

    private shouldAddCrystal = (): void => {
        if (this.crystals.length >= GAME_MAX_CRYSTALS) {
            return;
        }
        const shouldSpawnCrystal = randomNum(1, 700);
        if (shouldSpawnCrystal > 3) {
            return;
        }
        const dxRandom = randomNum(10, this.props.width - 50);
        const dyRandom = randomNum(10, this.props.height - 50);
        this.crystals.push(new Crystal({
            src: CrystalSprite,
            sx: 0,
            sy: 0,
            sWidth: 40,
            sHeight: 40,
            dxOrigin: dxRandom,
            dx: dxRandom,
            dy: dyRandom,
            dWidth: 40,
            dHeight: 40,
            rotationStep: GAME_CRYSTAL_ROTATION_STEP,
            isShrinking: true,
        }));
    }

    getCrystals = (): Crystal[] => this.crystals

    collectCrystal = (index: number): void => {
        this.crystals = this.crystals.filter((item, i) => index !== i);
        store.dispatch(incrementScore(GAME_CRYSTAL_SCORE));
    }
}

export default CrystalController;
