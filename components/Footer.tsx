import * as React from 'react';
import styled from 'react-emotion';
import { medium, small } from '../materials/breakpoints';
import { neutralGrey } from '../materials/color';
import { Sources } from './Sources';
import { FooterHeading } from '../materials/typography';

const FooterRoot = styled('footer')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: ${neutralGrey};
`;

const StyledConclusion = styled('div')`
  max-width: 600px;
`;

const ConclusionItem = styled('p')`
  line-height: 125%;
  color: ${neutralGrey};
  margin-bottom: 1rem;

  @media (max-width: ${small}px)  {
      font-size: 1rem;
  };

  @media (min-width: ${small}px) and (max-width: ${medium}px) {
      font-size: 1.1rem;
  };

  @media (min-width: ${medium}px) {
      font-size: 1.2rem;
  };
`;

export class Footer extends React.Component {
	render() {
		return (
			<FooterRoot>
				<StyledConclusion>
					<FooterHeading>Methodology</FooterHeading>
					<ConclusionItem>
						All data comes from the{' '}
						<a href="http://phl.upr.edu/projects/habitable-exoplanets-catalog/data/database">
							exoplanet catalog
						</a>{' '}
						of the <a href="http://phl.upr.edu/">Planetary Habitability Laboratory (PHL)</a>, retrieved on
						the 10<sup>th</sup> of October, 2018. Some data in this dataset are estimations calculated by
						the PHL, based on recorded data. For instance, the mass of many planets discovered by Kepler is
						defined by comparisons with mass classes of other exoplanets. The inner and outer edges of the
						Circumstellar Habitable Zones are also estimations.
					</ConclusionItem>
					<ConclusionItem>
						The search for habitability by humans on an exoplanet is founded on Earth-like parameters
						(atmosphere, temperature, surface liquid water, etc.). Of course, this does not exclude the
						possibility of non Earth-like forms of life.
					</ConclusionItem>
					<ConclusionItem>
						Many thanks to <a href="https://www.phonebook.uzh.ch/?ID=1182701">Dr. Caroline Dorn</a> for
						helping us understand the stakes of exoplanetary science. Dr. Dorn is a geophysicist at the
						<a href="https://www.ics.uzh.ch/en.html"> Institute for Computational Sciences</a>, University
						of Zurich. Her research focuses on the interior of exoplanets.
					</ConclusionItem>
					<FooterHeading>Conception and realization</FooterHeading>
					<ConclusionItem>
						Luc Guillemot<br />Nadine Prigann<br />Solange Vogt<br />and everybody at{' '}
						<a href="https://www.interactivethings.com/">Interactive Things</a>
						<br />
						November 2018
					</ConclusionItem>
					<FooterHeading>Sources</FooterHeading>
					<Sources />
				</StyledConclusion>
			</FooterRoot>
		);
	}
}
