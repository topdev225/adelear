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

// TODO: import these better
import adaptiveInsightsLogo from './../assets/icons/adaptive-insights-logo.png';
import adpLogo from './../assets/icons/adp-logo.png';
import ascentisLogo from './../assets/icons/ascentis-logo.png';
import auditboardLogo from './../assets/icons/auditboard-logo.png';
import billLogo from './../assets/icons/bill-logo.png';
import bloombergLogo from './../assets/icons/bloomberg-gov-logo.png';
import bullhornLogo from './../assets/icons/bullhorn-logo.png';
import concurLogo from './../assets/icons/concur-logo.png';
import cornerstoneLogo from './../assets/icons/cornerstone-logo.png';
import coupaLogo from './../assets/icons/coupa-logo.png';
import deltekLogo from './../assets/icons/deltek-logo.jpg';
import govwinLogo from './../assets/icons/govwin-logo.png';
import ibmLogo from './../assets/icons/ibm-logo.png';
import icimsLogo from './../assets/icons/icims-logo.png';
import ivaluaLogo from './../assets/icons/ivalua-logo.png';
import moodleLogo from './../assets/icons/moodle-logo.png';
import pandadocLogo from './../assets/icons/pandadoc-logo.png';
import proposifyLogo from './../assets/icons/proposify-logo.png';
import salesforceLogo from './../assets/icons/salesforce-logo.png';
import sapLogo from './../assets/icons/sap-ariba-logo.png';
import sterlingLogo from './../assets/icons/sterling-logo.png';
import successfactorsLogo from './../assets/icons/successfactors-logo.png';
import taleoLogo from './../assets/icons/taleo-logo.png';
import ultiproLogo from './../assets/icons/ultipro-logo.png';
import unanetLogo from './../assets/icons/unanet-logo.png';
import unisonLogo from './../assets/icons/unison-logo.jpeg';
import workdayLogo from './../assets/icons/workday-logo.png';

export const servicesFirstRow: any[] = [
  {
    description:
      'Conduct market intelligence, manage client relationships and qualify opportunities.',
    icon: <ShieldCheckIcon icon="true" fill={colors.blue.extraLight} />,
    step: '01',
    customerIcons: [
      {
        label: 'Salesforce logo',
        path: salesforceLogo,
        category: ['customer-relations-mgmt']
      },
      {
        label: 'GovWin logo',
        path: govwinLogo,
        category: ['intelligence']
      },
      {
        label: 'Bloomberg logo',
        path: bloombergLogo,
        category: ['intelligence']
      }
    ],
    customerCategories: [
      {
        id: 'customer-relations-mgmt',
        label: 'Customer Relations Mgmt'
      },
      {
        id: 'intelligence',
        label: 'Intelligence'
      }
    ],
    title: 'Qualify',
    fullTitle: 'Qualify'
  },
  {
    description: 'Propose solutions to qualified opportunities.',
    icon: <DeliveryIcon icon="true" fill={colors.blue.extraLight} />,
    step: '02',
    customerIcons: [
      {
        label: 'Proposify logo',
        path: proposifyLogo,
        category: ['proposal']
      },
      {
        label: 'PandaDoc logo',
        path: pandadocLogo,
        category: ['proposal']
      }
    ],
    customerCategories: [
      {
        id: 'proposal',
        label: 'Proposal'
      }
    ],
    title: 'Propose',
    fullTitle: 'Propose'
  },
  {
    description:
      'Negotiate terms and conditions, manage vendors or subcontracts.',
    icon: <SignatureIcon icon="true" fill={colors.blue.extraLight} />,
    step: '03',
    customerIcons: [
      {
        label: 'Unison logo',
        path: unisonLogo,
        category: ['procurement']
      },
      {
        label: 'Deltek logo',
        path: deltekLogo,
        category: ['procurement']
      },
      {
        label: 'iValua logo',
        path: ivaluaLogo,
        category: ['procurement']
      },
      {
        label: 'Sap logo',
        path: sapLogo,
        category: ['procurement']
      },
      {
        label: 'Coupa logo',
        path: coupaLogo,
        category: ['procurement']
      }
    ],
    customerCategories: [
      {
        id: 'contract-mgmt',
        label: 'Contract Mgmt'
      },
      {
        id: 'procurement',
        label: 'Procurement'
      }
    ],
    title: 'Contract',
    fullTitle: 'Contract'
  }
];

export const servicesSecondRow = [
  {
    description: 'Ramp up staff to proposed solutions and onboard talent.',
    icon: <UserGroupIcon icon="true" fill={colors.blue.extraLight} />,
    step: '04',
    customerIcons: [
      {
        label: 'Taleo logo',
        path: taleoLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Workday logo',
        path: workdayLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Ultipro logo',
        path: ultiproLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Successfactors logo',
        path: successfactorsLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Icims logo',
        path: icimsLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Bullhorn logo',
        path: bullhornLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Adp logo',
        path: adpLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Cornerstone logo',
        path: cornerstoneLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Ascentis logo',
        path: ascentisLogo,
        category: ['applicant-tracking-system']
      },
      {
        label: 'Sterling logo',
        path: sterlingLogo,
        category: 'screening'
      }
    ],
    customerCategories: [
      {
        id: 'applicant-tracking-system',
        label: 'Applicant Tracking System'
      },
      {
        id: 'screening',
        label: 'Screening'
      }
    ],
    title: 'Recruit / Hire',
    fullTitle: 'Recruit / Hire'
  },
  {
    description: 'Manage performance and payroll.',
    icon: <DollarCircleIcon icon="true" fill={colors.blue.extraLight} />,
    step: '05',
    customerIcons: [
      {
        label: 'ADP logo',
        path: adpLogo,
        category: ['human-resources-info-system', 'intelligence']
      },
      {
        label: 'UltiPro logo',
        path: ultiproLogo,
        category: ['human-resources-info-system']
      },
      {
        label: 'Workday logo',
        path: workdayLogo,
        category: ['human-resources-info-system']
      },
      {
        label: 'Moodle logo',
        path: moodleLogo,
        category: 'intelligence'
      }
    ],
    customerCategories: [
      {
        id: 'human-resources-info-system',
        label: 'Human resources info System'
      },
      {
        id: 'intelligence',
        label: 'Intelligence'
      }
    ],
    title: 'Pay / Perform',
    fullTitle: 'Pay / Perform'
  },
  {
    description:
      'Employees book incur expenses and vendors perform or deliver and bill for services.',
    icon: <BriefcaseIcon icon="true" fill={colors.blue.extraLight} />,
    step: '06',
    customerIcons: [
      {
        label: 'Concur logo',
        path: concurLogo,
        category: ['travel-expense', 'invoice-mgmt']
      },
      {
        label: 'Bill.com logo',
        path: billLogo,
        category: ['invoice-mgmt']
      }
    ],
    customerCategories: [
      {
        id: 'travel-expense',
        label: 'Travel & Expense'
      },
      {
        id: 'invoice-mgmt',
        label: 'Invoice Mgmt'
      }
    ],
    title: 'Travel / Exp / AP',
    fullTitle: 'Travel / Exp / Accounts Payable'
  },
  {
    description: 'Record all financial transactions to account for activity.',
    icon: <GearIcon icon="true" fill={colors.blue.extraLight} />,
    step: '07',
    customerIcons: [
      {
        label: 'Deltek logo',
        path: deltekLogo,
        category: ['enterprise-reporting-platform']
      },
      {
        label: 'Unanet logo',
        path: unanetLogo,
        category: ['enterprise-reporting-platform']
      },
      {
        label: 'IBM logo',
        path: ibmLogo,
        category: ['planning']
      },
      {
        label: 'Adaptive Insights logo',
        path: adaptiveInsightsLogo,
        category: ['planning']
      },
      {
        label: 'Auditboard logo',
        path: auditboardLogo,
        category: ['governance-risk-compliance']
      }
    ],
    customerCategories: [
      {
        id: 'enterprise-reporting-platform',
        label: 'Enterprise Reporting Platform'
      },
      {
        id: 'planning',
        label: 'Planning'
      },
      {
        id: 'governance-risk-compliance',
        label: 'Governance Risk & Compliance'
      }
    ],
    title: 'Account',
    fullTitle: 'Account'
  }
];
