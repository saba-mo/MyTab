import React from 'react'
import {Field, reduxForm} from 'redux-form'

const required = (value) => (value ? undefined : 'Required')

const display = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <div>{label}</div>
    <input {...input} type={type} />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)

let AddFriend = (props) => {
  const {handleSubmit, pristine, submitting, reset} = props
  return (
    <form id="addFriend-form" onSubmit={handleSubmit}>
      <div>
        <Field
          name="email"
          type="text"
          component={display}
          validate={[required]}
        />
      </div>
      <p />
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'AddingFriend',
})(AddFriend)
