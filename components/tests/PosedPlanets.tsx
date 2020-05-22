import * as React from 'react';
import styled from 'react-emotion';
import { min, max } from 'd3-array';
import { scaleLinear, scaleOrdinal, scaleLog, scaleTime } from 'd3-scale';
import { pointRadial } from 'd3-shape';
import { schemeSet1 } from 'd3-scale-chromatic';
import { DISCOVERY_METHODS } from '../Planets';

import 'd3-transition';

import posed from 'react-pose';

const TRANSITION_DURATION = 1500;

// Styled components
const Root = styled('div')``;

const PosedCircle = posed.circle({
	byDistance: {
		cx: ({ cx }: { cx: number }) => cx,
		cy: ({ cy }: { cy: number }) => cy,
		transition: { duration: TRANSITION_DURATION }
	},
	byYear: {
		cx: ({ cx }: { cx: number }) => cx,
		cy: ({ cy }: { cy: number }) => cy,
		transition: { duration: TRANSITION_DURATION }
	}
});

// Types
type Atmosphere = 'hydrogen-rich' | 'metals-rich' | 'no-atmosphere';
export type DiscoveryMethod =
	| 'Transit'
	| 'Astrometry'
	| 'Imaging'
	| 'Microlensing'
	| 'Pulsar'
	| 'Radial Velocity'
	| 'TTV'
	| 'Other';
type MassClass = 'Jovian' | 'Mercurian' | 'Neptunian' | 'Subterran' | 'Superterran' | 'Terran';
interface DPlanet {
	pl_name: string;
	pl_radius: number;
	pl_mass: number;
	pl_density: number;
	pl_gravity: number;
	pl_distance: number;
	pl_escapeVelocity: number;
	pl_starFluxMean: number;
	pl_TeqMean: number;
	pl_TsMean: number;
	pl_magnitude: number;
	pl_apparentSize: number;
	pl_surfacePressure: number;
	pl_period: number;
	pl_semiMajorAxis: number;
	pl_inclination: number;
	pl_atmosphereClass: Atmosphere;
	pl_discMethod: DiscoveryMethod;
	st_inner: number;
	st_outer: number;
	st_mass: number;
	st_radius: number;
	st_luminosity: number;
	st_distanceToSun: number;
	st_Teff: number;
	st_age: number;
	st_rightAscension: number;
	pl_massClass: MassClass;
	pl_habitable: number;
	pl_confirmed: number;
	pl_discYear: Date;
	indexInYear: number;
}
type DPlanets = Array<DPlanet>;
// type Layout = 'byDistance' | 'byYear';
interface State {
	planetsLayout: string;
}
interface Props {
	data: DPlanets;
	maxNumberOfPlanetInAYear: number;
	width: number;
	height: number;
	margins: any;
}

export class PosedPlanets extends React.Component<Props, State> {
	planetGroup: React.RefObject<SVGGElement>;
	axisX: React.RefObject<SVGGElement>;
	axisY: React.RefObject<SVGGElement>;
	constructor(props: Props) {
		super(props);
		this.planetGroup = React.createRef();
		this.axisX = React.createRef();
		this.axisY = React.createRef();
		this.state = {
			planetsLayout: 'byDistance'
		};
	}
	togglePlanetsLayout = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		this.setState({ planetsLayout: e.currentTarget.value });
		// e.currentTarget.value === 'byYear' ? this.transitionToDiscoveryYear() : this.transitionToPolarPlot();
	};

	getDistanceScaleLog = () => {
		const { data, width, margins } = this.props;
		const w = width - margins.left - margins.right;
		const s = scaleLog().domain([ 1, max(data, (d) => d.st_distanceToSun) || 8500 ]).range([ 1, w / 2 ]).nice();
		return s;
	};
	getDistanceScaleLinear = () => {
		const { data, width, margins } = this.props;
		const w = width - margins.left - margins.right;
		const maxDist = max(data, (d) => d.st_distanceToSun) || 8500;
		const s = scaleLinear().domain([ 1, maxDist ]).range([ 1, w / 2 ]).nice();
		return s;
	};
	getYearScale = () => {
		const { data, width, margins } = this.props;
		const w = width - margins.left - margins.right;
		const ts = scaleTime()
			.domain([ min(data, (d) => d.pl_discYear) || 1988, max(data, (d) => d.pl_discYear) || 2018 ])
			.range([ 0, w ])
			.nice();
		return ts;
	};
	getStackedPlanetScale = () => {
		const { height, margins, maxNumberOfPlanetInAYear } = this.props;
		const h = height - margins.top - margins.bottom;
		return scaleLinear().domain([ 1, maxNumberOfPlanetInAYear ]).range([ h, 0 ]).nice();
	};
	// transitionToDiscoveryYear = () => {
	// 	const { data } = this.props;
	// 	const timeScale = this.getYearScale();
	// 	const stackScale = this.getStackedPlanetScale();
	// 	const pl = select(this.planetGroup.current).selectAll('circle');

	// 	pl
	// 		.data(data)
	// 		.transition()
	// 		.duration(TRANSITION_DURATION)
	// 		.attr('cx', (d) => timeScale(d.pl_discYear))
	// 		.attr('cy', (d) => stackScale(d.indexInYear));
	// };
	// transitionToPolarPlot = () => {
	// 	const { data, width, height, margins } = this.props;
	// 	const w = width - margins.left - margins.right;
	// 	const h = height - margins.top - margins.bottom;

	// 	const maxDist = max(data, (d) => d.st_distanceToSun) || 8500;
	// 	const hourToDegree = scaleLinear().domain([ 0, 24 ]).range([ 0, 360 ]);
	// 	const toRadians = (h: number) => hourToDegree(h) * Math.PI / 180;
	// 	const distanceScale = this.getDistanceScaleLog();

	// 	const getX = (d: DPlanet, maxDist: number) =>
	// 		pointRadial(
	// 			toRadians(d.st_rightAscension),
	// 			distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
	// 		)[0] +
	// 		w / 2;
	// 	const getY = (d: DPlanet, maxDist: number) =>
	// 		pointRadial(
	// 			toRadians(d.st_rightAscension),
	// 			distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
	// 		)[1] +
	// 		h / 2;

	// 	const pl = select(this.planetGroup.current).selectAll('circle');
	// 	pl
	// 		.data(data)
	// 		.transition()
	// 		.duration(TRANSITION_DURATION)
	// 		.attr('cx', (d: DPlanet) => getX(d, maxDist))
	// 		.attr('cy', (d: DPlanet) => getY(d, maxDist));
	// };
	// createXAxis = () => {
	//   const scale = this.getTimeScale();
	//   const g = select(this.axisX.current);
	//   g.call(s => axisBottom(scale).ticks(5)(s as any)); // FIXME: this should work
	//   g.select(".domain").remove();
	//   g.selectAll(".tick line").remove();
	//   g.selectAll(".tick text")
	//     .attr("font-size", 14)
	//     .attr("fill", "grey");
	// };

	// createYAxis = () => {
	//   const { width, margins } = this.props;
	//   const w = width - margins.left - margins.right;

	//   const scale = this.getDurationScale();
	//   const g = select(this.axisY.current);
	//   g.call(s => {
	//     axisLeft<number>(scale)
	//       .ticks(4)
	//       // .tickFormat(format ? format : x => x.toString())
	//       .tickPadding(8)
	//       .tickSize(-w)(s as any);
	//   });
	//   g.select(".domain").remove();
	//   g.selectAll(".tick line")
	//     .attr("stroke", "grey")
	//     .attr("stroke-dasharray", 2)
	//     .attr("stroke-width", 1);
	//   g.selectAll(".tick text")
	//     .attr("font-size", 14)
	//     .attr("fill", "grey");
	// };
	// componentDidUpdate() {
	//   this.createXAxis();
	//   this.createYAxis();
	// }

	render() {
		const { data, width, height, margins } = this.props;
		const { planetsLayout } = this.state;
		const w = width - margins.left - margins.right;
		const h = height - margins.top - margins.bottom;

		// Polar plot
		const maxDist = max(data, (d) => d.st_distanceToSun) || 8500;
		const hourToDegree = scaleLinear().domain([ 0, 24 ]).range([ 0, 360 ]);
		const toRadians = (h: number) => hourToDegree(h) * Math.PI / 180;
		const distanceScale = this.getDistanceScaleLog();

		const getX = (d: DPlanet, maxDist: number) =>
			pointRadial(
				toRadians(d.st_rightAscension),
				distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
			)[0] +
			w / 2;
		const getY = (d: DPlanet, maxDist: number) =>
			pointRadial(
				toRadians(d.st_rightAscension),
				distanceScale(d.st_distanceToSun ? d.st_distanceToSun : maxDist)
			)[1] +
			h / 2;

		const colorScale = scaleOrdinal().domain(DISCOVERY_METHODS).range(schemeSet1);

		return (
			<Root>
				<button onClick={this.togglePlanetsLayout} value="byDistance">
					Distance to the Solar System
				</button>
				<button onClick={this.togglePlanetsLayout} value="byYear">
					Discovery Year
				</button>
				<svg width={width} height={height}>
					{/* <g
						data-n="chart-axis-x"
						ref={this.axisX}
						transform={`translate(${margins.left}, ${h + margins.top})`}
					/>
					<g
						data-n="chart-axis-y"
						ref={this.axisY}
						transform={`translate(${margins.left}, ${margins.top})`}
					/> */}

					<g transform={`translate(${margins.left}, ${margins.top})`} ref={this.planetGroup}>
						{data.map((d) => {
							return (
								<PosedCircle
									key={`${d.pl_name}`}
									id={`planet-${d.pl_name}`}
									cx={planetsLayout === 'byDistance' ? getX(d, maxDist) : 100}
									cy={planetsLayout === 'byDistance' ? getY(d, maxDist) : 100}
									r={2}
									fill={colorScale(d.pl_discMethod) as string}
									pose={planetsLayout === 'byDistance' ? 'byDistance' : 'byYear'}
									onMouseOver={() => console.log(d)}
								/>
							);
						})}
					</g>
				</svg>
			</Root>
		);
	}
}
