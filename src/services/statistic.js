"use strict";

/**
 *
 * @param notes
 * @param city
 * @returns {Array}
 */
var hours = function (notes, city) {

    var hours = {};
    var total = 0;
    for (var i = 0, length = notes.length; i < length; i++) {

        var note = notes[i];

        if(note['city'] !== city) {

            continue;
        }

        var date = new Date(note['timestamp'] * 1000);

        var hour_key = date.getHours();

        if ('undefined' === typeof hours[hour_key]) {
            hours[hour_key] = {
                timestamp: hour_key,
                count: 0
            };
        }

        hours[hour_key]['count']++;
        total++;
    }

    for (var hour = 0; hour < 24; hour++) {
        if ('undefined' === typeof hours[hour]) {
            hours[hour] = {
                timestamp: hour,
                count: 0
            };
        }
    }

    var hours_count = [];
    for (var index in hours) {
        hours_count.push({
            date: index,
            count: (hours[index]['count'] / total * 100).toFixed(2),
            timestamp: hours[index]['timestamp']
        });
    }

    hours_count.sort(function(a, b){
        var a_timestamp = parseInt(a.timestamp);
        var b_timestamp = parseInt(b.timestamp);

        if (a_timestamp < b_timestamp) {
            return -1;
        }

        if (a_timestamp > b_timestamp) {
            return 1;
        }

        return 0;
    });

    return hours_count;
};

/**
 *
 * @param notes
 * @param city
 * @returns {Array}
 */
var days = function (notes, city) {
    var days = {};

    var weekday = new Array(7);
    weekday[0] = "Воскресенье";
    weekday[1] = "Понедельник";
    weekday[2] = "Вторник";
    weekday[3] = "Среда";
    weekday[4] = "Четверг";
    weekday[5] = "Пятница";
    weekday[6] = "Суббота";

    for (var i = 0, length = notes.length; i < length; i++) {

        var note = notes[i];

        if(note['city'] !== city) {

            continue;
        }

        var date = new Date(note['timestamp'] * 1000);

        var month = "0" + (date.getMonth() + 1);

        var day_key = date.getDate() + '.' + month.substr(-2) + '<br>' + weekday[date.getDay()];

        if ('undefined' === typeof days[day_key]) {
            days[day_key] = {
                timestamp: note['timestamp'],
                count: 0
            }
        }

        days[day_key]['count']++;
    }

    var days_count = [];
    for (var index in days) {
        days_count.push({
            date: index,
            count: days[index]['count'],
            timestamp: days[index]['timestamp']
        });
    }

    days_count.sort(function(a, b){
        var a_timestamp = parseInt(a.timestamp);
        var b_timestamp = parseInt(b.timestamp);

        if (a_timestamp < b_timestamp) {
            return -1;
        }

        if (a_timestamp > b_timestamp) {
            return 1;
        }

        return 0;
    });

    return days_count;
};

/**
 *
 * @param notes
 * @param subways
 * @param city
 * @returns {Array}
 */
var subways = function (notes, subways, city) {

    var note_subways = {};
    var total = 0;
    for (var i = 0, length = notes.length; i < length; i++) {

        var note = notes[i];

        if(note['city'] !== city) {

            continue;
        }

        for(var s = 0, slength = note.subways.length; s < slength; s++) {

            var snote = note.subways[s];

            if ('undefined' === typeof note_subways[snote]) {
                note_subways[snote] = 0;
            }

            note_subways[snote]++;
            total++;
        }
    }

    var subways_count_tmp = [];
    for (var index in note_subways) {

        if (typeof note_subways[index] === 'undefined') {

            continue;
        }

        subways_count_tmp.push({
            name: subways[index].name,
            count: (note_subways[index] / total * 100).toFixed(2),
            color: subways[index].color
        });
    }
    var subways_count = [];
    for(var i = 0, length = subways_count_tmp.length; i < length; i++ ){

        if(i >= 20) {

            break;
        }

        subways_count.push(subways_count_tmp[i]);
    }

    subways_count.sort(function(a, b){
        var a_count = parseFloat(a.count);
        var b_count = parseFloat(b.count);

        if (a_count < b_count) {
            return 1;
        }

        if (a_count > b_count) {
            return -1;
        }

        return 0;
    });

    return subways_count;
};

module.exports = {
    hours: hours,
    days: days,
    subways: subways
};