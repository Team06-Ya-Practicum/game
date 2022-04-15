import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import { GAME_HERO_SPEED, GAME_LOOP_RENDER_RATE } from 'utils/constants';
import Background from 'components/canvas/Background';
import VehicleController from 'components/canvas/VehicleController';
import HeroSprite from 'assets/sprites/hero_sprite.png';
import Hero from 'components/canvas/Hero';
import CrystalController from 'components/canvas/CrystalController';
import { store } from 'store/store';
import { EGameState, IGameState, setGameState } from 'store/slices/gameSlice';
import CollisionController from 'components/canvas/CollisionController';
import Crystal from "components/canvas/Crystal";
import Vehicle from "components/canvas/Vehicle";

class GameEngine {
    private readonly canvasInner: HTMLCanvasElement;

    private readonly ctxInner: CanvasRenderingContext2D;

    private bgInner: DisplayObject<IProps> | undefined;

    private children: Array<DisplayObject<IProps>> = [];

    private animRequestId = 0;

    private time: Date = new Date();

    private gameStore: IGameState;

    private collisionDetector: CollisionController;

    constructor(canvasSelector: string) {
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('No canvas found, shutting down');
        }
        this.canvasInner = canvas;
        this.ctxInner = canvas.getContext('2d') as CanvasRenderingContext2D; // safe assert
        this.recalcCanvasSize();

        window.addEventListener('resize', this.recalcCanvasSize);

        this.gameStore = store.getState().game;
        store.subscribe(this.updateGameStoreFromStore);

        this.collisionDetector = new CollisionController();

        this.animRequestId = window.requestAnimationFrame(this.gameLoop);
    }

    /**
     * Clean up everything here
     */
    destroy = (): void => {
        if (this.animRequestId) {
            window.cancelAnimationFrame(this.animRequestId);
        }
        this.destroyChildren();
        window.removeEventListener('resize', this.recalcCanvasSize);
    }

    private destroyChildren = (): void => {
        this.children.forEach(child => {
            if (child instanceof Hero) {
                child.destroy();
            }
        });
    }

    updateGameStoreFromStore = (): void => {
        const newState = store.getState();
        const shoudStartGame = this.gameStore.gameState === EGameState.INIT
            && newState.game.gameState === EGameState.PLAYING;
        this.gameStore = newState.game;
        if (shoudStartGame) {
            this.startGame();
        }
    }

    startGame = (): void => {
        this.destroyChildren();
        this.initChildren();
        this.animRequestId = window.requestAnimationFrame(this.gameLoop);
    }

    stopGame = (): void => {
        if (this.animRequestId) {
            window.cancelAnimationFrame(this.animRequestId);
        }
        store.dispatch(setGameState(EGameState.ENDED));
    }

    initChildren = (): void => {
        this.children = [
            new CrystalController({
                width: this.canvas.width,
                height: this.canvas.height,
            }),
            new VehicleController({
                width: this.canvas.width,
                height: this.canvas.height,
            }),
            new Hero({
                src: HeroSprite,
                sx: 0,
                sy: 0,
                sWidth: 45,
                sHeight: 58,
                dx: 5,
                dy: 5,
                dWidth: 45,
                dHeight: 58,
                speed: GAME_HERO_SPEED,
                speedX: 0,
                speedY: 0,
                widthView: this.canvas.width,
                heightView: this.canvas.height,
            }),
        ];
    }

    getHero = (): Hero | null => {
        return this.getChild(2) as Hero | null;
    }

    getCrystals = (): Crystal[] | null => {
        const controller = this.getChild(0) as CrystalController | null;
        if (!controller) {
            return null;
        }
        return controller.getCrystals();
    }

    getVehicles = (): Vehicle[] | null => {
        const controller = this.getChild(1) as VehicleController | null;
        if (!controller) {
            return null;
        }
        return controller.getVehicles();
    }

    getChild = (index: number): DisplayObject<IProps> | null => {
        if (!this.children || this.children.length !== 3 || index > 2) {
            return null;
        }
        return this.children[index] || null;
    }

    detectCollisions = (): void => {
        const hero = this.getHero();
        const crystals = this.getCrystals();
        const vehicles = this.getVehicles();

        if (hero && crystals) {
            const crystalCollided = this.collisionDetector.detectCollisions(hero, crystals);
            if (crystalCollided >= 0) {
                const crystalController = this.getChild(0) as CrystalController; // safe assert
                crystalController.collectCrystal(crystalCollided);
            }
        }
        if (hero && vehicles) {
            const vehicleCollided = this.collisionDetector.detectCollisions(hero, vehicles);
            if (vehicleCollided >= 0) {
                this.stopGame();
            }
        }
    }

    /**
     * Game loop - runs within requestAnimationFrame
     */
    private gameLoop = () => {
        const now = new Date();
        const deltaTime: number = (Number(now) - Number(this.time)) / 1000;
        this.detectCollisions();
        this.clearFrame();
        this.bg.render(this.ctx, deltaTime);
        this.children.forEach(child => {
            child.render(this.ctx, deltaTime);
        });
        setTimeout(() => {
            if (this.gameStore.gameState !== EGameState.PLAYING) {
                return;
            }
            this.time = now;
            this.animRequestId = window.requestAnimationFrame(this.gameLoop);
        }, GAME_LOOP_RENDER_RATE);
    }

    /**
     * recalculate canvas size for correct aspect ratio
     */
    recalcCanvasSize = (): void => {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.initBackground();
    }

    /**
     * init background image by adding it
     * to the children array as first element
     */
    private initBackground = () => {
        this.bgInner = new Background({
            width: this.canvas.width,
            height: this.canvas.height,
        });
    }

    /**
     * use to clear canvas at the start of frame rendering
     */
    private clearFrame = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    get canvas(): HTMLCanvasElement {
        return this.canvasInner;
    }

    get ctx(): CanvasRenderingContext2D {
        return this.ctxInner;
    }

    get bg(): DisplayObject<IProps> {
        return this.bgInner as DisplayObject<IProps>;
    }
}

export default GameEngine;
