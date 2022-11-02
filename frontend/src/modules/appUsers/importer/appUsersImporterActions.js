import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/appUsers/importer/appUsersImporterSelectors';
import AppUsersService from 'modules/appUsers/appUsersService';
import fields from 'modules/appUsers/importer/appUsersImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'APPUSERS_IMPORTER',
  selectors,
  AppUsersService.import,
  fields,
  i18n('entities.appUsers.importer.fileName'),
);
