#!/usr/bin/env node

/* eslint strict:0, camelcase:0 */

'use strict';

require('biosan-tools/lib/updateComponents')((name) => {
  return !!name.match(/^rc-/);
});
