import React from 'react'
import { View, Text } from 'react-native'
import { theme } from '../../constants/theme';
import Home from './Home';
import ArrowLeft from './ArrowLeft';
import Mail from './Mail';
import Lock from './Lock';

const icons = {
    home: Home,
    arrowLeft: ArrowLeft,
    mail: Mail,
    lock: Lock
}

const Icon = ({name, ...props}) => {
    const IconComponent = icons[name];
  return (
    <IconComponent
        height={props.size || 24}
        width={props.size || 24}
        strokeWidth={props.strokeWidth || 1.9}
        color={theme.colors.textLight}
        {...props} />
  )
}

export default Icon;