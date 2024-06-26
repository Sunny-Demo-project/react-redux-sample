import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field, reduxForm } from 'redux-form';
const validate = values => {
  const errors = {}
  const requiredFields = [
    'count',
    'type',
    'selectType',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.count &&
    values.count < 0
  ) {
    errors.count = 'Invalid Units'
  }
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

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="typeId">Type</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: 'selectType',
        id: 'typeId'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

const AddForm = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit, types } = props
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
      <div className="col-md-12">
        <Field
          name="count"
          component={renderTextField}
          label="No Of Units"
          type="number"
        />
      </div>
      <div className="col-md-12">
        <Field
          name="type"
          component={renderSelectField}
          label="Type"
        >
        {types ? types.map((type, index) => <option key={index} value={type}>{type}</option>) : null}
        </Field>
      </div>
      <div className="col-md-12">
        <Field name="print" component={renderCheckbox} label="Printbarcode" />
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
  form: 'addForm',
  validate
})(AddForm)