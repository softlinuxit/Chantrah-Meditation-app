import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import AppUsersForm from 'view/appUsers/form/AppUsersForm';
import AppUsersService from 'modules/appUsers/appUsersService';
import Errors from 'modules/shared/error/errors';

class AppUsersFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await AppUsersService.create(data);
      const record = await AppUsersService.find(id);
      this.props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        title={i18n('entities.appUsers.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <AppUsersForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default AppUsersFormModal;
