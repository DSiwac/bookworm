const React = require('react');

module.exports = function Search() {
  return (
    <form role="search" action="/catalogue/search" method="get">
      <input
        name="name"
        className="form-control"
        type="search"
        placeholder="find your book"
        aria-label="find your book"
      />
    </form>
  );
};
