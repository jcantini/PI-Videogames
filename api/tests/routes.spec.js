const { expect } = require('chai');
const session = require('supertest-session');
const server = require('../src/app'); 
const { conn } = require('../src/db');
const { Videogame, Genre } = conn.models;
const agent = session(server);

xdescribe('Test Routes', () => {
  describe('GET /videogames', () => {
    it('responds with 200', () => 
        agent.get('/videogames')
        .expect(200));
    it('responds with and object with videogames', () => {
        agent.get('/videogames')
        .then((res) => {
          expect(res.body).to.be.an('array');
        })
    });
  });
  xdescribe('GET /genres', () => {
    it('responds with 200', () => 
        agent.get('/genres')
        .expect(200));
    it('responds with 200', () => 
        agent.get('/genres')
        .expect(200));    
    it('responds with an array', () => {
        agent.get('/genres')
        .then((res) => {
          expect(res.body).to.be.an('array');
        })
    });
    it('responds with an array of genres', () => {
      agent.get('/genres')
      .then((res) => {
        expect(res.body).to.be.an('array').that.is.not.empty;
      })
  })
    
  });
  })
  