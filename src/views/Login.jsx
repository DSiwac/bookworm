const React = require('react');

const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <script defer src="/js/login.js" />
      <div className="d-flex flex-column align-items-center justify-content-center my-5 pt-5 gap-3">
        <h2 className="hTag">log in</h2>
        <script defer src="/js/index.js" />
        <form action="/login" method="POST" id="loginForm">
          <label htmlFor="exampleInput1" className="form-label py-1">
            login
          </label>
          <input
            name="login"
            type="text"
            className="form-control rounded my-1"
            id="exampleInput1"
          />
          <label htmlFor="exampleInput2" className="form-label py-1">
            password
          </label>
          <input
            name="password"
            type="password"
            className="form-control rounded my-1"
            id="exampleInput2"
          />
          <button type="submit" className="btn btn-outline-dark rounded my-3">
            submit
          </button>
        </form>
        <h3 className="logMsg" />
      </div>
    </Layout>
  );
};
