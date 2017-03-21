"use strict";

var plural = function (value, end_1, end_2, end_3) {
    if (value % 10 === 1 && value % 100 !== 11) {
        return end_1;
    } else if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20)) {
        return end_2;
    } else {
        return end_3;
    }
};

module.exports = {
    number: function (number) {
        if (null === number) {
            return null;
        }
        return number.toString().split(/(?=(?:\d{3})+$)/).join(' ');
    },

    phone: function (number) {
        var str = number.toString();
        return '+7 ' + str[0] + str[1] + str[2] + ' ' + str[3] + str[4] + str[5] + ' ' + str[6] + str[7] + ' ' + str[8] + str[9];
    },


    date: function (unix_timestamp) {
        var months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сенятбря',
            'октября',
            'ноября',
            'декабря'
        ];
        var date = new Date(unix_timestamp * 1000);

        var hours = date.getHours();

        var minutes = "0" + date.getMinutes();

        var year = date.getFullYear();

        var month = months[date.getMonth()];

        var day = date.getDate();

        return day + ' ' + month + ' ' + (year < 2017 ? year : '') + ' ' + hours + ':' + minutes.substr(-2);
    },

    dateSitemap: function (unix_timestamp) {

        var date = new Date(unix_timestamp * 1000);

        var minutes = "0" + date.getMinutes();
        var hour = "0" + date.getHours();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();


        return date.getFullYear() + '-' + month.substr(-2) + '-' + day.substr(-2) + 'T' + hour.substr(-2) + ':' + minutes.substr(-2) + '+03:00'
    },

    datePlural: function (unix_timestamp) {
        var date_now = new Date();

        var date_publish = new Date(unix_timestamp * 1000);

        var diff_time = Math.abs(date_now.getTime() - date_publish.getTime());
        var diff_hours = Math.floor(diff_time / 3600000);
        var diff_minutes = Math.floor(diff_time / 60000);
        var equal_day = date_now.getDate() === date_publish.getDate();
        var prev_day = date_now.getDate() === (date_publish.getDate() + 1);

        var phrase = null;
        switch (true) {
            case (equal_day || prev_day) && diff_hours < 1 && diff_minutes < 1:
                phrase = 'только что';
                break;
            case (equal_day || prev_day) && diff_hours < 1:
                phrase = diff_minutes + ' минут' + plural(diff_minutes, 'у', 'ы', '') + ' назад';
                break;
            case (equal_day || prev_day) && diff_hours <= 24:
                phrase = diff_hours + ' час' + plural(diff_hours, '', 'а', 'ов') + ' назад';
                break;
            case diff_hours < 48:
                phrase = 'вчера';
                break;
            default:

                var months = [
                    'января',
                    'февраля',
                    'марта',
                    'апреля',
                    'мая',
                    'июня',
                    'июля',
                    'августа',
                    'сенятбря',
                    'октября',
                    'ноября',
                    'декабря'
                ];

                var hours = date_publish.getHours();

                var minutes = "0" + date_publish.getMinutes();

                var year = date_publish.getFullYear();

                var month = months[date_publish.getMonth()];

                var day = date_publish.getDate();

                phrase = (day < 10 ? "0" + day : day) + ' ' + month + ' ' + (year < 2017 ? year : '') + ' ' + hours + ':' + minutes.substr(-2);
        }

        return phrase;
    }
};