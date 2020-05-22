import * as React from 'react';
import styled, { keyframes } from 'react-emotion';
import { mainRed, neutralGrey, mainBackground } from '../materials/color';
import { medium, large } from '../materials/breakpoints';

const IntroRoot = styled('header')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: ${medium}px) {
    justify-content: center;
  }
`;
const IntroWrapper = styled('div')`
  margin-top: 10%;
  margin-bottom: 64px;
  text-align: left;
  color: ${neutralGrey};
  @media (min-width: ${medium}px) {
    text-align: center;
  };
  @media (min-width: ${large}px) {
    max-width: 1100px;
    text-align: center;
  };
`;

const HeadingIntro = styled('h1')`
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 120%;

  @media (min-width: ${medium}px) {
    font-size: 6rem;
    line-height: 120%;
  };
`;

const ParagraphIntro = styled('h2')`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 120%;
  margin-top: 2vh;

  @media (min-width: ${medium}px) {
    font-size: 2rem;
    line-height: 120%;
    margin-top: 4vh;
  };
`;

const CTA = keyframes`
  from, 0% {
    transform: translateY(0vh);
  }

  45% {
    transform: translateY(2vh);
    color: ${mainRed}
  }

  75% {
    transform: translateY(0vh);
  }
`;

export const CTAIntro = styled('div')`
  animation: ${CTA} 2.5s ease infinite;
  text-align: center;
  margin-top: 64px;
  font-size: 1.5rem;

	@media (min-width: ${medium}px) {
		margin-top: 132px;
		font-size: 2.5rem;
	};
`;

const Loom = keyframes`
  100% {
    motion-offset: 100%;
    offset-distance: 100%;
  }
`;

export const Space = styled('svg')`
  width: 90vw;
  position: absolute;
  top: 40%;
  pointer-events: none;

  @media (min-width: ${medium}px) {
    width: 80vw;
    left: 10vw;
    top: 40%;
  };

  @media (min-width: ${large}px) {
    width: 80vw;
    left: 10vw;
    top: 20%;
	};
`;

export const LoomingPlanet = styled('circle')`
fill: ${mainBackground};
r: 15;
display: none;
offset-path: path("M4.55882001,205 C292.893175,270.217307 525.062239,302.825961 701.066011,302.825961 C877.069784,302.825961 1122.50022,270.217307 1437.35732,205");

@media (min-width: ${medium}px) {
  r: 10;
  display: inline;
  animation: ${Loom} 60s linear infinite;
};

@media (min-width: ${large}px) {
  r: 8;
  display: inline;
  animation: ${Loom} 60s linear infinite;
};
`;

export class Intro extends React.Component {
	render() {
		return (
			<IntroRoot>
				<IntroWrapper>
					<HeadingIntro>Looking for the Earth Next Door</HeadingIntro>
					<ParagraphIntro>
						Where is everybody? That’s the question physicist Enrico Fermi asked when realizing that the
						high probability of extraterrestrial life never matched any empirical observation. So far, no
						evidence of alien existence has been established on an exoplanet — a planet outside of our Solar
						System — this is why astrophysicists have been focusing on studying the diversity of planets and
						the habitability of other worlds. Mars is the closest candidate for a planet Earth #2, but what
						else lies outside of our Solar system?
					</ParagraphIntro>
					<Space viewBox={'0 0 1000 2500'}>
						<LoomingPlanet />
					</Space>
					<ParagraphIntro>How close are we to living on another planet?</ParagraphIntro>
					<CTAIntro>{'\u2193'} </CTAIntro>
				</IntroWrapper>
			</IntroRoot>
		);
	}
}
