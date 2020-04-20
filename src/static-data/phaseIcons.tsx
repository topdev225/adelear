import React from 'react';
import {
  BriefcaseIcon,
  DollarCircleIcon,
  DeliveryIcon,
  GearIcon,
  ShieldCheckIcon,
  SignatureIcon,
  UserGroupIcon
} from '@Icons';
import { colors } from '@Theme';

interface PhaseIconsType {
  [key: string]: any;
}

const phaseIcons: PhaseIconsType = {
  BriefcaseIcon: <BriefcaseIcon icon="true" fill={colors.blue.extraLight} />,
  DollarCircleIcon: (
    <DollarCircleIcon icon="true" fill={colors.blue.extraLight} />
  ),
  DeliveryIcon: <DeliveryIcon icon="true" fill={colors.blue.extraLight} />,
  GearIcon: <GearIcon icon="true" fill={colors.blue.extraLight} />,
  ShieldCheckIcon: (
    <ShieldCheckIcon icon="true" fill={colors.blue.extraLight} />
  ),
  SignatureIcon: <SignatureIcon icon="true" fill={colors.blue.extraLight} />,
  UserGroupIcon: <UserGroupIcon icon="true" fill={colors.blue.extraLight} />
};

export default phaseIcons;
