const React = require('react');

const Layout = require('./Layout');

module.exports = function Catalogue({ login, items }) {
  return (
    <Layout login={login}>
      <script defer src="/js/searchfilter.js" />
      {/* <script defer src="/js/bookItems.js" /> */}
      <div className="px-4 pt-5 my-5 text-center">
        <h1 className="display-4 fw-bold text-body-emphasis">catalogue</h1>
        <div className="mx-auto">
          <p className="lead mb-4">find your perfect match here</p>
          <form action="/catalogue/search" method="get" className="my-5">
            <div className="input-group">
              <input name="name" type="text" className="form-control" placeholder="search by" aria-label="search" />
              <button id="name-search" className="btn btn-dark" type="button">name</button>
              <button id="autor-search" className="btn btn-outline-dark" type="button">author</button>
            </div>
          </form>
          <div className="d-flex flex-wrap align-content-start gap-3 my-2">
            {
                items.length ? items.map((item) => (
                  <div key={item.id} className="card" style={{ width: '17rem' }}>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">
                        {item.book.name}
                        {' '}
                        by
                        {' '}
                        {item.book.author}
                      </h5>
                      <p className="card-text">
                        {item.book.description}
                      </p>
                      {item.status === 'booked' ? (
                        <span className="badge w-25 p-2 mb-1 align-self-center text-bg-danger">{item.status}</span>
                      ) : (
                        <form action={`/catalogue/${item.id}`} method="post" className="bookForm" id={item.id}>
                          <input type="submit" name="status" value={item.status} id={item.id} className="btn btn-sm btn-success" />
                        </form>
                      )}
                    </div>
                  </div>
                ))
                  : <h2>empty</h2>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};
