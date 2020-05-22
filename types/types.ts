import { CustomMassClass } from './types';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { AxisScale, AxisDomain } from 'd3-axis';

/**
 * This file contains all the type definitions
 * used accross the project, except types that only applies
 * to a single component (like State or Props types).
*/

// Layout and story flow
export type Dimensions = { width: number; height: number };
export interface Coordinate {
	x: number;
	y: number;
}
export interface PlanetData extends Coordinate {
	chzInner: number;
	chzOuter: number;
	polarX?: number;
	polarY?: number;
}
export type RadiiLegend = { value: number; radius: number; label: string };
export type ChapterId = 'Introduction' | 'Discovery' | 'Distance' | 'Habitability' | 'Conclusion';
export type ChapterLabel = 'Introduction' | 'Discovering' | 'Traveling' | 'Habiting' | 'Living';
export type Layout = 'stacked' | 'polar' | 'scatter' | 'neutral';
export type ColorLayout = 'neutral' | 'pulsar' | 'imaging' | 'velocity' | 'transit' | 'methods' | 'dimmed' | 'mass';
export type PlanetSize = 'neutral' | 'radius';
export type Filter = 'first' | 'all' | 'Earth' | 'inCHZ' | 'rocky' | 'hallOfFame';
export type CHZ = 'Earth' | 'all' | 'inCHZ' | 'none';
export type LegendType = 'none' | 'methods' | 'massAndRadius';
export type Hint =
	| 'none'
	| 'onePlanet'
	| 'KeplerField'
	| 'proximaPolar'
	| 'EarthScatter'
	| 'Sun'
	| 'Mars'
	| 'CHZ'
	| 'EarthCHZ'
	| 'AU'
	| 'ProximaCHZ'
	| 'radiusLegend';

export type StoryStep = {
	chapter: ChapterId;
	layout: Layout;
	colorLayout: ColorLayout;
	filter: Filter;
	size: PlanetSize;
	chz: CHZ;
	legendType: LegendType;
	hint: Array<Hint>;
};

// Planets
export type Atmosphere = 'hydrogen-rich' | 'metals-rich' | 'no-atmosphere';
export type HabitableClass =
	| 'mesoplanet'
	| 'thermoplanet'
	| 'psychroplanet'
	| 'psychroplanet'
	| 'hyperthermoplanet'
	| 'non-habitable';

export type DiscoveryMethod =
	| 'Pulsar'
	| 'Imaging'
	| 'Radial Velocity'
	| 'Other'
	| 'Transit'
	| 'Astrometry'
	| 'Microlensing'
	| 'TTV'
	| 'Primary Transit';
export type CustomDiscoveryMethod = 'Pulsar' | 'Direct Imaging' | 'Radial Velocity' | 'Transit' | 'Other';
export type DiscoveryMethodLegendLabel =
	| 'Pulsar Timing'
	| 'Direct Imaging'
	| 'Radial Velocity'
	| 'Transit'
	| 'Other methods';
export type MassClass = 'Mercurian' | 'Subterran' | 'Terran' | 'Superterran' | 'Neptunian' | 'Jovian';
export type CustomMassClass = 'Mercurian' | 'Terran' | 'Neptunian' | 'Jovian' | 'Unknown';
export interface DPlanet {
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
	pl_customDiscMethod: CustomDiscoveryMethod;
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
	pl_customMassClass: CustomMassClass;
	pl_habitable: number;
	pl_confirmed: number;
	pl_discYear: number;
	year: Date;
	offsetV: number;
	offsetH: number;
	pl_inCHZ: boolean;
	pl_inCHZAndRocky: boolean;
	pl_isHallOfFame: boolean;
}
export interface DPlanetWithPosition extends DPlanet {
	neutralX: number;
	neutralY: number;
	stackX: number;
	stackY: number;
	polarX: number;
	polarY: number;
	scatterX: number;
	scatterY: number;
}
export type DPlanets = Array<DPlanet>;

// Misc
export type Scale =
	| ScaleBand<[number, number]>
	| ScaleLinear<number, number>
	| ScaleTime<any, any>
	| AxisScale<AxisDomain | any>;
