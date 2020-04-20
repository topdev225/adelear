type SystemCategoriesType = Array<{
  [key: string]: any;
}>;

const categories: SystemCategoriesType = [
  {
    id: 'customer-relations-mgmt',
    label: 'Customer Relations Mgmt',
    phases: [1],
    systems: [1]
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    phases: [1, 5],
    systems: [2, 3, 21]
  },
  {
    id: 'proposal',
    label: 'Proposal',
    phases: [2],
    systems: [4, 5]
  },
  {
    id: 'contract-mgmt',
    label: 'Contract Mgmt',
    phases: [3],
    systems: [6, 7]
  },
  {
    id: 'procurement',
    label: 'Procurement',
    phases: [3],
    systems: [6, 7, 8, 9, 10]
  },
  {
    id: 'applicant-tracking-system',
    label: 'Applicant Tracking System',
    phases: [4],
    systems: [11, 12, 13, 14, 15, 16, 17, 18, 19]
  },
  {
    id: 'screening',
    label: 'Screening',
    phases: [4],
    systems: [20]
  },
  {
    id: 'human-resources-info-system',
    label: 'Human resources info System',
    phases: [5],
    systems: [17, 13, 12]
  },
  {
    id: 'travel-expense',
    label: 'Travel & Expense',
    phases: [6],
    systems: [22]
  },
  {
    id: 'invoice-mgmt',
    label: 'Invoice Mgmt',
    phases: [6],
    systems: [22, 23]
  },
  {
    id: 'enterprise-reporting-platform',
    label: 'Enterprise Reporting Platform',
    phases: [7],
    systems: [7, 24]
  },
  {
    id: 'planning',
    label: 'Planning',
    phases: [7],
    systems: [25, 26]
  },
  {
    id: 'governance-risk-compliance',
    label: 'Governance Risk & Compliance',
    phases: [7],
    systems: [27]
  }
];

export default categories;
