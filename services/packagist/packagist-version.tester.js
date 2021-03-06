'use strict'

const Joi = require('joi')
const t = (module.exports = require('../tester').createServiceTester())

/*
  validator for a packagist version number

  From https://packagist.org/about :
  "version names should match 'X.Y.Z', or 'vX.Y.Z',
  with an optional suffix for RC, beta, alpha or patch versions"
*/
const isPackagistVersion = Joi.string().regex(/^v?[0-9]+.[0-9]+.[0-9]+[\S]*$/)

t.create('version (valid)')
  .get('/v/symfony/symfony.json')
  .expectBadge({
    label: 'packagist',
    message: isPackagistVersion,
  })

t.create('version (invalid package name)')
  .get('/v/frodo/is-not-a-package.json')
  .expectBadge({ label: 'packagist', message: 'not found' })
