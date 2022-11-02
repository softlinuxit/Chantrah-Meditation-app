import React, { Component } from 'react';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import AppUsersView from 'view/appUsers/view/AppUsersView';
import { i18n } from 'i18n';
import actions from 'modules/appUsers/view/appUsersViewActions';
import { connect } from 'react-redux';
import selectors from 'modules/appUsers/view/appUsersViewSelectors';
import AppUsersViewToolbar from 'view/appUsers/view/AppUsersViewToolbar';

class AppUsersPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.appUsers.menu'), '/app-users'],
            [i18n('entities.appUsers.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.appUsers.view.title')}
          </PageTitle>

          <AppUsersViewToolbar match={this.props.match} />

          <AppUsersView
            loading={this.props.loading}
            record={this.props.record}
          />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    record: selectors.selectRecord(state),
  };
}

export default connect(select)(AppUsersPage);
