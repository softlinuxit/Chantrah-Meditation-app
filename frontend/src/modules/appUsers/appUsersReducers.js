import list from 'modules/appUsers/list/appUsersListReducers';
import form from 'modules/appUsers/form/appUsersFormReducers';
import view from 'modules/appUsers/view/appUsersViewReducers';
import destroy from 'modules/appUsers/destroy/appUsersDestroyReducers';
import importerReducer from 'modules/appUsers/importer/appUsersImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
