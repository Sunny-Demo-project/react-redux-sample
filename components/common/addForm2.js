import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';
const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'zone',
    'code',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const AddForm2 = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
      <div className="col-md-12">
        <Field
          name="name"
          component={renderTextField}
          label="Name"
        />
      </div>
      <div className="col-md-12">
        <Field
          name="zone"
          component={renderTextField}
          label="Zone"
        />
      </div>
      <div className="col-md-12">
        <Field
          name="code"
          component={renderTextField}
          label="Code"
        />
      </div>
      <div className="col-md-12">
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'addForm2',
  validate
})(AddForm2)