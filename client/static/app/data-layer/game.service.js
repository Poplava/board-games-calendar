define(function(require) {
  'use strict';

  GameService.$inject = ['$resource', '$q', '$timeout'];
  return GameService;

  function GameService($resource, $q, $timeout) {
    var Game = $resource('/api/games/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });

    return {
      getGames: getGames,
      getGame: getGame,
      deleteGame: deleteGame,
      saveGame: saveGame,
      getNewGame: getNewGame,
      createGame: createGame
    };

    function getGames(options) {
      var defer = $q.defer(),
          gamesList = Game.query({
            page: options.page,
            search: options.search
          });
      
      gamesList.$promise.then(function(games) {
        $timeout(function() {
          defer.resolve(games);
        }, 2000);
      });
      
      return defer.promise;
    }

    function getGame(options) {
      var defer = $q.defer(),
          gameDetails = Game.get({id: options.gameId});
      
      gameDetails.$promise.then(function(games) {
        $timeout(function() {
          defer.resolve(games);
        }, 2000);
      });
      
      return defer.promise;
    }

    function deleteGame(game) {
      var defer = $q.defer();

      game.$delete().then(function(res) {
        $timeout(function() {
          defer.resolve(res);
        }, 2000);
      });
      
      return defer.promise;
    }

    function saveGame(game) {
      var defer = $q.defer();

      game.$update().then(function(res) {
        $timeout(function() {
          defer.resolve(res);
        }, 2000);
      });
      
      return defer.promise;
    }

    function getNewGame() {
      //TODO: add some default data
      return {};
    }

    function createGame(data) {
      var defer = $q.defer(),
          game = new Game(data);
          
      game.$save().then(function(res) {
        $timeout(function() {
          defer.resolve(res);
        }, 2000);
      });
      
      return defer.promise;
    }
  }
});