import * as React from 'react';
import { max } from 'd3-array';
import { scaleLinear, scaleLog, scaleTime, scaleSqrt } from 'd3-scale';
import { pointRadial } from 'd3-shape';
import 'd3-transition';
import { interpolateLab } from 'd3-interpolate';
import { Planet } from './OnePlanet';
// import { Legend } from './Legend';
import {
	DPlanets,
	Layout,
	ColorLayout,
	DPlanetWithPosition,
	DPlanet,
	StoryStep,
	Filter,
	PlanetSize,
	CHZ,
	Scale
} from 'types/types';
import {
	getLayoutPosition,
	getColorLayout,
	TRANSITION_DURATION,
	ease,
	getOpacity,
	getRadiusSize,
	getCHZColor,
	toRadians
} from '../utils/getters';
import { CHZ as OneCHZ } from './CHZ';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { darkGrey, neutralGrey } from '../materials/color';

import styled from 'react-emotion';
import { Hints } from './Hints';
import { PolarAxis } from './PolarAxis';
import { format } from 'd3-format';
import { legendType } from '../materials/typography';

const PlanetRoot = styled('div')`
`;
const Visualization = styled('div')`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const YLabelContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const AxisYLabel = styled('div')`
  ${legendType};
`;

const XLabelContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AxisXLabel = styled('div')`
  ${legendType};
`;
interface Props {
	data: DPlanets;
	maxNumberOfPlanetInAYear: number;
	width: number;
	height: number;
	margins: any;
	step: StoryStep;
}
interface State {
	layout: Layout;
	previousLayout: Layout;
	colorLayout: ColorLayout;
	previousColorLayout: ColorLayout;
	filter: Filter;
	previousFilter: Filter;
	size: PlanetSize;
	previousSize: PlanetSize;
	chz: CHZ;
	previousChz: CHZ;
	startTime: number;
	elapsedTime: number;
	data: Array<DPlanetWithPosition> | null;
}

export class Planets extends React.Component<Props, State> {
	canvas: React.RefObject<HTMLCanvasElement>;
	axisTime: React.RefObject<SVGGElement>;
	axisX: React.RefObject<SVGGElement>;
	axisY: React.RefObject<SVGGElement>;
	axisYHint: React.RefObject<HTMLDivElement>;
	animationId: any = null;
	constructor(props: Props) {
		super(props);
		this.canvas = React.createRef();
		this.axisTime = React.createRef();
		this.axisX = React.createRef();
		this.axisY = React.createRef();
		this.axisYHint = React.createRef();
		this.state = {
			layout: 'stacked',
			previousLayout: 'stacked',
			colorLayout: 'neutral',
			previousColorLayout: 'neutral',
			filter: 'first',
			previousFilter: 'first',
			size: 'neutral',
			previousSize: 'neutral',
			chz: 'none',
			previousChz: 'none',
			data: null,
			startTime: 0,
			elapsedTime: 0
		};
	}

	getDistanceScaleLog = () => {
		const { data, width, margins } = this.props;
		const w = width - margins.left - margins.right;
		return scaleLog().domain([ 1, max(data, (d) => d.st_distanceToSun) || 8500 ]).range([ margins.left, w / 2 ]);
	};
	getYearScale = () => {
		const { width, margins } = this.props;
		const w = width - margins.left - margins.right;
		return scaleTime().domain([ new Date(1988, 0, 0), new Date(2018, 0, 0) ]).range([ margins.left, w ]).nice();
	};
	getStackedVerticalOffsetScale = () => {
		const { height, margins, maxNumberOfPlanetInAYear } = this.props;
		const h = height - margins.top - margins.bottom;
		return scaleLinear().domain([ 0, Math.floor(maxNumberOfPlanetInAYear) ]).range([ h, margins.top ]).nice();
	};
	getStackedHorizontalOffsetScale = () => {
		return scaleLinear().domain([ 0, 0.75 ]).range([ -4, 4 ]).nice();
	};
	getPlanetStarDistanceScale = () => {
		const { width, margins } = this.props;
		const w = width - margins.left - margins.right;
		const maxPlanetStarDistance = 3; // Don't display outliers
		return scaleLinear().domain([ 0, maxPlanetStarDistance ]).range([ margins.left, w ]).nice();
	};
	getPlanetRadiusScale = () => {
		const { width } = this.props;
		return scaleSqrt().domain([ 0, 30 ]).range([ 1, width / 180 ]);
	};
	getStarTemperatureScale = () => {
		const { height, margins } = this.props;
		const h = height - margins.top - margins.bottom;
		const maxStarTemperature = 10000;
		return scaleLinear().domain([ 0, maxStarTemperature ]).range([ h, margins.top ]);
	};
	// Year axis
	createAxisTime = (scale: Scale): void => {
		const g = select(this.axisTime.current);
		g.call(axisBottom(scale).tickSizeOuter(0).ticks(5) as any);
		g.select('.domain').attr('stroke', darkGrey);
		g.selectAll('.tick line').remove();
		g.selectAll('.tick text').attr('font-family', 'IBM Plex Mono').attr('font-size', 14).attr('fill', neutralGrey);
	};
	updateAxisTime = (): void => {
		select(this.axisTime.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
	};
	hideAxisTime = (): void => {
		select(this.axisTime.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 0);
	};
	// Distance Axis
	createAxisX = (scale: Scale): void => {
		const g = select(this.axisX.current);
		g.call(axisBottom(scale).tickSizeOuter(0).ticks(6).tickFormat(format('~r')) as any);
		g.select('.domain').attr('stroke', darkGrey);
		g.selectAll('.tick line').remove();
		g.selectAll('.tick text').attr('font-family', 'IBM Plex Mono').attr('font-size', 14).attr('fill', neutralGrey);
	};
	updateAxisX = (): void => {
		select(this.axisX.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
		select(this.axisYHint.current).transition().duration(TRANSITION_DURATION / 2).style('opacity', 1);
	};
	hideAxisX = (): void => {
		select(this.axisX.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 0);
		select(this.axisYHint.current).transition().duration(TRANSITION_DURATION / 2).style('opacity', 0);
	};
	// Temperature axis
	createAxisY = (scale: Scale): void => {
		const g = select(this.axisY.current).attr('opacity', 0);
		g.call(axisLeft(scale).tickSizeOuter(0).ticks(2).tickFormat(format('~s')) as any);
		g.select('.domain').remove();
		g.selectAll('.tick line').attr('stroke', darkGrey);
		g.selectAll('.tick text').attr('font-family', 'IBM Plex Mono').attr('font-size', 14).attr('fill', neutralGrey);
	};

	updateAxisY = (): void => {
		select(this.axisY.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
	};
	hideAxisY = (): void => {
		select(this.axisY.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 0);
	};

	updateAllAxis = (layout: Layout) => {
		if (layout === 'stacked') {
			this.updateAxisTime();
			this.hideAxisX();
			this.hideAxisY();
		} else if (layout === 'scatter') {
			this.updateAxisX();
			this.hideAxisTime();
			this.updateAxisY();
		} else if (layout === 'polar') {
			this.hideAxisTime();
			this.hideAxisX();
			this.hideAxisY();
		}
	};
	transition = (timestamp: number) => {
		// FIXME, should there be a different transition function depending on
		// what is being transitioned on? color? layout? displayed?
		// Maybe quick (color) and fast (positions) transition
		const {
			startTime,
			elapsedTime,
			data,
			layout,
			previousLayout,
			colorLayout,
			// previousColorLayout,
			filter,
			// previousFilter,
			size,
			previousSize,
			chz,
			previousChz
		} = this.state;

		const { width, height } = this.props;
		// console.log('width in transition', width);

		const psds = this.getPlanetStarDistanceScale();
		const sts = this.getStarTemperatureScale();

		if (this.canvas.current) {
			const ctx = this.canvas.current.getContext('2d');

			if (startTime && elapsedTime < TRANSITION_DURATION) {
				if (ctx) ctx.clearRect(0, 0, width, height);
				const progress = timestamp - startTime;
				this.setState({ elapsedTime: progress });
				const t = Math.min(1, ease(progress / TRANSITION_DURATION));

				data &&
					data.forEach((pl) => {
						const sourceOpacity = getOpacity(pl, filter);
						// const targetOpacity = getOpacity(pl, previousFilter);
						const sourceColor = getColorLayout(pl, colorLayout, sourceOpacity);
						// const targetColor = getColorLayout(pl, previousColorLayout, targetOpacity);
						if (chz !== 'none') {
							// FIXME: should CHZ be an overlaid Canvas layer? (might be quicker)
							// in another function, only update one of the canvas when needed.
							OneCHZ(
								ctx,
								Math.round(psds(pl.st_inner)),
								Math.round(sts(pl.st_Teff)),
								Math.round(psds(pl.st_outer)),
								Math.round(sts(pl.st_Teff)),
								interpolateLab(getCHZColor(pl, chz), getCHZColor(pl, previousChz))(1 - t)
							);
						}
						Planet(
							ctx,
							getLayoutPosition(pl, previousLayout)[0] * (1 - t) + getLayoutPosition(pl, layout)[0] * t,
							getLayoutPosition(pl, previousLayout)[1] * (1 - t) + getLayoutPosition(pl, layout)[1] * t,
							getRadiusSize(pl, previousSize) * (1 - t) + getRadiusSize(pl, size) * t,
							// interpolateLab(sourceColor, targetColor)(1 - t)
							sourceColor
						);
					});
				this.animationId = window.requestAnimationFrame(this.transition);
			}
		} else {
			cancelAnimationFrame(this.animationId);
		}
	};

	trigger = () => {
		window.requestAnimationFrame(this.transition);
	};

	reset = (
		previousLayout: Layout,
		previousColorLayout: ColorLayout,
		previousFilter: Filter,
		previousSize: PlanetSize,
		previousChz: CHZ
	) => {
		this.setState({
			startTime: window.performance.now(),
			elapsedTime: 0,
			layout: this.props.step.layout,
			previousLayout,
			colorLayout: this.props.step.colorLayout,
			previousColorLayout,
			filter: this.props.step.filter,
			previousFilter,
			size: this.props.step.size,
			previousSize,
			chz: this.props.step.chz,
			previousChz
		});
	};

	drawCanvas = () => {
		const { width, height } = this.props;
		const { filter } = this.state;
		if (this.canvas.current) {
			const ctx = this.canvas.current.getContext('2d');
			if (ctx && this.state.data) {
				ctx.clearRect(0, 0, width, height);
				this.state.data.map((d) => {
					const opacity = getOpacity(d, filter);
					return Planet(ctx, d.stackX, d.stackY, 1, getColorLayout(d, this.state.colorLayout, opacity));
				});
			}
		}
	};

	componentDidUpdate(prevProps: Props) {
		const { layout, colorLayout, filter, size, chz } = this.props.step;
		const timeScale = this.getYearScale();
		const planetStarDistScale = this.getPlanetStarDistanceScale();
		const starTemperatureScale = this.getStarTemperatureScale();
		if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
			// Update planets positions
			const data = this.calculatePlanetPositions();
			this.setState({ data });
			// Redraw Axis
			this.createAxisTime(timeScale);
			this.createAxisX(planetStarDistScale);
			this.createAxisY(starTemperatureScale);
			this.updateAllAxis(layout);
			this.reset(
				prevProps.step.layout,
				prevProps.step.colorLayout,
				prevProps.step.filter,
				prevProps.step.size,
				prevProps.step.chz
			);
			this.trigger();
		}
		if (
			layout !== prevProps.step.layout ||
			colorLayout !== prevProps.step.colorLayout ||
			filter !== prevProps.step.filter ||
			size !== prevProps.step.size ||
			chz !== prevProps.step.chz
		) {
			this.reset(
				prevProps.step.layout,
				prevProps.step.colorLayout,
				prevProps.step.filter,
				prevProps.step.size,
				prevProps.step.chz
			);
			this.trigger();
		}

		// Axis
		if (layout !== prevProps.step.layout) {
			this.updateAllAxis(layout);
		}
	}
	getPolarX = (d: DPlanet | DPlanetWithPosition, maxDist: number, distanceScale: any, w: number, margin: number) =>
		pointRadial(
			toRadians(d.st_rightAscension),
			distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
		)[0] +
		w / 2 +
		margin;
	getPolarY = (d: DPlanet | DPlanetWithPosition, maxDist: number, distanceScale: any, h: number, margin: number) =>
		pointRadial(
			toRadians(d.st_rightAscension),
			distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
		)[1] +
		h / 2 +
		margin;

	calculatePlanetPositions = (): Array<DPlanetWithPosition> => {
		const { data, width, height, margins } = this.props;
		const w = width - margins.left - margins.right;
		const h = height - margins.top - margins.bottom;

		// Polar plot
		const maxDist = max(data, (d) => d.st_distanceToSun) || 8500;
		const distanceScale = this.getDistanceScaleLog();

		// Stack Plot
		const timeScale = this.getYearScale();
		const stackVerticalOffsetScale = this.getStackedVerticalOffsetScale();
		const stackHorizontalOffsetScale = this.getStackedHorizontalOffsetScale();

		// Scatterplot
		const planetStarDistScale = this.getPlanetStarDistanceScale();
		const starTemperatureScale = this.getStarTemperatureScale();

		return data.map((d) => ({
			neutralX: Math.round(timeScale(d.year) + stackHorizontalOffsetScale(d.offsetH)),
			neutralY: Math.round(stackVerticalOffsetScale(0)),
			stackX: Math.round(timeScale(d.year) + stackHorizontalOffsetScale(d.offsetH)),
			stackY: Math.round(stackVerticalOffsetScale(d.offsetV)),
			polarX: Math.round(this.getPolarX(d, maxDist, distanceScale, w, margins.left)),
			polarY: Math.round(this.getPolarY(d, maxDist, distanceScale, h, margins.top)),
			scatterX: Math.round(planetStarDistScale(d.pl_distance)),
			scatterY: Math.round(starTemperatureScale(d.st_Teff)),
			...d
		}));
	};

	componentDidMount() {
		const data = this.calculatePlanetPositions();
		this.setState({ data }, () => this.drawCanvas());

		// Draw axis
		const timeScale = this.getYearScale();
		const planetStarDistScale = this.getPlanetStarDistanceScale();
		const starTemperatureScale = this.getStarTemperatureScale();
		this.createAxisTime(timeScale);
		this.createAxisX(planetStarDistScale);
		this.createAxisY(starTemperatureScale);
		this.hideAxisX();
		this.hideAxisY();
	}

	render() {
		const { width, height, margins, step } = this.props;
		const w = width - margins.left - margins.right;
		const h = height - margins.top - margins.bottom;
		// Scales
		const distanceScale = this.getDistanceScaleLog();
		const timeScale = this.getYearScale();
		const stackVerticalOffsetScale = this.getStackedVerticalOffsetScale();
		const stackHorizontalOffsetScale = this.getStackedHorizontalOffsetScale();
		const planetStarDistScale = this.getPlanetStarDistanceScale();
		const starTemperatureScale = this.getStarTemperatureScale();
		const planetRadiusScale = this.getPlanetRadiusScale();
		// Planets for Hints
		const firstPlanet: DPlanetWithPosition =
			this.state.data && this.state.data.find((planet) => planet.pl_discYear === 1988);
		const Earth: DPlanetWithPosition =
			this.state.data && this.state.data.find((planet) => planet.pl_name === 'Earth');
		const KeplerPlanet: DPlanetWithPosition =
			this.state.data && this.state.data.find((planet) => planet.pl_name === 'Kepler-1470 b');
		const Proxima: DPlanetWithPosition =
			this.state.data && this.state.data.find((planet) => planet.pl_name === 'Proxima Cen b');
		const maxDist = (this.state.data && max(this.state.data, (d) => d.st_distanceToSun)) || 8500;
		return (
			<PlanetRoot>
				<Visualization data-name="visualization" style={{ width: width }}>
					<canvas
						ref={this.canvas}
						width={width}
						height={height}
						style={{ transform: `translateX(${0}px)` }}
					/>
					<svg
						width={width}
						height={height}
						style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
						data-name="svg-axis"
					>
						<g
							data-name="svg-axis-star-temperature"
							ref={this.axisY}
							transform={`translate(${margins.left},0)`}
						/>
						<g
							data-name="svg-axis-planet-star-distance"
							ref={this.axisX}
							transform={`translate(${0}, ${h + 6})`}
						/>
						<g data-name="svg-axis-year" ref={this.axisTime} transform={`translate(${0}, ${h + 6})`} />
					</svg>
					<div ref={this.axisYHint}>
						<YLabelContainer style={{ width: width, height: height }}>
							<AxisYLabel>↑ Star Temperature (Kelvin)</AxisYLabel>
						</YLabelContainer>
						<XLabelContainer>
							<AxisXLabel>→ Distance star-planet (AU)</AxisXLabel>
						</XLabelContainer>
					</div>
					{Earth && (
						<PolarAxis
							show={step.layout === 'polar'}
							width={width}
							height={height}
							margins={margins}
							xCenter={Math.round(this.getPolarX(Earth, maxDist, distanceScale, w, margins.left))}
							yCenter={Math.round(this.getPolarY(Earth, maxDist, distanceScale, h, margins.top)) + h / 2}
							hintValues={[
								{ radius: distanceScale(100), value: '100 pc' },
								{ radius: distanceScale(1000), value: "1'000 pc" },
								{ radius: distanceScale(8500), value: 'Distance unknown' }
							]}
						/>
					)}
					{firstPlanet &&
					Earth &&
					Proxima &&
					KeplerPlanet && (
						<Hints
							activeHint={step.hint}
							width={width}
							height={height}
							margins={margins}
							earth={{
								x: Math.round(planetStarDistScale(Earth.pl_distance)),
								y: Math.round(starTemperatureScale(Earth.st_Teff)),
								chzInner: Math.round(planetStarDistScale(Earth.st_inner)),
								chzOuter: Math.round(planetStarDistScale(Earth.st_outer))
							}}
							mars={{
								x: Math.round(planetStarDistScale(1.5)),
								y: Math.round(starTemperatureScale(Earth.st_Teff))
							}}
							onePlanet={{
								x: Math.round(
									timeScale(firstPlanet.year) + stackHorizontalOffsetScale(firstPlanet.offsetH)
								),
								y: Math.round(stackVerticalOffsetScale(firstPlanet.offsetV))
							}}
							kepler={{
								x: Math.round(this.getPolarX(KeplerPlanet, maxDist, distanceScale, w, margins.left)),
								y: Math.round(this.getPolarY(KeplerPlanet, maxDist, distanceScale, h, margins.top))
							}}
							proxima={{
								polarX: Math.round(this.getPolarX(Proxima, maxDist, distanceScale, w, margins.left)),
								polarY: Math.round(this.getPolarY(Proxima, maxDist, distanceScale, h, margins.top)),
								x: Math.round(planetStarDistScale(Proxima.pl_distance)),
								y: Math.round(starTemperatureScale(Proxima.st_Teff)),
								chzInner: Math.round(planetStarDistScale(Proxima.st_inner)),
								chzOuter: Math.round(planetStarDistScale(Proxima.st_outer))
							}}
							radiiLegend={[
								{ value: 1, radius: planetRadiusScale(1), label: 'Earth radius' },
								{ value: 30, radius: planetRadiusScale(30), label: 'x Earth radius' }
							]}
						/>
					)}
				</Visualization>
				{/* <Legend legendType={this.props.step.legendType} /> */}
			</PlanetRoot>
		);
	}
}
