const React = require("react");

const Layout = require("./Layout");

module.exports = function Signup() {
  return (
    <Layout>
      <script defer src="/js/signup.js" />
      <div className="d-flex flex-column align-items-center justify-content-center my-5 pt-5 gap-3">
        <h2>sign up</h2>
        <form action="/signup" method="POST" id="regForm">
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
        <h3 className="regMsg" />
      </div>
    </Layout>
  );
};
