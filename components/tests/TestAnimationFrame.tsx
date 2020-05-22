import * as React from 'react';
import { easeCubic } from 'd3-ease';
const ease = easeCubic;
const WIDTH = 500;
const HEIGHT = 500;
const INITIAL = 20;
const TARGET = 300;
const DURATION = 1500;
interface Props {}
interface State {
	layout: string | null;
	x: number;
	y: number;
	start: number | null;
	elapsedTime: number;
}
export class TestAnimationFrame extends React.Component<Props, State> {
	canvas: React.RefObject<HTMLCanvasElement>;
	constructor(props: any) {
		super(props);
		this.canvas = React.createRef();

		this.state = {
			layout: null,
			x: INITIAL,
			y: INITIAL,
			start: null,
			elapsedTime: 0
		};
	}

	toggleLayout = () => {
		this.setState({ layout: 'moved', start: window.performance.now() });

		window.requestAnimationFrame(this.step);
	};

	componentDidMount() {
		this.drawCanvas();
	}
	// componentDidUpdate() {
	// 	this.drawCanvas();
	// }
	step = (timestamp: number) => {
		const { start, elapsedTime } = this.state;
		if (this.canvas.current) {
			const ctx = this.canvas.current.getContext('2d');

			if (start && elapsedTime < DURATION) {
				if (ctx) ctx.clearRect(0, 0, WIDTH, HEIGHT);
				const progress = timestamp - start;
				this.setState({ elapsedTime: progress });
				const t = Math.min(1, ease(progress / DURATION));

				const x = INITIAL * (1 - t) + TARGET * t;
				const y = INITIAL * (1 - t) + TARGET * t;

				Circle({
					ctx,
					x: x,
					y: y,
					r: 10,
					fillColor: '#ff5555'
				});
				window.requestAnimationFrame(this.step);
			}
		}
	};
	drawCanvas = () => {
		if (this.canvas.current) {
			const ctx = this.canvas.current.getContext('2d');
			if (ctx) {
				ctx.clearRect(0, 0, WIDTH, HEIGHT);
				// draw children “components”
				Circle({
					ctx,
					x: INITIAL,
					y: INITIAL,
					r: 10,
					fillColor: '#ff5555'
				});
			}
		}
	};
	render() {
		return (
			<div>
				<button onClick={this.toggleLayout}>MOVE!</button>
				<canvas style={{ border: '1px solid grey' }} ref={this.canvas} width={WIDTH} height={HEIGHT} />
			</div>
		);
	}
}
interface CircleProps {
	ctx: any;
	x: number;
	y: number;
	r: number;
	fillColor: string;
}
const Circle = ({ ctx, x, y, r, fillColor }: CircleProps) => {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	// ctx.stroke();
	ctx.fillStyle = fillColor;
	ctx.fill();
};
