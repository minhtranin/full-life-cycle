process.env.DB_DATABASE = 'feedstest';
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

it('should list ALL item on /blobs GET', function(done) {
    chai.request(process.env.domaintest || 'http://localhost:8000')
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    })

it('should list ALL item on /item GET', function(done) {
    chai.request(process.env.domaintest || 'http://localhost:8000')
      .get('/?limit=10&offset=10')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    })
it('should list ALL item on /item GET', function(done) {
    chai.request(process.env.domaintest || 'http://localhost:8000')
      .get('/?limit=&offset=')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
    })

it('should delete a SINGLE item on /item?id DELETE', function(done) {
    chai.request(process.env.domaintest || 'http://localhost:8000')
      .delete('/?id=a')
      .end(function(err, res){
        res.should.have.status(500);
        done();
      });
    });

it('should add a SINGLE item on /item POST', function(done) {
  chai.request(process.env.domaintest || 'http://localhost:8000')
    .post('/')
    .send({'title': 'data test', 'description': 'data test', 'link': 'https:data test', 'comments': 'data test', 'pubdate': 'data test', 'category': 'data test'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('title');
      res.body.should.have.property('description');
      res.body.should.have.property('link');
      res.body.should.have.property('comments');
      res.body.should.have.property('pubdate');
      res.body.should.have.property('category');
      done();
    });
});