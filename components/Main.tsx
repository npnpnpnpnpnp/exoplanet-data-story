import * as React from 'react';
import dynamic from 'next/dynamic';
import styled, { css, keyframes } from 'react-emotion';
import Measure from 'react-measure';
import { DPlanets, Dimensions, ChapterId } from '../types/types';
import { Intro } from './IntroScreen';
import { Footer } from './Footer';
import { HallOfFame } from './HallOfFame';

// Styles -------------------
const Root = styled('div')`
	margin: 3% 3%;
`;

const Story = styled('div')`
`;

const LoadingComponent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loading = styled('div')`
  height: 32px;
  width: 32px;
  animation: ${rotation} 1s infinite linear;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: rgba(255, 255, 255, 0.7);
`;

// The Scrolly component is imported dynamically
// to prevent NextJS from rendering it server side
// (we need to access window for observe DOM intersection)
const DynamicScroller = dynamic(() => import('../components/Scrolly'), {
	ssr: false,
	loading: () => (
		<LoadingComponent>
			<Loading />
		</LoadingComponent>
	)
});

interface Props {
	data: DPlanets;
	maxNumberOfPlanetInAYear: number;
}
interface State {
	dimensions: Dimensions;
	activeChapter: ChapterId;
}
export class Main extends React.Component<Props, State> {
	state: State = {
		dimensions: {
			width: -1,
			height: -1
		},
		activeChapter: 'Introduction'
	};

	onChapterChange = (ch: ChapterId): void => {
		this.setState({ activeChapter: ch });
	};

	render() {
		const { width, height } = this.state.dimensions;
		const { data, maxNumberOfPlanetInAYear } = this.props;
		return (
			<Root>
				<Intro />
				<Story>
					{/* <ChapterNavigation activeChapter={this.state.activeChapter} /> */}
					<Measure
						bounds
						onResize={(contentRect) => {
							this.setState({ dimensions: contentRect.bounds });
						}}
					>
						{({ measureRef }) => {
							return (
								<div ref={measureRef} data-name="react-measure">
									{width !== -1 && (
										<DynamicScroller
											data={data}
											maxNumberOfPlanetInAYear={maxNumberOfPlanetInAYear}
											dimensions={{ width: width, height: height }}
											updateActiveChapter={this.onChapterChange}
										/>
									)}
								</div>
							);
						}}
					</Measure>
				</Story>
				<HallOfFame hallOfFamePlanets={data.filter((d) => d.pl_isHallOfFame === true)} />
				<Footer />
			</Root>
		);
	}
}
