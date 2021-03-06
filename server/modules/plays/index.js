/*jslint node: true */
'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./plays.controller');

// Registering routes
router.get('/', controller.getPlays);
router.get('/calendar', controller.getPlays);
router.get('/count', controller.getPlaysCount);
router.get('/:playId', controller.getPlay);
router.post('/:playId/join', controller.joinPlay);
router.delete('/:playId/join', controller.leavePlay);

// TODO: add permissions check middleware
router.post('/', controller.createPlay);
router.delete('/:playId', controller.deletePlay);
router.put('/:playId', controller.modifyPlay);

module.exports.api = router;