import * as React from 'react';
import styled from 'react-emotion';
import { neutralGrey, neutralDarkGrey, EarthColor } from '../materials/color';
import { Margin } from 'react-measure';
import { hintLabel } from '../materials/typography';
import { HINT_RADIUS, TRANSITION_DURATION } from '../utils/getters';
import { select } from 'd3-selection';
import 'd3-transition';
import { medium } from '../materials/breakpoints';

const Root = styled('svg')`
  position: absolute;
  top:0;
  left:0;
  transition: opacity ${TRANSITION_DURATION};
`;
const DistanceCircle = styled('circle')`
  stroke-dasharray: 5px;
  fill: none;
  stroke: ${neutralDarkGrey};
`;
const DistanceLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${neutralGrey};
  font-size: 12px;
  font-family: 'IBM Plex Mono';
`;
const AngleLine = styled('line')`
  fill: none;
  stroke: ${neutralDarkGrey};
`;
const DistanceAxisLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: start;
  fill: ${neutralGrey};
  font-family: 'IBM Plex Mono';
  font-size: 7px;
  @media (min-width: ${medium}px) {
    font-size: 14px;
  }
`;

const EarthCircle = styled('circle')`
  fill: ${EarthColor};
`;
const EarthLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${EarthColor};
  ${hintLabel};
`;
type PolarHintValue = { radius: number; value: string };
interface Props {
	show: boolean;
	width: number;
	height: number;
	margins: Margin;
	xCenter: number;
	yCenter: number;
	hintValues: Array<PolarHintValue>;
}
export class PolarAxis extends React.Component<Props> {
	polarMeta: React.RefObject<SVGGElement>;
	constructor(props: Props) {
		super(props);
		this.polarMeta = React.createRef();
	}
	show = (): void => {
		select(this.polarMeta.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
	};
	hide = (): void => {
		select(this.polarMeta.current).transition().duration(TRANSITION_DURATION / 4).attr('opacity', 0);
	};
	componentDidUpdate() {
		this.props.show ? this.show() : this.hide();
	}
	componentDidMount() {
		this.hide();
	}
	render() {
		const { width, height, margins, xCenter, yCenter, hintValues } = this.props;
		return (
			<Root width={width} height={height} data-name="svg-polar-axis">
				<g ref={this.polarMeta}>
					<g>
						<AngleLine x1={margins.left} y1={height / 2} x2={width - margins.right} y2={height / 2} />
						<AngleLine x1={width / 2} y1={margins.top} x2={width / 2} y2={height - margins.bottom} />
					</g>

					<g>
						{hintValues.map((val) => (
							<React.Fragment key={val.value}>
								<DistanceCircle cx={xCenter} cy={yCenter} r={val.radius} />
								<DistanceLabel x={xCenter} y={yCenter + val.radius} dy={-7}>
									{val.value}
								</DistanceLabel>
							</React.Fragment>
						))}
					</g>
					<DistanceAxisLabel x={width / 2} y={height / 2} dx={width / 18} dy={-14}>
						→ Distance from Earth (parsecs)
					</DistanceAxisLabel>
					<g>
						<EarthCircle cx={xCenter} cy={yCenter} r={HINT_RADIUS} />
						<EarthLabel x={xCenter} y={yCenter} dy={-13}>
							Earth
						</EarthLabel>
					</g>
				</g>
			</Root>
		);
	}
}
