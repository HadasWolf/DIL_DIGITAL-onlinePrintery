const page = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="shortcut icon"
        href="https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Express_Clothing_Logo.SVG/245px-Express_Clothing_Logo.SVG.png?20111009101149"
        type="image/x-icon"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossorigin="anonymous"
      />
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"
      ></script>
      <script src="./app.js"></script>
      <style>
        .center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        main {
          min-height: 88vh;
        }
      </style>
      <title>Serving Page from express</title>
    </head>
    <body>
      <header>
        <nav
          class="navbar navbar-expand-lg navbar-dark bg-dark"
          aria-label="Fifth navbar example"
        >
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Logo</a>

            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample05">
              <div class="justify-content-between d-flex col-12">
                <div>
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="about.html">about</a>
                    </li>
                  </ul>
                </div>
                <div class="text-light">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link" href="#">Login</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main class="container">
        <h1 class="text-center">Serving Page from express</h1>
        <p>This is an example of serving a page from the node.js server</p>
      </main>
      <footer class="border-top pt-3 bg-dark center">
        <p class="text-light">Created by David Yakin &copy;</p>
      </footer>
    </body>
  </html>`;

module.exports = page;
