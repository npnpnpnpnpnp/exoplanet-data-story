import styled from 'react-emotion';
import React from 'react';
import { css } from 'emotion';
import { neutralGrey } from '../materials/color';

export const SourceHeading = styled('h1')`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 120%;
  margin-top: 3vh;
  color: ${neutralGrey};
`;

export const SourceItemHeading = styled('h1')`
  font-size: 1rem;
  font-weight: 700;
  line-height: 120%;
  margin: 3vh 0 1.2vh 0;
  color: ${neutralGrey};
`;

export const SourceItems = styled('div')`
  margin-top: 10vh;
  font-size: 0.8rem;
  line-height: 1rem;
  align-items: center;
  margin-bottom: 10%;
`;

export const SourceItem = css({
	marginTop: '0.8rem',
	marginBottom: '0.8rem',
	lineHeight: '120%'
});

export class Sources extends React.Component {
	render() {
		return (
			<React.Fragment>
				{/* <SourceItems> */}
				{/* <SourceHeading>List of Sources</SourceHeading> */}

				<SourceItemHeading>Discovery methods</SourceItemHeading>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a>.{' '}
					<a href="https://exoplanets.nasa.gov/5-ways-to-find-a-planet/#/3">«Direct Imaging»</a>. Retrieved
					October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.wikimediafoundation.org/">Wikimedia Foundation</a> (2018).{' '}
					<a href="https://en.wikipedia.org/wiki/Infrared_astronomy">«Infrared astronomy»</a>. <br />
					Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a>.{' '}
					<a href="https://exoplanets.nasa.gov/5-ways-to-find-a-planet/#/1">«Radial Velocity»</a>. Retrieved
					October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.wikimediafoundation.org/">Wikimedia Foundation</a> (2018).{' '}
					<a href="https://en.wikipedia.org/wiki/Doppler_effect">«The Doppler Effect»</a>. <br />
					Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.sciencelearn.org.nz/">Science Learning Hub</a> (2014).{' '}
					<a href="https://www.sciencelearn.org.nz/resources/47-colours-of-light">«Colors of light»</a>.
					Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a>.{' '}
					<a href="https://exoplanets.nasa.gov/5-ways-to-find-a-planet/#/2">«Transit»</a>. Retrieved October
					31, 2018.
				</div>

				<SourceItemHeading>NASA Missions and projects</SourceItemHeading>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a> (2018).{' '}
					<a href="https://www.nasa.gov/mission_pages/kepler/overview/index.html">«Kepler and K2»</a>.
					Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.wikimediafoundation.org/">Wikimedia Foundation</a> (2018).{' '}
					<a href="https://en.wikipedia.org/wiki/New_Horizons">«New Horizons»</a>. Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://breakthroughinitiatives.org/">Breakthrough Initiatives</a>.{' '}
					<a href="https://breakthroughinitiatives.org/initiative/3">«Starshot»</a>. Retrieved October 31,
					2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a>.{' '}
					<a href="https://exoplanets.nasa.gov/resources/1015/flower-power-nasa-reveals-spring-starshade-animation/">
						«Starshade»
					</a>. Retrieved October 31, 2018.
				</div>

				<SourceItemHeading>Exoplanets</SourceItemHeading>

				<div className={SourceItem}>
					<a href="http://thoughtcafe.ca/">Thought Cafe</a> (2016).{' '}
					<a href="https://www.youtube.com/watch?v=A22tOPjBBns">«Proxima Centauri b: The Earth Next Door»</a>.
					<br />Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="https://www.nasa.gov/">NASA</a> (2017).{' '}
					<a href="https://www.nasa.gov/ames/kepler/nasa-keplers-hall-of-fame-small-habitable-zone-exoplanets">
						«NASA Kepler's Hall of Fame: Small Habitable Zone Exoplanets»
					</a>. Retrieved October 31, 2018.
				</div>

				<SourceItemHeading>Terminology</SourceItemHeading>

				<div className={SourceItem}>
					<a href="https://en.wikipedia.org/wiki/Circumstellar_habitable_zone">
						«Circumstellar Habitable Zone (CHZ)»
					</a>. Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					Williams, M. (2017).{' '}
					<a href="https://www.universetoday.com/46796/1-au/">«What is an Astronomical Unit?»</a>. <br />
					Retrieved October 31, 2018.
				</div>

				<div className={SourceItem}>
					<a href="http://phl.upr.edu/">Planetary Habitability Laboratory</a> (2013).{' '}
					<a href="http://phl.upr.edu/library/notes/summarylimitsofthenewhabitablezone">
						«Summary of the Limits of the New Habitable Zone»
					</a>. Retrieved October 31, 2018.
				</div>
				{/* </SourceItems> */}
			</React.Fragment>
		);
	}
}
