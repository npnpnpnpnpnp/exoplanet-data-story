import '../prelude.ts';
import { nest } from 'd3-collection';
import { ascending } from 'd3-array';
import { WebGLPlanets } from '../components/tests/WebGLPlanets';

// DATA
const planets = require('../data/tidy/phl.json');
const sortedData = planets
	.sort((a: any, b: any) => b.pl_discYear - a.pl_discYear || ascending(b.pl_discMethod, a.pl_discMethod))
	.map((d: any) => ({
		pl_discYear: new Date(0, 0, d.pl_discYear), // format as date
		...d
	}));
const nestedData = nest().key((d: any) => `${d.pl_discYear}`).entries(sortedData);
const maxNb = nestedData.reduce((prev, { values }) => {
	return values.length > prev ? values.length : prev;
}, 0);
const dataWithIndex = nestedData.map(({ values: yearValues }) => {
	return yearValues.map((d: any, i: any) => ({
		indexInYear: i,
		...d
	}));
});
// const maxRadius = max(sortedData, (d: any) => d.pl_radius) || 10;
const data = [].concat(...dataWithIndex);

const Page = () => (
	<WebGLPlanets
		data={data}
		maxNumberOfPlanetInAYear={maxNb}
		maxRadius={10}
		width={1000}
		height={1000}
		margins={{
			top: 30,
			right: 30,
			bottom: 30,
			left: 30
		}}
		step={1}
	/>
);

export default Page;
