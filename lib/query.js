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


export const dashboardQuery = ({region} = {}) => {
    var regionStatement = '';
    if (region && region !== 'ALL') {
        regionStatement = `AND players.region='${region}'`;
    }

    return `
    SELECT championName,
    COUNT(1) as games,
    SUM(bans.pickTurn) as bans,
    SUM(matchDuration) as matchDuration,
    SUM(winner=1) as winner,
    SUM(kills) as kills,
    SUM(deaths) as deaths,
    SUM(assists) as assists,

    SUM(champLevel) as champLevel,
    SUM(goldEarned) as goldEarned,
    SUM(minionsKilled) as minionsKilled,

    SUM(inhibitorKills) as inhibitorKills,
    SUM(towerKills) as towerKills,

    SUM(largestCriticalStrike) as largestCriticalStrike,

    SUM(killingSprees) as killingSprees,
    SUM(largestKillingSpree) as largestKillingSpree,

    SUM(doubleKills) as doubleKills,
    SUM(tripleKills) as tripleKills,
    SUM(quadraKills) as quadraKills,
    SUM(pentaKills) as pentaKills,
    SUM(unrealKills) as unrealKills,
    SUM(largestMultiKill) as largestMultiKill,

    SUM(magicDamageDealt) as magicDamageDealt,
    SUM(magicDamageDealtToChampions) as magicDamageDealtToChampions,
    SUM(magicDamageTaken) as magicDamageTaken,

    SUM(physicalDamageDealt) as physicalDamageDealt,
    SUM(physicalDamageDealtToChampions) as physicalDamageDealtToChampions,
    SUM(physicalDamageTaken) as physicalDamageTaken,

    SUM(trueDamageDealt) as trueDamageDealt,
    SUM(trueDamageDealtToChampions) as trueDamageDealtToChampions,
    SUM(trueDamageTaken) as trueDamageTaken,

    SUM(totalHeal) as totalHeal,
    SUM(totalTimeCrowdControlDealt) as totalTimeCrowdControlDealt

    FROM players, matches, champions, bans
    WHERE matches.matchId = players.matchId
    AND bans.matchId = matches.matchId
    AND players.championId = champions.championId
    ${regionStatement}
    GROUP BY players.championId
    ORDER BY championName ASC
`};
