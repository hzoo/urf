module.exports = function(options) {

    var express = require("express");
    var bodyParser = require("body-parser");
    var path = require("path");

    var renderApplication = require("../config/simple.js");

    // load bundle information from stats
    var stats = require("../build/stats.json");

    var publicPath = stats.publicPath;

    var STYLE_URL = options.separateStylesheet && (publicPath + "main.css?" + stats.hash);
    var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];
    var COMMONS_URL = publicPath + [].concat(stats.assetsByChunkName.commons)[0];

    var app = express();

    // serve the static assets
    app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
        maxAge: "200d" // We can cache them as they include hashes
    }));

    app.use("/", express.static(path.join(__dirname, "..", "public"), {
    }));

    app.use(bodyParser.json());

    // application
    app.get("/*", function(req, res) {
        renderApplication(req.path, {}, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
            res.contentType = "text/html; charset=utf8";
            res.end(html);
        });
    });

    var port = +(process.env.PORT || options.defaultPort || 8080);
    var server = require('http').Server(app);
    server.listen(port, function() {
        console.log(`Server listening on port ${port} in ${process.env.NODE_ENV} mode`);
    });

    var io = require('socket.io')(server);
    io.set('transports', ['websocket', 'polling']);
    const query = require('./query');
    const connection = query.connection;

    io.on('connection', function (socket) {
        console.log('New client connected!');

        socket.on('c:singleQuery', function (q) {
            console.log(`singleQuery:${q.name}`);
            console.log(`singleQuery: ${query[q.name](q)}`);
            connection.query(query[q.name](q), function(err, rows) {
                if (err && err.code !== 'ER_DUP_ENTRY') throw err;
                socket.emit(`s:singleQuery:${q.name}`, rows);
            });
        });

        socket.on('c:dashboardQuery', function (q) {
            console.log('dashboardQuery');
            if (process.env.NODE_ENV === 'production') {
                connection.query('SELECT * from computed', function(err, rows) {
                    if (err && err.code !== 'ER_DUP_ENTRY') throw err;
                    socket.emit('s:dashboardQuery', rows);
                });
            } else {
                connection.query(query.dashboardQuery(q), function(err, rows) {
                    if (err && err.code !== 'ER_DUP_ENTRY') throw err;
                    socket.emit('s:dashboardQuery', rows);
                });
            }

        });

        socket.on('c:itemTableQuery', function (q) {
            console.log('itemTableQuery');
            connection.query(`
                SELECT *
                from SixMostBoughtItems
                ORDER BY championName ASC, freq DESC
            `, function(err, rows) {
                if (err && err.code !== 'ER_DUP_ENTRY') throw err;
                socket.emit('s:itemTableQuery', rows);
            });
        });
    });
}
