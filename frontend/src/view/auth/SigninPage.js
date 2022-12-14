import { Button, Checkbox, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import model from 'modules/auth/userModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import SigninPageWrapper from 'view/auth/styles/SigninPageWrapper';
import I18nFlags from 'view/layout/I18nFlags';
import InputFormItem, {
  InputFormItemNotFast,
} from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';

const { fields } = model;

class SigninPage extends Component {
  schema = new FormSchema(fields.id, [
    fields.email,
    fields.password,
    fields.rememberMe,
  ]);

  componentDidMount() {
    this.clearErrorMessage();
  }

  handleChange(event, form) {
    if (this.props.errorMessage) {
      this.clearErrorMessage();
    }

    form.handleChange(event);
  }

  clearErrorMessage = () => {
    const { dispatch } = this.props;
    dispatch(actions.doClearErrorMessage());
  };

  initialValues = () => {
    return { email: '', password: '', rememberMe: true };
  };

  doSubmit = ({ email, password, rememberMe }) => {
    const { dispatch } = this.props;
    dispatch(
      actions.doSigninWithEmailAndPassword(
        email,
        password,
        rememberMe,
      ),
    );
  };

  render() {
    return (
      <SigninPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <Form onSubmit={form.handleSubmit}>
                <InputFormItemNotFast
                  name={fields.email.name}
                  placeholder={fields.email.label}
                  autoComplete={fields.email.name}
                  size="large"
                  autoFocus
                  errorMessage={this.props.errorMessage}
                  layout={null}
                  form={form}
                />

                <InputFormItem
                  name={fields.password.name}
                  placeholder={fields.password.label}
                  autoComplete={fields.password.name}
                  type="password"
                  size="large"
                  layout={null}
                />

                <Form.Item>
                  <Checkbox
                    id={fields.rememberMe.name}
                    checked={form.values.rememberMe}
                    onChange={form.handleChange}
                  >
                    {fields.rememberMe.label}
                  </Checkbox>

                  {/* <Link
                    style={{ float: 'right' }}
                    to="/auth/forgot-password"
                  >
                    {i18n('auth.forgotPassword')}
                  </Link> */}
                </Form.Item>

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  {i18n('auth.signin')}
                </Button>

                {/* <OtherActions>
                  <Link to="/auth/signup">
                    {i18n('auth.createAnAccount')}
                  </Link>
                </OtherActions> */}

                {/* <I18nFlags style={{ marginTop: '24px' }} /> */}
              </Form>
            )}
          />
        </Content>
      </SigninPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoading(state),
  errorMessage: selectors.selectErrorMessage(state),
});

export default connect(select)(SigninPage);
