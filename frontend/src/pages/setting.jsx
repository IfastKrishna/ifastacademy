import React from 'react';
import { Helmet } from 'react-helmet-async';
import SettingsVew from 'src/sections/settings/view/settings-vew';

function Setting() {
  return (
    <div>
      <Helmet>
        <title> Setting | IfastAcademy </title>
      </Helmet>
      <SettingsVew />
    </div>
  );
}

export default Setting;
