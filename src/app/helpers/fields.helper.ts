import { AppPaths } from './app.paths';
import { Submenu } from '../shared/menu/menu.model';

export const EMAIL = 'EMAIL';

export function getFieldsSubmenu(): Submenu {
  return {
    title: 'Back to forms',
    address: '/' + AppPaths.FORMS,
    menu: [
      {
        icon: 'ico--snippets',
        address: AppPaths.FORMS + '/' + AppPaths.FIELDS,
        label: 'Fields',
      },
      {
        icon: 'ico--edit',
        address: AppPaths.FORMS + '/' + AppPaths.STYLE,
        label: 'Style',
      },
      {
        icon: 'ico--settings',
        address: AppPaths.FORMS + '/' + AppPaths.FORM_SETTINGS,
        label: 'Form settings',
      },
    ],
  } as Submenu;
}
