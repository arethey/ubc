var express = require('express');
var router = express.Router();
var Accountlist = require('../models/Accountlist');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.post('/add', (req, res, next) => {
    var newAccountlist = new Accountlist({
        accountkey: req.body.accountkey,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        cellphone: req.body.cellphone,
        email: req.body.email,
        isEmailVerified: req.body.isEmailVerified
    });
    newAccountlist.save((error) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
    });
});

router.get('/read', (req, res) => {
    Accountlist.find((err, accountlist) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: accountlist });
    }).sort({ _id: -1 }).limit(20);
});

router.get('/edit/:transactionKey', (req, res) => {
    const transactionKey = req.params.transactionKey;
    Accountlist.findById({ _id: transactionKey }, (err, accountlist) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: accountlist });
    });
});

router.put('/update/:transactionKey', (req, res, next) => {
    const { transactionKey } = req.params;
    if (!transactionKey) {
        return res.json({ success: false, error: 'Not match found' })
    }
    Accountlist.findById(transactionKey, (error, accountlist) => {
        const {
            accountkey,
            firstname,
            middlename,
            lastname,
            cellphone,
            email,
            username,
            password,
            password2
        } = req.body;
        accountlist.accountkey = accountkey;
        accountlist.firstname = firstname;
        accountlist.middlename = middlename;
        accountlist.lastname = lastname;
        accountlist.cellphone = cellphone;
        accountlist.email = email;
        accountlist.username = username;
        accountlist.password = password;
        accountlist.password2 = password2;

        accountlist.save((error) => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});

router.delete('/delete/:transactionKey', (req, res) => {
    const { transactionKey } = req.params;
    Accountlist.remove({ _id: transactionKey }, (err, accountlist) => {
        if (err)
            res.status(500).json({ errmsg: err });
        res.status(200).json({ msg: accountlist });
    })
});

module.exports = router;