define(function (require, exports, module) {

    'use strict';

    var EH = require('lib/js/everhome');
    var Request = require('lib/js/eh_request');
    var FormValid = require('lib/js/eh_form');

    var co_gov = function () {

        this.form = null;
    };
    co_gov.prototype = {
        init: function () {
            var t = this;
            t.render();
        },
        render: function () {
            var t = this;
            t.initForm();
        },
        submitGov: function (provinceName, cityName,areaName,address,name,contactToken,applicantName,applicantOccupation,applicantPhone,applicantEmail) {
            Request.postnewCooperation({
                cooperationType:'GA',
                provinceName:provinceName,
                cityName:cityName,
                areaName:areaName,
                address:address,
                name:name,
                contactToken:contactToken,
                applicantName:applicantName,
                applicantOccupation:applicantOccupation,
                applicantPhone:applicantPhone,
                applicantEmail:applicantEmail,
            }, function (data) {
                console.log(data);
                EH.Alert('保存成功', 'success');
                setTimeout('window.location.reload();',1000);
            });
        },
        bindEvent: function () {
            var t = this;
            $('.hzy_btn').on('click' , function () {
                var provinceName = $('.data_provinceName').val();
                var cityName = $('.data_cityName').val();
                var areaName = $('.data_areaName').val();
                var address = $('.data_address').val();
                var name = $('.data_name').val();
                var contactToken = $('.data_contactToken').val();
                var applicantName = $('.data_applicantName').val();
                var applicantOccupation = $('.data_applicantOccupation').val();
                var applicantPhone = $('.data_applicantPhone').val();
                var applicantEmail = $('.data_applicantEmail').val();

                    t.submitGov(provinceName, cityName,areaName,address,name,contactToken,applicantName,applicantOccupation,applicantPhone,applicantEmail);

            });
        },
        initForm: function () {
            var t = this;
            t.form = FormValid.valid($('.eh_form_valid')[0], {
                beforeSubmit: function () {
                    t.bindEvent();
                    return false;
                }
            });
        },
    };
    return co_gov;
});
