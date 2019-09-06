function Ajax()
{
    return {
        run: function(method, url, data, callback){

            if(data) {

                var out = [];

                for (var key in data) {
                    if(data.hasOwnProperty(key)) {
                        out.push(key + '=' + encodeURIComponent(data[key]));
                    }
                }

                data = out.join('&');

                if(method === 'GET') {
                    url += '?' + data;
                }
            }


            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.send(data);

            xhr.onreadystatechange = function() { // (3)
                if (xhr.readyState != 4) return;

                callback(JSON.parse(xhr.responseText));
            }
        }
    };

}