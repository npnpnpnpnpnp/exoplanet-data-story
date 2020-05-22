import { mercuryColor, neptuneColor, jupiterColor, SunColor, AUColor, pulsarTimingColor } from './../materials/color';
import { ColorLayout, Layout, ChapterId, Filter, PlanetSize, CHZ, Hint } from 'types/types';
import {
	directImagingColor,
	radialVelocityColor,
	transitColor,
	ProximaColor,
	KeplerColor,
	EarthColor,
	MarsColor,
	CHZJustRightColor
} from '../materials/color';
interface ChapterDefinition {
	title: ChapterId;
	yPosition: number;
}

export const chapters: Array<ChapterDefinition> = [
	{ title: 'Discovery', yPosition: 0 },
	{ title: 'Distance', yPosition: 180 },
	{ title: 'Habitability', yPosition: 0 },
	{ title: 'Conclusion', yPosition: 350 }
];

interface Content {
	chapter: ChapterId;
	layout: Layout;
	colorLayout: ColorLayout;
	filter: Filter;
	size: PlanetSize;
	chz: CHZ;
	hint: Array<Hint>;
	paragraph: string;
}
export const content: Array<Content> = [
	{
		chapter: 'Discovery',
		layout: 'neutral',
		colorLayout: 'neutral',
		filter: 'first',
		size: 'neutral',
		chz: 'none',
		hint: [ 'onePlanet' ],
		paragraph: `Three Canadian astrophysicists detected the first exoplanet in 1988, just 30 years ago from today\'s 2018. The first confirmed detection occurred in 1992.`
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: 'As of October 2018, 3’851 exoplanets have been confirmed.'
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph:
			'>«There are two major motivations for exoplanet research. First, we want to understand if we are alone in the universe; how many habitable worlds populate our night sky? Second, we aim to better understand the formation and evolution of other planets by observing and characterizing them. In this way we hope to unravel what made the emergence of our existence on Earth possible.»<br/><br/>*Dr. Caroline Dorn<br/>Exoplanet scientist*'
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'imaging',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `The first exoplanets were discovered using <span style="background-color:${pulsarTimingColor};">pulsar timing</span> which revealed their location through detecting the very precise light their star emits as it rotates.<br><br>Very few exoplanets were actually seen through a telescope using <span style="background-color:${directImagingColor};">direct imaging</span>. Exoplanets are extremely faint light sources compared to their host star. They are usually lost in the glare of the star. Still, some giant exoplanets were observed or «imaged» through Infrared spectroscopy.`
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'imaging',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph:
			'Most of the time, astrophysicists infer the presence of an exoplanet from the side effects on the light of its host star that reaches us.'
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'velocity',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `<span style="background-color:${radialVelocityColor};">Radial velocity</span> led to the discovery of 686 exoplanets . An orbiting planet will slightly modify the position, and thus color, of its star as perceived from Earth. This is due to the Doppler Effect, which causes light to appear blue- or redshifted depending on whether it moves towards us or away from us.`
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'transit',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `However, most exoplanets were discovered using the <span style="background-color:${transitColor};">transit method</span>. Similar to a solar eclipse we experience on Earth, a planet crosses in front of its star and slightly reduces the brightness of the star. Astrophysicists can deduce the presence of an exoplanet «transiting» in front of the star by detecting a repeated reduction in brightness.`
	},
	{
		chapter: 'Discovery',
		layout: 'stacked',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph:
			"2'329 exoplanets were discovered using the transit method, most of them during NASA's Kepler missions which started in 2009. Kepler, a spatial observatory orbiting the Sun, was specifically designed to hunt for exoplanets."
	},
	{
		chapter: 'Discovery',
		layout: 'polar',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'KeplerField' ],
		paragraph: `Kepler only focused on a specific area of the Milky Way, the <span style="background-color:${KeplerColor}">«Kepler Field»</span>. It is clearly identifiable on this plot which displays exoplanets according to their distance and orientation from Earth.`
	},
	{
		chapter: 'Distance',
		layout: 'polar',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'KeplerField' ],
		paragraph: `# Can we travel to an exoplanet?`
	},
	{
		chapter: 'Distance',
		layout: 'polar',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'KeplerField', 'proximaPolar' ],
		paragraph: `<span style="background-color:${ProximaColor}">Proxima Centauri b</span> is the closest exoplanet to our Solar System that we know of to date. It is 4.2 light-years (or approximately 40 trillion km) away from Earth. A probe launched today would take about 17’000 years to reach Proxima Centauri b, assuming it traveled at the same speed as NASA’s New Horizons Probe.`
	},
	{
		chapter: 'Distance',
		layout: 'polar',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'KeplerField', 'proximaPolar' ],
		paragraph:
			'New technologies are currently being developed — like the Starshot project — which could potentially put Proxima Centauri b within a 20 year reach, but these technologies are still very experimental, and we are still far away from landing on an exoplanet.'
	},
	{
		chapter: 'Distance',
		layout: 'polar',
		colorLayout: 'methods',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'KeplerField', 'proximaPolar' ],
		paragraph: 'The distances of planets located on the outermost circle are unknown.'
	},
	{
		chapter: 'Distance',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `# Can we live on an exoplanet?`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'dimmed',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'EarthScatter', 'Sun', 'EarthCHZ' ],
		paragraph: `<span style="background-color:${EarthColor}">Earth</span> is located in the <span style="background-color:${CHZJustRightColor}">habitable zone</span> of its star, the <span style="background-color:${SunColor}">Sun</span>. The habitable zone, also called the <span style="background-color:${CHZJustRightColor}">CHZ (Circumstellar Habitable Zone)</span>, is a theoretical concept used to roughly estimate the spatial region where surface water on Earth-like planets could be liquid, a necessary condition for human-like life.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'dimmed',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'EarthScatter', 'CHZ', 'Sun' ],
		paragraph:
			'It means that the planet is far enough from its star such that water does not fully evaporate and the surface does not get eroded by stellar irradiation, but close enough such that water does not completely freeze into ice.'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'dimmed',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'EarthScatter', 'CHZ', 'AU', 'Sun' ],
		paragraph: `So far, Earth is the only planet where evidence of life has been observed, providing benchmark conditions which are used by scientists to measure the habitability of exoplanets. The edges of the <abbr title="Circumstellar Habitable Zone">CHZ</abbr> are expressed in <span style="background-color:${AUColor}">Astronomical Units (AU)</span>, where one AU stands for the distance between the <span style="background-color:${SunColor}">Sun</span> and <span style="background-color:${EarthColor}">Earth</span>.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'dimmed',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'EarthScatter', 'CHZ', 'AU', 'Sun', 'Mars' ],
		paragraph: `Different estimates of the habitable zone of the Sun have been calculated over time, some more optimistic than others. Recent research suggests that the Sun's CHZ lies between 0.95 and 2.4 AU. <span style="background-color:${MarsColor}">Mars</span> is located 1.5 AU away from the Sun.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'dimmed',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'EarthScatter', 'CHZ', 'AU', 'ProximaCHZ', 'Sun', 'Mars' ],
		paragraph: `Similar to Earth, <span style="background-color:${ProximaColor}">Proxima Centauri b</span> is located in the habitable zone of its star. It is potentially habitable by humans because liquid water could exist.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'Earth',
		size: 'neutral',
		chz: 'Earth',
		hint: [ 'none' ],
		paragraph:
			'>«We dream about reaching out to habitable worlds or terraforming planets. However, it is crazy to believe that a dead planet, like Mars, can be redesigned into a habitable world offering human life conditions, while we are incapable to manage the global warming of 2°C on Earth.»<br/><br/>*Dr. Caroline Dorn<br/>Exoplanet scientist*'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'all',
		hint: [ 'none' ],
		paragraph: `The boundaries of the <span style="background-color:${CHZJustRightColor}">habitable zone</span> are specific to each star. Exoplanets orbit around their own star(s), whose size and temperature may differ drastically.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'all',
		hint: [ 'none' ],
		paragraph:
			'The higher the temperature and the bigger the mass of a star is, the further away from its star the CHZ is.'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'all',
		size: 'neutral',
		chz: 'all',
		hint: [ 'none' ],
		paragraph: `Earlier definitions of the CHZ were based on simple thermal equilibrium. Current estimations consider many other factors, for instance the greenhouse effect of a planet's atmosphere, or solar flares. This makes the exact boundaries of a habitable zone fuzzy. To add more complexity, some planets orbit around multiple stars.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'inCHZ',
		size: 'neutral',
		chz: 'inCHZ',
		hint: [ 'none' ],
		paragraph: 'From the 3’851 exoplanets discovered so far, 234 fall into the CHZ of their star.'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'neutral',
		filter: 'inCHZ',
		size: 'neutral',
		chz: 'inCHZ',
		hint: [ 'none' ],
		paragraph:
			'The edges shown here are calculated by the Planetary Habitability Laboratory. It is an optimistic estimation of the CHZ.'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'inCHZ',
		size: 'radius',
		chz: 'none',
		hint: [ 'none', 'radiusLegend' ],
		paragraph: `Habitability of a planet also depends on its size and mass. Planets are usually categorized in comparison with the Solar System’s planets <span style="background-color:${mercuryColor}">Mercury</span>, <span style="background-color:${EarthColor}">Earth</span>, <span style="background-color:${neptuneColor}">Neptune</span>, and <span style="background-color:${jupiterColor}">Jupiter</span>.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'inCHZ',
		size: 'radius',
		chz: 'none',
		hint: [ 'none', 'radiusLegend' ],
		paragraph: `Very massive planets, 10x greater than the Earth’s mass, are gas giants. Such planets have no solid surface — similar to Jupiter or Neptune.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'rocky',
		size: 'radius',
		chz: 'none',
		hint: [ 'none', 'radiusLegend' ],
		paragraph: `Astrophysicists estimate that only a handful of the discovered exoplanets located in the CHZ of their star may be <span style="background-color:${EarthColor}">rocky like Earth</span>.`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'rocky',
		size: 'radius',
		chz: 'none',
		hint: [ 'none', 'radiusLegend' ],
		paragraph:
			'Being a rocky planet in the habitable zone of a star is not the only thing to consider when estimating habitability. Since we only know one planet with life, Earth, we only assess a planet’s habitability by how close its conditions are from Earth.'
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'rocky',
		size: 'radius',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `>«Imagine you spent your entire life in a single room and you never stepped outside. Now try to study how people around the world would live their life, extrapolating from your single-room experience. This analogy might demonstrate the challenge of studying other worlds from Earth's perspective.»<br/><br/>*Dr. Caroline Dorn<br/>Exoplanet scientist*`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'rocky',
		size: 'radius',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: `# Our best hope: the Exoplanets Hall Of Fame`
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'hallOfFame',
		size: 'radius',
		chz: 'none',
		hint: [ 'none' ],
		paragraph:
			"The 14 exoplanets depicted here are members of NASA's «Hall of Fame» of exoplanets. These are the exoplanets that are most likely to have an Earth-like atmosphere and maintain liquid water on their surface."
	},
	{
		chapter: 'Habitability',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'hallOfFame',
		size: 'radius',
		chz: 'none',
		hint: [ 'none' ],
		paragraph: 'These exoplanets are the most likely to host life.'
	},
	{
		chapter: 'Conclusion',
		layout: 'scatter',
		colorLayout: 'mass',
		filter: 'hallOfFame',
		size: 'radius',
		chz: 'none',
		hint: [ 'none' ],
		paragraph:
			'Billions of exoplanets are yet to be discovered, in the Milky Way, and in other galaxies. NASA is designing a new telescope equipped with a sunflower-shaped starshade that will make it possible to take actual pictures of exoplanets. The Hall of Fame might become crowded very quickly!'
	}
];
