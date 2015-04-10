const nconf = require('nconf');

nconf.argv().env().file({ file: 'lib/config.json' });
var getConfig = conf => process.env[String(conf)] || nconf.get(String(conf));

const nodeENV = getConfig('NODE_ENV');

const mysql = require('mysql');
let mysqlOptions = {
  host: getConfig('DB_HOST'),
  user: getConfig('DB_USER'),
  password: getConfig('DB_PASSWORD'),
  database: getConfig('DB_NAME')
};

const fs = require('fs');
const path = require('path');
if (nodeENV === 'production') {
    mysqlOptions.sql = {
        ca: fs.readFileSync(getConfig('SSL_CA')),
        cert: fs.readFileSync(getConfig('SSL_CERT')),
        key: fs.readFileSync(getConfig('SSL_KEY'))
    }
}

export const connection = mysql.createConnection(mysqlOptions);
connection.connect();

export const statPerMinQuery = ({stat, region, sort, limit = 5} = {}) => {
    var regionStatement = '';
    if (region && region !== 'ALL') {
        regionStatement = `AND players.region='${region}'`;
    }
    var limitStatement = '';
    if (limit) {
        limitStatement = `LIMIT ${limit}`;
    }
    var statPerMin = `players.${stat} / (matches.matchDuration / 60)`;
    return `
        SELECT players.matchId, championName, ROUND(${statPerMin},1) as ${stat}PM
        FROM players, matches, champions
        WHERE matches.matchId = players.matchId
        AND players.championId = champions.championId
        ORDER BY ${stat}PM ${sort}
        ${limitStatement}
`};

export const AVGstatPerMinQuery = ({stat, region, sort}) => {
    var regionStatement = '';
    if (region && region !== 'ALL') {
        regionStatement = `AND players.region='${region}'`;
    }
    var statPerMin = `players.${stat} / (matches.matchDuration / 60)`;
    return `
        SELECT championName, ROUND(AVG(${statPerMin}),1) as ${stat}PM
        FROM players, matches, champions
        WHERE matches.matchId = players.matchId
        AND players.championId = champions.championId
        ${regionStatement}
        GROUP BY players.championId
        ORDER BY ${stat}PM ${sort}
`};

// highest goldEarned per minute
// console.log(statPerMinQuery({stat: 'goldEarned', region: 'NA', sort: 'DESC'}));
// highest average goldEarned per minute by champion
// console.log(AVGstatPerMinQuery({stat: 'goldEarned', region: 'NA', sort: 'DESC'}));

export const banQuery = () => {
    return `
    SELECT championName,
    sum(bans.pickTurn) as BanTotal
    FROM champions, bans
    WHERE bans.championId = champions.championId
    GROUP BY bans.championId
    ORDER BY championName ASC
`};
