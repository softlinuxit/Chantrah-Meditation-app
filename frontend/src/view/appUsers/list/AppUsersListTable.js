import { Table, Popconfirm, Tag } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/appUsers/list/appUsersListActions';
import destroyActions from 'modules/appUsers/destroy/appUsersDestroyActions';
import selectors from 'modules/appUsers/list/appUsersListSelectors';
import destroySelectors from 'modules/appUsers/destroy/appUsersDestroySelectors';
import model from 'modules/appUsers/appUsersModel';
import appUsersSelectors from 'modules/appUsers/appUsersSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import ImagesListView from 'view/shared/list/ImagesListView';

const { fields } = model;

class AppUsersListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.name.forTable(),
    fields.email.forTable(),
    fields.image.forTable({
      render: (value) => <ImagesListView value={value} />,
    }),
    {
      title: 'Actions',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/app-users/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/app-users/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          // rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: appUsersSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: appUsersSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(AppUsersListTable);
