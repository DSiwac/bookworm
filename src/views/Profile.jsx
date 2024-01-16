const React = require('react');

const Layout = require('./Layout');

module.exports = function Profile({ login, items, reservedItems }) {
  return (
    <Layout login={login}>
      <script defer src="/js/addItems.js" />
      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2">
          hello,
          {' '}
          {login}
        </h2>
        <div className="col g-4 py-5 row-cols-1 row-cols-lg-3">
          <form className="pb-5" action="/profile" method="POST" id="addForm">
            <h3 className="fs-2 text-body-emphasis">add a new book</h3>
            <div className="mb-3">
              <label htmlFor="exampleInput1" className="form-label">
                name
              </label>
              <input
                name="name"
                type="text"
                className="form-control rounded"
                id="exampleInput1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInput2" className="form-label">
                author
              </label>
              <input
                name="author"
                type="text"
                className="form-control rounded"
                id="exampleInput2"
              />
            </div>
            <button type="submit" className="btn btn-outline-dark rounded">
              add
            </button>
          </form>
          <div className="col d-flex align-items-center py-5">
            <div>
              <h3 className="fs-2 text-body-emphasis">added books</h3>
              <ul style={{ listStyle: 'none' }} id="addList" className="p-0">
                { items.length ? (
                  items.map((item) => (
                    <li key={item.id} id={`profile${item.book.id}`} className="my-2">
                      <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">
                              {item.book.name}
                              {' '}
                              by
                              {' '}
                              {item.book.author}
                            </h5>
                            <button type="button" className="btn-close" id={item.book.id} aria-label="Close" />
                          </div>
                          <p className="card-text">
                            {item.book.description}
                          </p>
                          {item.status === 'booked' ? (
                            <span className="badge align-self-center text-bg-danger">{item.status}</span>
                          ) : (
                            <span className="badge align-self-center text-bg-success">{item.status}</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>you haven't added any books yet</li>
                )}
              </ul>
            </div>
          </div>
          <div className="col d-flex align-items-center py-5">
            <div>
              <h3 className="fs-2 text-body-emphasis">reserved books</h3>
              <ul style={{ listStyle: 'none' }} className="p-0">
                { reservedItems.length ? (
                  reservedItems.map((item) => (
                    <li key={item.id} id={`profile${item.catalogue_item.book.id}`} className="my-2">
                      <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">
                              {item.catalogue_item.book.name}
                              {' '}
                              by
                              {' '}
                              {item.catalogue_item.book.author}
                            </h5>
                          </div>
                          <p className="card-text">
                            {item.catalogue_item.book.description}
                          </p>
                          { item.catalogue_item.status === 'booked' ? (
                            <div className="d-flex justify-content-between">
                              <span className="badge w-25 p-2 mb-1 align-self-center text-bg-danger">
                                {item.catalogue_item.status}
                              </span>
                              <form action={`/profile/${item.catalogue_item.id}`} method="post">
                                <input type="submit" name="status" value="return" id={item.catalogue_item.id} className="btn btn-sm btn-success" />
                              </form>
                            </div>
                          ) : (
                            <span className="btn btn-success btn-sm">
                              {item.catalogue_item.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>no reservations yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
