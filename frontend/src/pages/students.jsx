import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StudentView } from 'src/sections/students/view';

function Students() {
    
  return (
    <>
      <Helmet>
        <title> Students | IfastAcademy </title>
      </Helmet>
      <StudentView />
    </>
  );
}

export default Students;
