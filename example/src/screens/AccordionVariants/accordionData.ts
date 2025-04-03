import type { AccordionItemData } from '../../../../src/components/ui/Accordion/AccordionUnified';

// Sample data translated to English
export const sampleData: AccordionItemData[] = [
  {
    id: '1',
    title: 'Personal Information',
    content: 'Please fill in your personal information completely',
  },
  {
    id: '2',
    title: 'Education and Career',
    children: [
      {
        id: '2.1',
        title: 'Education History',
        content: [
          '• Highest Degree',
          '• Educational Institution',
          '• Field of Study',
          '• Graduation Year',
        ],
      },
      {
        id: '2.2',
        title: 'Work Experience',
        content: [
          '• Current Position',
          '• Company/Organization',
          '• Work Duration',
          '• Monthly Income',
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Contact Information',
    children: [
      {
        id: '3.1',
        title: 'Address',
        content:
          'Please provide your current address where you can be contacted',
      },
      {
        id: '3.2',
        title: 'Contact Channels',
        children: [
          {
            id: '3.2.1',
            title: 'Phone Number',
            content:
              'Mobile phone number and alternative phone number (if any)',
          },
          {
            id: '3.2.2',
            title: 'Email',
            content: 'Email address that you use regularly',
          },
        ],
      },
    ],
  },
];

export const compactData: AccordionItemData[] = [
  {
    id: '1',
    title: 'Credit Card Information',
    content: 'Please fill in your credit card information completely',
  },
  {
    id: '2',
    title: 'Payment Methods',
    content: 'Choose your preferred payment method',
  },
];
