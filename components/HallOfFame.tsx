import React from 'react';
import styled from 'react-emotion';
import { DPlanet } from '../types/types';
import { neutralGrey, EarthColor } from '../materials/color';
import { scaleSqrt } from 'd3-scale';
import { min, max } from 'd3-array';
import { small, medium } from '../materials/breakpoints';

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Planet = styled('div')`
  width: 420px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  color: ${neutralGrey};
  line-height: 120%;
  margin: 0 3rem 0 3rem;

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

export const PlanetName = styled('div')`
    font-weight: 600;
    margin: 1.5rem 0 0.5rem 0;
    `;

export const PlanetDotContainer = styled('div')`
    width: 40px;
    height: 40px;
`;

const PlanetDot = styled('div')(
	{
		borderRadius: '20px',
		backgroundColor: EarthColor
	},
	(props: { width: number }) => ({
		width: props.width
	}),
	(props: { width: number }) => ({
		height: props.width
	})
);

export const HallOfFameParagraph = styled('p')`
  color: ${neutralGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 120%;
  margin: 10vh auto;

  @media (max-width: ${small}px)  {
      width: 100%;
  };

  @media (min-width: ${small}px) and (max-width: ${medium}px) {
      width: 100%;
  };

  @media (min-width: ${medium}px) {
      width: 40%;
  };

`;

export const PlanetItem = styled('div')`
    display:flex;
    flex-direction: row;
`;

export const PlanetLabel = styled('div')`
    display: flex;
    flex-direction: column;
    width: 60%;
    min-width: 60%;
    font-weight: 600;
`;

export const PlanetValue = styled('div')`
    display: flex;
    flex-direction: column;
`;

interface Props {
	hallOfFamePlanets: Array<DPlanet>;
}

export class HallOfFame extends React.Component<Props> {
	render() {
		const { hallOfFamePlanets } = this.props;
		const PlanetRadius = scaleSqrt()
			.domain([
				min(hallOfFamePlanets, (p) => p.pl_radius) as number,
				max(hallOfFamePlanets, (p) => p.pl_radius) as number
			])
			.range([ 5, 40 ]);

		return (
			<div>
				<HallOfFameParagraph>The Hall of Fame of exoplanets</HallOfFameParagraph>
				<Root>
					{hallOfFamePlanets.sort((b, a) => b.st_distanceToSun - a.st_distanceToSun).map((planet) => (
						<Planet>
							<PlanetDotContainer>
								<PlanetDot width={PlanetRadius(planet.pl_radius)} />
							</PlanetDotContainer>

							<PlanetName>{planet.pl_name}</PlanetName>
							<PlanetItem>
								<PlanetLabel>Travelling time</PlanetLabel>
								<PlanetValue>{(planet.st_distanceToSun * 3).toFixed(1)} Lightyears</PlanetValue>
							</PlanetItem>

							<PlanetItem>
								<PlanetLabel>Gravity</PlanetLabel>
								<PlanetValue>{planet.pl_gravity} x Earth</PlanetValue>
							</PlanetItem>

							<PlanetItem>
								<PlanetLabel>Surface Temperature</PlanetLabel>
								<PlanetValue>{(planet.pl_TsMean - 273.15).toFixed(1)} Celsius</PlanetValue>
							</PlanetItem>

							<PlanetItem>
								<PlanetLabel>Radius</PlanetLabel>
								<PlanetValue>{planet.pl_radius} x Earth</PlanetValue>
							</PlanetItem>
						</Planet>
					))}
				</Root>
			</div>
		);
	}
}
