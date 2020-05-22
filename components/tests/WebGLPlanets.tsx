import { max, min } from 'd3-array';
import { scaleLinear, scaleLog, scaleOrdinal, scaleSqrt, scaleTime } from 'd3-scale';
import { schemeSet1 } from 'd3-scale-chromatic';
import { pointRadial } from 'd3-shape';
import 'd3-transition';
import * as React from 'react';

export const DISCOVERY_METHODS: Array<DiscoveryMethod> = [
	'Astrometry',
	'Imaging',
	'Microlensing',
	'Other',
	// 'Primary Transit', FIXME: Are we sure Primary Transit ant Transit are the same?
	'Pulsar',
	'Radial Velocity',
	'Transit',
	'TTV'
];

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
export interface DPlanetWithPosition extends DPlanet {
	x: number;
	y: number;
	polarX: number;
	polarY: number;
	stackX: number;
	stackY: number;
}
export type DPlanets = Array<DPlanet>;
type Layout = 'polar' | 'stack';
interface Props {
	data: DPlanets;
	maxNumberOfPlanetInAYear: number;
	maxRadius: number;
	width: number;
	height: number;
	margins: any;
	step: number;
}
interface State {
	layout: Layout;
	startTime: number;
	elapsedTime: number;
	data: Array<DPlanetWithPosition> | null;
}

export class WebGLPlanets extends React.Component<Props, State> {
	graphic: React.RefObject<HTMLDivElement> | any;
	// constructor(props: Props) {
	// 	super(props);
	// 	this.graphic = React.createRef();
	// }
	state: State = {
		layout: 'polar',
		data: [],
		startTime: 0,
		elapsedTime: 0
	};

	getMethodsColorScale = () => {
		return scaleOrdinal().domain(DISCOVERY_METHODS).range(schemeSet1);
	};
	getDistanceScaleLog = () => {
		const { data } = this.props;
		return scaleLog().domain([ 1, max(data, (d) => d.st_distanceToSun) || 8500 ]).range([ -1, 1 ]).nice();
	};
	getYearScale = () => {
		const { data } = this.props;
		const ts = scaleTime()
			.domain([ min(data, (d) => d.pl_discYear) || 1988, max(data, (d) => d.pl_discYear) || 2018 ])
			.range([ -0.9, 0.9 ])
			.nice();
		return ts;
	};
	getStackedPlanetScale = () => {
		const { maxNumberOfPlanetInAYear } = this.props;
		return scaleLinear().domain([ 1, maxNumberOfPlanetInAYear ]).range([ -0.9, 0.9 ]).nice();
	};
	getPlanetRadiusScale = () => {
		const { maxRadius } = this.props;
		return scaleSqrt().domain([ 0, maxRadius ]).range([ 1, 15 ]);
	};
	drawWithRegl = () => {
		const { data } = this.state;

		if (data) {
			// REGL
			const regl = require('regl')({
				container: this.graphic
			});

			regl.clear({
				color: [ 0.3, 0, 0, 1 ]
			});
			const drawSingleCircle = regl({
				vert: `precision mediump float;
          void main(){}
        `,
				frag: `precision mediump float;
          uniform vec4 color;
          uniform float pointSize;
          uniform vec2 position;
          void main() {
            gl_PointSize = float(pointSize);
            gl_FragColor = color;
            gl_Position = position;
          }
      `,
				// Specific to each vertex
				attributes: {},
				// uniform on the whole frame (can change between frames)
				uniforms: {
					color: [ 1, 0.7, 0.7, 1 ],
					pointSize: 10.0,
					position: [ 0.5, 0.5 ]
				},
				count: 1,
				primitive: 'points'
			});
			// const draw = regl({
			// 	vert: `precision mediump float;
			//     attribute vec2 point;
			//     attribute vec3 color;
			//     attribute float pointSize;
			//     varying vec4 fragColor;
			//     void main(){
			//       gl_PointSize = float(pointSize);
			//       fragColor = vec4(color, 1);
			//       gl_Position = vec4(point.x, point.y, 0, 1);
			//     }
			//   `,
			// 	frag: `precision mediump float;
			//     varying vec4 fragColor;
			//     void main() {
			//       gl_FragColor = fragColor;
			//     }
			// `,
			// 	// Specific to each vertex
			// 	attributes: {
			// 		point: data.map((d) => [ d.x, d.y ]),
			// 		color: data.map((d) => [
			// 			rgb(cs(d.pl_discMethod) as string).r,
			// 			rgb(cs(d.pl_discMethod) as string).g,
			// 			rgb(cs(d.pl_discMethod) as string).b
			// 		]),
			// 		pointSize: data.map((d) => rs(d.pl_radius))
			// 	},
			// 	// uniform on the whole frame (can change between frames)
			// 	uniforms: {
			// 		// pointSize: 10.0
			// 	},
			// 	count: data.length,
			// 	primitive: 'points'
			// });
			drawSingleCircle();
		}
	};
	componentDidMount() {
		const { data, width, height, margins } = this.props;
		const w = width - margins.left - margins.right;
		const h = height - margins.top - margins.bottom;

		// DATA
		// Polar plot
		const maxDist = max(data, (d) => d.st_distanceToSun) || 8500;
		const hourToDegree = scaleLinear().domain([ 0, 24 ]).range([ 0, 360 ]);
		const toRadians = (hour: number) => hourToDegree(hour) * Math.PI / 180;
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

		// Stack Plot
		const timeScale = this.getYearScale();
		const stackScale = this.getStackedPlanetScale();

		// SET STATE WITH NEW DATA AND DRAW
		this.setState(
			{
				data: data.map((d) => ({
					x: timeScale(d.pl_discYear),
					y: stackScale(d.indexInYear),
					polarX: getX(d, maxDist),
					polarY: getY(d, maxDist),
					stackX: timeScale(d.pl_discYear),
					stackY: stackScale(d.indexInYear),
					...d
				}))
			},
			() => this.drawWithRegl()
		);
	}
	render() {
		return (
			<React.Fragment>
				<div
					style={{ width: 800, height: 500, margin: '100px auto', padding: 20 }}
					ref={(graphic) => (this.graphic = graphic)}
				/>
			</React.Fragment>
		);
	}
}
