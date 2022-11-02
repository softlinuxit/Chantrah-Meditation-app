import React, { Component } from 'react';
import AppUsersListFilter from 'view/appUsers/list/AppUsersListFilter';
import AppUsersListTable from 'view/appUsers/list/AppUsersListTable';
import AppUsersListToolbar from 'view/appUsers/list/AppUsersListToolbar';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class AppUsersListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.appUsers.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.appUsers.list.title')}
          </PageTitle>

          <AppUsersListToolbar />
          <AppUsersListFilter />
          <AppUsersListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default AppUsersListPage;
