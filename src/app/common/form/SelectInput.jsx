import React from 'react';
import { Form, Label, Select } from 'semantic-ui-react';


const TextInput = ({ input, width, type, placeholder, multiple, options, meta: { touched, error } }) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
      />
      {touched && error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default TextInput;
