import fetchJsonp from "fetch-jsonp";

export default  function fetch(url,callback) {
    fetchJsonp(url)
        .then(function (response) {
            return response.json()
        }).then(function (json) {
        callback(json)
    }).catch(function (ex) {
        console.log('parsing failed', ex)
    })
}