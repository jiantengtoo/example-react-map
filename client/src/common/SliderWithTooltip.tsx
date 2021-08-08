import Slider, { Handle, SliderProps, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FunctionComponent } from 'react';

const handle: SliderProps['handle'] = (props) => {
  const { value, dragging, index, ...restProps } = props;

  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`${value}`}
      visible={dragging}
      placement="bottom"
      key={index}
    >
      <Handle 
        value={ value } 
        {...restProps}
        ariaValueTextFormatter={ (value) => { return value.toString() } }
      />
    </SliderTooltip>
  );
};

type SliderWithTooltipProps = {
  readonly value: number;
  readonly onSliderValueChange: (value:number) => void;
}

const SliderWithTooltip: FunctionComponent<SliderWithTooltipProps> = (
  { 
    value,
    onSliderValueChange,
  }
) => {

  return (
    <Slider 
      min={0} 
      max={20} 
      value={value} 
      onChange={ onSliderValueChange } 
      handle={handle} 
    />
  );
}

export default SliderWithTooltip;
