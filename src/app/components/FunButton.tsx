import * as React from "react";

import styles from "./FunButton.less";

import gsap from 'gsap';
import {Quad} from 'gsap';

interface Props {
    children?: any;
    width?: number;
    height?: number;
    onClick?: any;
}

interface State {
    text: string;
    width: number;
    height: number;
}

export class FunButton extends React.Component <Props, State> {

    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    drawing: boolean;
    scale: number = 1;
    delta: number = 0;

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        
        this.state = {
            text: this.props.children || "",
            width: this.props.width || 40,
            height: this.props.height || 40
        };
    }

    componentDidMount() {
        this.drawing = true;
        this.canvas = this.canvasRef.current;
        this.ctx = this.canvas.getContext('2d');
        requestAnimationFrame(() => this.draw());
    }

    componentWillUnmount() {
        this.drawing = false;
    }

    click() {
        gsap.to(this, {
            duration: 0.25,
            scale: 0, 
            ease: Quad.easeInOut,
            onComplete: () => this.props.onClick()
        });
    }

    draw() {
        if (!this.drawing) {
            return;
        }

        this.delta += 0.05;
        let scale = this.scale == 1 ? 0.9 + Math.sin(this.delta) * 0.05 : this.scale;

        let ctx = this.ctx;
        ctx.clearRect(0, 0, 100, 100);

        ctx.save();
        ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        ctx.scale(scale, scale);

        ctx.fillStyle = "#F25C78";
        ctx.beginPath();
        ctx.arc(0, 0, this.canvas.width / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.props.children, this.canvas.width / 2, this.canvas.height / 2);

        requestAnimationFrame(() => this.draw());
    }

    render() {
        return <div onClick={() => this.click()} className={styles.button}>
            <canvas ref={this.canvasRef} width={this.state.width} height={this.state.height}></canvas>
        </div>
    }
}