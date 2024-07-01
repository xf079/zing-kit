import {View, Text, ViewProps, TextProps} from '@tarojs/components';
import {CustomDomComponent, motion} from 'framer-motion';


export const MotionView:CustomDomComponent<ViewProps>  = motion(View);

export const MotionText:CustomDomComponent<TextProps> = motion(Text);
