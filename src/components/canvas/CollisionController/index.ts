import Hero from 'components/canvas/Hero';
import Sprite, { ISpriteProps } from 'components/canvas/Sprite';
import { GAME_COLLISION_SAFE_OFFSET, GAME_COLLISION_SAFE_OFFSET_CAR } from 'utils/constants';

class CollisionController {
    detectCollisions = (
        hero: Hero,
        crystals: Array<Sprite<ISpriteProps>>,
        isCar: boolean,
    ): number => {
        const {
            dx,
            dy,
            dWidth,
            dHeight,
        } = hero.props;
        let collisionIndex = -1;
        const offset = isCar ? GAME_COLLISION_SAFE_OFFSET_CAR : GAME_COLLISION_SAFE_OFFSET;
        crystals.forEach((item, i) => {
            const p = item.props;
            let hasCollisionX = false;
            let hasCollisionY = false;
            if (p.dx < dx && p.dx + p.dWidth > dx + offset) {
                hasCollisionX = true;
            }
            if (p.dx > dx && p.dx < dx + dWidth - offset) {
                hasCollisionX = true;
            }
            if (p.dy < dy && p.dy + p.dHeight > dy + offset) {
                hasCollisionY = true;
            }
            if (p.dy > dy && p.dy < dy + dHeight - offset) {
                hasCollisionY = true;
            }
            if (hasCollisionX && hasCollisionY) {
                collisionIndex = i;
            }
        });
        return collisionIndex;
    }
}

export default CollisionController;
