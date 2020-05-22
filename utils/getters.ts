import { EarthColor, CHZJustRightColor } from './../materials/color';
import { scaleOrdinal, scaleSqrt, scaleLinear } from 'd3-scale';
import {
	Layout,
	DPlanetWithPosition,
	ColorLayout,
	DiscoveryMethod,
	MassClass,
	Filter,
	CustomDiscoveryMethod,
	PlanetSize,
	CHZ,
	ChapterId,
	ChapterLabel,
	DiscoveryMethodLegendLabel,
	CustomMassClass
} from '../types/types';
import { easeCubic } from 'd3-ease';
import {
	discoveryMethodsColors,
	neutralGrey,
	pulsarTimingColors,
	imagingColors,
	velocityColors,
	massClassColors
} from '../materials/color';
import { rgb } from 'd3-color';
import { timeFormat } from 'd3-time-format';

export const hourToDegree = scaleLinear().domain([ 0, 24 ]).range([ 0, 360 ]);
export const toRadians = (hour: number) => hourToDegree(hour) * Math.PI / 180;

/**
 * NADINE: This file contains constants (variables whose value
 * is not meant to change, like TRANSITION_DURATION),
 * and functions that are used accross the project, especially
 * in the file Planets.tsx, to configurate transitions.
 */

// Constants -----------------------------------------
export const TRANSITION_DURATION = 1000; // in milliseconds
export const ease = easeCubic;
export const massClass: Array<CustomMassClass> = [ 'Mercurian', 'Terran', 'Neptunian', 'Jovian' ];
export const formatYear = timeFormat('%Y');
export const HINT_RADIUS = 4;

export const DISCOVERY_METHODS: Array<CustomDiscoveryMethod> = [
	'Pulsar',
	'Direct Imaging',
	'Radial Velocity',
	'Transit',
	'Other'
	// 'Primary Transit', FIXME: Are we sure Primary Transit ant Transit are the same?
	// 'Astrometry',
	// 'Microlensing',
	// 'TTV'
];

// Get functions -----------------------------------------
export const getChapterLabel = (chId: ChapterId): ChapterLabel => {
	switch (chId) {
		case 'Introduction':
			return 'Introduction';
		case 'Discovery':
			return 'Discovering';
		case 'Distance':
			return 'Traveling';
		case 'Habitability':
			return 'Habiting';
		case 'Conclusion':
			return 'Living';
		default:
			return 'Living';
	}
};
export const getDiscoveryMethodLegendLabel = (method: CustomDiscoveryMethod): DiscoveryMethodLegendLabel => {
	switch (method) {
		case 'Pulsar':
			return 'Pulsar Timing';
		case 'Direct Imaging':
			return 'Direct Imaging';
		case 'Radial Velocity':
			return 'Radial Velocity';
		case 'Transit':
			return 'Transit';
		case 'Other':
			return 'Other methods';
		default:
			return 'Other methods';
	}
};

export const getCustomDiscMethodLabel = (dm: DiscoveryMethod): CustomDiscoveryMethod => {
	switch (dm) {
		case 'Pulsar':
			return 'Pulsar';
		case 'Imaging':
			return 'Direct Imaging';
		case 'Radial Velocity':
			return 'Radial Velocity';
		case 'Transit':
			return 'Transit';
		case 'Astrometry':
			return 'Other';
		case 'Microlensing':
			return 'Other';
		case 'TTV':
			return 'Other';
		case 'Primary Transit':
			return 'Other';
		case 'Other':
			return 'Other';
		default:
			return 'Other';
	}
};
export const getCustomMassClassLabel = (mc: MassClass): CustomMassClass => {
	switch (mc) {
		case 'Mercurian':
			return 'Mercurian';
		case 'Subterran':
			return 'Terran';
		case 'Terran':
			return 'Terran';
		case 'Superterran':
			return 'Terran';
		case 'Neptunian':
			return 'Neptunian';
		case 'Jovian':
			return 'Jovian';
		default:
			return 'Unknown';
	}
};

export const getLayoutPosition = (d: DPlanetWithPosition, layout: Layout): Array<number> => {
	switch (layout) {
		case 'neutral':
			return [ d.neutralX, d.neutralY ];
		case 'stacked':
			return [ d.stackX, d.stackY ];
		case 'polar':
			return [ d.polarX, d.polarY ];
		case 'scatter':
			return [ d.scatterX, d.scatterY ];
		default:
			return [ d.stackX, d.stackY ];
	}
};

export const allDiscoveryMethodColorScale = scaleOrdinal().domain(DISCOVERY_METHODS).range(discoveryMethodsColors);
export const pulsarTimingColorScale = scaleOrdinal().domain(DISCOVERY_METHODS).range(pulsarTimingColors);
export const imagingColorScale = scaleOrdinal().domain(DISCOVERY_METHODS).range(imagingColors);
export const radialVelocityColorScale = scaleOrdinal().domain(DISCOVERY_METHODS).range(velocityColors);
export const transitColorScale = allDiscoveryMethodColorScale;
export const massClassColorScale = scaleOrdinal().domain(massClass).range(massClassColors);
// We need to use the rgba() color notation because it's the only
// way to transition on opacity with canvas.
export const getColorLayout = (d: DPlanetWithPosition, colorLayout: ColorLayout, opacity: number): string => {
	switch (colorLayout) {
		case 'neutral':
			return `rgba(${rgb(neutralGrey).r},${rgb(neutralGrey).g},${rgb(neutralGrey).b},${opacity})`;
		case 'pulsar':
			return `rgba(${rgb(pulsarTimingColorScale(d.pl_customDiscMethod) as string).r},${rgb(pulsarTimingColorScale(
				d.pl_customDiscMethod
			) as string).g},${rgb(pulsarTimingColorScale(d.pl_customDiscMethod) as string).b},${opacity})`;

		case 'imaging':
			return `rgba(${rgb(imagingColorScale(d.pl_customDiscMethod) as string).r},${rgb(imagingColorScale(
				d.pl_customDiscMethod
			) as string).g},${rgb(imagingColorScale(d.pl_customDiscMethod) as string).b},${opacity})`;

		case 'velocity':
			return `rgba(${rgb(radialVelocityColorScale(d.pl_customDiscMethod) as string)
				.r},${rgb(radialVelocityColorScale(d.pl_customDiscMethod) as string).g},${rgb(radialVelocityColorScale(
				d.pl_customDiscMethod
			) as string).b},${opacity})`;

		case 'transit':
			return `rgba(${rgb(transitColorScale(d.pl_customDiscMethod) as string).r},${rgb(transitColorScale(
				d.pl_customDiscMethod
			) as string).g},${rgb(transitColorScale(d.pl_customDiscMethod) as string).b},${opacity})`;

		case 'methods':
			return `rgba(${rgb(allDiscoveryMethodColorScale(d.pl_customDiscMethod) as string)
				.r},${rgb(allDiscoveryMethodColorScale(d.pl_customDiscMethod) as string)
				.g},${rgb(allDiscoveryMethodColorScale(d.pl_customDiscMethod) as string).b},${opacity})`;

		case 'mass':
			return `rgba(${rgb(massClassColorScale(d.pl_customMassClass) as string).r},${rgb(massClassColorScale(
				d.pl_customMassClass
			) as string).g},${rgb(massClassColorScale(d.pl_customMassClass) as string).b},${opacity})`;

		case 'dimmed':
			return `rgba(${rgb(neutralGrey).r},${rgb(neutralGrey).g},${rgb(neutralGrey).b},${0.2})`;

		default:
			return `rgba(${rgb(neutralGrey).r},${rgb(neutralGrey).g},${rgb(neutralGrey).b},${opacity})`;
	}
};

export const getOpacity = (d: DPlanetWithPosition, filter: Filter): number => {
	switch (filter) {
		case 'first':
			return d.pl_name === 'PSR B1957+20 b' ? 1 : 0;
		case 'inCHZ':
			return d.pl_inCHZ === true ? 1 : 0.05;
		case 'rocky':
			return d.pl_inCHZAndRocky === true ? 0.9 : 0.05;
		case 'hallOfFame':
			return d.pl_isHallOfFame === true ? 0.9 : 0.05;
		case 'all':
			return 1;
		default:
			return 1;
	}
};

export const radiusScale = scaleSqrt().domain([ 0, 28 ]).range([ 1, 7 ]);
export const getRadiusSize = (d: DPlanetWithPosition, size: PlanetSize): number => {
	switch (size) {
		case 'neutral':
			return 1;
		case 'radius':
			return radiusScale(d.pl_radius);
		default:
			return 1;
	}
};

export const getCHZOpacity = (d: DPlanetWithPosition, chz: CHZ): number => {
	switch (chz) {
		case 'Earth':
			return 0;
		// return d.pl_name === 'Earth' ? 1 : 0;
		case 'inCHZ':
			return d.pl_inCHZ ? 1 : 0;
		case 'all':
			return 0.2;
		default:
			return 0;
	}
};
export const getCHZColor = (d: DPlanetWithPosition, chz: CHZ): string => {
	switch (chz) {
		// case "Proxima Centauri b" :
		//   return
		case 'Earth' || 'inCHZ':
			return d.pl_name === 'Earth'
				? `rgba(${rgb(EarthColor).r},${rgb(EarthColor).g},${rgb(EarthColor).b},${getCHZOpacity(d, chz)})`
				: `rgba(${rgb(CHZJustRightColor).r},${rgb(CHZJustRightColor).g},${rgb(CHZJustRightColor)
						.b},${getCHZOpacity(d, chz)})`;
		case 'all':
			return `rgba(${rgb(CHZJustRightColor).r},${rgb(CHZJustRightColor).g},${rgb(CHZJustRightColor)
				.b},${getCHZOpacity(d, chz)})`;
		default:
			return `rgba(${rgb(CHZJustRightColor).r},${rgb(CHZJustRightColor).g},${rgb(CHZJustRightColor)
				.b},${getCHZOpacity(d, chz)})`;
	}
};
