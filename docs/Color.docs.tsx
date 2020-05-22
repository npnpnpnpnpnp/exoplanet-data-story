import * as React from 'react';
import { markdown, ColorSpecimen, ColorPaletteSpecimen } from 'catalog';
import { neutralGrey } from '../materials/color';
import { mainRed } from '../materials/color';
import { categorialBlue } from '../materials/color';
import { categorialGreen } from '../materials/color';
import { categorialYellow } from '../materials/color';
import { categorialPurple } from '../materials/color';
import { mainBackground } from '../materials/color';
import { discoveryMethodsColors } from '../materials/color';
import { massClassColors } from '../materials/color';

// ["#f00", "#0f0", ...]
// [{value: "#f00"}, {value: "#0f0"}]

export default () => markdown`

## Main colors

${<ColorSpecimen span={1} name="background" value={mainBackground} />}
${<ColorSpecimen span={1} name="neutral grey" value={neutralGrey} />}
${<ColorSpecimen span={1} name="main interaction red" value={mainRed} />}

## Categorial colors

${<ColorSpecimen span={1} name="categorial blue" value={categorialBlue} />}
${<ColorSpecimen span={1} name="categorial green" value={categorialGreen} />}
${<ColorSpecimen span={1} name="categorial yellow" value={categorialYellow} />}
${<ColorSpecimen span={1} name="categorial purple" value={categorialPurple} />}

### Discovery methods scale
to be used in this order for the discovery methods-

${<ColorPaletteSpecimen
    span={6}
    colors={discoveryMethodsColors.map(value => ({value}))}
    // horizontal={true}
  />}

  ### Mass classes scale
  to be used in this order for the Mass classes within the chapter habitability.

  ${<ColorPaletteSpecimen
    span={6}
    colors={massClassColors.map(value => ({value}))}
    // horizontal={true}
  />}
`;
