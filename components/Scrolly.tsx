import * as React from 'react';
import { Scrollama, Step } from 'react-scrollama';
import styled from 'react-emotion';
import { select } from 'd3-selection';
import { Planets } from './Planets';
import { Markdown } from './Markdown';
import { content } from '../content/content';
import { DPlanets, StoryStep, Dimensions, ChapterId } from '../types/types';
import { neutralGrey, mainBackground } from '../materials/color';
import { medium, large } from '../materials/breakpoints';

// As Scrollama accesses `window` internally
// (via the intersection-observer polyfill),
// this component can only be used in the browser!

// Styles -------------------
const ScrollyRoot = styled('div')({
	fontFamily: 'InterUI, sans-serif',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center'
});

const Scroller = styled('div')({
	flexBasis: '100%',
	width: '100%'
});

const Graphic = styled('div')({
	flexBasis: '100%',
	width: '100%',
	position: 'sticky',
	padding: '20px 0',
	margin: '0 0',
	top: 0,
	alignSelf: 'flex-start',
	zIndex: -1,
	transform: 'translate3d(0, 0, 0)'
});

const WithinStep = styled('div')`
  padding-top: 15rem;
  padding-bottom: 15rem;
  @media (min-width: ${medium}px) {
    padding-top: 20rem;
    padding-bottom: 20rem;
  }
`;

const ContentContainer = styled('div')`
  background-color: ${mainBackground};
  padding: 1.5rem;
  color: ${neutralGrey};
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);
  margin-left: -3%;
  margin-right: -3%;

  @media (min-width: ${large}px) {
    border-radius: 2px;
    max-width: 500px;
    margin: 0 auto;
  }

	& h1 {
    font-weight: 700;
		line-height: 120%;
	}

	& blockquote p {
    font-weight: 400;
    color: ${neutralGrey};
    font-family: 'IBM Plex Mono', serif;
		text-align: left;
		line-height: 130%;

    @media (min-width: ${medium}px) {
      font-size: 1.5rem;
		};

    @media (min-width: ${large}px) {
      font-size: 1.5rem;
		};
	}

  & p {
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    line-height: 140%;

    @media (min-width: ${medium}px) {
      font-size: 1.3rem;
      line-height: 130%;
    };
    @media (min-width: ${large}px) {
      font-size: 1.5rem;
      line-height: 130%;
    };
	}

  & span {
		padding: 0 3px;
		border-radius: 2px;
		color:${mainBackground};
	}

	&:last-child {
	  margin-bottom: 0;
  }
`;

// Component -------------------
interface Props {
	data: DPlanets;
	maxNumberOfPlanetInAYear: number;
	dimensions: Dimensions;
	updateActiveChapter: (c: ChapterId) => void;
}

interface State {
	step: StoryStep;
}

export default class Scrolly extends React.Component<Props, State> {
	state: State = {
		step: {
			chapter: 'Introduction',
			layout: 'stacked',
			colorLayout: 'neutral',
			filter: 'first',
			size: 'neutral',
			chz: 'none',
			legendType: 'none',
			hint: [ 'none' ]
		}
	};

	onStepEnter = ({ element, data }: any) => {
		select(element).style('opacity', '1');
		this.setState({ step: data });
		this.props.updateActiveChapter(data.chapter);
	};
	onStepExit = ({ element }: any) => {
		select(element).style('opacity', '.4');
	};
	render() {
		const { width } = this.props.dimensions;
		const { step } = this.state;
		const { data, maxNumberOfPlanetInAYear } = this.props;

		// Take the minimum between width and screen height:
		// the visualization must be a square.
		// Remove 40px on innerHeight to account for Graphic vertical paddings.
		const squareSide = Math.min(width, window.innerHeight - 40);
		return (
			<ScrollyRoot>
				<Graphic>
					<Planets
						data={data}
						maxNumberOfPlanetInAYear={maxNumberOfPlanetInAYear}
						width={squareSide}
						height={squareSide}
						margins={{
							top: 24,
							right: 24,
							bottom: 24,
							left: 24
						}}
						step={step}
					/>
				</Graphic>
				<Scroller>
					<Scrollama
						offset={0.5}
						onStepEnter={this.onStepEnter}
						onStepExit={this.onStepExit}
						data-name="scrollama"
					>
						{content.map((c, i) => (
							<Step
								data={{
									chapter: c.chapter,
									layout: c.layout,
									colorLayout: c.colorLayout,
									filter: c.filter,
									size: c.size,
									chz: c.chz,
									legendType: c.legend,
									hint: c.hint
								}}
								key={`paragraph-${i}`}
							>
								<div style={{ transition: 'opacity 500ms' }}>
									<WithinStep>
										<ContentContainer>
											<Markdown source={c.paragraph} escapeHtml={false} />
										</ContentContainer>
									</WithinStep>
								</div>
							</Step>
						))}
					</Scrollama>
				</Scroller>
			</ScrollyRoot>
		);
	}
}
