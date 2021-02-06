import * as React from "react";
import gsap from "gsap";
import {Quint, Quad} from "gsap";

interface Props{
    onComplete: any;
}

export class CompleteAnimView extends React.Component <Props, {}> {

    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    
    particles = [];
    numParticles = 200;

    colors = [
        "#F25C78",
        "#5166A6",
        "#F2CF63",
        "#F2B872",
        "#F28B50"
    ];

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext('2d');

        this.createParticles();
        this.createTimeline();
        requestAnimationFrame(() => this.draw());
    }

    handle_COMPLETE() {
        this.props.onComplete();
    }

    createTimeline() {
        let tl = gsap.timeline({
            onComplete: () => this.handle_COMPLETE()
        });

        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];
            let x = (this.canvas.width / 2) + (this.particles[i].vx * 50);
            let y = (this.canvas.height / 2) + (this.particles[i].vy * 50);
            let half = Math.random();
            let max = 1 + Math.random();
            let maxSize = 5 + Math.random() * 100;
            tl.to(particle, half, {size: maxSize, ease: Quint.easeOut}, 0);
            tl.to(particle, half, {alpha: 1, ease: Quint.easeOut}, 0);
            tl.to(particle, max, {x, y, ease: Quad.easeOut}, 0);
            tl.to(particle, max - half, {size: 0, ease: Quad.easeOut}, half);
        }
    }

    createParticles() {
        for (let i = 0; i < this.numParticles; i++) {
            let colorInt = Math.floor(Math.random() * this.colors.length);
            let color = this.colors[colorInt];
            let velocity = 20;
            let vx = -velocity + Math.random() * (velocity * 2);
            let vy = -velocity + Math.random() * (velocity * 2);
            let x = this.canvas.width / 2;
            let y = this.canvas.height / 2;
            this.particles.push({x, y, vx, vy, color, size: 0, speed: Math.random(), alpha: 0});
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
        for (let i = 0; i < this.particles.length; i++) {
            this.ctx.save();
            this.ctx.fillStyle = this.particles[i].color;
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.draw());
    }

    render() {
        return <canvas ref={this.canvasRef}></canvas>;
    }
}