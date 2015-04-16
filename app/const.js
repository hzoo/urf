export const socketUrl = '//localhost:8080';
export const title = 'URF Stats';
export const urls = {
    base: 'http://ddragon.leagueoflegends.com/cdn/',
    version: '5.6.2',
    splash: function(championName, num) {
        return urls.base + 'img/champion/splash/' + championName + '_' + (num || 0) + '.jpg';
    },
    loading: function(championName, num) {
        return urls.base + 'img/champion/loading/' + championName + '_' + (num || 0) + '.jpg';
    },
    square: function(championName) {
        return urls.base + urls.version + '/img/champion/' + championName + '.png';
    }
};
