import '../prelude.ts';
import { nest } from 'd3-collection';
import { ascending } from 'd3-array';
import { Main } from '../components/Main';
import { getCustomDiscMethodLabel, getCustomMassClassLabel } from '../utils/getters';
import { DPlanet } from 'types/types';

// DATA
const planets = require('../data/tidy/phl.json');
const sortedData: Array<DPlanet> = planets
	.sort((a: any, b: any) => b.pl_discYear - a.pl_discYear || ascending(b.pl_discMethod, a.pl_discMethod))
	.map((d: any) => ({
		year: new Date(d.pl_discYear, 0, 0), // format as date
		pl_customDiscMethod: getCustomDiscMethodLabel(d.pl_discMethod),
		pl_customMassClass: getCustomMassClassLabel(d.pl_massClass),
		...d
	}));

const nestedData = nest().key((d: any) => `${d.pl_discYear}`).entries(sortedData);
const maxNb = nestedData.reduce((prev, { values }) => {
	return values.length > prev ? values.length : prev;
}, 0);

const dataWithIndex = nestedData.map(({ values: yearValues }) => {
	return yearValues.map((d: any, i: any) => ({
		offsetV: Math.floor(i / 5),
		offsetH: (i / 5) % 1,
		...d
	}));
});
const data = [].concat(...dataWithIndex);

const Page = () => <Main data={data} maxNumberOfPlanetInAYear={maxNb / 4} />;

export default Page;
