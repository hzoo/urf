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

// highest goldEarned per minute
// console.log(statPerMinQuery({stat: 'goldEarned', region: 'NA', sort: 'DESC'}));
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

// highest average goldEarned per minute by champion
// console.log(AVGstatPerMinQuery({stat: 'goldEarned', region: 'NA', sort: 'DESC'}));
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

// run once since it takes so long
export const dashboardQuery = ({region} = {}) => {
    var regionStatement = '';
    if (region && region !== 'ALL') {
        regionStatement = `AND players.region='${region}'`;
    }

    return `
    SELECT championName,
    COUNT(1) as games,

    SUM(bans.pickTurn) as bans,
    ROUND(AVG(matchDuration),2) as matchDuration,
    ROUND(AVG(winner=1) * 100,2) as winner,
    ROUND(AVG(kills),2) as kills,
    ROUND(AVG(deaths),2) as deaths,
    ROUND(AVG(assists),2) as assists,

    ROUND(AVG(champLevel),2) as champLevel,
    ROUND(AVG(goldEarned),0) as goldEarned,

    ROUND(AVG(minionsKilled),0) as minionsKilled,
    ROUND(AVG(towerKills),2) as towerKills,
    ROUND(AVG(inhibitorKills),2) as inhibitorKills,

    ROUND(AVG(killingSprees),3) as killingSprees,
    ROUND(AVG(largestKillingSpree),3) as largestKillingSpree,
    ROUND(AVG(largestMultiKill),3) as largestMultiKill,
    SUM(doubleKills) as doubleKills,
    SUM(tripleKills) as tripleKills,
    SUM(quadraKills) as quadraKills,
    SUM(pentaKills) as pentaKills,
    SUM(unrealKills) as unrealKills,

    ROUND(AVG(magicDamageDealt),1) as magicDamageDealt,
    ROUND(AVG(magicDamageDealtToChampions),1) as magicDamageDealtToChampions,
    ROUND(AVG(magicDamageTaken),1) as magicDamageTaken,
    ROUND(AVG(physicalDamageDealt),1) as physicalDamageDealt,
    ROUND(AVG(physicalDamageDealtToChampions),1) as physicalDamageDealtToChampions,
    ROUND(AVG(physicalDamageTaken),1) as physicalDamageTaken,
    ROUND(AVG(trueDamageDealt),1) as trueDamageDealt,
    ROUND(AVG(trueDamageDealtToChampions),1) as trueDamageDealtToChampions,
    ROUND(AVG(trueDamageTaken),1) as trueDamageTaken,

    ROUND(AVG(totalHeal),2) as totalHeal,
    ROUND(AVG(largestCriticalStrike),2) as largestCriticalStrike,
    ROUND(AVG(totalTimeCrowdControlDealt),2) as totalTimeCrowdControlDealt

    FROM players, matches, champions, bans
    WHERE matches.matchId = players.matchId
    AND bans.matchId = matches.matchId
    AND players.championId = champions.championId
    ${regionStatement}
    GROUP BY players.championId
    ORDER BY championName ASC
`};

