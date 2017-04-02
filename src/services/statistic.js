"use strict";

function sort(a, b) {

    var a_timestamp = parseInt(a.timestamp);
    var b_timestamp = parseInt(b.timestamp);

    if (a_timestamp < b_timestamp) {
        return -1;
    }

    if (a_timestamp > b_timestamp) {
        return 1;
    }

    return 0;
}

function sortByCount(a, b) {

    var a_count = parseFloat(a.count);
    var b_count = parseFloat(b.count);

    if (a_count < b_count) {
        return 1;
    }

    if (a_count > b_count) {
        return -1;
    }

    return 0;
}

module.exports = {
    ratio: function (notes) {

        var ratio = {};

        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            if (0 === note.type) {
                if ('undefined' === typeof ratio['room']) {
                    ratio['room'] = 0;
                }

                ratio['room']++;
            } else {
                if ('undefined' === typeof ratio['flat']) {
                    ratio['flat'] = 0;
                }

                ratio['flat']++;
            }
        }

        var ratio_flat = ratio['flat'];
        var ratio_room = ratio['room'];

        var percent = (ratio_flat + ratio_room) / 100;

        ratio['flat'] = (percent * ratio_flat).toFixed(2);
        ratio['room'] = (percent * ratio_room).toFixed(2);

        return ratio;
    },

    checkSubways: function (notes) {

        var subways_full = 0;
        var subways_empty = 0;
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            if(note.subways.length) {
                subways_full++;
            } else {
                subways_empty++;
            }

            total++;
        }

        var percent = total / 100;

        return {
            empty: (percent * subways_empty).toFixed(2),
            indicate: (percent * subways_full).toFixed(2)
        };
    },

    checkPrice: function (notes) {

        var price_indicate = 0;
        var price_empty = 0;
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            if(null !== note.price) {
                price_indicate++;
            } else {
                price_empty++;
            }

            total++;
        }

        var percent = total / 100;

        return {
            indicate: (percent * price_indicate).toFixed(2),
            empty: (percent * price_empty).toFixed(2)
        };
    },

    checkPhone: function (notes) {

        var indicate = 0;
        var empty = 0;
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            if(note.contacts.phones.length) {
                indicate++;
            } else {
                empty++;
            }

            total++;
        }

        var percent = total / 100;

        return {
            indicate: (percent * indicate).toFixed(2),
            empty: (percent * empty).toFixed(2)
        };
    },

    checkArea: function (notes) {

        var area_indicate = 0;
        var area_empty = 0;
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            if(null !== note.area) {
                area_indicate++;
            } else {
                area_empty++;
            }

            total++;
        }

        var percent = total / 100;

        return {
            indicate: (percent * area_indicate).toFixed(2),
            empty: (percent * area_empty).toFixed(2)
        };
    },

    hours: function (notes) {

        var hours = {};
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

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

        hours_count.sort(sort);

        return hours_count;
    },

    days: function (notes) {
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

        days_count.sort(sort);

        return days_count;
    },

    subways: function (notes, subways) {

        var note_subways = {};
        var total = 0;
        for (var i = 0, length = notes.length; i < length; i++) {

            var note = notes[i];

            for(var s = 0, slength = note.subways.length; s < slength; s++) {

                var snote = note.subways[s];

                if ('undefined' === typeof note_subways[snote]) {
                    note_subways[snote] = 0;
                }

                note_subways[snote]++;
                total++;
            }
        }

        var subways_count = [];
        for (var index in note_subways) {
            subways_count.push({
                name: subways[index].name,
                count: (note_subways[index] / total * 100).toFixed(2),
                color: subways[index].color
            });
        }

        subways_count.sort(sortByCount);

        return subways_count;
    }
};