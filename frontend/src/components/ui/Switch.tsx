/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {cn} from '~/utils/helpers.ts';
import {Switch as RSwitch, SwitchProps as RSwitchProps} from '@radix-ui/themes';

export interface SwitchProps extends RSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Switch component for toggle switches
 * @example
 * <Switch checked={true} onCheckedChange={(checked) => console.log(checked)} />
 * @developer
 * Uses a checkbox input hidden visually but accessible to screen readers
 * and a styled toggle thumb that moves based on the checked state
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <RSwitch {...props} />
  );
};
