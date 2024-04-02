import { Tags } from '../models/tags.model';
import {
  ButtonWidgetModel,
  LG,
  SILVER_BLUE,
  XL,
} from '../shared/button/button-widget.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { Items } from '../shared/popup-tooltip/popup-tooltip.model';
import { PopupData } from '../shared/popup/popup.model';

export const API_URL = window['RestAPI']
  ? window['RestAPI']?.root
  : 'http://madejski-project.pl/test_wp/wp-json/';

export const HEADER = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=UTF-8')
  .set('X-WP-Nonce', window['RestAPI']?.nonce);

export const RIGHT = 'right';
export const TOP = 'top';
export const BOTTOM = 'bottom';
export const DROPDOWN = 'dropdown';

export const MULTIPLE = 'multiple';
export const SINGLE = 'single';
export const NONE = 'none';

export const TEXT = 'text';
export const SEARCH = 'search';

export const DEFAULT_PAGINATION = {
  from: 0,
  count: 0,
  to: 10,
  page: 1,
  range: 10,
};

export const STATUS_VALUES = [
  {
    key: 'RUNNING',
    popupItems: {
      value: 'Running',
      choose: false,
      icon: 'ico--play',
    },
  },
  {
    key: 'STOPPED',
    popupItems: {
      value: 'Stopped',
      choose: false,
      icon: 'ico--stop',
    },
  },
  {
    key: 'PAUSED',
    popupItems: {
      value: 'Paused',
      choose: false,
      icon: 'ico--pause',
    },
  },
  {
    key: 'EDITED',
    popupItems: {
      value: 'Edited',
      choose: false,
      icon: 'ico--edit',
    },
  },
  {
    key: 'DRAFT',
    popupItems: {
      value: 'Draft',
      choose: false,
      icon: 'ico--draft',
    },
  },
  {
    key: 'COMPLETED',
    popupItems: {
      value: 'Completed',
      choose: false,
      icon: 'ico--done',
    },
  },
] as Items[];

export const PROSPECT_STATUS_VALUES = [
  {
    key: 'ACTIVE',
    popupItems: {
      value: 'Active',
      choose: false,
    },
  },
  {
    key: 'BLACKLIST',
    popupItems: {
      value: 'Blacklisted',
      choose: false,
    },
  },
  {
    key: 'REPLIED',
    popupItems: {
      value: 'Responded',
      choose: false,
    },
  },
  {
    key: 'INVALID',
    popupItems: {
      value: 'Invalid',
      choose: false,
    },
  },
  {
    key: 'BOUNCED',
    popupItems: {
      value: 'Bounced',
      choose: false,
    },
  },
] as Items[];

export function getAllTags(): Tags[] {
  return [
    {
      id: 1,
      slug: 'EMAIL',
      field_map: 'EMAIL',
      name: 'Email',
      disabled: true,
      required: true,
      validation_msg: '',
    },
    {
      id: 2,
      slug: 'FIRST_NAME',
      field_map: 'FIRST_NAME',
      name: 'First name',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 3,
      slug: 'LAST_NAME',
      field_map: 'LAST_NAME',
      name: 'Last name',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 4,
      slug: 'FULL_NAME',
      field_map: 'FULL_NAME',
      name: 'Full name',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 5,
      slug: 'COMPANY',
      field_map: 'COMPANY',
      name: 'Company',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 6,
      slug: 'WWW',
      field_map: 'WWW',
      name: 'www',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 7,
      slug: 'TITLE',
      field_map: 'TITLE',
      name: 'Title',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 8,
      slug: 'PHONE',
      field_map: 'PHONE',
      name: 'Phone',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 9,
      slug: 'WEBSITE',
      field_map: 'WEBSITE',
      name: 'Website',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 10,
      slug: 'LINKEDIN_URL',
      field_map: 'LINKEDIN_URL',
      name: 'LinkedIn URL',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 11,
      slug: 'ADDRESS',
      field_map: 'ADDRESS',
      name: 'Address',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 12,
      slug: 'CITY',
      field_map: 'CITY',
      name: 'City',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 13,
      slug: 'STATE',
      field_map: 'STATE',
      name: 'State',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 14,
      slug: 'COUNTRY',
      field_map: 'COUNTRY',
      name: 'Country',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 15,
      slug: 'INDUSTRY',
      field_map: 'INDUSTRY',
      name: 'Industry',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 16,
      slug: 'SNIPPET_1',
      field_map: 'SNIPPET_1',
      name: 'Snippet 1',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 17,
      slug: 'SNIPPET_2',
      field_map: 'SNIPPET_2',
      name: 'Snippet 2',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 18,
      slug: 'SNIPPET_3',
      field_map: 'SNIPPET_3',
      name: 'Snippet 3',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 19,
      slug: 'SNIPPET_4',
      field_map: 'SNIPPET_4',
      name: 'Snippet 4',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 20,
      slug: 'SNIPPET_5',
      field_map: 'SNIPPET_5',
      name: 'Snippet 5',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 21,
      slug: 'SNIPPET_6',
      field_map: 'SNIPPET_6',
      name: 'Snippet 6',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 22,
      slug: 'SNIPPET_7',
      field_map: 'SNIPPET_7',
      name: 'Snippet 7',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 23,
      slug: 'SNIPPET_8',
      field_map: 'SNIPPET_8',
      name: 'Snippet 8',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 24,
      slug: 'SNIPPET_9',
      field_map: 'SNIPPET_9',
      name: 'Snippet 9',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 25,
      slug: 'SNIPPET_10',
      field_map: 'SNIPPET_10',
      name: 'Snippet 10',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 26,
      slug: 'SNIPPET_11',
      field_map: 'SNIPPET_11',
      name: 'Snippet 11',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 27,
      slug: 'SNIPPET_12',
      field_map: 'SNIPPET_12',
      name: 'Snippet 12',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 28,
      slug: 'SNIPPET_13',
      field_map: 'SNIPPET_13',
      name: 'Snippet 13',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 29,
      slug: 'SNIPPET_14',
      field_map: 'SNIPPET_14',
      name: 'Snippet 14',
      disabled: false,
      required: false,
      validation_msg: '',
    },
    {
      id: 30,
      slug: 'SNIPPET_15',
      field_map: 'SNIPPET_15',
      name: 'Snippet 15',
      disabled: false,
      required: false,
      validation_msg: '',
    },
  ] as Tags[];
}

export function isEmailField(field: Tags): boolean {
  return field.slug === getAllTags()[0].slug;
}

export function getBlackLargeButton(): ButtonWidgetModel {
  return {
    btnSize: LG,
  };
}

export function getSilverLargeButton(): ButtonWidgetModel {
  return {
    btnColor: SILVER_BLUE,
    btnSize: LG,
  };
}

export function getBlackXLargeButton(): ButtonWidgetModel {
  return {
    btnSize: XL,
  };
}

export function getSilverXLargeButton(): ButtonWidgetModel {
  return {
    btnColor: SILVER_BLUE,
    btnSize: XL,
  };
}

export function getReminderPopup(): PopupData {
  return {
    title: 'Do you want to leave this page without saving?',
    content: "You'll lose all your styles changes.",
    btnOk: 'Leave',
    btnCancel: 'Cancel',
    imageStyle: 'img--error',
  };
}

export function getReminderPopupWithColor(): PopupData {
  return {
    ...getReminderPopup(),
    isOverlayColor: true,
  };
}

export function fadeAnimation(): any[] {
  return [
    trigger('animate', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ];
}

export function clearAllTooltips(): void {
  const allTooltips = document.querySelectorAll('.wfw-tooltip');
  allTooltips.forEach((tooltip) => tooltip?.remove());
}
