import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, authSignUp} from '../../store/'

import {Layout, Form, Input, Button, Row, Col, Alert} from 'antd'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Layout.Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        minHeight: 600,
      }}
    >
      <Row>
        <Col span={1} />
        <Col span={7}>
          <Form
            onFinish={handleSubmit}
            initialValues={{
              formName: name,
            }}
          >
            <Form.Item hidden name="formName" />
            {displayName === 'Sign Up' && (
              <>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "'first name' is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "'last name' is required",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "'password' is required",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Row>
              <Form.Item span={5}>
                <Button type="primary" htmlType="submit">
                  {displayName}
                </Button>
              </Form.Item>
              {error && error.response && (
                <div>
                  {' '}
                  <Alert message={error.response.data} type="error" />{' '}
                </div>
              )}
              <Col span={1} />
              <a href="/auth/amazon" id="LoginWithAmazon">
                <img
                  border="0"
                  alt="Login with Amazon"
                  src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                  width="156"
                  height="32"
                />
              </a>
            </Row>
          </Form>
        </Col>
        <Col span={1} />
        <Col span={12}>
          <img width="100%" src="images/loginGif.gif" />
        </Col>
        <Col span={8} />
      </Row>
    </Layout.Content>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(formData) {
      const {formName, email, password} = formData
      if (!email || !password) {
        alert('A required field is missing.')
        return
      }
      if (formName === 'signup') {
        const {firstName, lastName} = formData
        if (!firstName || !lastName) {
          alert('A required field is missing.')
          return
        }
        dispatch(authSignUp(firstName, lastName, email, password, formName))
      } else {
        dispatch(auth(email, password, formName))
      }
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
