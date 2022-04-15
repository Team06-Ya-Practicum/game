import Hero from 'components/canvas/Hero';
import Sprite, { ISpriteProps } from 'components/canvas/Sprite';
import { GAME_COLLISION_SAFE_OFFSET } from 'utils/constants';

class CollisionController {
    detectCollisions = (hero: Hero, crystals: Array<Sprite<ISpriteProps>>): number => {
        const {
            dx,
            dy,
            dWidth,
            dHeight,
        } = hero.props;
        let collisionIndex = -1;
        crystals.forEach((item, i) => {
            const p = item.props;
            let hasCollisionX = false;
            let hasCollisionY = false;
            if (p.dx < dx && p.dx + p.dWidth > dx + GAME_COLLISION_SAFE_OFFSET) {
                hasCollisionX = true;
            }
            if (p.dx > dx && p.dx < dx + dWidth - GAME_COLLISION_SAFE_OFFSET) {
                hasCollisionX = true;
            }
            if (p.dy < dy && p.dy + p.dHeight > dy + GAME_COLLISION_SAFE_OFFSET) {
                hasCollisionY = true;
            }
            if (p.dy > dy && p.dy < dy + dHeight - GAME_COLLISION_SAFE_OFFSET) {
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
