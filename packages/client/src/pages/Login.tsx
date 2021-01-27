import React, { FC, useContext, useEffect } from 'react'
import { LoginDTO } from '@we-talk/common'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { object, SchemaOf, string } from 'yup'
import { login } from '../services/auth.api'
import { UserContext } from '../context/UserContext'
import { history } from '../config/router.config'

import { deleteToken } from '../utils/auth.util'

const loginRegisterSchema: SchemaOf<LoginDTO> = object({
  username: string().required('请输入用户名'),
  password: string().required('请输入密码')
}).defined()

const loginInitialValue: LoginDTO = { username: '', password: '' }

const Login: FC = () => {
  const userStore = useContext(UserContext)

  useEffect(() => deleteToken(), [])

  const handleSubmit = async (value: LoginDTO) => {
    const { data } = await login(value)
    console.log(data)
    if (data.res) {
      userStore.updateAll(data.res)
      history.push('/')
    }
  }

  return (
    <div>
      <Formik<LoginDTO>
        initialValues={loginInitialValue}
        validationSchema={loginRegisterSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field name="username" placeholder="用户名" />
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password" placeholder="密码" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              登录
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
