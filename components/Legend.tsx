import * as React from 'react';
import styled from 'react-emotion';
import {
	DISCOVERY_METHODS,
	allDiscoveryMethodColorScale,
	getDiscoveryMethodLegendLabel,
	massClass,
	massClassColorScale,
	radiusScale
} from '../utils/getters';
import { neutralGrey } from '../materials/color';
import { LegendType } from 'types/types';

const Root = styled('div')`
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  width: 300px;
  position: absolute;
  top:0;
  right: 300px;
`;
const LegendUnit = styled('div')(
	{
		margin: '2em 0'
	},
	(props: { display: boolean }) => ({
		display: props.display ? 'block' : 'none'
	})
);

const LegendItem = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: .3em;
`;

const LegendDot = styled('div')(
	{
		width: '0.7rem',
		height: ' 0.7rem',
		borderRadius: '8px',
		marginRight: '0.5rem'
	},
	(props: { color: string }) => ({
		backgroundColor: props.color
	})
);

const LegendItemLabel = styled('div')`
  color: ${neutralGrey};
`;

const RadiusLegendCircle = styled('div')(
	{
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: neutralGrey,
		marginRight: '0.5rem'
	},
	(props: { radius: number }) => ({
		width: props.radius,
		height: props.radius,
		borderRadius: props.radius
	})
);
interface Props {
	legendType: LegendType;
}

export const Legend = ({ legendType }: Props) => {
	return (
		<Root>
			<LegendUnit display={legendType === 'methods'}>
				{DISCOVERY_METHODS.map((method) => (
					<LegendItem key={method}>
						<LegendDot color={allDiscoveryMethodColorScale(method) as string} />
						<LegendItemLabel>{getDiscoveryMethodLegendLabel(method)}</LegendItemLabel>
					</LegendItem>
				))}
			</LegendUnit>
			<LegendUnit display={legendType === 'massAndRadius'}>
				{massClass.map((cl) => (
					<LegendItem key={cl}>
						<LegendDot color={massClassColorScale(cl) as string} />
						<LegendItemLabel>{cl}</LegendItemLabel>
					</LegendItem>
				))}
			</LegendUnit>
			<LegendUnit display={legendType === 'massAndRadius'}>
				{[ 1, 28 ].map((radius) => (
					<LegendItem key={radius}>
						<RadiusLegendCircle radius={radiusScale(radius)} />
						<LegendItemLabel>{`${radius} x Earth radius`}</LegendItemLabel>
					</LegendItem>
				))}
			</LegendUnit>
		</Root>
	);
};
