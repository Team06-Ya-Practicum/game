import DisplayObject, { IProps } from 'components/canvas/DisplayObject';
import Sprite from 'components/canvas/Sprite';
import { GAME_LOOP_RENDER_RATE } from 'utils/constants';
import backgroundImg from '../../../assets/sprites/background.png';

class GameEngine {
    private readonly canvasInner: HTMLCanvasElement;

    private readonly ctxInner: CanvasRenderingContext2D;

    private children: Array<DisplayObject<IProps>>;

    private animRequestId: number;

    constructor(canvasSelector: string) {
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('No canvas found, shutting down');
        }
        this.canvasInner = canvas;
        this.ctxInner = canvas.getContext('2d') as CanvasRenderingContext2D; // safe assert
        this.children = [];
        this.initBackground();
        this.gameLoop();
        this.animRequestId = window.requestAnimationFrame(this.gameLoop); // start game
    }

    /**
     * Clean up everything here
     */
    destroy = (): void => {
        if (this.animRequestId) {
            window.cancelAnimationFrame(this.animRequestId);
        }
    }

    /**
     * Game loop - runs within requestAnimationFrame
     */
    private gameLoop = () => {
        this.clearFrame();
        this.children.forEach(child => {
            child.render();
        });
        setTimeout(() => {
            this.animRequestId = window.requestAnimationFrame(this.gameLoop);
        }, GAME_LOOP_RENDER_RATE);
    }

    /**
     * init background image by adding it
     * to the children array as first element
     */
    private initBackground = () => {
        const bg = new Sprite(this.ctx, {
            origin: { x: 0, y: 0 },
            url: backgroundImg,
        });
        this.children = [bg, ...this.children];
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
}

export default GameEngine;
