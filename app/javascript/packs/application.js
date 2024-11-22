/* eslint no-console:0 */
/* global require */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import "../stylesheets/application.scss";
const componentRequireContext = require.context("src", true);

const { setAuthHeaders } = require("apis/axios");
const { initializeLogger } = require("common/logger");
const { initializeReactI18Next } = require("common/i18n");

initializeReactI18Next();
initializeLogger();
setAuthHeaders();

const ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
