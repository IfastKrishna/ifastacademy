import React from 'react';
import { error } from 'src/theme/palette';

function FormGenerator(
  elements = [
    {
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Enter your name',
      required: [true, 'Name is required'],
      initialValue: 'John Doe',
      errorMessage: 'Name is required',
    },
    {
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Enter your email',
      required: true,
      initialValue: '',
    },
    {
      type: 'password',
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      required: true,
      initialValue: '',
    },
    {
      type: 'select',
      label: 'Role',
      name: 'role',
      placeholder: 'Select your role',
      required: true,
      initialValue: '',
      options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ],
    },
    {
      type: 'checkbox',
      label: 'Active',
      name: 'active',
      initialValue: true,
    },
  ],
  formValues = {}
) {
  return <Box>{elements.map((element, index) => {
    
  })}</Box>;
}

export default FormGenerator;
