import * as React from 'react';
import styled from 'react-emotion';
import {
	neutralGrey,
	KeplerColor,
	EarthColor,
	CHZJustRightColor,
	CHZTooColdColor,
	CHZTooHotColor,
	MarsColor,
	ProximaColor,
	SunColor,
	AUColor
} from '../materials/color';
import { Margin } from 'react-measure';
import { hintLabel, legendType } from '../materials/typography';
import { Hint, Coordinate, PlanetData, RadiiLegend } from 'types/types';
import { HINT_RADIUS, TRANSITION_DURATION } from '../utils/getters';
import { select } from 'd3-selection';
import { medium, mq } from '../materials/breakpoints';

const HintsRoot = styled('svg')`
  position: absolute;
  top:0;
  left:0;
  overflow: visible;
`;
const OnePlanetCircle = styled('circle')`
  fill: none;
  stroke: ${neutralGrey};
`;
const OnePlanetLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: start;
  fill: ${neutralGrey};
  ${hintLabel};
`;
const ProximaCircle = styled('circle')`
  fill: ${ProximaColor};
  stroke: none;
`;
const ProximaLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: start;
  fill: ${ProximaColor};
  ${hintLabel};
`;
const KeplerCircle = styled('circle')`
  fill: none;
  stroke: ${KeplerColor};
`;
const KeplerLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: start;
  fill: ${KeplerColor};
  ${hintLabel};
`;
const EarthCircle = styled('circle')`
  fill: ${EarthColor};
  stroke: none;
`;
const EarthLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${EarthColor};
  ${hintLabel};
`;
const SunCircle = styled('circle')`
  fill: ${SunColor};
  stroke: none;
`;
const SunLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${SunColor};
  ${hintLabel};
`;
const MarsCircle = styled('circle')`
  fill: ${MarsColor};
  stroke: none;
`;
const MarsLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${MarsColor};
  ${hintLabel};
`;
const RadiusLegendGroup = styled('g')`
  display: none;
  @media (min-width: ${medium}px) {
    display: block;
  }
`;
const RadiusCircle = styled('circle')`
  stroke: ${neutralGrey};
  fill: none;
`;
const RadiusLabel = styled('text')`
  dominant-baseline: middle;
  text-anchor: middle;
  fill: ${neutralGrey};
  ${legendType};
`;
const CHZLine = styled('line')({
	fill: 'none',
	strokeWidth: HINT_RADIUS * 2
});
const CHZLabel = styled('text')(
	{
		dominantBaseline: 'middle',
		textAnchor: 'middle',
		transform: 'translateY(-11px)',
		[mq[1]]: {
			transform: 'translateY(0px)'
		}
	},
	hintLabel
);
const AULine = styled('line')({
	fill: 'none',
	stroke: AUColor,
	strokeWidth: 2,
	strokeLinecap: 'square'
});
const AULabel = styled('text')(
	{
		fill: AUColor,
		textAnchor: 'start',
		dominantBaseline: 'no-change',
		transform: 'translateY(7px)',
		[mq[1]]: {
			textAnchor: 'middle',
			dominantBaseline: 'middle',
			transform: 'translateY(0px)'
		}
	},
	hintLabel
);

interface Props {
	activeHint: Array<Hint>;
	width: number;
	height: number;
	margins: Margin;
	onePlanet: Coordinate;
	kepler: Coordinate;
	mars: Coordinate;
	earth: PlanetData;
	proxima: PlanetData;
	radiiLegend: Array<RadiiLegend>;
}
export class Hints extends React.Component<Props> {
	keplerField: React.RefObject<SVGGElement>;
	radiusLegend: React.RefObject<SVGGElement>;
	constructor(props: Props) {
		super(props);
		this.keplerField = React.createRef();
		this.radiusLegend = React.createRef();
	}
	show = (): void => {
		select(this.keplerField.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
	};
	hide = (): void => {
		select(this.keplerField.current).transition().duration(TRANSITION_DURATION / 4).attr('opacity', 0);
	};
	showRadiusLegend = (): void => {
		select(this.radiusLegend.current).transition().duration(TRANSITION_DURATION / 2).attr('opacity', 1);
	};
	hideRadiusLegend = (): void => {
		select(this.radiusLegend.current).transition().duration(TRANSITION_DURATION / 4).attr('opacity', 0);
	};
	componentDidUpdate() {
		this.props.activeHint.includes('KeplerField') ? this.show() : this.hide();
		this.props.activeHint.includes('radiusLegend') ? this.showRadiusLegend() : this.hideRadiusLegend();
	}
	componentDidMount() {
		this.hide();
	}
	render() {
		const { activeHint, width, height, margins, earth, mars, onePlanet, kepler, proxima, radiiLegend } = this.props;
		const w = width - margins.left - margins.right;
		const h = height - margins.top - margins.bottom;
		return (
			<HintsRoot width={width} height={height} data-name="svg-hints">
				{activeHint.includes('onePlanet') && (
					<g>
						<OnePlanetCircle cx={onePlanet.x} cy={onePlanet.y} r={HINT_RADIUS} />
						<OnePlanetLabel x={onePlanet.x} y={onePlanet.y} dy={-HINT_RADIUS * 3}>
							One planet
						</OnePlanetLabel>
					</g>
				)}
				{activeHint.includes('proximaPolar') && (
					<g>
						<ProximaCircle cx={proxima.polarX} cy={proxima.polarY} r={HINT_RADIUS} />
						<ProximaLabel x={proxima.polarX} y={proxima.polarY} dy={13}>
							Proxima Cen b
						</ProximaLabel>
					</g>
				)}
				<g ref={this.keplerField}>
					<KeplerCircle cx={kepler.x} cy={kepler.y} r={w * 0.1} />
					<KeplerLabel x={kepler.x} y={kepler.y} dy={-w * 0.1 - 10}>
						Kepler Field
					</KeplerLabel>
				</g>

				{activeHint.includes('AU') && (
					<g>
						{/* <EarthCircle cx={earth.x} cy={earth.y} r={HINT_RADIUS} />
						<EarthLabel x={earth.x} y={earth.y} dy={-HINT_RADIUS - 10}>
							Earth
						</EarthLabel> */}
						<AULine x1={margins.left} y1={earth.y + 10} x2={earth.x} y2={earth.y + 10} />
						<AULine x1={margins.left} y1={earth.y} x2={margins.left} y2={earth.y + 10} />
						<AULine x1={earth.x} y1={earth.y} x2={earth.x} y2={earth.y + 10} />

						<AULabel x={earth.chzInner / 2} y={earth.y} dy={+25}>
							1 Astr. Unit (AU)
						</AULabel>
					</g>
				)}

				{activeHint.includes('EarthCHZ') && (
					<g>
						<CHZLine
							style={{ stroke: CHZJustRightColor }}
							x1={earth.chzInner}
							y1={earth.y}
							x2={earth.chzOuter}
							y2={earth.y}
						/>
					</g>
				)}
				{activeHint.includes('CHZ') && (
					<g>
						<CHZLine
							style={{ stroke: CHZTooHotColor }}
							x1={margins.left}
							y1={earth.y}
							x2={earth.chzInner}
							y2={earth.y}
						/>
						<CHZLine
							style={{ stroke: CHZJustRightColor }}
							x1={earth.chzInner}
							y1={earth.y}
							x2={earth.chzOuter}
							y2={earth.y}
						/>
						<CHZLine
							style={{ stroke: CHZTooColdColor }}
							x1={earth.chzOuter}
							y1={earth.y}
							x2={w}
							y2={earth.y}
						/>
						<CHZLabel
							style={{ fill: CHZTooHotColor }}
							x={earth.chzInner / 2}
							y={earth.y}
							dy={-HINT_RADIUS - 10}
						>
							Too hot!
						</CHZLabel>
						<CHZLabel
							style={{ fill: CHZJustRightColor }}
							x={earth.chzInner + (earth.chzOuter - earth.chzInner) / 2}
							y={earth.y}
							dy={-HINT_RADIUS - 10}
						>
							Just right
						</CHZLabel>
						<CHZLabel
							style={{ fill: CHZTooColdColor }}
							x={earth.chzOuter + (w - earth.chzOuter) / 2}
							y={earth.y}
							dy={-HINT_RADIUS - 10}
						>
							Too cold!
						</CHZLabel>

						<EarthCircle cx={earth.x} cy={earth.y} r={HINT_RADIUS} />
						<EarthLabel x={earth.x} y={earth.y} dy={-HINT_RADIUS - 10}>
							Earth
						</EarthLabel>
					</g>
				)}
				{activeHint.includes('EarthScatter') && (
					<g>
						<EarthCircle cx={earth.x} cy={earth.y} r={HINT_RADIUS} />
						<EarthLabel x={earth.x} y={earth.y} dy={-HINT_RADIUS - 10}>
							Earth
						</EarthLabel>
					</g>
				)}
				{activeHint.includes('ProximaCHZ') && (
					<g>
						<CHZLine
							style={{ stroke: CHZTooHotColor }}
							x1={margins.left}
							y1={proxima.y}
							x2={proxima.chzInner}
							y2={proxima.y}
						/>
						<CHZLine
							style={{ stroke: CHZJustRightColor }}
							x1={proxima.chzInner}
							y1={proxima.y}
							x2={proxima.chzOuter}
							y2={proxima.y}
						/>
						<CHZLine
							style={{ stroke: CHZTooColdColor }}
							x1={proxima.chzOuter}
							y1={proxima.y}
							x2={w}
							y2={proxima.y}
						/>

						<ProximaCircle cx={proxima.x} cy={proxima.y} r={HINT_RADIUS} />
						<ProximaLabel x={proxima.x} y={proxima.y} dy={-HINT_RADIUS - 10}>
							Proxima Cen b
						</ProximaLabel>
					</g>
				)}
				{activeHint.includes('Sun') && (
					<g>
						<SunCircle cx={margins.left} cy={earth.y} r={HINT_RADIUS} />
						<SunLabel x={margins.left} y={earth.y} dy={-HINT_RADIUS - 10}>
							Sun
						</SunLabel>
					</g>
				)}
				{activeHint.includes('Mars') && (
					<g>
						<MarsCircle cx={mars.x} cy={earth.y} r={HINT_RADIUS} />
						<MarsLabel x={mars.x} y={earth.y} dy={+HINT_RADIUS + 10}>
							Mars
						</MarsLabel>
					</g>
				)}

				<g ref={this.radiusLegend}>
					{radiiLegend.map((item, i) => (
						<RadiusLegendGroup key={item.label}>
							<RadiusCircle cx={w - 100} cy={h - 100 - i * 50} r={item.radius} />
							<RadiusLabel x={w - 100} y={h - 100 - i * 50} dy={20}>
								{item.value} {item.label}
							</RadiusLabel>
						</RadiusLegendGroup>
					))}
				</g>
			</HintsRoot>
		);
	}
}
